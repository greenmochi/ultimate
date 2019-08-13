package config

import (
	"fmt"
	"os"
	"path/filepath"
	"runtime"
)

// SaveDir is the name of the application data directory
const SaveDir = "ultimate-atlas"

//AppDataDir returns the users application directory
func AppDataDir() string {
	if appData := os.Getenv("APPDATA"); appData != "" {
		return appData
	}
	return ""
}

// UserSaveDir finds the application data directory to store program configuration files, etc.
func UserSaveDir() (string, error) {
	switch runtime.GOOS {
	case "windows":
		appData := os.Getenv("APPDATA")
		if appData != "" {
			return filepath.Join(appData, SaveDir), nil
		}
		home, err := os.UserHomeDir()
		if err != nil {
			return "", err
		}
		return filepath.Join(home, "AppData", SaveDir), nil
	case "linux":
	case "darwin":
	}
	return "", fmt.Errorf("Failed to find user save directory for %s", runtime.GOOS)
}

// CreateAppDir creates the appliation data directory from the path
func CreateAppDir(path string) error {
	return os.MkdirAll(path, 755)
}
