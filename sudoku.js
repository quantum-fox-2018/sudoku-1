"use strict"

class Sudoku {
  constructor(board_string) {
    this._boardString = board_string
    this._boardGame = this.board()
  }

  solve() {
    let row = 0
    let col = 0
    let runBoard = this.board()
    let zeroPos = this.checkZero()
    
    for(let i=0; i<zeroPos.length; i++){
      row = Math.floor(zeroPos[i]/9)
      col = zeroPos[i]%9

      for(let j=this._boardGame[row][col]; j<=10; j++){
        // console.log(row);
        // console.log('====',col);
        if(this.checkColumn(col, j) && this.checkRow(row, j) && this.checkArea(row, col, j)){
          this._boardGame[row][col] = j.toString()
          this.sleep(200)
          console.log(this._boardGame)
          console.log('======CHECKING PROCESS======')
          break;
        }
      }
      if(this._boardGame[row][col] > 9){ //kembalikan angka 10 ke 0
        this._boardGame[row][col] = '0'
        i -= 2
      }
    }
    console.log(this._boardGame);
    
  }

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
    
    
    for(let i=0; i<this._boardString.length; i++){
      if(this._boardString[i] == '0'){
        zeroPos.push(i)
      }
    } 
    return zeroPos
  }
  
  checkRow(row, num){
    // let boardGame = this.board()
    // console.log('==',boardGame[row]);
    
    if(this._boardGame[row].indexOf(num.toString()) != -1){
      return false
      // console.log(num);
    }
    return true
  }

  checkColumn(col, num){
    // let boardGame = this.board()
    for(let i=0; i<9; i++){
      if(this._boardGame[i][col] == num){
        return false
      }
    }
    return true
  }

  checkArea(row, col, num){
    // let boardGame = this.board()
    row = Math.floor(row/3)*3
    col = Math.floor(col/3)*3

    for(let i=row; i<row+3; i++){
      for(let j=col; j<col+3; j++){
        if(this._boardGame[i][j] == num){
          return false
        }
      }
    }
    return true
  }

  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
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

// game.checkRow()

