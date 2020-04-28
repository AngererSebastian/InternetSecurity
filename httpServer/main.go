package main

import (
	"fmt"
	"net/http"
	//"net/url"
	//"encoding/json"
	//"io/ioutil"
	//"os"
)

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
	default:
		fmt.Fprintln(w, "Server doesn't support this request")
	}
}
