package chaincode

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-gateway/pkg/client"
)

type Message struct {
	Id      string `json:"Id"`
	Message string `json:"Message"`
}

func CreateAsset(contract *client.Contract, args ...string) {
	res, err := contract.Submit("CreateAsset", client.WithArguments(args...))
	if err != nil {
		fmt.Printf("error creating asset %v\n", err)
		_, err := contract.Evaluate("CreateAsset", client.WithArguments(args...))
		fmt.Printf("The error is the following: %v", err)
	}
	fmt.Println(res)
}

func PostAsset(contract *client.Contract, args ...string) {
	res, err := contract.Submit("PostAsset", client.WithArguments(args...))
	if err != nil {
		fmt.Printf("error creating asset %v\n", err)
		_, err := contract.Evaluate("PostAsset", client.WithArguments(args...))
		fmt.Println(err)
	}
	fmt.Println(res)
}

func InitAsset(contract *client.Contract) {
	res, err := contract.Submit("InitLedger")
	if err != nil {
		fmt.Printf("error initing the ledger %v\n", err)
	}
	fmt.Println(res)
	fmt.Println(err)
}

func Read(contract *client.Contract) {
	res, err := contract.Evaluate("Read")
	msg := &Message{}
	json.Unmarshal(res, msg)
	fmt.Println(msg)
	fmt.Println(err)
}

func ReadAsset(contract *client.Contract, args ...string) {
	res, err := contract.Evaluate("ReadAsset", client.WithArguments(args...))
	fmt.Println(err)
	msg := &Message{}
	err = json.Unmarshal(res, msg)
	fmt.Println(err)
	fmt.Println(msg)
}
