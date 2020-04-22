function createAccount(){  
    response = 0;    
    var name = document.getElementById("fName").value;
    var pass = document.getElementById("fPassword").value;
    checkIfUsernameIsUsed(name);
}
function checkIfUsernameIsUsed(username)
{
    var response = 0;
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/accounts', true);
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            data.forEach(account => {
                if(account.name == username){
                response = 1;
            }  
        });
        } else {
            const errorMessage = document.createElement('marquee');
            errorMessage.textContent = `Gah, it's not working!`;                app.appendChild(errorMessage);
        }
        if(response == 0)
        {
            SendAccount();
        }
    }
    request.send();
}
function SendAccount()
{
    var name = document.getElementById("fName").value;
    var pass = document.getElementById("fPassword").value;
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    var theUrl = "http://localhost:3000/accounts";
    xmlhttp.open("POST", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({
    "name": name,
    "password": pass,}));
}function createAccount(){  
    response = 0;    
    var name = document.getElementById("fName").value;
    var pass = document.getElementById("fPassword").value;
    checkIfUsernameIsUsed(name);
}
function checkIfUsernameIsUsed(username)
{
    var response = 0;
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/accounts', true);
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            data.forEach(account => {
                if(account.name == username){
                response = 1;
            }  
        });
        } else {
            const errorMessage = document.createElement('marquee');
            errorMessage.textContent = `Gah, it's not working!`;                app.appendChild(errorMessage);
        }
        if(response == 0)
        {
            SendAccount();
        }
    }
    request.send();
}
function SendAccount()
{
    var name = document.getElementById("fName").value;
    var pass = document.getElementById("fPassword").value;
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    var theUrl = "http://localhost:3000/accounts";
    xmlhttp.open("POST", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({
    "name": name,
    "password": pass,}));
}
