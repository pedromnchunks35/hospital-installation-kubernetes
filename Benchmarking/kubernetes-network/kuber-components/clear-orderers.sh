# INIT THE PEERS
for file in ./org*-or*/*.yaml; do
    kubectl delete -f "$file"
done
for file in ./org*-or*/*.yaml; do
    kubectl apply -f "$file"
done