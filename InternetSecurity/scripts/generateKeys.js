//the minimum value of an keycomponent to ensure ascii can
//be encoded message^key % q * p => q * p > 128
const rootOfBiggestAscii = 13; 

function getBigPrime (minimum, maximum) {
	let prime;

	do {
		prime = bigInt.randBetween(minimum, maximum)
	} while (!prime.isPrime() /*!isPrime(prime)*/);

	return prime;
}

function getOtherKeyElement(q) {
	let p;
	do {
	p = getBigPrime(rootOfBiggestAscii, 255);
	}while (q.eq(p));

	return p;
}

function generateKeyPair () {

	let lock;

	const q = getBigPrime(rootOfBiggestAscii, 255);
	const p = getOtherKeyElement(q);

	console.log("q " + q);
	console.log("p " + p);

	const phi = q.subtract(1).times(p.subtract(1));
	const product = q.times(p);

	do{
		lock = getBigPrime(1, phi);
		console.log(`${phi.mod(lock)} phi: ${phi} lock: ${lock}`);
	}while (phi.mod(lock).eq(bigInt.zero) && !lock.eq(q) && !lock.eq(p));

	const key = lock.modInv(phi);

	return {
		key : key,
		lock : lock,
		product : product,
	};
}
