const submitBtn = document.getElementById("submitBtn");   //Submit Guess Button
const preGuessElem = document.getElementsByClassName("card-text")[0];  // Previously Guessed number textBox
const alertBox = document.getElementsByClassName("alert")[0];   // AlertBox
const inputBox = document.getElementById("inputBox");
let turn = 0, guessArr = [], num = 0, guess;  // turn, previous element array and number initilized to 0 and guess is undefined.



//  To reset all things in the game to 0 and generating new random number
const restartGame = ()=>{
    num = Math.floor(Math.random() * 100) + 1;  //Generate new random number

    // setting all values to 0.
    turn=0;
    guess=0;
    guessArr = [];
    // Setting initial values in document
    preGuessElem.innerHTML = `
    ${10-turn} Turns remaining. <br> Previous Guess${turn==0?"":"es"} = ${guessArr.join(", ")}
    `
    document.getElementById("inputBox").value = "";
    alertBox.classList.add("invisible");
    submitBtn.innerText = "Submit Guess";
    inputBox.removeAttribute("disabled")
}

// Shoes the alert with message and background color
const showMessage = (message, color) =>
{
    alertBox.className = `alert alert-${color}`
    alertBox.innerHTML = `${message}`;
}


// Main game logic
const gameLogic = ()=>{
  
    guess = Number.parseInt(inputBox.value);  //Takes value from inputBox.
    inputBox.value = ""; // sets inputbox to empty
    if (guess>=1 && guess<=100)  // checkes whether guess is between range or not.
    {
        turn++;    // if in range then increase the turns played
        guessArr.push(guess);  // adds the entered guess by user in guessArr Array.
        
        
        if (guess>num)    //Checks guess is number than number
        {
            showMessage("Lower number please!", "info");  // if greater then shows message lower number please.
    }
    else if (guess<num)   //check guess is smaller than number
    {
        showMessage("Higher number please!", "warning");   // if smaller then shows message higher number please.
    }
    else
    {
        // if guess and number are equal then shows message congratulations
        showMessage(`Congratulations you have guessed in ${turn} turns`, "success"); 
        
        // sets innertext of sumbit guess button to restart game.
        submitBtn.innerText = "Restart Game";

        // Disables the input box 
        inputBox.disabled = true;

        // listenes to event of click on submit button 
        submitBtn.addEventListener("click", ()=>{
            
            // if clicked on restart game button then calls function restart game.
            restartGame();
        })
    }
    
    // if all turns are over then shows message and restart game when clicked on restart button
    if (turn===10)
    {
        showMessage("Game Over! Please Restart Game.", "danger");
        inputBox.disabled = true;
        submitBtn.innerText = "Restart Game";
        submitBtn.addEventListener("click", ()=>{
            restartGame();
        })
    }
    
    // changes the text inside the previous guessed element box.
    preGuessElem.innerHTML = `
    ${10-turn} Turns remaining. <br> Previous Guess${turn==1?"":"es"} = ${guessArr.join(", ")}
    `
    
}
else
{   // If entered input is not in range then shows alert enter correct number.
    showMessage("Enter Correct Number", "danger");
}

}


// Initial call
restartGame();


// Event listeners
submitBtn.addEventListener("click", ()=>{
    gameLogic();
});

window.addEventListener("keydown", (e)=>{
    if (e.key === "Enter")
    {
        gameLogic();
    }
})