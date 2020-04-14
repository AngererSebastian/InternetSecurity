function isPrime (n) {
	if (n < 5 || !(n % 2) || !(n % 3)){
		return false;
	}

	const limit = Math.sqrt(n);

	for (let i = 5; i < limit; i += 6){
		
		if(!(n % i) || !(n % (i + 2))) return false;
	}

	return true;
}

function getBigPrime () {
	let prime;

	do {
		prime = Math.floor(Math.random() * 10000 + 1000);
	} while (!isPrime(prime));

	return prime;
}

function gcd (a, b) {
	if ( a < b) { //swaps if b is bigger
		let tmp = a;
		a = b;
		b = tmp;
	}

	while (b) {
		let tmp = a;
		a = b;
		b = tmp % b;
	}

	return a;
}

function modInv (a, m) {

	for (let x = 1; x < m; x++)
	{
		if ( (a*x)% m == 1) return x;
	}
}
function generateKeyPair (q = getBigPrime(), p = getBigPrime()) {

	let lock;
	let key;

	let phi = (q - 1)*(p - 1);
	let product = p * q;

	for(let i = 2; i < phi; i++){
		if (gcd(phi, i) == 1 && gcd(product, i) == 1) lock = i;
	}

	key = modInv(lock, phi);

	return [key, lock, product];
}
