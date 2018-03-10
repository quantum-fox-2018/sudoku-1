"use strict"

class Sudoku {
  constructor(boardString) {
    this.board = this.generateBoard(boardString)
    this.cordinateNull = this.findNull(boardString)
  }

  findNull(str) {
    let count = 0;
    let arr = [];
    for(let i=0; i<9; i++){
      for(let j=0; j<9; j++){
        if(str[count] == '0'){
          arr.push([i,j])
        }
        count++;
      }
    }
    return arr;
  }

  // Returns a string representing the current state of the board
  generateBoard(str) {
    let count = 0;
    let bigBoard = [];
    for(let i=0; i<9; i++){
      let row = [];
      for(let j=0; j<9; j++){
        row.push(Number(str[count]))
        count++;
      }
      bigBoard.push(row)
    }
    return bigBoard;
  }

  checkHorizontal(x, number){   // udah bener
    // console.log(this.board[x])
    for(let i=0; i<this.board.length; i++){ 
      if(this.board[x][i] == number){
        return false;
      }
    }
    return true;
  }

  checkVertikal(y,number){ // udah bener
    for(let i=0; i<this.board.length; i++){
      if(this.board[i][y] == number){
        return false;
      }
    }
    return true;
  }

  checkKotak(x,y,number){
    let corX = Math.floor(x/3)*3
    let corY = Math.floor(y/3)*3
    for(let i=corX; i<corX+3; i++){
      for(let j=corY; j<corY+3; j++){
        if(this.board[i][j] == number){
          return false;
        }
      }
    }
    return true;
  }

  checkAllPosition(x, y, number){
    if(this.checkHorizontal(x,number) == true && this.checkVertikal(y, number) == true && this.checkKotak(x,y,number) == true){
      console.log(`angka (${number}) - - - - - - - - - - - <<<<<< KOSONG`)
      // this.board[x][y] = 'x'
      return true;
    } else {
      console.log(`angka (${number}) ada`)
      return false;
    }
  }

  solve() {
    this.board[0][1] = 11;
    console.log(this.cordinateNull.length)
    // while(this.cordinateNull == null){  
      let number = 1;
      while(number <= 9){
        if(this.checkAllPosition(0,1,number) == true){
          console.log(`Assign angka=${number}`)
          
        }
        number++;
      }
    // }
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

console.log(game.board)