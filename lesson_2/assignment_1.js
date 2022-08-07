// Problem 1

// function delayLog() {
//   for (let i = 1; i <= 10; i += 1) {
//     setTimeout(() => console.log(i), i * 1000);
//   }
// }

// delayLog();

// Problem 2

// 1, 5, 9, 13, 2, 10, 6, 14

// Problem 3

/*

line 1 executes, with a timer of 10.
then line 15 executions, with a timer of 20.

Then line 19 executions, with no timer, so it executions immediately
this means that line 20 executes next (f)

then line 23 executes (g)

then line 2, with a timer of 15 (25 from start)

then line 6 (d)

then line 8, with a timer of 5 (15 from start)

then line 12 (z)

then line 9 (n)

then line 16 (s)

and finally line 3 (q)

Answer: f, g, d, z, n, s, q
 => I was wrong abou the order of f and g. g will execute before f because f will not execute until the next event cycle.

*/

// Problem 4

// function afterNSeconds(callback, seconds) {
//   setTimeout(callback, seconds * 1000);
// }

// function greet() {
//   console.log('Hi there!');
// }

// afterNSeconds(greet, 3);