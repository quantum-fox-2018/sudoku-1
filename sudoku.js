"use strict"

class Sudoku {
  constructor(board_string) {
    this.board = [];
    this.unsolved = board_string;
    this.arr = [];
  }

  // Returns a string representing the current state of the board
  boards() {
    // var nums = "105802000090076405200400819019007306762083090000061050007600030430020501600308900";
    var mark = 0;
    var arrDalam = [];
    for(var i = 0; i < this.unsolved.length; i++) {
      arrDalam.push(this.unsolved[i]);
      mark++;
      if(mark === 9) {
        this.board.push(arrDalam);
        arrDalam = [];
        mark = 0;
      }
    }
    return this.board;
  }

  checkRow(row, col) {
    var num = this.board[row][col];
    for(var i = 0; i < this.board.length; i++) {
      if(this.board[row][i] == num && i !== col) {
        return false;
      }
    }
    return true;
  }

  checkCol(row, col) {
    var num = this.board[row][col];
    for(var i = 0; i < this.board.length; i++) {
      if(this.board[i][col] == num && i !== row) {
        return false;
      }
    }
    return true;
  }

  checkSquare(row, col) {
    var baris = Math.floor(row/3)*3;
    var kolom = Math.floor(col/3)*3
    var num = this.board[row][col];
    for(var i = baris; i < baris + 3; i++){
      for(var j = kolom; j < kolom + 3; j++) {
        if(this.board[i][j] == num && i !== row && j !== col) {
          return false;
        }
      }
    }
    return true;
  }

  printBoard() {
    for(var i = 0; i < this.board.length; i++) {
      var str = '';
      for(var j = 0; j < this.board[i].length; j++) {
        str += this.board[i][j];
        if(j === 2 || j === 5) {
          str += '|';
        }
      }
      if(i === 2 || i === 5 || i === 8) {
        str += '\n' + '-----------';
      }
      console.log(str);
    }
  }

  checkZero() {
    for(var i = 0; i < this.board.length; i++) {
      var arr2 = [];
      for(var j = 0; j < this.board[i].length; j++) {
        if(this.board[i][j] === '0') {
          arr2.push(i);
          arr2.push(j);
          this.arr.push(arr2);
          arr2 = [];
        }
      }
    }
    console.log(this.arr);
  }

  solve() {
    for(var i = 0; i < this.arr.length; i++) {
      let row = this.arr[i][0];
      let col = this.arr[i][1];
      var boolean = false;
      let num = this.board[row][col];
      while(num != 9) {
        num++;
        this.board[row][col] = num;
        if(this.checkCol(row, col) && this.checkRow(row, col) && this.checkSquare(row, col)) {
          boolean = true;
          break;
        }
      }
      if(boolean === false) {
        this.board[row][col] = 0;
        if(i === 0) {
          i--;
        } else {
          i-=2;
        }
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
//console.log(game);

// Remember: this will just fill out what it can and not "guess"
game.boards();
game.checkZero();
game.solve();

//console.log(game.boards())

game.printBoard();
