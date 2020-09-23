// Код, доставшийся вам в «наследство»

// В качестве входных данных у вас будет массив с весами молекул. 
// В качестве выходных данных необходимо вернуть число, которое обозначает вес последней молекулы. 
// Если молекул не останется, то необходимо вернуть 0.

// group weights to indices of another array
let groupWeights = function(array) {
    let groupedWeights = [];
    array.forEach(element => {
        groupedWeights[element] = (!groupedWeights[element]) ? 1 : groupedWeights[element]+1;
    });
    return groupedWeights;
}

// cut tail till odd: clean empty / collide even
let cutTail = function (array) {
    while (array.length > 0 && (array[array.length-1]%2===0 || !array[array.length-1])) {
        array.pop();
        // console.log('pop');
        // console.log('array length = ', groupedWeights.length);
    };
    return array; // -> returns tailed till odd array or empty array
};

// collision search of odd with first lighter molecule
let collide = function (groupedWeights) {
    let i = groupedWeights.length-1;
    let prevOdd = false;
    let prevOddIndex = 0;
    
    while (i >= 0) { //find too biggest masses
        // collision happens here
        if (groupedWeights[i]) { // if there is molecules of that mass
            // console.log(i, groupedWeights[i]);
            if (prevOdd) { // if previous mass is still there
                let diff = prevOddIndex - i; // collide the masses and get the difference mass
                console.log(`colliding ${prevOddIndex} and ${i} gives ${diff}.`)
                groupedWeights[diff] = (!groupedWeights[diff]) ? 1 : groupedWeights[diff]+1; // add diff mass
                groupedWeights[i] -= 1; // remove one smaller (current) molecule
                groupedWeights.pop(); // annihilate those biggest molecules
                break;
            };

            if (!groupedWeights[i]%2===0){ // if their number is odd
                prevOdd = true; // previous mass didn't annihilate itself completly 
                prevOddIndex = i; // remember the mass of previous molecule
            } else {
                prevOdd = false;
            };
        };
        i -=1;
    };
    return (groupedWeights);
}

let findLatestWeightFast = function(weights) {
    let groupedWeights = groupWeights(weights);
    console.table(groupedWeights);
    // try to find last weight by colliding different molecules
    
    while (groupedWeights.length > 0) {   
        groupedWeights = cutTail(groupedWeights);

        let currentLength = groupedWeights.length;
        if (currentLength === 0) return 0;

        // collision search
        groupedWeights = collide(groupedWeights);

        console.table(groupedWeights);
        
        //if no collision happened (no second mass to collide with)
        if (currentLength === groupedWeights.length) return groupedWeights.length-1;

    };

    // if all molecules annihilated in collision return zero
    return 0;
};

// console.log(findLatestWeightFast([2,7,4,1,8,1,3]));
console.log(findLatestWeightFast([2,7,4,1,8,1,1,2,3,1,4,5,6,7,8,9,3,4,5,3,4,2,5,20]));
