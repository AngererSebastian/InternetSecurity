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
We are trying to have somebody encrypt a message with the public key of the other and send this pack of data over our server to the other client. In the beginning of this transaction the recieving end needs to sign an account up or gets an id when he says he wants to recieve data. The other party tries to "connect" to the recieving end, he then generates a public and private key, where he only sends the public key back to the sender, which then can encrypt their data and safely send it back over.
Our goal with this project is to learn simple security precautions and server side operations.

# Problem
We want to make the dangers that we are going to describe easy to understand so that not only a computer specialist can understand.

# Methodology
## Website
### General goals
- intuitive
- able to be accesed on all kinds devices
- easy to navigate
- modern design 

The content of the website will be written in html and the page will be designed with CSS. The rest will be in JavaScript or TypeScript. We want to structure the website in different pages so the user can find the wanted content easily. We also are going to have a navigation bar and on the front page there is going to be a short overview about all of the informations. The content will be written in a way that also normal people can understand it.

## Web application
When the reciever agrees to get an encrypted package, he generates the key pair and looks for a certain file on the server, which will create a file for the communication with the recieving end. When somebody wishes to send to this id/username he will recieve the public key and then encrypt the document he wants to transfer and send it over our server with the same proceedcur again.

The server itself will be implemented with an queue of operation(FIFO) which will be all run. When some Computer sends a request it will be added at the end of the list and at the first possible moment the server will execude the next command. This kind of System could run quite slow on more intense traffic but with this scenario the simplicity is on the winning end for us.

## Tasks

- Encrypt and Decrypt Files ( 1. Week)
- Set up the server ( 2 - 3 Weeks)
- send encrypted files ( 4 - 5 Weeks)
- Polish our Website with CSS
- Add a few more pages of information

# Risks and Costs

Since this is a school project we have no costs

We could have some problems when we work on the web application since we have never done something like this, but i think we can solve them with the help of our teachers and the internet.

# Conclusion
Our goal is to make a understandable and informative website and include a file transfer application. We have no risks that could danger this project. I think we could manage this tasks and there might be some now concepts we haven't encountered before. 
