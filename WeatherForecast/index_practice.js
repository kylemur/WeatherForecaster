
// Display output to the screen. This can be done with Node.js writing to the terminal, or in a browser using html.

// Native Array ES6 functions

// Recursion

// Use a JavaScript library written by someone else in your code (could be an npm package if using Node, or a cdn link for any JS library)



// Demonstrate throwing and handling exceptions


/*
console.log('Hello world. ');

function getThis() {
    return this;
  }
  
  const obj1 = { name: "obj1" };
  const obj2 = { name: "obj2" };
  
  obj1.getThis = getThis;
  obj2.getThis = getThis;
  
  console.log(obj1.getThis()); // { name: 'obj1', getThis: [Function: getThis] }
  console.log(obj2.getThis()); // { name: 'obj2', getThis: [Function: getThis] }

  console.log(process.platform);
  console.log(process.env.USER);
*/


// const { readFile, readFileSync } = require('fs');    // fs is a module to handle the file system

// // const txt = readFileSync('./hello.txt', 'utf8');  /* Sync === blocking, will finish reading file before doing anything else */
// // console.log(txt)

// console.log(new Date().toISOString());
// readFile('./hello.txt', 'utf8', (err, txt) => {      /* while taking time to read file, next function will run */
//   console.log(new Date().toISOString());
//   console.log(txt)
//   console.log(new Date().toISOString());
// });

// console.log(`${new Date().toISOString()} - Do this ASAP!`);
// console.log('Do this ASAP!')
// console.log('Do this ASAP!')
// console.log('Do this ASAP!')
// console.log('Do this ASAP!')
// console.log('Do this ASAP!')
// console.log('Do this ASAP!')
// console.log('Do this ASAP!')
// console.log('Do this ASAP!')
// console.log(`${new Date().toISOString()} - Do this ASAP!`);
// console.log('Do this ASAP!')
// console.log('Do this ASAP!')
// console.log('Do this ASAP!')
// console.log('Do this ASAP!')
// console.log('Do this ASAP!')
// console.log(`${new Date().toISOString()} - Do this ASAP!`);


const { readFile } = require('fs').promises;          // imports readFile from promises namespace
// const file = await readFile('./hello.txt', 'utf8');   // creates a fxn that returns a promise when called,   await can resolve the promise

// async function hello() {                           // another way to do the above fxn
//   const file = await readFile('./hello.txt', 'utf8');
// }

// const { readFile } = require('fs');
// const myModule = require('./my-module');
// console.log(myModule)


const express = require('express');

const app = express();

// app.get('/foo/bar', (request, response) => {   // URL, callback fxn (request is user's incoming data, response is my outgoing data)
//   readFile('./home.html', 'utf8', (err, html) => {
//     if (err) {
//       response.status(500).send('Sorry, out of order.')  // 500 means a server error
//     }
//     response.send(html);
//   })
// });

app.get('/', async (request, response) => {
  response.send( await readFile('./home.html', 'utf8') );
});

app.listen(process.env.PORT || 3000, () => console.log(`App available on http://localhost:3000`))





const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What is the zipcode? ', (answer) => {
  console.log(`Weather Forecast for: ${answer}`);
  rl.close();
});