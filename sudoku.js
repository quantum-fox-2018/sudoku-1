/*jshint esversion:6*/
/*jshint -W097*/
/*jshint -W117*/

"use strict";

class Sudoku {
  constructor(board_string) {
    this.boardString = board_string;
    // this.emptyPosition = this.checkNolPositions();

  }

  board() {
    let arrRow = [];
    let board = [];
    for (let i = 0; i < this.boardString.length; i++) {
      arrRow.push(+(this.boardString)[i]);
      if (arrRow.length == 9) {
        board.push(arrRow);
        arrRow = [];
      }
    }
    return board;
  }

  checkRow(board, row, value) {
    for (let i = 0; i < board[row].length; i++) {
      if (board[row][i] === value)
        return false;
    }
    return true;
  }

  checkColumn(board, column, value) {
    for (let i = 0; i < board.length; i++) {
      if (board[i][column] === value)
        return false;
    }
    return true;
  }

  checkBox(board, column, row, value) {
    let cornerRow = 0;
    let cornerColumn = 0;
    let dimension = 3;
    let boardGame = this.board();

    while (column >= cornerColumn + dimension) {
      cornerColumn += dimension;
    }

    while (row >= cornerRow + dimension) {
      cornerRow += dimension;
    }

    for (let i = cornerRow; i < cornerRow + dimension; i++) {
      for (let j = cornerColumn; j < cornerColumn + dimension; j++) {
        if (boardGame[i][j] === value) {
          return false;
        }
      }
    }
    return true;
  }

  checkValue(board, column, row, value) {
    if (this.checkRow(board, row, value) && this.checkColumn(board, column, value) && this.checkBox(board, column, row, value)) {
      return true;
    } else {
      return false;
    }
  }

  solve() {
    let limit = 9;
    let total = 0;
    let emptyPosition = this.checkNolPositions();
    let board = this.board();


    for (let i = 0; i < emptyPosition.length;) {
      let row = emptyPosition[i][0];
      let column = emptyPosition[i][1];
      let value = board[row][column] + 1;
      let found = false;

      while (!found && value <= 9) {
        total++;
        if (this.checkValue(board, column, row, value)) {
          found = true;
          board[row][column] = value;
          i++;
        } else {
          value++;
        }
      }
      if (!found) {
        board[row][column] = 0;
        i--;
      }
    }
    return board;
  }

  checkNolPositions() {
    let indexValueNol = [];
    let board = this.board();
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0);
        indexValueNol.push([i, j]);
      }
    }
    return indexValueNol;
  }
}


// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs');
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0];

var game = new Sudoku(board_string);

// Remember: this will just fill out what it can and not "guess"
console.log(`Sudoku Challenge :`);
console.log(game.board());
console.log('');
console.log(`sudoku solution :`);
// console.log(game.solve());
console.log(game.checkBox());
console.log(game.checkRow([0], 0, 4));
console.log(game.checkColumn([0], 1, 5));
