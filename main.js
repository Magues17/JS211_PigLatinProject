"use strict";

// brings in the assert module for unit testing
const assert = require("assert");
// brings in the readline module to access the command line
const readline = require("readline");
const { pipeline } = require("stream");
// use the readline module to print out to the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


   
   
  


function convertAllWordsToPigLatin(words) {
  //trimming white spaces on both sides of the string
   //converting the word to all lowercase letters
  words = words.trim().toLowerCase();
  //splitting the word if there is a space
  let wordsSplit = words.split(" ");
  let result = "";
  for (let i = 0; i < wordsSplit.length; i++) {
    let subWord = wordsSplit[i];
    let pigLatinWord = convertSingleWordToPigLatin(subWord);
    result += pigLatinWord + " ";
  }
  result = result.trim().toLowerCase();
  return result;
}

function convertSingleWordToPigLatin(word) {
 
  //declaing varibles
  const vowels = ["a", "e", "i", "o", "u"];
  let consonants = "";
  let vowelIndex = -1;
  //looping through the letters of the word
  for (let i = 0; i < word.length; i++) {
    //if the letter is not a vowel, adds that letter to our constants variable
    if (!vowels.includes(word[i])) {
      consonants += word[i];
    }
    //when you find the vowel, set the vowelIndex number as that number then "breakout" of the for loop.
    else {
      vowelIndex = i;
      break;
    }
  }
  //if the first letter is a vowel then add "yay"
  if (vowelIndex == 0) {
    // console.log("The first vowel of the word is at the beginning of the word.");
    word = word + "yay";
  }
  //
  else {
    // console.log(`The consonants before the first vowel are: ${consonants}.`);
    consonants = word.substring(0, vowelIndex);
    word = word.substring(vowelIndex) + consonants + "ay";
  }

  //  console.log("The word translated to Pig Latin is: " + word);
  return word;
}

// the first function called in the program to get an input from the user
// to run the function use the command: node main.js
// to close it ctrl + C
const getPrompt = () => {
  rl.question("Enter a prompt to translate into Pig Latin: ", (answer) => {
    answer = convertAllWordsToPigLatin(answer);
    console.log(
      "The prompt translated to Pig Latin is: " + answer + "\n"
    );
    getPrompt();
  });
};

// Unit Tests
// to use them run the command: npm test main.js
// to close them ctrl + C
if (typeof describe === "function") {
  describe("#convertAllWordsToPigLatin()", () => {
    it("should translate a simple word", () => {
      assert.equal(convertAllWordsToPigLatin("car"), "arcay");
      assert.equal(convertAllWordsToPigLatin("dog"), "ogday");
    });
    it("should translate a complex word", () => {
      assert.equal(convertAllWordsToPigLatin("create"), "eatecray");
      assert.equal(convertAllWordsToPigLatin("valley"), "alleyvay");
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(convertAllWordsToPigLatin("egg"), "eggyay");
      assert.equal(convertAllWordsToPigLatin("emission"), "emissionyay");
    });
    it("should lowercase and trim word before translation", () => {
      assert.equal(convertAllWordsToPigLatin("HeLlO "), "ellohay");
      assert.equal(convertAllWordsToPigLatin(" RoCkEt"), "ocketray");
    });
    it("testing for words with spacing in the center", () => {
      assert.equal(convertAllWordsToPigLatin("Jurassic Park"), "urassicjay arkpay");
      assert.equal(convertAllWordsToPigLatin("Pig Latin"), "igpay atinlay");
    });
  });
} else {
  getPrompt();
}
// const word = getPrompt();
// const { consonants, vowelIndex } = pigLatin(word);

// **********
//   HINTS
// **********

// break your code into pieces and focus on one piece at a time...
// 1. if word begins with a vowel send to one function: adds "yay"
// 2. if word begins with a consonant send to another function: splices off beginning, returns word with new ending.
// 3. if multiple words, create array of words, loop over them, sending them to different functions and creating a new array with the new words.
