function countEmptySlots(arr) {
    return arr.reduce((count, item) => count + (item === undefined && !(item in arr) ? 1 : 0), 0)
}

function countEmptySlots(arr) {
    return arr.reduce((count, item) => count + !(item in arr), 0)
}

function countEmptySlots(arr) {
    return arr.length - arr.filter(() => true).length
}
