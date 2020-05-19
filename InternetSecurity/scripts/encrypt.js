// keypair (private and the product)
function decrypt (private, product, message)
{
	return encrypt(private, product, message).valueOf();
}

// keypair (public, product)
function encrypt (public, product, message)
{
	return bigInt(message).modPow(public, product);	
}

function stringToByteArray (str) 
{
	let byteArr = [];

	for (let i = 0; i < str.length; i++) {
		byteArr.push(str.charCodeAt(i));
		if (byteArr[i] > 0x7F) return false;
	}

	return byteArr;
}

function byteArrayToString (byteArr) 
{
	let str = "";

	for (let i = 0; i < byteArr.length; i++) {
		str += String.fromCharCode(byteArr[i]);
	}

	return str;
}

function encryptString (str, product, public)
{
	let byteArr = stringToByteArray (str);
	let cipher = [];

	for(let i = 0; i < byteArr.length; i++) {
		cipher.push( encrypt(public, product, byteArr[i]));
	}

	console.log(byteArr);
	return cipher;
}

function decryptString (cipher, product, private) 
{
	let byteArr = [];

	for (let i = 0; i < cipher.length; i++) {
		byteArr.push(decrypt(private, product, cipher[i]));
	}

	console.log(byteArr);
	return byteArrayToString(byteArr);
}
