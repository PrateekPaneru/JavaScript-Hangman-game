const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText= document.querySelector(".guess-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModel = document.querySelector(".game-model");
const playAgain = document.querySelector(".play-again");

let currentWord , correctLetters,  wrongGuessCount ;
const maxGuess=6;

const resetGame =() =>{
    correctLetters=[];
    wrongGuessCount = 0;
    hangmanImage.src = `hangman-game-images/images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuess}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModel.classList.remove("show")
};

const getRandomWord = () => {
    // selecting a random word and hint from the wordList
   const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord=word;
    // console.log(word);
    document.querySelector('.hint-text b').innerText = hint;
    resetGame();
   
}
const gameOver =(isVictory) =>{
    setTimeout(() =>{
        const modelText = isVictory ? 'You found the Word :' : 'The correct word was: ';
        gameModel.querySelector("img").src=`hangman-game-images/images/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModel.querySelector("h4").src=`${isVictory ? 'Congrats' : 'Game Over!'}`;
        gameModel.querySelector("p").innerHTML=`${modelText}<b>${currentWord}</b>`;
        gameModel.classList.add("show")
    },300)
}
const initGame= (button , clickedLetter) =>{
    // checking if the clickedLetter is Existed on the currentWord
    if(currentWord.includes(clickedLetter)){
        // showing all correct letter on the wold display
        [...currentWord].forEach((letter,index) =>{
            if(letter===clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText=letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
        }
    })
    }else{
        // if clicked letter doesnot exist
        wrongGuessCount++;
        hangmanImage.src = `hangman-game-images/images/hangman-${wrongGuessCount}.svg`;
    }

    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuess}`;

// calling gameOver function if any of this conditons meets
    if(wrongGuessCount === maxGuess) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);

} 

// creating keyboard buttons
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click" , e => initGame(e.target , String.fromCharCode(i) ))
}

getRandomWord();
playAgain.addEventListener("click" , getRandomWord);