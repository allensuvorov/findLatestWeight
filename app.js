// pseudo code:
// group weights in to a map object
// while (map size)    
        // grab map size
        // find max key
        // if max key value is even - pop
        // else (odd) - collide -> map(max group annihilated)
        // if map size is same - return key
// return 0

// group weights by indices of another array
let groupWeights = function(weights) {
    let weightsMap = new Map();
    weights.forEach(element => {
        weightsMap.set(element, (weightsMap.get(element) || 0)+1);
    });
    console.log(Math.max(...weightsMap.keys()));
    return weightsMap;
};
// console.log(findLatestWeightFast([2,7,4,1,8,100000000]));
console.log(groupWeights([2,7,4,1,8,1,1,2,3,1,4,5,6,7,8,9,9,3,4,5,3,4,2,5,20]));
// console.log()
// collision - search smaller molecule
let collide = function (groupedWeights) {
    let length = groupedWeights.length;
    for (let i = length-2; i>0; i--) { // look for next molecule
        if (groupedWeights[i]) { 
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
    let weightsMap = weightsMap(weights);
    
    while (weightsMap.size) {       
        let size = weightsMap.size; // grab map size
        let max = Math.max(...weightsMap.keys()); // find max key
        
        if (weightsMap.get(max)%2===0) { // if max value is even
            weightsMap.delete(max); // pop max
        } else { // if max value is odd - collide
            weightsMap.delete(max); // pop max
            let nextMax = Math.max(...weightsMap.keys()); // find next to max
            weightsMap.set(nextMax, weightsMap.get(nextMax)-1) // remove one molecule
        };

        break;
        // if (last%2===0 || !last) { // even or empty
        //     groupedWeights.pop();
        // } else { // odd
        //     groupedWeights = collide(groupedWeights);
        // };
        // if (length === groupedWeights.length) return length-1; // no collision happened
    };
    // if all molecules annihilated in collision return zero
    return 0;
};


