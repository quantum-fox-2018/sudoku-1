"use strict"

class Sudoku {
  constructor(board_string) {

    this.num = board_string
  }

  emptyBoards () {

    let board = this.board()
    /* find emty boards */
    let emptyBoards = []

    for (let i = 0; i < board.length; i++) {
      
      for (let j = 0; j < board[i].length; j++) {
        
        if(board[i][j] === 0) {

          let tempBoard = {

            value: board[i][j],
            row: i,
            col: j
          }

        emptyBoards.push(tempBoard)
        }
      }
    }

    return emptyBoards 
  }//end of empty boards

  checkRow(board, target, num) {

    for (let i = 0; i < board[target.row].length; i++) {
      
      if(board[target.row][i] === num) {

        return false
      }
    }

    return true
  }// end of check row

  checkColumn(board, target, num) {

    for (let i = 0; i < board[target.col]; i++) {
      
      if(board[i][target.col] === num) {

        return false
      }
    }

    return true
  }// end of check column

  checkSmallBoard (board, target, num) {

    for (let i = (target.row - (target.row % 3)); i < 3; i++) {
      
      for (let j = (target.col - (target.col % 3)); j < 3; j++) {
        
        if(board[i][j] === num) {

          return false
        }
      }
    }

    return true
  }// end of check small board

  finalCheck (board, target, num) {

    if (this.checkColumn(board, target, num) && this.checkRow(board, target, num) && this.checkSmallBoard(board, target, num)) {

      return true
    }

    return false
  }// end of final check

  solve() {

    let board = this.board()
    let target = this.emptyBoards()

    let min = 0
    let max = 9

    while(min < target.length) {

      let row = target[min].row
      let col = target[min].col
      let value = board[row][col] + 1

      let match = false

      while(!match && value <= max) {

        if(this.finalCheck(board, target[min], value)) {

          match = true
          board[row][col] = value
          min++
        } else {

          value++
        }
      }

      if(match === false) {

        board[row][col] = 0
        min--
      }
    } 
      
    return board
   }// end of solve

  // Returns a string representing the current state of the board
  board() {

    let num = this.num
    let board = []
    let counter = 0

    for (let i = 0; i < 9; i++) {
        
        let tempBoard = []

        for (let j = 0; j < 9; j++) {

            tempBoard.push(Number(num[counter]))
            counter += 1
        }

        board.push(tempBoard)            
    }

    return board
  }

  sleep(milliseconds) {
    let start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }
  
  reset_board() {
    console.log("\x1B[2J")
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
console.log(game.solve())

// game.board()

/*Noted */
// Tugas ini bisa selesai karena
// https://www.codefellows.org/blog/sudoku-solver-from-scratch-in-javascript-tdd-style-a-tutorial/