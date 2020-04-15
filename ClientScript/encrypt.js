// keypair (private and the product)
function decrypt (key, message)
{
	return encrypt (key, message);
}

// keypair (public, product)
function encrypt (key, message)
{
	return Math.pow(message, key[0]) % key[1];	
}
