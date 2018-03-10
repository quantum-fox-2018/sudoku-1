"use strict"

/**
 * SOLVING ROWS
 * =================
 * 1. Check angka apa aja yg udh ada
 * 2. Tambahkan angka yang belum ada
 */

class Sudoku {
  constructor(board_string) {
    this.board = this.toArr(board_string);
    this.emptySpace = this.findEmptySpace(this.board);

  }

  findEmptySpace(arrBoard){
    let arr1 = [];
    for(let counter=0; counter<arrBoard.length; counter++){
      for(let counter2=0; counter2<arrBoard[counter].length; counter2++){
        let arr2 = [];
        if(arrBoard[counter][counter2] === '0'){
          //last element is for looping indicator
          arr2.push(counter, counter2, 0);
          arr1.push(arr2);
        }
      }
    }
    return arr1;
  }

  toArr(board_string){
    let result = [];
    let num = 0;
    for(let counter=0; counter<9; counter++){
      let row = [];
      for(let counter2=0; counter2<9; counter2++){
        row.push(board_string.charAt(num));
        num++;
      }
      result.push(row);
    }
    return result;
  }


  solveRow(num, row){
    for(let counter =0; counter<9; counter++){
      if(this.board[row][counter] === num.toString()){
        return false;
      }
    }
    return true;
  }

  solveCol(num, column){
    for(let counter=0; counter<9; counter++){
      if(this.board[counter][column] === num.toString()){
        return false;
      }
    }
    return true;
  }

  checkBox(num, row, col){
    for(let counter = row-3; counter<row; counter++){
      for(let counter2 = col-3; counter2<col; counter2++){
        if(this.board[counter][counter2] === num.toString()){
          return false;
        }
      }
    }
    return true;
  }

  solveBox(num, row, column){
     //Check top left box
    if(row<3 && column<3){
      return this.checkBox(num, 3, 3);
    }
    //Check top middle box
    else if(row<3 && column<6){
      return this.checkBox(num, 3, 6);
    }
    //Check top right box
    else if(row<3 && column<9){
      return this.checkBox(num, 3, 9);
    }
    //Check middle left box
    else if(row<6 && column<3){
      return this.checkBox(num, 6, 3);
    }
    //Check middle box
    else if(row<6 && column<6){
      return this.checkBox(num, 6, 6);
    }
    //Check middle right box
    else if(row<6 && column<9){
      return this.checkBox(num, 6, 9);
    }
    //Check bottom left box
    else if(row<9 && column<3){
      return this.checkBox(num, 9, 3);
    }
    //Check bottom middle box
    else if(row<9 && column<6){
      return this.checkBox(num, 9, 6);
    }
    //Check middle right box
    else if(row<9 && column<9){
      return this.checkBox(num, 9, 9);
    }
  }

  
  solve() {
    //Cek cara backtracking
    for(let counter =0; counter<this.emptySpace.length;){

      //Indicate how many times has it looped
      let loop = this.emptySpace[counter][2];
      if(loop>=20){
        this.bricked = true;
        this.emptySpace[counter][2]=0;
        counter--;
      }
      let row = this.emptySpace[counter][0]; 
      let column = this.emptySpace[counter][1];
      
      //Bricked is for telling if its still wrong, go back to its previous number.
      let bricked = false;
      if(bricked===true){
        this.emptySpace[counter][2]=0;
      }
      if(bricked===true && this.loop===0){
        this.bricked = false;
      }
      if(this.board[row][column] == '0'||this.board[row][column] == '9'){
        if(this.board[row][column] == '9'){
          this.board[row][column] = '1';       
        }
        for(let number =1; number<=9;number++ ){
          //Check if every row, column, and the box does not contain the number
          let conditional = this.solveRow(number, row) && this.solveCol(number, column) && this.solveBox(number, row, column);

          if(conditional){
            this.board[row][column] = number.toString();
            if(number === 9){
              this.emptySpace[counter][2]++;
            }
            counter++;
            break;
          }
          if(!conditional && number === 9){
            this.board[row][column] = '0';
            counter--;
            break;
          }
        }

      }
      else{
        for(let number = parseInt(this.board[row][column]); number<=9;number++){
          //Check if every row, column, and the box does not contain the number
          let conditional = this.solveRow(number, row) && this.solveCol(number, column) && this.solveBox(number, row, column);

          if(conditional){
            this.board[row][column] = number.toString();
            if(number === 9){
              this.emptySpace[counter][2]++;
            }
            counter++;
            break;
          }
          if(!conditional && number === 9 && counter !== 0){
            this.board[row][column] = '0';
            counter--;
            break;
          }
        }
      }     
    }
  }

  // Returns a string representing the current state of the board
  buildBoard() {
    let wordsCol = 0;
    for(let counter=0; counter<13; counter++){
        let column = '';
        if(counter===0 || counter === 4 || counter === 8 || counter === 12){
          for(let counter2=0; counter2<11; counter2++){
            column+='-';
          }
        }else{
          let wordsRow = 0;
          for(let counter2=0; counter2<11; counter2++){
            if(counter2 === 3 || counter2 === 7){
              column+='|'
            }else{
              column += this.board[wordsCol][wordsRow];
              wordsRow++;
            }
          }
          wordsCol++
        }
        console.log(column);
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

game.buildBoard()
