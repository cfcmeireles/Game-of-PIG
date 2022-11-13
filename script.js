(function () {
  "use strict";

  const startGame = document.querySelector("#startgame");
  const game = document.querySelector("#game");
  const actions = document.querySelector("#actions");
  const score = document.querySelector("#score");
  const control = document.querySelector("#gamecontrol");

  const gameData = {
    dice: ["images/dice1.png", "images/dice2.png", "images/dice3.png", "images/dice4.png", "images/dice5.png", "images/dice6.png"],
    players: ["Player 1", "Player 2"],
    score: [0, 0],
    dice1: 0,
    dice2: 0,
    diceTotal: 0,
    index: 0,
    gameEnd: 29,
  };

  // Click event on startBtn to change h2 and btn text

  startGame.addEventListener("click", function () {
    gameData.index = Math.round(Math.random());
    console.log(gameData.index);
    control.innerHTML = `
  <h2 id="h2-title">The game has started</h2>
  <button id="quit">Wanna quit?</button>`;

    // Click event to reload page on quit button

    const quitBtn = document.querySelector("#quit");

    quitBtn.addEventListener("click", function () {
      location.reload();
    });
    setUpTurn();
  });

  // Set up turn function

  function setUpTurn() {
    game.innerHTML = `<p id="roll-paragraph">Rolling the dice for ${gameData.players[gameData.index]}</p>`;
    actions.innerHTML = `<button id="roll">Roll the Dice</button>`;
    const rollBtn = document.querySelector("#roll");
    rollBtn.addEventListener("click", function () {
      throwDice();
    });
  }

  // Throw dice function

  function throwDice() {
    actions.innerHTML = "";
    let dice1 = Math.floor(Math.random() * 6 + 1);
    let dice2 = Math.floor(Math.random() * 6 + 1);
    gameData.diceTotal = dice1 + dice2;
    console.log(gameData.diceTotal);

    game.innerHTML = `
    <p id="roll-paragraph">Rolling the dice for ${gameData.players[gameData.index]}</p>
    <img src="" id="image1" />
    <img src="" id="image2" />`;

    document.querySelector("#image1").src = gameData.dice[dice1 - 1];
    document.querySelector("#image2").src = gameData.dice[dice2 - 1];

    if (gameData.diceTotal === 2) {
      game.innerHTML += "<p>Snakes eyes! 🎲🎲 Your score is now zeroed out</p>";
      gameData.score[gameData.index] = 0;
      gameData.index ? (gameData.index = 0) : (gameData.index = 1);
      currentScore();
      setTimeout(setUpTurn, 2000);
    } else if (dice1 === 1 || dice2 === 1) {
      gameData.index ? (gameData.index = 0) : (gameData.index = 1);
      game.innerHTML += "<p>You rolled a 1, you get no points and your turn is over!</p>";
      currentScore();
      setTimeout(setUpTurn, 2000);
    } else {
      gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.diceTotal;
      actions.innerHTML = `<button id="rollagain">Roll again</button> or <button id="pass">Pass</button>`;
      document.querySelector("#rollagain").addEventListener("click", function () {
        throwDice();
      });
      document.querySelector("#pass").addEventListener("click", function () {
        gameData.index ? (gameData.index = 0) : (gameData.index = 1);
        setUpTurn();
      });
      checkWinningCondition();
    }
  }

  // Winning condition

  function checkWinningCondition() {
    if (gameData.score[gameData.index] > gameData.gameEnd) {
      score.innerHTML = `<h2>${gameData.players[gameData.index]} has won with ${gameData.score[gameData.index]} points! Congratulations! 🎉 </h2>`;
      actions.innerHTML = "";
      document.querySelector("#roll-paragraph").innerHTML = "";
      document.querySelector("#quit").innerHTML = "Start a New Game?";
      document.querySelector("#h2-title").innerHTML = "The game has ended";
    } else {
      currentScore();
    }
  }

  function currentScore() {
    score.innerHTML = `The current score is: <br>
    ${gameData.players[0]}: ${gameData.score[0]} points<br>
     ${gameData.players[1]}: ${gameData.score[1]} points`;
  }
})();
