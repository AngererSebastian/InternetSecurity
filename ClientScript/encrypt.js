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
