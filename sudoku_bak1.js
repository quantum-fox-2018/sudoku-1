"use strict"

class Sudoku {
  constructor(board_string) {
    this._boardString = board_string
  }

  solve() {}

  // Returns a string representing the current state of the board
  board() {
    let arrBoard = []
    let count = 0
    
    for(let i=0; i<9; i++){
      let inside = []
      for(let j=0; j<9; j++){
        inside.push(this._boardString[count])
        count++
      }
      arrBoard.push(inside)
    }
    return arrBoard
  }

  checkZero(){
    let zeroPos = []
    let boardGame = game.board()
    
    for(let i=0; i<boardGame.length; i++){
      let inside = []
      for(let j=0; j<boardGame.length; j++){
        if(boardGame[i][j] == 0){
          inside.push([i,j])
        }
      }
      zeroPos.push(inside)
    } 
    return zeroPos
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

// console.log(game);
console.log(game.checkZero());
 
// console.log(game.board())
