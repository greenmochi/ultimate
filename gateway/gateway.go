package gateway

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"golang.org/x/net/context"
	"google.golang.org/grpc"

	"github.com/greenmochi/ultimate-heart/proto/nyaa"
	"github.com/greenmochi/ultimate-heart/proto/ultimate_torrent"
)

// Run TODO
func Run(port int, endpoints map[string]string) error {
	ctx := context.Background()
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	mux := runtime.NewServeMux()
	opts := []grpc.DialOption{grpc.WithInsecure()}

	// Register Nyaa service
	if err := nyaa.RegisterNyaaHandlerFromEndpoint(ctx, mux, endpoints["nyaa"], opts); err != nil {
		return err
	}

	// Register ultimate-torrent service
	if err := ultimate_torrent.RegisterUltimateTorrentHandlerFromEndpoint(ctx, mux, endpoints["ultimate-torrent"], opts); err != nil {
		return err
	}

	s := &http.Server{
		Addr:    fmt.Sprintf(":%d", port),
		Handler: allowCORS(mux),
	}

	return s.ListenAndServe()
}

func allowCORS(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if origin := r.Header.Get("Origin"); origin == "http://localhost:3000" || origin == "file://" {
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
