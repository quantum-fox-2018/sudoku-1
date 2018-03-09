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

  checkRow(board,row,num){
    for(let i=0; i<board.length; i++){
      if(board[row][i]==num){
        return false;
      }
    }
    return true;
  }

  checkCol(board,col,num){
    for(let i=0; i<board.length; i++){
      if(board[i][col]==num){
        return false;
      }
    }
    return true;
  }

  checkBox(board,row,col,num){
    let baris = Math.floor(row/3)*3;
    let kolom = Math.floor(col/3)*3;
    for(let i=baris; i<baris+3; i++){
      for(let j=kolom; j<kolom+3; j++){
        if(board[baris][kolom]==num){
          return false;
        }
      }
    }
    return true;
  }

  checkAll(board,row,col,num){
    if(this.checkRow(board,row,num) && this.checkCol(board,col,num) && this.checkBox(board,row,col,num)){
      return true;
    }
    return false;
  }

  solve() {
    console.log(this.board);
    console.log(``);
    console.log(`Solved!`);
    let i=0;
    let max = 9;
    while(i<this.empty.length){
      let baris = this.empty[i][0];
      let kolom = this.empty[i][1];
      let num = this.board[baris][kolom]+1;
      let status = false;
      while(!status && num<=max){
        if(this.checkAll(this.board,baris,kolom,num)){
          this.board[baris][kolom] = num;
          i++;
          status = true;
        } else {
          num++;
        }
      }
      if(!status){
        this.board[baris][kolom] = 0;
        i--;
      }
    }
    return this.board;
  }
}

var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string);
game.solve()
console.log(game.board);
