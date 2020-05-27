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

function getLock (q , p, phi, product) {
	let lock;

	do{
		lock = getBigPrime(1, phi);
		console.log(`${phi.mod(lock)} phi: ${phi} lock: ${lock}`);
	}while (phi.mod(lock).eq(bigInt.zero) && !lock.eq(q) && !lock.eq(p));

	return lock;
}

function generateKeyPair () {

	const q = getBigPrime(rootOfBiggestAscii, 255);
	const p = getOtherKeyElement(q);

	console.log("q " + q);
	console.log("p " + p);

	const phi = q.subtract(1).times(p.subtract(1));
	const product = q.times(p);

	const lock = getLock(q, p, phi, product);

	const key = lock.modInv(phi);

	return {
		key : key,
		lock : lock,
		product : product,
	};
}

function setInnerOfId (id, content) {
	document.getElementById(id).innerHTML = content;
	console.log(id + '2');
	document.getElementById(id + '2').innerHTML = content;
}

function generateWithShow (q , p) {

	const phi = q.subtract(1).times(p.subtract(1));
	const product = q.times(p);

	setInnerOfId('oQ', q.toString(10));
	setInnerOfId('oP', p.toString(10));

	document.getElementById('oProduct').innerHTML = product.toString(10);
	document.getElementById('oPhi').innerHTML = phi.toString(10);

	let count = 0;
	const lockCandidates = document.getElementById('lockCandidates');

	for (let i = bigInt(2); i.lesser(phi); i = i.add(1)) {
		if (!phi.mod(i).eq(bigInt.zero)) {
			count++;
			lockCandidates.innerHTML += i.toString(10) + ' ';

			if (!(count % 3)) lockCandidates.innerHTML += '<br>';
		}
	}

	const lock = getLock(q, p, phi, product);

	const key = lock.modInv(phi);
	document.getElementById('oLock').innerHTML = lock.toString(10);
	document.getElementById('oPrivate').innerHTML = key.toString(10);

	return {
		key : key,
		lock : lock,
		product : product,
	};
}
