package process

import (
	"context"
	"fmt"
	"time"

	"google.golang.org/grpc"

	"github.com/greenmochi/kabedon-kokoro/logger"
	"github.com/greenmochi/kabedon-kokoro/proto/nyaa"
)

// Service holds the necessary information to run a process
type Service struct {
	// Name is the service name
	Name string
	// Binary the executable to run
	Binary string
	// Dir current working directory to run binary
	Dir string
	// Args are the arguments to pass to the binary
	Args []string
	// Port is the port the service is listening to
	Port int
	// Endpoint is the full URI (localhost:8000) where the service will be listening from
	Endpoint string
	// Fullpath is the fullpath (relative or absolute) to the binary
	FullPath string
}

// Shutdown sends shutdown request to respective gRPC service
func (s *Service) Shutdown() error {
	conn, err := grpc.Dial(s.Endpoint, grpc.WithInsecure())
	if err != nil {
		logger.Fatalf("unable to dial %s", s.Endpoint)
	}
	defer conn.Close()

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

	switch s.Name {
	case "kabedon-nyaa":
		c := nyaa.NewNyaaClient(conn)
		message := nyaa.ShutdownRequest{}
		_, err = c.Shutdown(ctx, &message)
	default:
		err = fmt.Errorf("unable to determine service to send shutdown request to: service name is %s", s.Name)
	}

	return err
}
