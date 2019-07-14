package gateway

import (
	"context"
	"fmt"
	"net/http"
	"strings"

	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	log "github.com/sirupsen/logrus"
	"google.golang.org/grpc"

	"github.com/greenmochi/ultimate/services/gateway/proto/nyaa"
	"github.com/greenmochi/ultimate/services/gateway/proto/torrent"
)

// Serve TODO
func Serve(port int, endpoints map[string]string) error {
	ctx := context.Background()
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	mux := runtime.NewServeMux()
	opts := []grpc.DialOption{grpc.WithInsecure()}

	// Register Nyaa service
	if err := nyaa.RegisterNyaaHandlerFromEndpoint(ctx, mux, endpoints["nyaa"], opts); err != nil {
		return err
	}
	// Register torrent service
	if err := torrent.RegisterTorrentHandlerFromEndpoint(ctx, mux, endpoints["torrent"], opts); err != nil {
		return err
	}

	s := &http.Server{
		Addr:    fmt.Sprintf(":%d", port),
		Handler: allowCORS(mux),
	}

	for name, endpoint := range endpoints {
		log.WithFields(log.Fields{
			"endpoint": endpoint,
		}).Infof("Listening to %s service on %s", name, endpoint)
	}
	return s.ListenAndServe()
}

func allowCORS(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if origin := r.Header.Get("Origin"); origin == "http://localhost:3000" {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			if r.Method == "OPTIONS" && r.Header.Get("Access-Control-Request-Method") != "" {
				preflightHandler(w, r)
				return
			}
		}
		h.ServeHTTP(w, r)
	})
}

func preflightHandler(w http.ResponseWriter, r *http.Request) {
	headers := []string{"Content-Type", "Accept"}
	w.Header().Set("Access-Control-Allow-Headers", strings.Join(headers, ","))
	methods := []string{"GET", "HEAD", "POST", "PUT", "DELETE"}
	w.Header().Set("Access-Control-Allow-Methods", strings.Join(methods, ","))
	// logger.Infof("preflight request for %s", r.URL.Path)
}
