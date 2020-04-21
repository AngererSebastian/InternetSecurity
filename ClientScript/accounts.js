function createAccount(){
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    var theUrl = "http://localhost:3000/accounts";
        
    var name = document.getElementById("fName").value;
    var pass = document.getElementById("fPassword").value;
    if(checkIfUsernameIsUsed(name) == 0)
    {
        xmlhttp.open("POST", theUrl);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify({
        "name": name,
        "password": pass,}));
    }
}
function checkIfUsernameIsUsed(username)
{
    let response = 0;
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/accounts', true);
    request.onload = function () {

        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            data.forEach(account => {
                if(account.name == username){
                    console.log(1);
                    response = 1;
                }  
            });
            if(response != 1)
            {
                console.log(0);
                response = 0;
            }
        } else {
            const errorMessage = document.createElement('marquee');
            errorMessage.textContent = `Gah, it's not working!`;
            app.appendChild(errorMessage);
        }
    }
    request.send();
    return response;
    }
