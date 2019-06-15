package process

import (
	"os/exec"
)

// Start TODO
func Start(binary string, cwd string, args []string) (*exec.Cmd, error) {
	cmd := &exec.Cmd{
		Path: binary,
		Dir:  cwd,
		Args: args,
	}
	if err := cmd.Start(); err != nil {
		return nil, err
	}
	return cmd, nil
}
