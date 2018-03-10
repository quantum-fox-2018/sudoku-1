"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_str = board_string;


    let newBoard = this.board_str;
    let boardResult = [];
    let boardIndex = 0;
    //insert string to array board
    for(let i = 0; i < 9; i++){
        let tempBoard = [];
        for(let j = 0; j < 9; j++){
            tempBoard.push(parseInt(newBoard[boardIndex]));
            boardIndex++;
        }
        boardResult.push(tempBoard);
    }
    this.output = boardResult;

  }

  solve() {
    let board = this.output;

    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[i].length; j++){

            if(board[i][j] == 0){
                let cek = false;
                let currentNum = parseInt(board[i][j]);
                while (!cek){
                    let vertical = this.checkVertical(j, currentNum);
                    let horizontal = this.checkHorizontal(i, currentNum);
                    let boxCheck = this.check3x3(i, j, currentNum);

                    if(boxCheck === true){
                      board[i][j] = currentNum;
                      currentNum = 0;
                      cek = true;
                    }else {
                      cek = false;
                      currentNum += 1;
                    }

                    // if(currentNum > 9){
                    //   currentNum = 0;
                    // }
                }
            }

        }
    }

    console.log(board);

  }

  // Returns a string representing the current state of the board
  board() {
    //let newBoard = this.board_str;
    let boardResult = this.output;

    //output Board
    for(let i = 0; i < 9; i++){
        let showBaris = ' ';

        for(let j = 0; j < 9; j++){
            if((j+1) % 3 == 0){
                if((j+1) === 9){
                  showBaris += boardResult[i][j]+' ';
                }else{
                  showBaris += boardResult[i][j]+' | ';
                }
            }else{
                showBaris += boardResult[i][j]+' ';
            }
        }

        if(i === 0){
            console.log('-----------------------')
            console.log(showBaris);
        }else if((i+1) % 3 == 0){
            console.log(showBaris);
            console.log('-----------------------');
        }else{
            console.log(showBaris);
        }

    }

  }

  checkHorizontal(index, num){
    let input = this.output;
    //console.log(input[index]);
    if(input[index].indexOf(num) == -1){
      return true;
    }else {
      return false;
    }

    // for(let i = 0; i < input.length; i++){
    //     //console.log(input[index][i]);
    //     if(input[index][i] == num){
    //         return false;
    //     }
    // }

    // return true;
  }

  checkVertical(j, num){
    let input = this.output;
    let verticalArray = [];
    for(let i = 0; i < input.length; i++){
        verticalArray.push(parseInt(input[i][j]));
    }

    if(verticalArray.indexOf(parseInt(num)) == -1){
      //console.log(verticalArray);
      return true;
    }else {
      return false;
    }


  }

  check3x3(indexI, indexJ, num){
      let input = this.output;
      let boxArr = [];

      if(indexI >= 0 && indexI <= 2){
        indexI = 0;
      }else if(indexI >= 3 && indexI <= 5){
        indexI = 3;
      }else if(indexI >= 6 && indexI <= 9){
        indexI = 6;
      }

      if(indexJ >= 0 && indexJ <= 2){
        indexJ = 0;
      }else if(indexJ >= 3 && indexJ <= 5){
        indexJ = 3;
      }else if(indexJ >= 6 && indexJ <= 9){
        indexJ = 6;
      }

      for(let i = indexI; i < indexI+3; i++){
          for(let j = indexJ; j < indexJ+3; j++){
              boxArr.push(input[i][j]);
          }
      }

      if(boxArr.indexOf(parseInt(num)) == -1){
        return true;
      }else {
        return false;
      }

  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('./set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()

console.log(game.board())

console.log(game);
