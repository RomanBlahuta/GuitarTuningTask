/*

- The guitar strings are played 1st to 6th, High E to Low E.

- If the guitar string matches, return `"OK"` for that guitar string.

- If it's too low, return `">•"` for 1 or 2 percent off (the arrow means, tune up).

- Return `">>•"` if it's way off. For more than 3 percent.

- If it's too high, return `"•<"` for 1 or 2 percent, and `"•<<"` for more, (tune down).

- Check the rounded percentages.

- If `0` is given, the guitar string isn't played, return `" - "`.
*/



function tune(guitarStrings) {

    //constants and helper functions
    function percentDiff(a, b) {
        let divideBy = (a > b) ? a : b;
        return Math.abs(a - b) / divideBy * 100;
    }

    const correctTuning = [329.63, 246.94, 196, 146.83, 110, 82.41];

    const tuned = "OK";
    const notUsed = " - ";

    const tooLow = ">•";
    const wayTooLow = ">>•";

    const tooHigh = "•<";
    const wayTooHigh = "•<<";

    //input validation
    if (guitarStrings.length !== correctTuning.length || !Array.isArray(guitarStrings)) {
        throw "The input should be an array of 6 values.";
    }
    let allNum = true;
    for (let el of guitarStrings) {
        if (!(typeof el == 'number' || el instanceof Number)) {
            allNum = false;
        }
    }
    if (!allNum) {
        throw 'All values inside the input array must be either Number or primitive "number".'
    }

    //the tuning procedure itself
    let res = [];
    for (let i = 0; i < guitarStrings.length; i++) {
        if (guitarStrings[i] === 0) {
            res.push(notUsed);
        }

        else if (guitarStrings[i] === correctTuning[i]) {
            res.push(tuned);
        }

        else if (percentDiff(guitarStrings[i], correctTuning[i]) < 3) {
            if (guitarStrings[i] > correctTuning[i])
                res.push(tooHigh);
            else if (guitarStrings[i] < correctTuning[i])
                res.push(tooLow);
        }

        else if (percentDiff(guitarStrings[i], correctTuning[i]) >= 3) {
            if (guitarStrings[i] > correctTuning[i])
                res.push(wayTooHigh);
            else if (guitarStrings[i] < correctTuning[i])
                res.push(wayTooLow);
        }
    }

    return res;
}

console.log(tune([387.63, 346.94, 207, 156.83, 120, 92.41]));
console.log(tune([0,0,0,0,0,0]));
console.log(tune([55,1,2,-23450,-10,-100]));
console.log(tune([Number(0),Number(0),Number(0),Number(0),Number(0),Number(0)]));
console.log(tune([Number(329.63),Number(246.94),Number(196),Number(146.83),Number(110),Number(82.41)]));
console.log(tune([Number(330.63),Number(246),Number(1196),Number(-1416.83),Number(1110),Number(182.41)]));