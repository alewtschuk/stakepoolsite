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
	"time"

	"github.com/joho/godotenv"
)

type PoolData struct {
	Saturation string `json:"saturationLevel"`
	//UptimePct      float64 `json:"uptimePct"`
	LiveStake      string `json:"liveStake"`
	Pledge         string `json:"activePledge"`
	BlocksEpoch    int64  `json:"currentEpochBlocks"`
	LifetimeBlocks int64  `json:"lifetimeBlocks"`
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
//TODO: Implement handling the newly returned datatypes for the front end

func mustFetchPoolData() PoolData {

	const BASEURL string = "https://api.cardanoscan.io/api/v1/pool/"
	const POOLID string = "d50b69e0ea9704d0130c6384fe0a509521833b2e472fc177258e5b1d"
	var APIKEY string = os.Getenv("API_KEY")
	if APIKEY == "" {
		log.Fatalf("ERROR: API key is empty")
	}

	// Setup request
	request, err := http.NewRequest("GET", fmt.Sprintf(BASEURL+"stats?poolId=%s", POOLID), nil)
	if err != nil {
		log.Fatalf("Error creating request %v", err)
	}

	// Add header
	request.Header.Add("apiKey", APIKEY)

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

	data := PoolData{}
	err = json.Unmarshal(body, &data)
	if err != nil {
		log.Fatalf("ERROR: JSON unmarshaling error %v", err)
	}

	fmt.Printf("Saturation: %v\nLive stake: %v\nPledge: %v\nBlocks Epoch: %v\nLifetime Blocks: %v\n", data.Saturation, data.LiveStake, data.Pledge, data.BlocksEpoch, data.LifetimeBlocks)

	return data
}

func init() {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}
}
