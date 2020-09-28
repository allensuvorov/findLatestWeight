// pseudo code: map solution
// group weights in to a map object
// while (map size)    
        // grab map size
        // find max key
        // if max key value is even - pop
        // else (odd) - collide -> map(max group gets annihilated)
        // if map size is same - return key
// return 0

// group weights to map
let mapWeights = function(weights) {
    console.time("mapWeights")
    let weightsMap = new Map();
    weights.forEach(element => {
        if (element) weightsMap.set(element, (weightsMap.get(element) || 0)+1);
    });
    console.log("map is ready");
    // console.table(weightsMap);
    // console.log(Math.max(...weightsMap.keys()));
    console.timeEnd("mapWeights")
    return weightsMap;
};

// max search
let findMax = function (weightsMap) {
    // console.time('findMax')
    let array = Array.from(weightsMap.keys()); // put keys to array
    let max = array[0];
    for (let i = 1; i <array.length; i++) {
        if (array[i]> max) max = array[i];
    };
    // console.timeEnd('findMax')
    return max;
};

// collision - search smaller molecule
let collide = function (weightsMap) {
    let max = findMax(weightsMap); // find max key
    // console.log(weightsMap);
    if (weightsMap.get(max)%2===0) { // if max value is even
        weightsMap.delete(max); // pop max
    } else { // if max value is odd - collide
        if (weightsMap.size>1) { // if size is bigger then one
            // console.log('map size is:', weightsMap.size);
            weightsMap.delete(max); // pop max
            let nextMax = findMax(weightsMap); // find next to max
            weightsMap.set(nextMax, weightsMap.get(nextMax)-1) // remove one molecule
            if (weightsMap.get(nextMax)===0) weightsMap.delete(nextMax); // if next is empty - pop
            weightsMap.set(max-nextMax, (weightsMap.get(max-nextMax) || 0)+1); // add diff mass molecule
            // console.log(`colliding ${max} and ${nextMax} creates ${max-nextMax}`);
            // console.log(weightsMap);
            // max = (max-nextMax>nextMax)? max-nextMax : nextMax;
        };
    };
    return (weightsMap);
};

let findLatestWeight = function(weights) {
    let weightsMap = mapWeights(weights);
    console.time("findLatestWeight")
    while (weightsMap.size) {       
        // let size = weightsMap.size; // grab map size
        weightsMap = collide(weightsMap); // collide 
        // console.log('map is:', weightsMap);
        if (weightsMap.size === 1) {
            console.timeLog("findLatestWeight");
            return Array.from(weightsMap.keys())[0]; // if no collision found
        };
    };
    // if all molecules annihilated in collision return zero
    console.timeEnd("findLatestWeight")
    return 0;
};

// console.log(findLatestWeight([2,7,4,1,8,1])===1); //
// console.log(findLatestWeight([2,7,4,1,8,1,1,2,3,1,4,5,6,7,8,9,9,3,4,5,3,4,2,5,2,1,1])===0);
// console.log(findLatestWeight([10,5,5,1,10000,555,333,444,666,777,888,999,9,8,7,6,5,4,3,2,1]));
// console.log(findLatestWeight([0,0,0,0,1,1,1,1,3,]));

let buildArray = function(length, max) {
    console.time("buildArray")
    let array = [];
    for (let i = 0; i < length; i++){
        array[i] = Math.ceil(Math.random() * Math.floor(max))
    };
    console.log ('length:', length, 'max :', max);
    console.timeEnd("buildArray")
    return array;
};
console.log(findLatestWeight(buildArray(100200,30020)));
