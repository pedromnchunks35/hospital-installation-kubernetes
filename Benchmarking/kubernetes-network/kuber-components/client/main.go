package main

import (
	ch "basic/chaincode"
	c "basic/connection"
	"log"
)

func main() {
	gateway, err := c.CreateConnection(
		"./msp/tlscacerts/cacert-tls-admin.pem",
		"CHP-SRVAIDA69.chuporto.min-saude.pt:30016",
		"./msp/signcerts/cert.pem",
		"OrgxMSP",
		"./msp/keystore/",
	)
	if err != nil {
		log.Fatalf("%v", err)
	}
	defer gateway.Close()
	channel := gateway.GetNetwork("channel3")
	contract := channel.GetContract("basic")
	ch.CreateAsset(contract, "psaihfoihasfhaoifhoi", "33")
}
