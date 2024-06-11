package utils

import (
	"bytes"
	"crypto/x509"
	"encoding/json"
	"fmt"
	"os"
	"path"

	"github.com/hyperledger/fabric-gateway/pkg/identity"
)

// ? Function to load certificates
func LoadCertificate(path string) (*x509.Certificate, error) {
	certificatePem, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("error loading the certificate")
	}
	return identity.CertificateFromPEM(certificatePem)
}

// ? Function to create a identity
func NewIdentity(certPath string, mspID string) (*identity.X509Identity, error) {
	certificate, err := LoadCertificate(certPath)
	if err != nil {
		return nil, err
	}
	id, err := identity.NewX509Identity(
		mspID,
		certificate,
	)
	if err != nil {
		return nil, err
	}
	return id, nil
}

// ? Function to generate a digital signature
func NewSign(keystorePath string) (identity.Sign, error) {
	files, err := os.ReadDir(keystorePath)
	if err != nil {
		return nil, err
	}
	privateKeyFile, err := os.ReadFile(path.Join(keystorePath, files[0].Name()))
	if err != nil {
		return nil, err
	}
	privateKey, err := identity.PrivateKeyFromPEM(privateKeyFile)
	if err != nil {
		return nil, err
	}
	sign, err := identity.NewPrivateKeySign(privateKey)
	if err != nil {
		return nil, err
	}
	return sign, nil
}

// ? Function to format json
func FormatJSON(data []byte) (string, error) {
	var result bytes.Buffer
	if err := json.Indent(&result, data, "", " "); err != nil {
		return "", err
	}
	return result.String(), nil
}
