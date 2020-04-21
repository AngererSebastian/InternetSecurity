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
   var x = document.getElementById("test").value;
   console.log(x);
   convert(x);
}
function convert(x){
   var out = [];
   console.log(x);
   for(var i = 0; i< x.length; i++){
      out.push(x.charCodeAt(i));
   }
   for(var i = 0; i< x.length; i++){
      console.log(out[i]);
   }
}}
