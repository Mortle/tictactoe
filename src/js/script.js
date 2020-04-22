"use strict";

const $ = require("jquery");

$("document").ready(function () {

  let currentPlayer = "x";
  let gameEnded = false;
  let winner;

  const winConditions = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 5, 9], [3, 5, 7], [1, 4, 7], [3, 6, 9], [2, 5, 8]];

  const validateMove = function validateMove(tile) {
    return $(tile).hasClass("game-field__tile_free");
  };

  const makeMove = function makeMove(tile) {
    $(tile).removeClass("game-field__tile_free");
    $(tile).addClass(`game-field__tile_${currentPlayer}-played`);
    currentPlayer = currentPlayer === "x" ? "o" : "x";
  };

  const checkGameEnded = function checkGameEnded() {
    for (let i = 0; i < winConditions.length; i += 1) {
      let xScore = 0;
      let oScore = 0;
      for (let j = 0; j < winConditions[i].length; j += 1) {
        if ($(`#tile-${winConditions[i][j]}`).hasClass("game-field__tile_x-played")) {
          xScore += 1;
        } else if ($(`#tile-${winConditions[i][j]}`).hasClass("game-field__tile_o-played")) {
          oScore += 1;
        }
      }
      if (xScore === 3) {
        gameEnded = true;
        winner = "x";
        return true;
      }
      if (oScore === 3) {
        gameEnded = true;
        winner = "o";
        return true;
      }
    }
    return false;
  };

  const checkDraw = function checkDraw() {
    for (let i = 1; i <= 9; i += 1) {
      if ($(`#tile-${i}`).hasClass("game-field__tile_free")) {
        return false;
      }
    }
    return true;
  };

  const resetGame = function resetGame() {
    $(".game-field__tile").removeClass("game-field__tile_x-played");
    $(".game-field__tile").removeClass("game-field__tile_o-played");
    $(".game-field__tile").addClass("game-field__tile_free");
    $(".game-log").removeClass("game-log_o-won");
    $(".game-log").removeClass("game-log_x-won");
    $(".game-log").removeClass("game-log_draw");
    $(".game-log").html("");
    currentPlayer = "x";
    gameEnded = false;
  };

  $(".game-field__tile").click(function() {
    if (!gameEnded && validateMove(this)) {
      makeMove(this);
    }
    if (checkGameEnded()) {
      if (winner === "x") {
        $(".game-log").addClass("game-log_x-won");
        $(".game-log").html("X-player won!");
      } else if (winner === "o") {
        $(".game-log").addClass("game-log_o-won");
        $(".game-log").html("O-player won!");
      }
    } else if (checkDraw()) {
      $(".game-log").addClass("game-log_draw");
      $(".game-log").html("Draw!");
    }
  });

  $("#reset-button").click(resetGame);
});
