"use strict"

class Sudoku {
  constructor(board_string) {
    this.papanSudoku = board_string;
  }

  solve() {
    let papanSudoku = this.board();
    let objectEmpty = {};
    let objectArr = [];
    for(let i=0;i<papanSudoku.length;i++){
      for(let j=0;j<papanSudoku[i].length;j++){
        objectArr = [];
        if(papanSudoku[i][j] == '0'){
          objectArr.push('0')
          objectEmpty[i+''+j] = objectArr;
        }
      }
    }

    for(let i=0;i<papanSudoku.length;i++){

      //Untuk mengisi angka
      let j=0;
      while(j<papanSudoku.length){

        //Check Number apakah angka unique apa tidak
        let checkUnique = false;
        var koordinatX = i;
        var koordinatY = j;

        if(papanSudoku[i][j] == '0'){

          var numInput = 0;
          while(checkUnique ==false){
            checkUnique = false;
            if(numInput>8){
              numInput=0;
              var checkBackTracking = false;
              break;
            }
            numInput++;

            let horizontalValidation = this.horizontalCheck(papanSudoku,koordinatX,numInput);
            let verticalValidation = this.verticalCheck(papanSudoku,koordinatY,numInput);
            let squareValidation = this. squareCheck(papanSudoku,koordinatX,koordinatY,numInput)

            if(squareValidation == true && verticalValidation == true && horizontalValidation==true ){
              checkUnique = true;
            }

            for(let k=0;k<objectEmpty[i+''+j].length;k++){
              if(objectEmpty[i+''+j][k] == numInput.toString()){
                checkUnique = false;
                debugger;
              }
            }

          }
          papanSudoku[i][j] = numInput.toString();
          objectEmpty[i+''+j].push(papanSudoku[i][j]);
        }


        //Deteksi object terdekat

        while(checkBackTracking==false){

          if(j==0){
            j=8;
            i=i-1;
          }
          j=j-1;

          if(objectEmpty[i+''+j] != undefined){
            checkBackTracking=true;
            papanSudoku[i][j] = '0';
          }
          debugger;
        }

        j++;
      }
    }

    console.log(papanSudoku);

  }

  // Returns a string representing the current state of the board
  board() {
    let displaySudoku = [];
    let soalSudoku = this.papanSudoku;
    //console.log(soalSudoku);

    for(let i=0;i<9;i++){
      displaySudoku.push([]);
      for(let j=0;j<9;j++){
        displaySudoku[i].push(soalSudoku[j]);
        var count = j;
      }
      let soalSudokuBaru = soalSudoku.substr(count+1);
      soalSudoku = soalSudokuBaru;
    }
    return displaySudoku;
  }

  horizontalCheck(papanSudoku,koordinatX,numInput){

    for(let i=0;i<papanSudoku.length;i++){
      let inputString = numInput.toString();
      if(papanSudoku[koordinatX][i] == inputString){
        return false;
      }
    }
    return true;
  }

  verticalCheck(papanSudoku,koordinatY,numInput){

    for(let i=0;i<papanSudoku.length;i++){
      let inputString = numInput.toString();
      if(papanSudoku[i][koordinatY] == inputString){
        return false;
      }
    }
    return true;
  }

  squareCheck(papanSudoku,koordinatX,koordinatY,numInput){

    let acuanX = 0;
    let acuanY=0;

    if(koordinatX>=3 && koordinatX <=5){
      acuanX = 3;
    }
    else if (koordinatX>5) {
      acuanX = 6;
    }

    if(koordinatY>=3 && koordinatY <=5){
      acuanY = 3;
    }
    else if (koordinatY>5) {
      acuanY = 6
    }


    for(let i=acuanX;i<acuanX+3;i++){
      for(let j=acuanY;j<acuanY+3;j++){
        let inputString = numInput.toString();
        if(papanSudoku[i][j] == inputString){
          return false;
        }
      }
    }
    return true;
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0];

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()

//console.log(game.board())
