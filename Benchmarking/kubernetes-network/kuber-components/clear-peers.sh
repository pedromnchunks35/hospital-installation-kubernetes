# INIT THE PEERS
for file in ./org*-p*/*.yaml; do
    kubectl delete -f "$file"
done
for file in ./org*-p*/*.yaml; do
    kubectl apply -f "$file"
done