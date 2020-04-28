package main

import (
	"fmt"
	"net/http"
	"encoding/json"
	"io/ioutil"
	//"os"
)

type Request struct {
	Command string
	Argument string
	Content string
}

var messages map[string] string = make(map[string] string)

func main () {
	http.HandleFunc("/", HandleRequest)
}

func HandleRequest (w http.ResponseWriter, request *http.Request) {
	switch request.Method {
	case "GET":
		name := request.URL.RequestURI()[1:]
		fmt.Fprintln(w, messages[name])
	case "POST":
		buffer, err := ioutil.ReadAll(request.Body)

		var ree Request
		err = json.Unmarshal(buffer, ree)

		if err != nil {
			fmt.Fprintln(w, "Json data wasn't in the right format")
		}

	default:
		fmt.Fprintln(w, "Server doesn't support this request")
	}
}

func HandleCommands (request Request, w http.ResponseWriter) {
	switch request.Command {
	case "USER":
		messages[request.Argument] = ""
	case "SEND":
		messages[request.Argument] = request.Content
	}
}
