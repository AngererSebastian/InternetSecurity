# Information
- Name of the Organization: HTBLA LEONDING/AA

- Project Title: Encryption

- Timeframe: until the summer break

- By:
  - Angerer Sebastian
  - Detta Alessandro

# Summary

We are trying to have somebody encrypt a message with the public key of the other and send this pack of data over our server to the other client. In the beginning of this transaction the recieving end needs to sign an account up or gets an id when he says he wants to recieve data. The other party tries to "connect" to the recieving end, he then generates a public and private key, where he only sends the public key back to the sender, which then can encrypt their data and safely send it back over.
Our goal with this project is to learn simple security precautions and server side operations.

# Methodology

When the reciever agrees to get an encrypted package, he generates the key pair and looks for a certain file on the server, which will create a file for the communication with the recieving end. When somebody wishes to send to this id/username he will recieve the public key and then encrypt the document he wants to transfer and send it over our server with the same proceedcur again.

The server itself will be implemented with an queue of operation(FIFO) which will be all run. When some Computer sends a request it will be added at the end of the list and at the first possible moment the server will execude the next command. This kind of System could run quite slow on more intense traffic but with this scenario the simplicity is on the winning end for us.

## Tasks

- Encrypt and Decrypt Files ( 1. Week)
- Set up the server ( 2 - 3 Weeks)
- send encrypted files ( 4 - 5 Weeks)

# Risks and Costs

The only risk there is, is that it could be a huge time waste and we get a bad mark, but the only cost is again time

# Conclusion

I think we could manage this tasks and there might be some now concepts we haven't encountered before.
