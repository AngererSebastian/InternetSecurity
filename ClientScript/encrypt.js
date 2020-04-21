// keypair (private and the product)
function decrypt (private, product, message)
{
	return encrypt (private, product, message);
}

// keypair (public, product)
function encrypt (public, product, message)
{
	return bigInt(message).modPow(public, product);	
}
function getContent(){
   var x = document.getElementById("test").value;// test is the ID of a text area
   console.log(x);
   convert(x);
}
function convert(x){
   var out;
   console.log(x);
   console.log(x.length);
   for(var i = 0; i< x.length; i++){
      console.log(x[i].charCodeAt(0)); // 0 is the index of the string
   }
}
