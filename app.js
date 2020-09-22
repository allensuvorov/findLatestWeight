// Код, доставшийся вам в «наследство»

// В качестве входных данных у вас будет массив с весами молекул. 
// В качестве выходных данных необходимо вернуть число, которое обозначает вес последней молекулы. 
// Если молекул не останется, то необходимо вернуть 0.

var findLatestWeight = function(weights, i = weights.length - 1) {  //pass: array, and i or (array.length-i) 
    const cur = weights.length - 1 === i;  // set cur as boolean: array.lenght === i
    if (i === 0) return weights[0];  // if i === 0 return first item in array
    weights.sort((a, b) => a - b);  // sort in ascending order
    
    console.log(weights);
    // set array previous to (if current equals previous then 0, else the difference) 
    weights[i - 1] = (weights[i] === weights[i-1]) ? 0 : weights[i] - weights[i-1];
    return findLatestWeight(weights, i - 1);  // call the recursion with array and i-1 
};

var findLatestWeightFast = function(weights) {
    // distribute the array into another grouping array
    let weightsArray = [];
    weights.forEach(element => {
        weightsArray[element] = (!weightsArray[element]) ? 1 : weightsArray[element]+1;
    });
    // console.table(weightsArray);

    while (weightsArray.length > 0) {   
        console.log('array length = ', weightsArray.length);
        
        let endMass = weightsArray.length-1;
        // check if end mass as an even number or empty - annihilate those molecules/get rid of the slot
        while (weightsArray[endMass]%2===0 || !weightsArray[endMass]) {
            weightsArray.pop();
            endMass = weightsArray.length-1;
        };
        
        let i = weightsArray.length-1;
        let prevOdd = false;
        let prevIndex = 0;
        let currentLength = weightsArray.length;
        
        // collision search
        
        // console.log("i =", i)
        while (i >= 0) { //find too biggest masses
            // collision happens here
            if (weightsArray[i]) { // if there is molecules of that mass
                // console.log(i, weightsArray[i]);
                if (prevOdd) { // if previous mass is still there
                    let diff = prevIndex - i; // collide the masses and get the difference mass
                    console.log(`colliding ${prevIndex} and ${i} gives ${diff}.`)
                    weightsArray[diff] = (!weightsArray[diff]) ? 1 : weightsArray[diff]+1; // add diff mass
                    weightsArray[i] -= 1; // remove one smaller (current) molecule
                    weightsArray.pop(); // annihilate those biggest molecules
                    break;
                };

                if (!weightsArray[i]%2===0){ // if their number is odd
                    prevOdd = true; // previous mass didn't annihilate itself completly 
                    prevIndex = i; // remember the mass of previous molecule
                } else {
                    prevOdd = false;
                };
            };
            i -=1;
        };
        console.table(weightsArray);
        //if no collision found
        if (currentLength === weightsArray.length) return prevIndex;

    };
    return 0;
};

// console.log(findLatestWeight([2,7,4,1,8,1000]));
// console.log(findLatestWeightFast([2,7,4,1,8,1000]));
console.log(findLatestWeightFast([2,7,4,1,8,1,1,2,3,1,4,5,6,7,8,9,3,4,5,3,4,2,5]));
