# Project Proposal
---
# Information
- Name of the Organization: HTBLA LEONDING/AA

- Project Title: Encryption

- Timeframe: until the summer break

- By:
  - Angerer Sebastian
  - Detta Alessandro

# Summary
## Website
Our website is for the normal civilian who wants to inform himself about the dangers of the internet. Our website will explain the dangers on the internet in a easy and simple way and give some advices on how to protect against them. We are also going to give some information about malicious software like a virus or a worm and about different kinds of scemes. We also want to dedicate a section of our website to encryption.

## Web application
Our main goal with this application is to be a basic and simple intro into criptography for not so tech savy people, because everybody else shouldn't get serios advice from this software, because we aren't too familiar with these concepts ourselves

Of course there a more minor goals to achieve this end goal described above. Below you see all the goals we want to implement right now so that applicaton can fulfill its purpose

### Clientside
- generate private and public keys locally
- encrypt the text
- decrypt recieved text
- establish a "connection" to another user through the server
- share the public key to a server ( We want to make the server adjustable so anybody could host their own)
- get the keys of a certain user from the server
- recieve the civertexts from the server

### Serverside
The server will just be a bridge to recieve a package from one client and send it to another. Because this web-application isn't made for security, but for visualition/education, it should be fine to let everyone grab every message.
The way we can see that our application is run, is only in a private net so there shouldn't be any major problems with our approach.

We want to write the server in go and it should have an easy interface like this:
```sh
	#gets all messages of a certain user
	GET "http://<ip:port>/<username to retrieve messages>/"

	# gets the public key of the user
	GET "http://<ip:port>/<username>/keys"

	# writes an message to the user
	# the content is stored inside an int array, because it is easier to process
	# and the messages will probalby get encrypted
	POST "http://<ip:port>/<user>" 
	{ "Argument":"", "Content": [message as int array]}

	#creates a new user under the sender name
	POST "http://<ip:port>/" 
	# Argument 1 & 2 hold the public key for the new user
	{ "Sender":"<username>", "Argument": "<public1>", "Argument": "public2"}
```
We are thinking if we want to discard the json thing because, we are using only one string at a given time, but time will tell

# Problem
The problem is there aren't many interactiv mediums where a beginner could learn a thing or two about cryptography, so we want to make an website where the user can go through the process of key generation and can also send a package to one of his friends, this package will be secured and the involved persons should also learn how a basic encryption algorithm works. *WE DON'T TRY TO MAKE AN SECURE PLATFORM.*

# Methodology
## Website
### General goals
- intuitive
- able to be accesed on all kinds devices
- easy to navigate
- modern design 

The content of the website will be written in html and the page will be designed with CSS. The rest will be in JavaScript or TypeScript. We want to structure the website in different pages so the user can find the wanted content easily. We also are going to have a navigation bar and on the front page there is going to be a short overview about all of the informations. The content will be written in a way that also normal people can understand it.

## Web application
### Client
For the client side we will use the bigInteger library from [peterolson](https://github.com/peterolson/BigInteger.js) to store the cipher and the keys. This library is quite useful because it already has an modInv funktion which would be "complicated" to implement ourselves. To convert a message to the cipher we convert the message(string) to a byte array (*only works with ASCII*) and encrypt every single integer, which is not very secure but the goal of this project is not to make an secure plattform, because there will be many better alternatives for that, but to make an easy to understand introduction.

Our little scripts can be easily accessed through some simple function calls:
```javascript
	/*
	* arr[0] privateKey
	* arr[1] publicKey
	* arr[2] product
	*/
	keypair = generateKeyPair()

	//encrypt and decrypt a string
	let cipher = encryptString(message, product, publicKey)
	let message = decrypt(cipher, product, privateKey)
```
For conversations with the server we just use old XmlHTTPRequest, because they are already provided

### Server
We will make a simple http server written in go, you can make a user with a POST request on */* and the user name stands in the *Arguments* field. To send a user a specific message it is also done with a POST request but this on on */<User>* and the message itself is inside the *Content* field. Finally to read a message you just need to make a GET request on the wished user.
Internally all the users and messages are saved inside a map (`map[string] string`) this allows for quick and easy access.
We use the provided [net/http](https://golang.org/pkg/net/http/) for the http server, because javascript wouldn't allow us to make direct TCP connections.

# Tasks

- Encrypt and Decrypt Files 
- Set up the server 
- get the contents of a file (don't know if this will work out)
- send encrypted files 
- Polish our Website with CSS
- make a coherrent colour scheme
- Add a few more pages of information

# Risks and Costs

Since this is a school project we have no costs

We could have some problems when we work on the web application since we have never done something like this, but i think we can solve them with the help of our teachers and the internet.

# Conclusion
Our goal is to make a understandable and informative website and include a text transfer application. We have no risks that could danger this project. I think we could manage this tasks and there might be some now concepts we haven't encountered before. There will also be more stuff to learn on the way.
