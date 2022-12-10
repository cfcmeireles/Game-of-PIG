(function () {
  "use strict";

  const startGame = document.querySelector("#startgame");
  const game = document.querySelector("#game");
  const actions = document.querySelector("#actions");
  const score = document.querySelector("#score");
  const control = document.querySelector("#gamecontrol");
  const player1 = document.querySelector("#player1");
  const player2 = document.querySelector("#player2");
  const player3 = document.querySelector("#player3");

  const gameData = {
    dice: ["images/dice1.png", "images/dice2.png", "images/dice3.png", "images/dice4.png", "images/dice5.png", "images/dice6.png"],
    players: [],
    score: [0, 0, 0],
    dice1: 0,
    dice2: 0,
    diceTotal: 0,
    turnTotal: 0,
    index: 0,
    gameEnd: [],
  };

  // Click event on startBtn to change player names, h2 and btn text

  startGame.addEventListener("click", function () {
    players();
    gameEnd();

    gameData.index = Math.round(Math.random() * 2);
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

  // Player names function

  function players() {
    gameData.players[0] = player1.value;
    gameData.players[1] = player2.value;
    gameData.players[2] = player3.value;
    // If all players fields are empty
    if (player1.value === "" && player2.value === "" && player3.value === "") {
      gameData.players[0] = "Player 1";
      gameData.players[1] = "Player 2";
      gameData.players[2] = "Player 3";
    }
    // If each individual player field is empty
    if (player1.value === "") {
      gameData.players[0] = "Player 1";
    }
    if (player2.value === "") {
      gameData.players[1] = "Player 2";
    }
    if (player3.value === "") {
      gameData.players[2] = "Player 3";
    }
  }

  // Game end function

  function gameEnd() {
    gameData.gameEnd = document.querySelector("#points").value;
    console.log(gameData.gameEnd);
    if (gameData.gameEnd === "") {
      gameData.gameEnd = 30;
    }
  }

  // Set up turn function

  function setUpTurn() {
    game.innerHTML = `<p id="roll-paragraph">Rolling the dice for ${gameData.players[gameData.index]}</p>`;
    actions.innerHTML = `<button id="roll">Roll the Dice</button>`;
    const rollBtn = document.querySelector("#roll");
    rollBtn.addEventListener("click", function () {
      gameData.turnTotal = 0;
      throwDice();
    });
  }

  // Throw dice function

  function throwDice() {
    actions.innerHTML = "";
    let dice1 = Math.floor(Math.random() * 6 + 1);
    let dice2 = Math.floor(Math.random() * 6 + 1);
    gameData.diceTotal = dice1 + dice2;
    gameData.turnTotal += gameData.diceTotal;
    console.log(gameData.diceTotal);
    console.log(gameData.turnTotal);

    game.innerHTML = `
    <p id="roll-paragraph">Rolling the dice for ${gameData.players[gameData.index]}</p>
    <img src="" id="image1" />
    <img src="" id="image2" />`;

    document.querySelector("#image1").src = gameData.dice[dice1 - 1];
    document.querySelector("#image2").src = gameData.dice[dice2 - 1];

    if (gameData.diceTotal === 2) {
      game.innerHTML += "<p>Snakes eyes! 🎲🎲 Your score is now zeroed out</p>";
      gameData.score[gameData.index] = 0;
      switch (gameData.index) {
        case (gameData.index = 0):
          gameData.index = 1;
          break;
        case (gameData.index = 1):
          gameData.index = 2;
          break;
        case (gameData.index = 2):
          gameData.index = 0;
          break;
      }
      currentScore();
      setTimeout(setUpTurn, 2000);
    } else if (dice1 === 1 || dice2 === 1) {
      switch (gameData.index) {
        case (gameData.index = 0):
          currentScoreMinusTotalTurn();
          gameData.index = 1;
          break;
        case (gameData.index = 1):
          currentScoreMinusTotalTurn();
          gameData.index = 2;
          break;
        case (gameData.index = 2):
          currentScoreMinusTotalTurn();
          gameData.index = 0;
          break;
      }
      game.innerHTML += "<p>You rolled a 1, you get no points for this turn and your turn is over!</p>";
      setTimeout(setUpTurn, 2000);
    } else {
      gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.diceTotal;
      actions.innerHTML = `<button id="rollagain">Roll again</button> or <button id="pass">Pass</button>`;
      document.querySelector("#rollagain").addEventListener("click", function () {
        throwDice();
      });
      document.querySelector("#pass").addEventListener("click", function () {
        switch (gameData.index) {
          case (gameData.index = 0):
            gameData.index = 1;
            break;
          case (gameData.index = 1):
            gameData.index = 2;
            break;
          case (gameData.index = 2):
            gameData.index = 0;
            break;
        }
        setUpTurn();
      });
      checkWinningCondition();
    }
  }

  // Winning condition

  function checkWinningCondition() {
    if (gameData.score[gameData.index] >= gameData.gameEnd) {
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
     ${gameData.players[1]}: ${gameData.score[1]} points<br>
     ${gameData.players[2]}: ${gameData.score[2]} points`;
  }

  function currentScoreMinusTotalTurn() {
    gameData.score[gameData.index] = gameData.score[gameData.index] - gameData.turnTotal + gameData.diceTotal;
    score.innerHTML = `The current score is: <br>
    ${gameData.players[0]}: ${gameData.score[0]} points<br>
     ${gameData.players[1]}: ${gameData.score[1]} points<br>
     ${gameData.players[2]}: ${gameData.score[2]} points`;
  }
})();
