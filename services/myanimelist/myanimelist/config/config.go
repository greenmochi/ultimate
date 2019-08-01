package config

import (
	"fmt"
	"os"
	"path/filepath"
	"runtime"
)

// AppDirName is the name of the application data directory
const AppDirName = "ultimate-myanimelist"

// UserAppData finds the application data directory to store program configuration files, etc.
func UserAppData() (string, error) {
	switch runtime.GOOS {
	case "windows":
		appData := os.Getenv("APPDATA")
		if appData != "" {
			return filepath.Join(appData, AppDirName), nil
		}
		home, err := os.UserHomeDir()
		if err != nil {
			return "", err
		}
		return filepath.Join(home, "AppData", AppDirName), nil
	case "linux":
	case "darwin":
	}
	return "", fmt.Errorf("Failed to find user application directory for %s", runtime.GOOS)
}

// CreateAppDir creates the appliation data directory from the path
func CreateAppDir(path string) error {
	return os.MkdirAll(path, 755)
}
