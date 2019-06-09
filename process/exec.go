package process

import (
	"fmt"
	"os/exec"
)

// Start TODO
func Start(binary string, port int) (*exec.Cmd, error) {
	portFlag := fmt.Sprintf("--port=%d", port)
	cmd := exec.Command(binary, portFlag)
	if err := cmd.Start(); err != nil {
		return nil, err
	}
	return cmd, nil
}
