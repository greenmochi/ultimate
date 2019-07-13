package logger 

import (
	"os"
	"testing"
)

func TestultimateLogger(t *testing.T) {
	logger.Info("An info message")
	logger.Infoln("An info message with new line")
	logger.Infof("An info message with format number=%d and string=%s", 10, "foobar")
	logger.Warning("A warning message")
	logger.Warningln("A warning message with new line")
	logger.Warningf("A warning message with format x=%d s=%s\n", 5, "foobar")
	logger.Error("An error message")
	logger.Errorln("An error message with new line")
	logger.Errorf("An error message with format x=%d s=%s\n", 10, "foobar")
	logger.Fatal("A fatal message")
	logger.Fatalln("A fatal message with new line")
	logger.Fatalf("A fatal message with format x=%d s=%s\n", 15, "foobar")
}

func TestConcurrentLogger(t *testing.T) {
	logger := NewultimateLogger(os.Stdout)

	signal1 := make(chan int)
	signal2 := make(chan int)

	fn1 := func() {
		for i := 0; i < 3; i++ {
			logger.Infof("fn1: message %d", i)
		}
		signal1 <- 1
	}
	fn2 := func() {
		for i := 0; i < 3; i++ {
			logger.Infof("fn2: message %d", i)
		}
		signal2 <- 2
	}

	go fn1()
	go fn2()

	<-signal1
	<-signal2
}
