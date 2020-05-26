let user;
let ip;
let myKeys;
let otherKeys;

let cipher;

function createUser() {
	ip = document.getElementById("Iip").value;
	user = document.getElementById("Iuser").value;
	myKeys = generateKeyPair();

	let request = new XMLHttpRequest();
	request.open("POST",  `http://${ip}`, true);

	request.send(JSON.stringify({
		"Sender" : user,
		"Argument": myKeys.lock,
		"Argument2": myKeys.product,
	}));

	toggleDisplay('login');
	toggleDisplay('messenger');

	document.getElementById('oKeys').innerHTML = JSON.stringify(myKeys);
}

function sendMessage() {
	let dest = document.getElementById("ITo").value;
	let message = document.getElementById("IMessage").value;
	getKey(dest)

	cipher = encryptString(message, otherKeys.Product, otherKeys.Public)
	reportSendMessage(message, cipher);
	let request = new XMLHttpRequest();
	request.open("POST", `http://${ip}/${dest}`, true);
		cipher = BigIntToIntArray(cipher);

	request.send(JSON.stringify({
		"Argument" : "",
		"Content" : cipher,
	}));
}

//sends the information to the user explaination
function reportSendMessage(message, cipher) {
	cipher = byteArrayToString(cipher);
	document.getElementById('oMessage').innerHTML = message;
	document.getElementById('oCipher').innerHTML = cipher;
}

function getKey(from) {

	let request = new XMLHttpRequest();
	request.open("GET", `http://${ip}/${from}/keys`, false);

	request.onload = function () {
		otherKeys = JSON.parse(this.response);
	}
	request.send();
}

function switchMode() {
	toggleDisplay('messenger');
	toggleDisplay('reciever');

	if(!document.getElementById('reciever').classList.contains('hidden')) {
		retrieveMessages();
	}
}

function retrieveMessages() {
	let request = new XMLHttpRequest();
	request.open("GET", `http://${ip}/${user}`, true);

	request.onload = function () {
		let cipher = JSON.parse(this.response);
		console.log(cipher);
		message = decryptString ( cipher, myKeys.product, myKeys.key);
		console.log(message);
		document.getElementById("Reciever").innerHTML = message;
	}

	request.send();

}

function toggleDisplay(id) {
	document.getElementById(id).classList.toggle('hidden');
}

function sleep(ms) {
	  return new Promise(resolve => setTimeout(resolve, ms));
}

function isUndefined (toCheck) {
	return typeof toCheck === 'undefined';
}
