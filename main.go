package main

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"time"
)

type PoolData struct {
	Saturation     float64 `json:"saturation"`
	UptimePct      float64 `json:"uptimePct"`
	LiveStake      int64   `json:"liveState"`
	Pledge         int64   `json:"pledge"`
	BlocksEpoch    int64   `json:"blocksEpoch"`
	LifetimeBlocks int64   `json:"lifetimeBlocks"`
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

// TODO: Fetch data from real api call that contains pool data
func mustFetchPoolData() PoolData {
	return PoolData{
		Saturation:     4.0,
		UptimePct:      99.9,
		LiveStake:      3_250_00,
		Pledge:         150_000,
		BlocksEpoch:    2,
		LifetimeBlocks: 128,
	}
}
