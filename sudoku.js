"use strict"

class Sudoku {
  constructor(board_string) {
    this.unsolved = board_string;
  }

  solve() {
    let mainBoard = this.board();
    let boardZero = this.findZeroIndex();
    let num = 1;
    let row = boardZero[0][0];
    let column = boardZero[0][1];
    let foundNum = false;
    let numberOnBoard = 9;
    this.horizontalChecking(mainBoard, row, num);
    this.verticalChecking(mainBoard, column, num);
    this.squareChecking(mainBoard, row, column, num);
    this.checkAllChecker(mainBoard, column, row, num);
    let i;
    for (i = 0; i < boardZero.length; i++) {
      row = boardZero[i][0];
      column = boardZero[i][1];
      num = boardZero[row][column] + 1;
      foundNum = false;

      while (!foundNum && num <= numberOnBoard) {
        if (this.checkAllChecker(mainBoard, column, row, num)) {
          foundNum = true;
          mainBoard[row][column] = num;
          i++;
        } else {
          num++;
        }
      }

      if (!foundNum) {
        mainBoard[row][column] = 0;
        i--;
      }
    }

    return console.log(mainBoard);
  }

  findZeroIndex() {
    let board = this.board();
    let indexZero = [];

    for (let i = 0; i < board.length; i++) {
      let item = board[i];
      for (let j = 0; j < item.length; j++) {
        if (item[j] === 0) {
          indexZero.push([i, j]);
        }
      }
    }

    return indexZero;
  }

  horizontalChecking(board, row, num) {
    debugger;
    for (let i = 0; i < board.length; i++) {
      if (board[row][i] === num) {
        return false;
      }
    }

    return true;
  }

  verticalChecking(board, col, num) {
    for (let i = 0; i < board.length; i++) {
      if (board[i][col] === num) {
        return false;
      }
    }

    return true;
  }

  squareChecking(board, col, row, num) {
    let colCorner = 0;
    let rowCorner = 0;
    let squareSize = 3;

    while (col >= colCorner + squareSize) {
      colCorner += squareSize;
    }

    while (row >= rowCorner + squareSize) {
      colCorner += squareSize;
    }

    for (let i = rowCorner; i < rowCorner + squareSize; i++) {
      for (let j = colCorner; j < colCorner + squareSize; j++) {
        if (board[i][j] === num) {
          return false;
        }
      }
    }

    return true;
  }

  checkAllChecker(board, col, row, num) {
    if (this.horizontalChecking(board, row, num) && this.verticalChecking(board, col, num) && this.squareChecking(board, col, row, num)) {
      return true;
    } else {
      return false;
    }
  }


  // Returns a string representing the current state of the board
  board() {
    let numberstr = this.unsolved;
    let boardOfSudoku = [];
    let index = 0;

    for (let i = 0; i < 9; i++) {
      let temp = [];
      for (let j = 0; j < 9; j++) {
        temp.push(Number(numberstr[index]));
        index++;
      }

      boardOfSudoku.push(temp);
    }

    return boardOfSudoku;
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve();

// console.log(game.board());
console.log(horizontalChecking(game.board(), 0, 2));