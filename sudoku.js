"use strict"
class Sudoku {
  constructor(board_string) {
    this.sudoku = [];
    var tempSudokuBaris = [];
    var flag = 0;
    for (var i = 0; i < board_string.length; i++) {
      tempSudokuBaris.push(board_string[i])
      flag++;
      if (flag === 9) {
        this.sudoku.push(tempSudokuBaris)
        tempSudokuBaris = []
        flag = 0;
      }
    }
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  cekKanan(angka, indexI, indexJ, sudoku){
    var tempBaris = [];
    for (var i = 0; i < 9; i++) {
      tempBaris.push(sudoku[indexI][i].toString())
    }
    if (tempBaris.indexOf(angka) > -1) {
      return false;
    }
    return true;
  }

  cekBawah(angka, indexI, indexJ, sudoku){
    //cek bawah
    var tempBarisKeBawah = [];
    for (var j = 0; j < 9; j++) {
      tempBarisKeBawah.push(sudoku[j][indexJ].toString())
    }
    if (tempBarisKeBawah.indexOf(angka) > -1) {
      return false;
    }
    return true;
  }

  cekKotak(angka, indexI, indexJ, sudoku){
    //cek 3x3
    var arrayKotak = []
    if (indexI >= 0 && indexI <= 2) {
      indexI = 0;
    }else if (indexI >= 3 && indexI <= 5) {
      indexI = 3;
    }else if (indexI >= 6 && indexI <= 8) {
      indexI = 6;
    }
    if (indexJ >= 0 && indexJ <= 2) {
      indexJ = 0;
    }else if (indexJ >= 3 && indexJ <= 5) {
      indexJ = 3;
    }else if (indexJ >= 6 && indexJ <= 8) {
      indexJ = 6;
    }

    for (var y = indexI; y < indexI+3; y++) {
      for (var z = indexJ; z < indexJ+3; z++) {
        arrayKotak.push(sudoku[y][z].toString())
      }
    }
    if (arrayKotak.indexOf(angka) > -1) {
      return false;
    }
    return true;
  }


  cekClear(angka, indexI, indexJ, sudoku){
    if (this.cekKotak(angka, indexI, indexJ, sudoku)
  && this.cekKanan(angka, indexI, indexJ, sudoku)&& this.cekBawah(angka, indexI, indexJ, sudoku)) {
      return true;
    }
    return false;
  }

  findEmptyCell(){
    var problem = [];
    var problemI = [];
    var problemJ = [];
    for (var i = 0; i < 9; i++) {
      let tempBaris = this.sudoku[i]
      for (var j = 0; j < tempBaris.length; j++) {
        if (tempBaris[j] === "0") {
          problemI.push(i)
          problemJ.push(j)
        }
      }
    }
    problem.push(problemI);
    problem.push(problemJ);
    return problem
  }

  solve() {
  let problem = this.findEmptyCell()
  let problemI = problem[0]
  let problemJ = problem[1]

  for (var i = 0; i < problemI.length; i++) {
    let number = parseInt(this.sudoku[problemI[i]][problemJ[i]])
    let clear = this.cekClear(number.toString(), problemI[i], problemJ[i], this.sudoku)
    while(clear === false){
      number++
      if (number === 10) {
        break;
      }
      clear = this.cekClear(number.toString(), problemI[i], problemJ[i], this.sudoku)
    }
    if (clear === true) {
      this.sudoku[problemI[i]][problemJ[i]] = number
    }else{
      this.sudoku[problemI[i]][problemJ[i]] = "0"
      i = i-2
    }
  }
}

  // Returns a string representing the current state of the board
  board() {
    for (var i = 0; i < 9; i++) {
      var temp = "";
      for (var j = 0; j < 9; j++) {
        if (j%3 === 0) {
          temp += "|"
        }
        temp += this.sudoku[i][j] + " "
        if (j===8) {
          temp += "|"
        }
      }
      console.log(temp);
      if (i === 2 || i === 5) {
        console.log("----------------------");
      }
    }
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync("set-01_sample.unsolved.txt")
  .toString()
  .split("\n")[13]

var game = new Sudoku(board_string)


// Remember: this will just fill out what it can and not "guess"
game.solve();
game.board();
