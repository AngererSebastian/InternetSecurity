package main

import (
	"fmt"
	"net/http"
	"encoding/json"
	"io/ioutil"
	"os"
)

type Request struct {
	Argument string
	Content string
}

type MessageHandler struct {}

var messages map[string] string = make(map[string] string)

func main () {
	err := http.ListenAndServe(":" + os.Args[1], new(MessageHandler))

	if err != nil {
		fmt.Println("Couldn't listen on port", os.Args[1])
	}
}

func (h MessageHandler) ServeHTTP (w http.ResponseWriter, request *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	path := request.URL.Path[1:]
	fmt.Println(path)

	switch request.Method {
	//gets the messages of a user
	case "GET":
		fmt.Println("Retrieving")
		if !Userexists(path) { return }
		fmt.Fprintln(w, messages[path])
		fmt.Println(messages[path])

	case "POST":

		buffer, err := ioutil.ReadAll(request.Body)
		fmt.Println(string(buffer))

		//get request data from json
		var ree Request
		err = json.Unmarshal(buffer, &ree)

		if err != nil {
			fmt.Fprintln(w, "Json data wasn't in the right format")
		}

		if path != "" {
			fmt.Println("Sending message")
			if !Userexists(path) { return }
			messages[path] += ree.Content + "\n.\n"
		} else {
			fmt.Println("Creating User")
			if Userexists(ree.Argument) { return }
			messages[ree.Argument] = ""
		}

	default:
		fmt.Fprintln(w, "Server doesn't support this request")
	}
}

func Userexists(user string) bool {
	_, ok := messages[user]
	return ok
}
