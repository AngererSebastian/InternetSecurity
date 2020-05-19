function getBigPrime (minimum, maximum) {
	let prime;

	do {
		prime = bigInt.randBetween(minimum, maximum)
	} while (!prime.isPrime() /*!isPrime(prime)*/);

	return prime;
}

function generateKeyPair () {

	let lock;
	let key;

	let phi, product; 
	let q = getBigPrime(1, 255);
	let p = getBigPrime(1, 255);

	console.log("q " + q);
	console.log("p " + p);

	phi = q.subtract(1).times(p.subtract(1));
	product = q.times(p);

	do{
		lock = getBigPrime(1, phi);
	}while (!phi.mod(lock) && lock != q && lock != p);

	console.log("lock " + lock);

	key = lock.modInv(phi);

	return {
		key : key,
		lock : lock,
		product : product,
	};
}
