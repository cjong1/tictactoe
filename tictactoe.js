
// Using NaN instead of null is a clever hack. See checkForWinner for details.
var spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
];

var player1 = prompt("Player 1, what is your name?");
  if (player1 === "" || player1 === null) {
    player1 = "Player 1";
  }

var player1Image = prompt("Player 1, enter your image link: ");
  if (player1Image === "" || player1Image === null ) {
    player1Image = "house.jpg";
  }

var player2 = prompt("Player 2, what is your name?");
  if (player2 === "" || player2 === null) {
    player2 = "Player 2";
  }

var player2Image = prompt("Player 2, enter your image link: ");
  
  if (player2Image === "" || player2Image === null) {
    player2Image = "palace.jpg";
  }


var currentPlayer = null;


var playerTurn = 0;
var className;
var gameOver = false;


var player1Wins = 0;
var player1Losses = 0;
var player2Wins = 0;
var player2Losses = 0;


var setNextTurn = function () {
  // game still on.
  if (gameOver === false) {
      if (currentPlayer === player1) {
        currentPlayer = player2;
      }
      else {
        currentPlayer = player1;
      }
      $('#turn-label').text("It's " + currentPlayer + "'s turn!");
  }
  // game is over.
  else {
      $('#turn-label').text("Game Over!"); // changes label from player's turn to game over
      $('#board').addClass("unclickable");
    }
};


// Check for three in a row
var checkForWinner = function () {
  // Because (NaN === NaN) is always false, we can safely assume
  // that if three spaces in a row are the same, all three spaces are
  // marked by a player, and not all empty.

  if  (spaces[0] === spaces[1] && spaces[1] === spaces[2] // row check
    || spaces[3] === spaces[4] && spaces[4] === spaces[5] // row check
    || spaces[6] === spaces[7] && spaces[7] === spaces[8] // row check
    || spaces[0] === spaces[3] && spaces[3] === spaces[6] // vertical check
    || spaces[1] === spaces[4] && spaces[4] === spaces[7] // veritcal check
    || spaces[2] === spaces[5] && spaces[5] === spaces[8] // vertical check
    || spaces[0] === spaces[4] && spaces[4] === spaces[8] // diagonal check
    || spaces[2] === spaces[4] && spaces[4] === spaces[6] // diagonal check
  )
  {
    console.log('Somebody won!');
    onGameWin(currentPlayer);
  }
  else if (playerTurn === 9) {
    gameOver = true;
    alert("It's a tie!");
  }
};

// Act of player clicking on a space on the board
$(document).on('click', '#board .space', function (e) {
  var spaceNum = $(e.currentTarget).index();
  console.log('You clicked on space #' + spaceNum);

  if ((spaces[spaceNum] === player1) || (spaces[spaceNum] === player2)) {
    alert("Space is taken. Pick another."); // player to pick another space. space is taken.
  } 
  else {
    playerTurn++;
      // indicates whose turn it is and which visual to display using className
      if (playerTurn % 2 === 0) {
        className = "player2";
        $('#board .space:eq(' + spaceNum + ')').css("background-image", "url("+player2Image+")");
      }
      else {
        className = "player1";
        $('#board .space:eq(' + spaceNum + ')').css("background-image", "url("+player1Image+")");
      };
    // Marks the space with the current player's name
    spaces[spaceNum] = currentPlayer;
    // Adds a class to elem so css can take care of the visuals
    $('#board .space:eq(' + spaceNum + ')').addClass(className);

  checkForWinner();
  setNextTurn();

  }
});


// Keep track of wins and losses for each player
function onGameWin (winner) {
  alert(winner + " wins!");
  gameOver = true;

  // counter for players' wins and losses
 if (currentPlayer === player1) {
      player1Wins++;
      player2Losses++;
      $('#board .space.player1').fadeOut('slow').fadeIn('slow');
  }
  else {
    player2Wins++;
    player1Losses++;
    $('#board .space.player2').fadeOut('slow').fadeIn('slow');
  };

  // visual for players' wins and losses
  $('#player1WinLoss').text(player1 + "'s Wins: " + player1Wins + ", Losses: " + player1Losses);
  $('#player2WinLoss').text(player2 + "'s Wins: " + player2Wins + ", Losses: " + player2Losses);
}


// Start the game
setNextTurn();


// Button for new players and to reset wins and losses
$('#newPlayersButton').click(function() {

  clearBoard();

  // remove existing players' wins/losses counter
  $('#player1WinLoss').text("");
  $('#player2WinLoss').text("");

  // asks for new players' names and avatars
  $('#turn-label').text("Let's play Tic Tac Toe!");

  player1 = prompt("Player 1, what is your name?");
    if (player1 === "" || player1 === null) {
    player1 = "Player 1";
    }

  player1Image = prompt("Player 1, enter your image link: ");
    if (player1Image === "" || player1Image === null) {
    player1Image = "img/veggies.jpg";
    }

  player2 = prompt("Player 2, what is your name?");
    if (player2 === "" || player2 === null) {
    player2 = "Player 2";
    }

  player2Image = prompt("Player 2, enter your image link: ");
    if (player2Image === "" || player2Image === null) {
    player2Image = "img/junkfood.jpg";
    }

  // reset player wins and losses
  player1Wins = 0;
  player1Losses = 0;
  player2Wins = 0;
  player2Losses = 0;

  setNextTurn();
});


// Button for existing players to continue playing with the records of wins and losses
$('#oldPlayersButton').click(function() {

  clearBoard();

  setNextTurn();
});


var clearBoard = function() {

    // removes images from spaces
  $('#board .space').css("background-image","");

  // removes class
  $('#board .space').removeClass("player2").removeClass("player1");

  // removes player names from each space
  spaces = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN];

  // makes board clickable again
  $('#board').removeClass('unclickable');

  currentPlayer = null;
  playerTurn = 0;
  gameOver = false;

};