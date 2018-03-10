"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string
    this.boardContent = this.board(board_string)
    this.nolArr = this.nolValue(board_string)
  }

  solve() {
    for (let i = 0; i < this.nolArr.length; i++) {
      let row = this.nolArr[i][0]
      let col = this.nolArr[i][1]

      for (let j = this.boardContent[row][col] + 1; j < 11; j++) {
        if (this.checkRow(row, j) === true && this.checkCol(col, j) === true && this.checkArea(row, col, j) === true) {
          this.boardContent[row][col] = j
          break
        }
      }

      if (this.boardContent[row][col] > 9) {
        this.boardContent[row][col] = 0
        i -= 2
      }
    }
    console.log(this.boardContent); 
  }

  // Returns a string representing the current state of the board
  board() {
    let boardArr = []
    let counterNum = 0
    for (let i = 0; i < Math.sqrt(this.board_string.length); i++) {
      boardArr.push([])
      for (let j = 0; j < Math.sqrt(this.board_string.length); j++) {
        boardArr[i].push(Number(board_string[counterNum]))
        counterNum++
      }
    }
    return boardArr
  }

  nolValue() {
    let nolArr = []
    let counterNum = 0
    for (let i = 0; i < Math.sqrt(this.board_string.length); i++) {
      for (let j = 0; j < Math.sqrt(this.board_string.length); j++) {
        if (board_string[counterNum] === '0') {
          nolArr.push([i, j])
        }
        counterNum++
      }
    }
    return nolArr
  }


  checkRow(row, num) {
    let bound = 0
    for (let i = 0; i < Math.sqrt(this.board_string.length); i++) {
      if (this.boardContent[row][i] === num) {
        bound++
      }
    }
    if (bound > 0) {
      return false
    }
    else{
      return true
    }

  }

  checkCol(col, num) {
    let bound = 0
    for (let i = 0; i < Math.sqrt(this.board_string.length); i++) {
      if (this.boardContent[i][col] === num) {
        bound++
      }
    }
    if (bound > 0) {
      return false
    }
    else{
      return true
    }
  }

  checkArea(row, col, num) {
    let bound = 0
    let rowArea = Math.floor(row / 3) * 3
    let colArea = Math.floor(col / 3) * 3
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.boardContent[rowArea + i][colArea + j] === num) {
          bound++
        }
      }
    }
    if (bound > 0) {
      return false
    }
    else{
      return true
    }
  }

}
// The file has newlines at the end of each line,
// so we call split to remove it (\n)
let fs = require('fs')
let board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[3]

let game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve();

// console.log(game.board())
