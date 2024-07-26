#!/bin/bash
kubectl delete -f ./db-blockexplorer
kubectl apply -f ./db-blockexplorer
