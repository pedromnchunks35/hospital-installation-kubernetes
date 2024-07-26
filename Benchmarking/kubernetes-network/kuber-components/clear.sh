#!/bin/bash

# DELETE EVERYTHING / STOP EVERYTHING
for file in ./*/*.yaml; do
    sleep 2
    kubectl delete -f "$file" 
done
# INIT THE COUCHS FIRSTLY
for file in ./org*-couch-*/*.yaml; do
    sleep 2
    kubectl apply -f "$file"
done
sleep 5
# INIT THE PEERS
for file in ./org*-p*/*.yaml; do
    sleep 2
    kubectl apply -f "$file"
done
sleep 5
# INIT ORDERERS
for file in ./org*-or*/*.yaml;do
    sleep 2
    kubectl apply -f "$file"
done
sleep 5
# INIT THE REST
kubectl apply -f ./ca/.
kubectl apply -f ./tls-ca/.
kubectl apply -f ./cadvisor/.
kubectl apply -f ./multi-client/.
kubectl apply -f ./basic-chaincode/.
kubectl apply -f ./load-balancer-all-peers-service/.