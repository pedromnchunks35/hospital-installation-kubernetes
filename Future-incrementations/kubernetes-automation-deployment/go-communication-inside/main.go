package main

import (
	"context"
	"fmt"
	"time"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
)

func main() {
	//? Creating a config to access the auth jwt tokens
	config, err := rest.InClusterConfig()
	if err != nil {
		fmt.Errorf("Something went wrong with the config %v", err)
	}
	//? Create a client
	clientSet, err := kubernetes.NewForConfig(config)
	if err != nil {
		fmt.Errorf("Something went wrong creating the client %v", err)
	}
	for {
		//? Getting the services from default namespace
		services, err := clientSet.CoreV1().Services("").List(context.TODO(), metav1.ListOptions{})
		if err != nil {
			fmt.Errorf("Error getting the services %v", err)
		}
		fmt.Println(services)
		time.Sleep(10 * time.Second)
	}
}
