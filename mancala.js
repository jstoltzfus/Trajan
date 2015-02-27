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

//http://stackoverflow.com/questions/1988349/array-push-if-does-not-exist

// check if an element exists in array using a comparer function
// comparer : function(currentElement)
Array.prototype.inArray = function(comparer) { 
    for(var i=0; i < this.length; i++) { 
        if(comparer(this[i])) return true; 
    }
    return false; 
}; 

// adds an element to the array if it does not already exist using a comparer 
// function
Array.prototype.pushIfNotExist = function(element, comparer) { 
    if (!this.inArray(comparer)) {
        this.push(element);
    }
}; 

var pits = [2,2,2,2,2,2];
var pitsInitial = pits.slice(0);
var pitNames = ["Ship","Forum","Military","Senate","Trajan","Build"]


function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//This function is meant to pick the move which creates the most possible future moves
function findIndexOfPossibilityMove(lst) {
	if (lst.length === 0) {
		throw "List of length 0 has no possible moves";
	}
	//Assess each current pit
	for (var i = 0; i < lst.length; i++) {
		var pitsTemp = lst.slice(0);

		pickUp(i, pitsTemp);
		console.log("*", pitsTemp)

		//Asses each future pit
		for (var j = 0; j < pitsTemp.length; j++) {
			var pitsTemp2 = pitsTemp.slice(0)

			if (pitsTemp2[j] > 0) {
				var tempChosen = pickUp(j, pitsTemp2);
				console.log(tempChosen, pitsTemp2);
			} else {console.log("brap")}
			
		}

	}


}

//This function picks the pit with the lowest number of stones
function findMinimumValidIndex(lst) {
	if (lst.length === 0) {
		throw "List of length 0 has no minimum";
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

//this function picks the pit with the highest number of stones
function findMaximumIndex(lst) {
	if (lst.length === 0) {
		throw "List of length 0 has no maximum";
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

function findRandomValidPit(lst) {

	var pitSelect = getRandomInt(0, lst.length - 1);
	
	while (lst[pitSelect] === 0) { 
		pitSelect = getRandomInt(0, lst.length - 1);
	}
	return pitSelect;
}

function pickUp(pickFrom, lst) {

	//Set stones in hand to the number in the pit
	stonesInHand = lst[pickFrom];
	//The stones come out of the pit, so set the count of stones in pit to zero
	lst[pickFrom] = 0;

	dropIn = pickFrom + 1;

	while (stonesInHand > 0) {
		lst[dropIn % lst.length]++;
		stonesInHand--;

		dropIn++;

	}
	//Return Index of the final pit
	return ((dropIn -1) % lst.length)
}



var count = 0;

while (!pits.equals(pitsInitial) || count === 0) {

	var pitSelect = findMinimumValidIndex(pits);
	
	console.log(count, pitSelect, pits.toString());

	var actionTaken = pitNames[(pickUp(pitSelect, pits))];

	count++;

	console.log(actionTaken);

}

console.log(count, pitSelect + 1, pits.toString());


