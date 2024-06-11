package connection

import (
	u "basic/utils"
	"crypto/x509"
	"time"

	"github.com/hyperledger/fabric-gateway/pkg/client"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
)

func newGrpcConnection(tlsCertPath string, peerAddress string) (*grpc.ClientConn, error) {
	certificate, err := u.LoadCertificate(tlsCertPath)
	if err != nil {
		return nil, err
	}
	certPool := x509.NewCertPool()
	certPool.AddCert(certificate)
	cred := credentials.NewClientTLSFromCert(
		certPool,
		"",
	)
	conn, err := grpc.Dial(peerAddress, grpc.WithTransportCredentials(cred))
	if err != nil {
		return nil, err
	}
	return conn, nil
}

func CreateConnection(tlsCertPath string, peerAddress string, certPath string, mspID string, keystorePath string) (*client.Gateway, error) {
	grpcClient, err := newGrpcConnection(tlsCertPath, peerAddress)
	if err != nil {
		return nil, err
	}
	id, err := u.NewIdentity(certPath, mspID)
	if err != nil {
		return nil, err
	}
	sign, err := u.NewSign(keystorePath)
	if err != nil {
		return nil, err
	}
	gw, err := client.Connect(
		id,
		client.WithClientConnection(grpcClient),
		client.WithSign(sign),
		client.WithEvaluateTimeout(5*time.Second),
		client.WithEndorseTimeout(15*time.Second),
		client.WithSubmitTimeout(5*time.Second),
		client.WithCommitStatusTimeout(1*time.Minute),
	)
	if err != nil {
		return nil, err
	}
	return gw, nil
}
