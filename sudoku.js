"use strict"

class Sudoku {
  constructor(board_string) {
    this.board = this.createboard();
    this.zero = this.checkzero();
  }

  solve() {
    while (this.zero.length != 0) {
    // for(let i = 0; i < this.zero.length; i++){
      let i = 0;
      let r0 = this.zero[i][0];
      let c0 = this.zero[i][1];
      i++;
      for(let j=1; j<=9; j++){
        if(this.checkkolom(j, c0) == true && this.checkbaris(j, r0) == true && this.checkgrid(j, r0, c0) == true){
          this.board[r0][c0] = j;
          this.reset_board();
          console.log(this.board)
          break;
        // } else {
          // console.log('test salah');
        }
      }
      if (this.board[r0][c0] == 9) {
        this.board[r0][c0] = 0;
        i -= 1;
      }
    // }
    }
    return 'biar gak undefined HO HO HO';
  }

  // Returns a string representing the current state of the board
  createboard() {
    let arrBoard = [];
    let index = 0;
    for(let j = 0; j < 9; j++) {
      let arrInner = [];
      for (let i = 0; i < 9; i++) {
        arrInner.push(Number(board_string[index]));
        index++;
      }
      arrBoard.push(arrInner);
    }
    return arrBoard;
  }

  checkzero() {
    let arrZeroPosition = [];
    for(let i = 0; i < this.board.length; i++){
      for (let j = 0; j < this.board[i].length; j++) {
        let arrInner = [];
        if(this.board[i][j] == 0){
            arrInner.push(i);
            arrInner.push(j);
            arrInner.push(this.board[i][j]);
            arrZeroPosition.push(arrInner);
        }
      }
    }

    //STRING METHOD
    // for(let i=0; i<board_string.length; i++){
    //   if(board_string[i] == 0){
    //     arrZeroPosition.push(i)
    //   }
    // }

    return arrZeroPosition;
  }

  checkbaris(num,row) {
    if(this.board[row].indexOf(num) != -1) {
      return false;
    }
    return true;
  }

  checkkolom(num,col) {
    for (let i = 0; i < this.board.length; i++) {
      if(this.board[i][col] == num) {
        return false;
      }
    }
    return true;
  }

  checkgrid(num,row,col) {
    let baris = Math.floor(row/3)*3;
    let kolom = Math.floor(col/3)*3;
    for (let i = baris; i < baris+3; i++) {
      for (let j = kolom; j < kolom+3; j++) {
        if (this.board[i][j] ==  num) {
          return false;
        }
      }
    }
    return true;
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
// console.log(board_string);

// Remember: this will just fill out what it can and not "guess"
console.log(game.createboard());

console.log(game.solve());
// console.log(game.checkgrid(9,0,0));


//----------------------------------------------------
//----------------------------------------------------
//----------------------------------------------------
// TEST BARIS
let index = 0;
let arrInner = [];
for (let i = 0; i < 9; i++) {
  arrInner.push(board_string[index]);
  index++;
}

// console.log('before',arrInner);

// SAVE POSITION ZERO
let arrZeroPosition = [];
let arrSaveNumber = [];
for (let i = 0; i < arrInner.length;i++) {
  if (arrInner[i] == 0) {
    arrZeroPosition.push(i);
  } else {
    arrSaveNumber.push(arrInner[i]);
  }
}
// console.log('Posisi 0',arrZeroPosition);
// console.log('Save number',arrSaveNumber.sort());

// SAVE NUMBER
let input = [1,2,3,4,5,6,7,8,9];
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < arrSaveNumber.length; j++) {
    if (input[i] == arrSaveNumber[j]) {
      input.splice(input.indexOf(input[i]),1);
    } 
  }
}

let arrPossibleNumber = [];
for (let i = 0; i < input.length; i++) {
  arrPossibleNumber.push(input[i]);
}

// console.log('Possibility',arrPossibleNumber);

// INSERT TO INNER
let point = 0;
for (let i = 0; i < arrInner.length; i++) {
  if (arrInner[i] == 0) {
    arrInner[i] = arrPossibleNumber[point];
    point++;
  }
}

// console.log('after',arrInner)