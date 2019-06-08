package process

import (
	"fmt"
	"os/exec"
)

// Run TODO
func Run(binary string, port int) error {
	portFlag := fmt.Sprintf("--port=%d", port)
	cmd := exec.Command(binary, portFlag)
	if err := cmd.Run(); err != nil {
		return err
	}
	return nil
}
