"use strict"

class Sudoku {
  constructor(board_string) {}

  solve(problem) {

  }


  board(board_string) {
    var angka  = board_string.toString();
    var arrBlock = [];
    var tmp = [];
    for(var i = 0 ; i < angka.length ;i++){
      tmp.push(angka[i]);
      if(tmp.length === 9){
        arrBlock.push(tmp);
        tmp=[];
      }
    }
    return arrBlock;
  }
}






var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()

console.log(game.board())


// 105802000090076405200400819019007306762083090000061050007600030430020501600308900;
