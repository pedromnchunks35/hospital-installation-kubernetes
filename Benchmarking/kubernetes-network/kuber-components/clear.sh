# DELETE EVERYTHING / STOP EVERYTHING
for file in ./*/*.yaml; do
    kubectl delete -f "$file" --force
done
# INIT THE COUCHS FIRSTLY
for file in ./org*-couch-*/*.yaml; do
    kubectl apply -f "$file"
done
# INIT THE PEERS
for file in ./org*-p*/*.yaml; do
    kubectl apply -f "$file"
done
# INIT ORDERERS
for file in ./org*-or*/*.yaml;do
    kubectl apply -f "$file"
done
# INIT THE REST
kubectl apply -f ./ca/.
kubectl apply -f ./tls-ca/.
kubectl apply -f ./cadvisor/.
kubectl apply -f ./multi-client/.
kubectl apply -f ./basic-chaincode/.
kubectl apply -f ./load-balancer/.
kubectl apply -f ./load-balancer-all-peers-service/.