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
	Argument2 string
	Content []int
}

type Key struct {
	Public string
	Product string
}

type MessageHandler struct {}

// global variables
var messages map[string] []int = make(map[string] []int)
var keys map[string] Key = make(map[string] Key)

func main () {
	err := http.ListenAndServe(":" + os.Args[1], new(MessageHandler))

	if err != nil {
		fmt.Println("Couldn't listen on port", os.Args[1])
	}
}

func (h MessageHandler) ServeHTTP (w http.ResponseWriter, request *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	path := strings.Split(request.URL.Path[1:], "/")

	switch request.Method {
	//gets the messages of a user
	case "GET":
		if !Userexists(path[0]) { return }

		if len(path) == 1 {
			tmp, err := json.Marshal(messages[path[0]])
			if err != nil {
				fmt.Println("Couldn't convert message")
			}

			w.Write(tmp)
		} else if path[1] == "keys" {

			buffer, err := json.Marshal(keys[path[0]])
			if err != nil {
				fmt.Println("Couldn't convert key")
			}

			fmt.Println("retrieve Keys: ", string(buffer))
			w.Write(buffer)
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
			//if Userexists(ree.Sender) { return }
			messages[ree.Sender] = make([]int, 1, 1)
			keys[ree.Sender] = Key {
				Public: ree.Argument,
				Product: ree.Argument2,
			}
			fmt.Println(keys[ree.Sender])
		}

		if !Userexists(path[0]) { return }

		fmt.Println(path, len(path))
		if len(path) == 1 {
			fmt.Println("Sending message")
			messages[path[0]] = ree.Content
			fmt.Println(messages[path[0]])
		}

		/*	key := Key {
				Public: ree.Argument,
				Product: ree.Argument2,
			}

			keys[path[0]][ree.Sender] = key
			fmt.Println(keys[path[0]][ree.Sender])
		}*/

	default:
		fmt.Fprintln(w, "Server doesn't support this request")
	}
}

func Userexists(user string) bool {
	_, ok := messages[user]
	return ok
}
