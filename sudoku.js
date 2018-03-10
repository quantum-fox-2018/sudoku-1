"use strict"

class Sudoku {
  constructor(board_string) {
    this.unsolved = board_string
  }

  solve() {
    let arrBoard = this.board();

    let emptyCoordinate = this.getEmptyCoordinate(arrBoard);

    let i = 0;

    while (i < emptyCoordinate.length) {
      let row = emptyCoordinate[i][0];
      let col = emptyCoordinate[i][1];
      let guessNum = arrBoard[row][col] + 1;
      let proceedStatus = false;

      while (!proceedStatus && guessNum <= 9) {
        proceedStatus = this.checkAll(arrBoard, row, col, guessNum);
        if (proceedStatus === true) {
          arrBoard[row][col] = guessNum;
          i++
        } else {
          guessNum++;
        }
      }
    }

    console.log(arrBoard);
  }

  // Returns a string representing the current state of the board
  board() {
    let boardLength = 9;
    let numString = this.unsolved;
    let arrBoard = [];

    for (let i = 0; i < boardLength; i++) {
      let arrRow = [];
      let newString = numString.slice(0,9);

      for (let j = 0; j < newString.length; j++) {
        arrRow.push(Number(newString.charAt(j)));
      }
      numString = numString.slice(9);
      arrBoard.push(arrRow);
    }
    return arrBoard
  }

  getEmptyCoordinate(arrBoard) {
    let emptyCoord = [];

    for (let i = 0; i < arrBoard.length; i++) {
      for (let j = 0; j < arrBoard[i].length; j++) {
        if (arrBoard[i][j] === 0) {

          emptyCoord.push([i,j])
        }
      }
    }
    return emptyCoord;
  }

  checkAll (arrBoard, row, col, guessNum) {
    if (this.checkGroup(arrBoard, row, col, guessNum)) {
      return true;
    }
    return false;
  }

  checkRow (arrBoard, row, guessNum) {
    for (let i = 0; i < arrBoard[row].length; i++) {
      if (arrBoard[row][i] === guessNum) {
        return false;
      }
    }
    return true;
  }

  checkCol (arrBoard, col, guessNum) {
    for (let i = 0; i < arrBoard[col].length; i++) {
      if (arrBoard[i][col] === guessNum) {
        return false;
      }
    }
    return true;
  }

  checkGroup (arrBoard, row, col, guessNum) {
    let row0 = Math.floor(row / 3) * 3;
    let col0 = Math.floor(col / 3) * 3;

    for (let i = row0; i < row0+3; i++) {
      for (let j = col0; j < col0+3; j++) {
        if (arrBoard[i][j] === guessNum) {
          return false;
        }
      }
    }
    return true;
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
game.solve()
console.log('');
console.log(game.board())
