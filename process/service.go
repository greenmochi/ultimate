package process

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
	// Endpoint is the full URI (http://localhost:8000) where the service will be listening from
	Endpoint string
	// Fullpath is the fullpath (relative or absolute) to the binary
	FullPath string
}
