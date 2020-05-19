package main

import (
	"fmt"
	"net/http"
	"encoding/json"
	"io/ioutil"
	"os"
	"strings"
)

type Request struct {
	Sender string
	Argument string
	Content string
}

type Key struct {
	Sender string
	Public string
	Product string
}

type MessageHandler struct {}

var messages map[string] string = make(map[string] string)
var keys map[string] []Key = make(map[string] []Key)
var KeyReq map[string] string = make(map[string] string)

func main () {
	err := http.ListenAndServe(":" + os.Args[1], new(MessageHandler))

	if err != nil {
		fmt.Println("Couldn't listen on port", os.Args[1])
	}
}

func (h MessageHandler) ServeHTTP (w http.ResponseWriter, request *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	path := strings.Split(request.URL.Path[1:], "/")
	fmt.Println(path)

	switch request.Method {
	//gets the messages of a user
	case "GET":
		fmt.Println("Retrieving")
		if !Userexists(path[0]) { return }

		if len(path) == 1 {
			fmt.Fprintln(w, messages[path[0]])
			return
		}

		switch path[1] {
		case "keys":
			buffer, err := json.Marshal(keys[path[0]])
			if err != nil {
				fmt.Println("Couldn't convert key")
			}

			w.Write(buffer)

		case "requests":
			fmt.Fprintln(w, KeyReq[path[0]])
		}

	case "POST":

		buffer, err := ioutil.ReadAll(request.Body)
		fmt.Println(string(buffer))

		//get request data from json
		var ree Request
		err = json.Unmarshal(buffer, &ree)

		if err != nil {
			fmt.Fprintln(w, "Json data wasn't in the right format")
		}

		if path[0] == "" {
			fmt.Println("Creating User")
			if Userexists(ree.Argument) { return }
			messages[ree.Argument] = ""
			keys[ree.Argument] = make([]Key, 1, 5)
		}

		if !Userexists(path[0]) { return }

		if len(path) == 1 {
			fmt.Println("Sending message")
			messages[path[0]] += ree.Content + "\n.\n"
			return
		}

		switch path[1] {
		case "keys":
			key := Key {
				Sender: ree.Sender,
				Public: ree.Argument,
				Product: ree.Content,
			}

			keys[path[0]] = append(keys[path[0]], key)

		case "requests":
			KeyReq[path[0]] = ree.Argument
		default:
			return
		}

	default:
		fmt.Fprintln(w, "Server doesn't support this request")
	}
}

func Userexists(user string) bool {
	_, ok := messages[user]
	return ok
}
