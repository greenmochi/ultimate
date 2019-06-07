package torrent

import "testing"

func TestNewClient(t *testing.T) {
	client, err := NewClient()
	if err != nil {
		t.Error("Expected: no error making new client. Actual:", err)
	}
	if client == nil {
		t.Error("Expected: non-nil client. Actual: got nil client")
	}
	client.Close()
}

func TestAddMagnet(t *testing.T) {
	client, err := NewClient()
	if err != nil {
		t.Error("Expected: no error making new client. Actual:", err)
	}
	defer client.Close()

	magnet := "magnet:?xt=urn:btih:a04d55e6b1890695ce3e6c825e2cbe8f0a8930c4&dn=%5BHorribleSubs%5D%20Boku%20no%20Hero%20Academia%20-%2028%20%5B720p%5D.mkv&tr=http%3A%2F%2Fnyaa.tracker.wf%3A7777%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce" 
	if ok := client.AddMagnet(magnet); !ok {
		t.Error("unable to magnet")
	}
}