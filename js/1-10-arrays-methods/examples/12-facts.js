// ===============================
// 1. map + parseInt (пастка)
// ===============================
console.log("1:", [1, 2, 3].map(parseInt));
// parseInt(value, radix)
// map передає (value, index)
// index стає radix:
// parseInt(1, 0) -> 1
// parseInt(2, 1) -> NaN (система числення 1 не існує)
// parseInt(3, 2) -> NaN (3 не існує в двійковій системі)

// ===============================
// 2. filter(Boolean)
// ===============================
console.log("2:", [0, 1, false, 2, '', 3].filter(Boolean));
// Boolean відсікає всі falsy значення:
// 0, false, '', null, undefined, NaN

// ===============================
// 3. forEach нічого не повертає
// ===============================
const result3 = [1, 2, 3].forEach(x => x * 2);
console.log("3:", result3);
// forEach завжди повертає undefined

// ===============================
// 4. sort як рядки
// ===============================
console.log("4:", [1, 2, 10].sort());
// "10" < "2" → тому [1, 10, 2]

// ===============================
// 5. includes vs indexOf
// ===============================
console.log("5:", [NaN].indexOf(NaN));   // -1
console.log("5:", [NaN].includes(NaN));  // true
// includes "розуміє" NaN

// ===============================
// 6. reduce без return
// ===============================
const sum6 = [1, 2, 3].reduce((a, b) => {
    a + b;
}, 0);
console.log("6:", sum6);
// немає return → undefined накопичується

// ===============================
// 7. map без return
// ===============================
const doubled7 = [1, 2, 3].map(x => {
    x * 2;
});
console.log("7:", doubled7);
// [undefined, undefined, undefined]

// ===============================
// 8. map + об'єкт (пастка)
// ===============================
const users8 = [
    { name: 'Ivan', age: 20 },
    { name: 'Olia', age: 25 }
];

const names8 = users8.map(user => {
    name: user.name
});
console.log("8:", names8);
// треба:
// user => ({ name: user.name })

// ===============================
// 9. reduce на пустому масиві
// ===============================
try {
    console.log("9:", [].reduce((a, b) => a + b));
} catch (e) {
    console.log("9: ERROR", e.message);
}
// без initialValue → помилка

// ===============================
// 10. reduce з одним елементом
// ===============================
console.log("10:", [1].reduce((a, b) => a + b));
// повертає сам елемент → 1

// ===============================
// 11. reduce без return acc
// ===============================
const result11 = [1, 2, 3].reduce((acc, x) => {
    acc.push(x * 2);
}, []);
console.log("11:", result11);
// undefined → бо не повернули acc

// ===============================
// 12. мутація масиву в map 😈
// ===============================
const arr12 = [1, 2, 3];

arr12.map(x => {
    arr12.push(x);
    return x;
});

console.log("12:", arr12);
// масив росте під час ітерації → небезпечна поведінка

// ===============================
// 13. зміна length
// ===============================
const arr13 = [1, 2, 3];
arr13.length = 0;

console.log("13:", arr13);
// []

// ===============================
// 14. map(parseInt) складніший кейс
// ===============================
console.log("14:", ['10', '10', '10'].map(parseInt));
// parseInt('10', 0) → 10
// parseInt('10', 1) → NaN
// parseInt('10', 2) → 2

// ===============================
// 15. some vs every
// ===============================
console.log("15 some:", [1, 2, 3].some(x => x > 2));   // true
console.log("15 every:", [1, 2, 3].every(x => x > 2)); // false
// some → хоча б один
// every → всі

// ===============================
// 16. chaining
// ===============================
const result16 = [1, 2, 3, 4]
    .filter(x => x > 2) // [3,4]
    .map(x => x * 2)    // [6,8]
    .reduce((a, b) => a + b, 0); // 14

console.log("16:", result16);
