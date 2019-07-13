package logger

import (
	"fmt"
	"log"
	"os"
)

const name = "ultimate-nyaa.log"

var file *os.File

var logger = newLogger()

func newLogger() *log.Logger {
	f, err := os.Create(name)
	if err != nil {
		log.Println("unable to create log file to write to. Writing to stderr instead.")
		return log.New(os.Stderr, "", log.Ldate|log.Ltime|log.Lshortfile)
	}
	file = f
	return log.New(file, "", log.Ldate|log.Ltime|log.Lshortfile)
}

// Close close file
func Close() {
	file.Close()
}

// Info writes message
func Info(args ...interface{}) {
	logger.SetPrefix("[INFO] ")
	logger.Output(2, fmt.Sprint(args...))
}

// Infoln writes messsage with new line
func Infoln(args ...interface{}) {
	logger.SetPrefix("[INFO] ")
	logger.Output(2, fmt.Sprintln(args...))
}

// Infof writes formatted message
func Infof(format string, args ...interface{}) {
	logger.SetPrefix("[INFO] ")
	logger.Output(2, fmt.Sprintf(format, args...))
}

// Warning writes warning message
func Warning(args ...interface{}) {
	logger.SetPrefix("[WARNING] ")
	logger.Output(2, fmt.Sprint(args...))
}

// Warningln writes warning message with new line
func Warningln(args ...interface{}) {
	logger.SetPrefix("[WARNING] ")
	logger.Output(2, fmt.Sprintln(args...))
}

// Warningf writes formatted warning message
func Warningf(format string, args ...interface{}) {
	logger.SetPrefix("[WARNING] ")
	logger.Output(2, fmt.Sprintf(format, args...))
}

// Error writes error message
func Error(args ...interface{}) {
	logger.SetPrefix("[ERROR] ")
	logger.Output(2, fmt.Sprint(args...))
}

// Errorln writes error message with new line
func Errorln(args ...interface{}) {
	logger.SetPrefix("[ERROR] ")
	logger.Output(2, fmt.Sprintln(args...))
}

// Errorf writes formatted error message
func Errorf(format string, args ...interface{}) {
	logger.SetPrefix("[ERROR] ")
	logger.Output(2, fmt.Sprintf(format, args...))
}

// Fatal writes fatal message
func Fatal(args ...interface{}) {
	logger.SetPrefix("[FATAL] ")
	logger.Output(2, fmt.Sprint(args...))
}

// Fatalln writes fatal message with new line
func Fatalln(args ...interface{}) {
	logger.SetPrefix("[FATAL] ")
	logger.Output(2, fmt.Sprintln(args...))
}

// Fatalf writes formatted fatal message
func Fatalf(format string, args ...interface{}) {
	logger.SetPrefix("[FATAL] ")
	logger.Output(2, fmt.Sprintf(format, args...))
}
