const maximumTwo = (arr) => {
    let max1 = arr[0];
    let max2 = arr[1];
    let max1I = 0;
    let max2I = 1;
    for(let i = 2; i < arr.length; i++) {
        if (arr[i] > max1) {
            if (max1 > max2) {
                max2 = arr[i];
                max2I = i;
            } else {
                max1 = arr[i];
                max1I = i;
            }
        } else if (arr[i] > max2) {
            max2 = arr[i];
            max2I = i;
        }
    }

    if (max1 > max2) return [max2, max1, max2I, max1I];
    return [max1, max2, max1I, max2I];
};

const fn = function(weights) {
    console.time('fn');
    if (weights.length <= 1) {
        return weights[0];
    }

    do {
        const [x, y, xI, yI] =  maximumTwo(weights);
        if (x === 0) {
            console.timeEnd('fn');
            return y;
        }

        weights[xI] = 0;
        weights[yI] = y - x;

    } while(true);
};

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
console.log(fn(buildArray(100200,30020)));
