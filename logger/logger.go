package logger

import (
	"fmt"
	"io"
	"log"
)

// KabedonLogger wraps log.Logger
type KabedonLogger struct {
	logger *log.Logger
}

// NewKabedonLogger creates a logger
func NewKabedonLogger(out io.Writer) *KabedonLogger {
	return &KabedonLogger{
		logger: log.New(out, "", log.Ldate|log.Ltime|log.Lshortfile),
	}
}

// Info neutral log level output
func (kb *KabedonLogger) Info(args ...interface{}) {
	kb.logger.SetPrefix("[INFO] ")
	kb.logger.Output(2, fmt.Sprint(args...))
}

// Infoln output with new line
func (kb *KabedonLogger) Infoln(args ...interface{}) {
	kb.logger.SetPrefix("[INFO] ")
	kb.logger.Output(2, fmt.Sprintln(args...))
}

// Infof print formatted output
func (kb *KabedonLogger) Infof(format string, args ...interface{}) {
	kb.logger.SetPrefix("[INFO] ")
	kb.logger.Output(2, fmt.Sprintf(format, args...))
}

// Warning warning log level output
func (kb *KabedonLogger) Warning(args ...interface{}) {
	kb.logger.SetPrefix("[WARNING] ")
	kb.logger.Output(2, fmt.Sprint(args...))
}

// Warningln output with new line
func (kb *KabedonLogger) Warningln(args ...interface{}) {
	kb.logger.SetPrefix("[WARNING] ")
	kb.logger.Output(2, fmt.Sprintln(args...))
}

// Warningf print formatted output
func (kb *KabedonLogger) Warningf(format string, args ...interface{}) {
	kb.logger.SetPrefix("[WARNING] ")
	kb.logger.Output(2, fmt.Sprintf(format, args...))
}

// Error error log level output
func (kb *KabedonLogger) Error(args ...interface{}) {
	kb.logger.SetPrefix("[ERROR] ")
	kb.logger.Output(2, fmt.Sprint(args...))
}

// Errorln output with new line
func (kb *KabedonLogger) Errorln(args ...interface{}) {
	kb.logger.SetPrefix("[ERROR] ")
	kb.logger.Output(2, fmt.Sprintln(args...))
}

// Errorf print formatted output
func (kb *KabedonLogger) Errorf(format string, args ...interface{}) {
	kb.logger.SetPrefix("[ERROR] ")
	kb.logger.Output(2, fmt.Sprintf(format, args...))
}

// Fatal fatal log level output
func (kb *KabedonLogger) Fatal(args ...interface{}) {
	kb.logger.SetPrefix("[FATAL] ")
	kb.logger.Output(2, fmt.Sprint(args...))
}

// Fatalln output with new line
func (kb *KabedonLogger) Fatalln(args ...interface{}) {
	kb.logger.SetPrefix("[FATAL] ")
	kb.logger.Output(2, fmt.Sprintln(args...))
}

// Fatalf print formatted output
func (kb *KabedonLogger) Fatalf(format string, args ...interface{}) {
	kb.logger.SetPrefix("[ERROR] ")
	kb.logger.Output(2, fmt.Sprintf(format, args...))
}
