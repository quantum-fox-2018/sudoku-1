"use strict"

class Sudoku {
  constructor(board_string) {
    this.stringNumber = board_string;
    this.sudoku = this.tempSudoku()

  }

  tempSudoku(){
    let stringNum = this.stringNumber
    let sudokuBoard=[];
    let tempArr=[];
    let limit = 0
    for(let i=0; i<stringNum.length; i++){
      tempArr.push(Number(stringNum.charAt(i)))
      limit++

      if(limit == 9){
        sudokuBoard.push(tempArr)
        tempArr=[]
        limit=0
      }
    }
    return sudokuBoard
  }

  emptyPosition(){
    let emptyValue = []
    for(let i=0; i<9; i++){
      let sudokuColumn = this.sudoku[i]
      for(let j=0; j<sudokuColumn.length; j++){
        if(sudokuColumn[j] == 0){
          let objEmpty = {}
          objEmpty.i = i
          objEmpty.j = j
          emptyValue.push(objEmpty)
        }
      }
    }
    return emptyValue
  }

  checkRow(number, indexCol, sudokuBoard){
    let tempRow = [];
    for(let i=0; i<9; i++){
      tempRow.push(sudokuBoard[i][indexCol].toString())
    }

    if(tempRow.indexOf(number) > -1){
      return false
    }
    return true
  }

  checkColumn(number, indexRow, sudokuBoard){
    let tempCol = []
    for(let i=0; i<9; i++){
      tempCol.push(sudokuBoard[indexRow][i].toString())
    }

    if(tempCol.indexOf(number) > -1){
      return false
    }

    return true
  }

  checkBlock(number, indexRow, indexCol, sudokuBoard){
    let tempBlock=[]
    let rowStart=0
    let colStart=0

    if(indexRow >= 0 && indexRow <= 2){
      rowStart=0
    }else if(indexRow >=3 && indexRow <= 5){
      rowStart = 3
    }else  if(indexRow >= 6 && indexRow <= 8){
      rowStart = 6
    }

    if(indexCol >= 0 && indexCol <= 2){
      colStart=0
    }else if(indexCol >=3 && indexCol <= 5){
      colStart = 3
    }else  if(indexCol >= 6 && indexCol <= 8){
      colStart = 6
    }

    for(let i=rowStart; i<rowStart+3; i++){
      for(let j=colStart; j<colStart+3; j++){
        tempBlock.push(sudokuBoard[i][j].toString())
      }
    }

    if(tempBlock.indexOf(number) > -1){
      return false
    }

    return true
  }

  checkValue(number, indexRow, indexCol, sudokuBoard){
    if(this.checkRow(number, indexCol, sudokuBoard) && this.checkColumn(number, indexRow, sudokuBoard) && this.checkBlock(number, indexRow, indexCol, sudokuBoard)){
      return true
    }
    return false
  }

  solve() {
    let emptyPos = this.emptyPosition()
    let limit = 9
    for( let i=0; i<emptyPos.length; i++){
      let number=Number(this.sudoku[emptyPos[i].i][emptyPos[i].j])
      let check = this.checkValue(number.toString(), emptyPos[i].i, emptyPos[i].j, this.sudoku)

      while(check === false ){
        number++
        if(number > limit){
          break;
        }
        check = this.checkValue(number.toString(), emptyPos[i].i, emptyPos[i].j, this.sudoku)
      }

      if(check === true){
        this.sudoku[emptyPos[i].i][emptyPos[i].j] = number
      }else{
        this.sudoku[emptyPos[i].i][emptyPos[i].j] = '0'
        i = i-2
      }

    }

  }

  // Returns a string representing the current state of the board
  board() {
    for(let i=0; i<9; i++){
      let numberColumn =""
      for(let j=0; j<9; j++){
        if(j > 0 && j%3==0){
          numberColumn += ' |'
        }
        numberColumn += ` ${this.sudoku[i][j]}`
      }
      if(i>0 && i%3==0){
        console.log('-----------------------');
      }
      console.log(numberColumn);
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
game.board()
// console.log(game.board())
