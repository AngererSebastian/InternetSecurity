let user;
let ip;
let keys;

function createUser() {
	ip = document.getElementById("Iip").value;
	user = document.getElementById("Iuser").value;

	let request = new XMLHttpRequest();
	request.open("POST",  `http://${ip}`, true);

	request.send(JSON.stringify({
		"Argument" : user,
		"Content" : "",
	}));

	keys = generateKeyPair();
	toggleDisplay('login');
	toggleDisplay('messenger');
}

function sendMessage() {
	let dest = document.getElementById("ITo").value;
	let message = document.getElementById("IMessage").value;

	let request = new XMLHttpRequest();
	request.open("POST", `http://${ip}/${user}`, true);

	request.send(JSON.stringify({
		"Argument" : "",
		"Content" : message,
	}));
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
		document.getElementById("Reciever").innerHTML = this.response;
		console.log(this.response);
	}

	request.send();

}

function retrieveKeys() {
	let request = new XMLHttpRequest();
	request.open("GET", `http://${ip}/${user}/keys`, true);

	request.onload = function () {
		document.getElementById("Retrieve").innerHTML = this.response;
		console.log(this.response);
	}

	request.send();
}

function toggleDisplay(id) {
	document.getElementById(id).classList.toggle('hidden');
}
