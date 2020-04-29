package main

import (
	"fmt"
	"net/http"
	"encoding/json"
	"io/ioutil"
	"os"
)

type Request struct {
	Command string
	Argument string
	Content string
}

var messages map[string] string = make(map[string] string)

func main () {
	http.HandleFunc("/", HandleRequest)

	err := http.ListenAndServe(":" + os.Args[1], nil)

	if err != nil {
		fmt.Println("Couldn't listen on port", os.Args[1])
	}
}

func HandleRequest (w http.ResponseWriter, request *http.Request) {
	path := request.URL.RequestURI()[1:]

	switch request.Method {
	case "GET":
		if !Userexists(path) { return }
		fmt.Fprintln(w, messages[path])
	case "POST":
		buffer, err := ioutil.ReadAll(request.Body)

		var ree Request
		err = json.Unmarshal(buffer, ree)

		if err != nil {
			fmt.Fprintln(w, "Json data wasn't in the right format")
		}

		if path == "" {
			messages[ree.Argument] = ""
		} else {

			if !Userexists(path) { return }
			messages[path] = ree.Content
		}

	default:
		fmt.Fprintln(w, "Server doesn't support this request")
	}
}

func Userexists(user string) bool {
	_, ok := messages[user]
	return ok
}
