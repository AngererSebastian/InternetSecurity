package main

import (
	"fmt"
	"net/http"
	"encoding/json"
	"io/ioutil"
	"os"
	"strings"
)

/*
* a struct which can hold all variables a valid json
* request to this server can recognise
*/
type Request struct {
	Sender string
	Argument string
	Argument2 string
	Content []int
}

// layout how a key is stored for an user
type Key struct {
	Public string
	Product string
}

// empty struct, so it can be used 
// for the message handler method
type MessageHandler struct {}

// stores values for every user
//the latest message a user recieved with an int array because the messages are stored as ciphers
var messages map[string] []int = make(map[string] []int)
var keys map[string] Key = make(map[string] Key) //the key the user has

func main () {
	if len(os.Args) != 2 {
		fmt.Println("Usage:\n\thttpServer <port>")
		return
	}
	/*
	* starts the server and serves all request through the messagehandler
	* which has a mehtod ServeHTTP with an Writer and the request data
	*/
	err := http.ListenAndServe(":" + os.Args[1], new(MessageHandler))

	//it couldn't listen on the port
	if err != nil {
		fmt.Println("Couldn't listen on port", os.Args[1])
	}
}

func (h MessageHandler) ServeHTTP (w http.ResponseWriter, request *http.Request) {
	//needs to be set to allow connections
	w.Header().Set("Access-Control-Allow-Origin", "*")

	/*
	* gets the path that has been requested
	* it takes the slice [1:] out of the original
	* variable, because this variable is stored as
	* "/path" and we don't need the '/'
	*
	* it also splits the path with '/' as an seperator
	* to make it more convinient
	*/
	path := strings.Split(request.URL.Path[1:], "/")

	//switches through the different kinds of http requests (GET POST)
	switch request.Method {
	case "GET":
		/*if the user (the first element of the path) doesn't exist
		we don't need to do anything else*/
		if !Userexists(path[0]) { return }

		//if there is only one split, the program just needs to retrieve messages
		if len(path) == 1 {

			//formats the int array of messages to a json object
			tmp, err := json.Marshal(messages[path[0]])
			if err != nil {
				fmt.Println("Couldn't convert message")
			}

			//writes the message to the stream
			w.Write(tmp)

		//if the second part is keys, it should retrieve the public keys of the user
		} else if path[1] == "keys" {
			//converts the key struct to an json object
			buffer, err := json.Marshal(keys[path[0]])
			if err != nil {
				fmt.Println("Couldn't convert key")
			}

			//writes the keys to the stream
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

		if path[0] == "" { // if no path is given a new user is created
			/* how the json requst is processed:
			* Sender is the new User
			* Argument is the Public Key 1
			* Argument2 is the PUblic Key 2 ( produkt)
			*/

			fmt.Println("Creating User")
			//if Userexists(ree.Sender) { return }
			//creates an dummy int array
			messages[ree.Sender] = make([]int, 1, 1)

			//and inits the keys to make interacting with the account possible
			keys[ree.Sender] = Key {
				Public: ree.Argument,
				Product: ree.Argument2,
			}
			fmt.Println(keys[ree.Sender])
		}
		if Userexists(path[0]) {
			fmt.Println("Sending message")
			messages[path[0]] = ree.Content //stores the message inside the buffer
			fmt.Println(messages[path[0]])
		}

	//the server doesn't support Patch or something else
	default:
		fmt.Fprintln(w, "Server doesn't support this request")
	}
}

func Userexists(user string) bool {
	_, ok := messages[user] //if it can retrieve something, the user exists
	return ok
}
