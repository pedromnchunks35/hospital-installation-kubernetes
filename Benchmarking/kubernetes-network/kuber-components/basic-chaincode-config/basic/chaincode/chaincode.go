package chaincode2

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type SmartContract struct {
	contractapi.Contract
}

type Asset struct {
	Id   uint32 `json:"Id"`
	Hash string `json:"Hash"`
}

/*
? Function to init the ledger
*/
func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	return nil
}

/*
? Function to create assets
*/
func (s *SmartContract) CreateAsset(ctx contractapi.TransactionContextInterface, hash string, id uint32) (*Asset, error) {
	if s.exists(ctx, id) {
		return nil, fmt.Errorf("The item you are trying to add already exists")
	}
	//? Create the asset
	asset := Asset{
		Id:   id,
		Hash: hash,
	}
	//? Marshal the asset
	assetJSON, err := json.Marshal(asset)
	if err != nil {
		return nil, err
	}
	err = ctx.GetStub().PutState(fmt.Sprintf("%v", asset.Id), assetJSON)
	if err != nil {
		return nil, err
	}
	return &asset, nil
}

/*
? Function to read a asset
*/
func (s *SmartContract) ReadAsset(ctx contractapi.TransactionContextInterface, id uint32) (*Asset, error) {
	res, err := ctx.GetStub().GetState(fmt.Sprintf("%v", id))
	if err != nil {
		return nil, fmt.Errorf("Something went wrong when retrieving the state %v", err)
	}
	result := &Asset{}
	err = json.Unmarshal(res, result)
	if err != nil {
		return nil, fmt.Errorf("Something went wrong when retrieving the state %v", err)
	}
	return result, nil
}

/*
? Check if it exists
*/
func (s *SmartContract) exists(ctx contractapi.TransactionContextInterface, id uint32) bool {
	value, err := ctx.GetStub().GetState(fmt.Sprintf("%v", id))
	if err != nil {
		return true
	}
	if len(value) == 0 {
		return false
	} else {
		return true
	}
}
