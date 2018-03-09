"use strict"

class Sudoku {
  constructor(board_string) {
    this.unsolved=board_string

  }

  solve() {}

  // Returns a string representing the current state of the board
  board() {
    var str = this.unsolved
    var kotak=[]
    var index=0
    for (var i = 0; i < 12; i++) {
      let kotakTmp=[]
      if(i==3||i==7||i==11){
        for (var k = 0; k < 11; k++) {
          kotakTmp.push('_')
        }
      }else{
        for (var k = 0; k < 11; k++) {
          if(k==3||k==7){
          kotakTmp.push('|')
        }else{
          kotakTmp.push(str[index])
          index++
        }
        }
      }
      kotak.push(kotakTmp.join(' '))
    }
      return kotak.join('\n')
  }

}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)
console.log(game)
// Remember: this will just fill out what it can and not "guess"
game.solve()

console.log(game.board())
