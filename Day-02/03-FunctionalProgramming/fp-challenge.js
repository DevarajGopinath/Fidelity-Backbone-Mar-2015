/*

  Create a function that would take an array of phone calls
  and answer() all of them - unless it's Lionel Richie.

  * the answerCall() method accepts only the first name, not the full name
  * Please note that Lionel Richie has a basic understanding
    of the Javascript String type and might try to cheat.
  * Use ES5 Array methods or lodash instead of loops.


  Bonus points for solving one of these problems:
  ===============================================

  1. Imagine that you're Lionel's biggest fan, and wouldn't be bothered
  answering phone calls from anyone else. How would you create a function
  that would accept calls coming only from him, by keeping the syntax DRY?
  2. What if Lionel Richie was trying to make you answer the call
  anyway by replacing letters in his name using the l33t syntax,
  eg.: l10n3l r1tch13?
  3. What are the other, non-technical ways of protecting yourself from being called by Lionel Richie?
  4. Hello?
*/


var calls = [
  {
    name: 'Lionel Richie',
    message: 'Hello! Is it me you\'re looking for?'
  },  {
    name: 'Lionel Richie',
    message: 'Hello! Is it me you\'re looking for?'
  },  {
    name: 'lionel richie',
    message: 'Hello! Is it me you\'re looking for?'
  },  {
    name: 'Lionel Richie',
    message: 'Hello! Is it me you\'re looking for?'
  },  {
    name: 'Lionel Richie',
    message: 'Hello! Is it me you\'re looking for?'
  },
  {
    name: 'lionel richie',
    message: 'Hello! Is it me you\'re looking for?'
  },
  {
    name: 'John Doe',
    message: 'Hello! Is it me you\'re looking for?'
  },
  {
    name: 'Lionel Richie',
    message: 'Hello! Is it me you\'re looking for?'
  }
];


console.clear();

function answerCall(firstName){
  console.log( 'Hey ' + firstName + ' ;-)');
}

function hangUp(){
  console.warn('Lionel Richie detected, hanging up.');
}


// Your code goes here

