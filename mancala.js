//Only use this program to model mancala with less than 800 stones


// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}   

var pits = [2,2,2,2,2,2];
var pitsInitial = pits.slice(0);


function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function findMinimumValidIndex(lst) {
	if (lst.length === 0) {
		throw "List of length 0 has no minimum, dick";
	}
	var minDex = -1;
	var min = 800;

	for (var i = 0; i < lst.length; i++) {
		if (lst[i] < min && lst[i] > 0) {
			min = lst[i];
			minDex = i;
		}
	}
	return minDex;

}

function findMaximumIndex(lst) {
	if (lst.length === 0) {
		throw "List of length 0 has no maximum, wangus";
	}
	var maxDex = -1;
	var max = -1;

	for (var i = 0; i < lst.length; i++){
		if (lst[i] > max) {
			max = lst[i];
			maxDex = i;
		}
	}
	return maxDex;
}

function pickUp(pickFrom, pits) {

	stonesInHand = pits[pickFrom];
	pits[pickFrom] = 0;

	dropIn = pickFrom + 1;

	while (stonesInHand > 0) {
		pits[dropIn % pits.length]++;
		stonesInHand--;

		dropIn++;

	}
}

function findRandomValidPit(lst) {

	var pitSelect = getRandomInt(0, lst.length - 1);
	
	while (lst[pitSelect] === 0) { 
		pitSelect = getRandomInt(0, lst.length - 1);
	}
	return pitSelect;
}

var count = 0;

while (!pits.equals(pitsInitial) || count === 0) {

	var pitSelect = findRandomValidPit(pits);
	
	console.log(count, pitSelect + 1, pits.toString());

	pickUp(pitSelect, pits);

	count++;

}

console.log(count);




//Display pits
