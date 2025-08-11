package main

import (
	"fmt"
	"html/template"
	"os"
)

type PoolData struct {
	Saturation int
	temp       string
}

func main() {
	os.Chdir()
	fmt.Println()
	template.New()
}
