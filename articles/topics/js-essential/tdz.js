// test-1
// {
//   if(typeof anything === 'undefined'){
//     console.log('not initialized')
//   }
//
//   typeof someVal
//
//   let someVal=2
// }

// test-2
// function go(n) {
//   // n here is defined!
//   console.log(n); // Object {a: [1,2,3]}
//
//   for (let n of n.a) { // ReferenceError
//     console.log(n);
//   }
// }
// go({a: [1, 2, 3]});

// test-3
// let x = 1;
// {
//   var x = 2; // SyntaxError for re-declaration
// }