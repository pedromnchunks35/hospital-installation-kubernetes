# Delete existing resources
for file in ./kubernetes-components/*/*.yaml; do
    kubectl delete -f "$file" --force
done

# Apply the updated resources
for file in ./kubernetes-components/*/*.yaml; do
    kubectl apply -f "$file"
done