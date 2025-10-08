package main

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"time"

	"github.com/joho/godotenv"
)

type PoolData struct {
	Saturation      string  `json:"saturationLevel"`
	PoolStatus      int64   `json:"status"`
	LiveStake       string  `json:"liveStake"`
	Pledge          string  `json:"activePledge"`
	BlocksEpoch     int64   `json:"currentEpochBlocks"`
	LifetimeBlocks  int64   `json:"lifetimeBlocks"`
	PledgeMet       string  `json:"pledgeMet"`
	DeclaredPledge  string  `json:"declaredPledge"`
	Margin          int64   `json:"margin"`
	SaturationFloat float64 `json:"saturationFloat"`
}

type TempInfo struct {
	Status         bool   `json:"status"`
	DeclaredPledge string `json:"declaredPledge"`
	Margin         string `json:"margin"`
}

func main() {
	distIndex := filepath.Join("cashsite", "dist", "index.html")
	distJSON := filepath.Join("cashsite", "dist", "data.json")

	html, err := os.ReadFile(distIndex)
	must(err, "read dist/index/html")

	data := mustFetchPoolData()

	b, err := json.Marshal(data)
	must(err, "marshal pool data")

	const placeholder = "__POOL_DATA_JSON__"
	if !bytes.Contains(html, []byte(placeholder)) {
		must(errors.New("placeholder not found"), "verify placeholder in dist/index.html")
	}
	out := bytes.ReplaceAll(html, []byte(placeholder), b)

	must(os.WriteFile(distIndex, out, 0644), "write updated dist/index.html")
	must(os.WriteFile(distJSON, pretty(b), 0644), "write dist/data.json")

	fmt.Println("Injected pool data into dist/index.html at", time.Now().UTC().Format(time.RFC3339))
}

func must(err error, context string) {
	if err != nil {
		fmt.Fprintf(os.Stderr, "%s: %v\n", context, err)
		os.Exit(1)
	}
}

func pretty(b []byte) []byte {
	var buf bytes.Buffer
	if err := json.Indent(&buf, b, "", "	"); err != nil {
		return b
	}
	return buf.Bytes()
}

// TODO: Implement checking logic to save and revert old version of site if data cannot be retrieved
/*TODO: Implement logic for rebuild using

# from repo root
cd cashsite
npm ci
npm run build
cd ..

# now inject
go run main.go

# open the static build
npx serve cashsite/dist
*/

func mustFetchPoolData() PoolData {

	const BASEURL string = "https://api.cardanoscan.io/api/v1/pool"
	const POOLID string = "?poolId=d50b69e0ea9704d0130c6384fe0a509521833b2e472fc177258e5b1d"
	const HTTPCALL string = "GET"
	var APIKEY string = os.Getenv("API_KEY")
	if APIKEY == "" {
		log.Fatalf("ERROR: API key is empty")
	}

	// Setup and build request
	statsRequest := buildRequest(BASEURL, POOLID, HTTPCALL, APIKEY, "/stats")
	detailsRequest := buildRequest(BASEURL, POOLID, HTTPCALL, APIKEY, "")

	// Fetch API response
	statsBody := fetchResponse(statsRequest)
	detailsBody := fetchResponse(detailsRequest)

	// Initalize and extract data into the struct
	statsData := getResponseData(statsBody, PoolData{})
	detailsData := getResponseData(detailsBody, TempInfo{})

	fmt.Printf("Saturation: %v\nLive stake: %v\nPledge: %v\nBlocks Epoch: %v\nLifetime Blocks: %v\n", statsData.Saturation, statsData.LiveStake, statsData.Pledge, statsData.BlocksEpoch, statsData.LifetimeBlocks)
	fmt.Printf("Status: %v\nDeclared Pledge: %v\nMargin: %v\n", detailsData.Status, detailsData.DeclaredPledge, detailsData.Margin)

	liveStakeData, err := strconv.Atoi(statsData.LiveStake)
	if err != nil {
		log.Fatalf("ERROR: Cannot convert live stake to integer")
	}

	pledgeData, err := strconv.Atoi(statsData.Pledge)
	if err != nil {
		log.Fatalf("ERROR: Cannot convert pledge to integer")
	}

	saturationFloat, err := strconv.ParseFloat(statsData.Saturation, 64)
	if err != nil {
		log.Fatalf("ERROR: Cannot convert saturation to integer")
	}

	pldgFloat, err := strconv.ParseFloat(detailsData.DeclaredPledge, 64)
	if err != nil {
		log.Fatalf("ERROR: Cannot convert saturation to integer")
	}
	marginNum, err := strconv.Atoi(detailsData.Margin)

	liveStakeFloat := float64(liveStakeData)
	pledgeFloat := float64(pledgeData)

	stakedAda := liveStakeFloat / 1000000
	pledgedAda := pledgeFloat / 1000000
	initialPledge := pldgFloat / 1000000

	statsData.LiveStake = fmt.Sprintf("%.2f", stakedAda)
	statsData.Pledge = fmt.Sprintf("%.2f", pledgedAda)
	statsData.SaturationFloat = saturationFloat
	statsData.Margin = int64(marginNum)
	statsData.DeclaredPledge = fmt.Sprintf("%.2f", initialPledge)

	decPldg, err := strconv.Atoi(detailsData.DeclaredPledge)
	if err != nil {
		log.Fatalf("ERROR: Cannot convert saturation to integer")
	}

	if pledgeData >= decPldg {
		statsData.PledgeMet = "✅"
	} else {
		statsData.PledgeMet = "❌"
	}

	if detailsData.Status == true {
		statsData.PoolStatus = 100
	} else {
		statsData.PoolStatus = 0
	}

	return statsData
}

func buildRequest(BASEURL, POOLID, HTTPCALL, APIKEY, urlExtension string) *http.Request {

	request, err := http.NewRequest(HTTPCALL, fmt.Sprint(BASEURL+urlExtension+POOLID), nil)
	if err != nil {
		log.Fatalf("Error creating request %v", err)
	}

	// Add header
	request.Header.Add("apiKey", APIKEY)

	return request

}

func fetchResponse(request *http.Request) []byte {

	client := &http.Client{}
	response, err := client.Do(request)
	if response.StatusCode != 200 {
		log.Fatalf("ERROR: Could not get response, status code not 200 %v", err)
	}

	defer response.Body.Close()

	// Read the body of the response
	body, err := io.ReadAll(response.Body)
	if err != nil {
		log.Fatalf("ERROR: Body cannot be read %v", err)
	}

	return body
}

func getResponseData[T any](body []byte, dataStruct T) T {

	err := json.Unmarshal(body, &dataStruct)
	if err != nil {
		log.Fatalf("ERROR: JSON unmarshaling error %v", err)
	}

	return dataStruct
}

// func getTempData(BASEURL, POOLID, APIKEY string) TempInfo {

// }

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}
}
