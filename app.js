// pseudo code:
// group weights
// while (length)    
        // grab length
        // grab last
        // if last is even or empty - pop
        // else odd - collide
        // if length is same - return last index
// return 0 

// group weights to indices of another array
let groupWeights = function(weights) {
    let groupedWeights = [];
    weights.forEach(element => {
        groupedWeights[element] = (!groupedWeights[element]) ? 1 : groupedWeights[element]+1;
    });
    return groupedWeights;
};

// collision - search smaller molecule
let collide = function (groupedWeights) {
    let length = groupedWeights.length;
    for (let i = length-2; i>0; i--) {
        if (groupedWeights[i]) { // look for next molecule 
            let diff = length-1 - i; // collide the masses and get the difference mass
            console.log(`colliding ${length-1} and ${i} gives ${diff}.`)
            groupedWeights[diff] = (!groupedWeights[diff]) ? 1 : groupedWeights[diff]+1; // add diff mass
            groupedWeights[i] -= 1; // remove one smaller (current) molecule
            groupedWeights.pop(); // annihilate those biggest molecules
            break;
        };
    };
    return (groupedWeights);
};

let findLatestWeightFast = function(weights) {
    let groupedWeights = groupWeights(weights);
    
    while (groupedWeights.length) {       
        let length = groupedWeights.length;
        let last = groupedWeights[length-1];

        if (last%2===0 || !last) { // even or empty
            groupedWeights.pop();
        } else { // odd
            groupedWeights = collide(groupedWeights);
        };
        if (length === groupedWeights.length) return length-1; // no collision happened
    };
    // if all molecules annihilated in collision return zero
    return 0;
};

// console.log(findLatestWeightFast([2,7,4,1,8,1]));
console.log(findLatestWeightFast([2,7,4,1,8,1,1,2,3,1,4,5,6,7,8,9,9,3,4,5,3,4,2,5,20]));
