// pseudo code:
// group weights in to a map object
// while (map size)    
        // grab map size
        // find max key
        // if max key value is even - pop
        // else (odd) - collide -> map(max group gets annihilated)
        // if map size is same - return key
// return 0

// group weights by indices of another array
let mapWeights = function(weights) {
    let weightsMap = new Map();
    weights.forEach(element => {
        weightsMap.set(element, (weightsMap.get(element) || 0)+1);
    });
    // console.log(Math.max(...weightsMap.keys()));
    return weightsMap;
};


// collision - search smaller molecule
let collide = function (weightsMap) {
    let max = Math.max(...weightsMap.keys()); // find max key
    console.log(weightsMap);
    if (weightsMap.get(max)%2===0) { // if max value is even
        weightsMap.delete(max); // pop max
    } else { // if max value is odd - collide
        if (weightsMap.size>1) { // if size is bigger then one
            // console.log('map size is:', weightsMap.size);
            weightsMap.delete(max); // pop max
            let nextMax = Math.max(...weightsMap.keys()); // find next to max
            weightsMap.set(nextMax, weightsMap.get(nextMax)-1) // remove one molecule
            if (weightsMap.get(nextMax)===0) weightsMap.delete(nextMax); // if next is empty - pop
            weightsMap.set(max-nextMax, (weightsMap.get(max-nextMax) || 0)+1); // add diff mass molecule
            // console.log(`colliding ${max} and ${nextMax} creates ${max-nextMax}`);
        };
    };
    return (weightsMap);
};

let findLatestWeight = function(weights) {
    let weightsMap = mapWeights(weights);
    while (weightsMap.size) {       
        let size = weightsMap.size; // grab map size
        weightsMap = collide(weightsMap); // collide 
        // console.log('map is:', weightsMap);
        if (weightsMap.size === size) return Array.from(weightsMap.keys())[0]; // if no collision found
    };
    // if all molecules annihilated in collision return zero
    return 0;
};

console.log(findLatestWeight([2,7,4,1,8,1]));
// console.log(findLatestWeight([2,7,4,1,8,1,1,2,3,1,4,5,6,7,8,9,9,3,4,5,3,4,2,5,2,1,1]));
// console.log(findLatestWeight([2,2,2,2,1,1,3,3,4,4,8,8,]))
