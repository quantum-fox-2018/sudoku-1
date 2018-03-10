"use strict"

class Sudoku {
  constructor(board_string) {
    this.board = this.generateBoard(board_string);
    this.empty = this.zeroPosition();
  }

  zeroPosition(){
    let arrayOfZero = [];
    for(let j=0; j<this.board.length; j++){
      for(let k=0; k<this.board[j].length; k++){
        if(this.board[j][k]==0){
          arrayOfZero.push([j,k]);
        }
      }
    }
    return arrayOfZero;
  }

  generateBoard(input){
    let board = [];
    let line = [];
    for(let i=0; i<input.length; i++){
      if(i%9==0){
        board.push(line);
        line = [];
        line.push(Number(input[i]));
      } else {
        line.push(Number(input[i]));
      }
    }
    board.push(line);
    board.shift();
    return board;
  }

  solve() {

  }
}

var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string);
game.solve()
console.log(game.board);
