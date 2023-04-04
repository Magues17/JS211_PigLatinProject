const vowels = ["a", "e", "i", "o", "u"];
let consonants = "";
let vowelIndex = -1;


function getWord() {
    let word = "";
    word = document.getElementById("user-input").value;
    document.getElementById("results").innerHTML = convertWordToPigLatin(word);
}

//clean up the string if necessary
function cleanStringUp(word) {
   word = word.toLowerCase();
  word = word.trim();
  return word;
}

//get are constantans and vowles
function getConsonantsAndVowelIndex(word) {
    cleanStringUp(word);   
    for (let i = 0; i < word.length; i++) {
        if (!vowels.includes(word[i])) {
            consonants += word[i];
        }
        else {
            vowelIndex = i;
            break;
        }
    }
  return word;
}

//convert the word
function convertWordToPigLatin(word) {
  getConsonantsAndVowelIndex(word);
  if (vowelIndex == 0) {
        word = word + "yay";
    }
    else {
        consonants = word.substring(0, vowelIndex);
        word = word.substring(vowelIndex) + consonants + "ay";
    }
  return word;
}