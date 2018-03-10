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

  getPossibilities(titikI, titikJ, sudoku){
    var possibilities = [];
      for (var j = 1; j < 10; j++) {
        if (this.cekClear(j.toString(), titikI, titikJ, sudoku)) {
          possibilities.push(j)
        }
      }
    return possibilities
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


  solve() {

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
  var possibilities = [];
  for (var i = 0; i < problemI.length; i++) {
    var possibilityForOneCell = []
    for (var j = 1; j < 10; j++) {
      if (this.cekClear(j.toString(), problemI[i], problemJ[i], this.sudoku)) {
        possibilityForOneCell.push(j)
      }
    }

    possibilities.push(possibilityForOneCell)
  }
  //isi kotak yang hanya punya 1 possibility
  for (var i = 0; i < possibilities.length; i++) {
    if (possibilities[i].length === 1) {
      this.sudoku[problemI[i]][problemJ[i]] = possibilities[i][0]
      possibilities[i].splice(0,1)
    }
  }


//////////////////////////////////////////////////////////////////////////
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
  let number = 1;
  for (var i = 0; i < problemI.length; i++) {
    let clear = this.cekClear(number.toString(), problemI[i], problemJ[i], this.sudoku)
    while(clear === false){
      number++
      if (number > 9) {
        break;
      }
      clear = this.cekClear(number.toString(), problemI[i], problemJ[i], this.sudoku)
    }
    if (clear === true) {
      this.sudoku[problemI[i]][problemJ[i]] = number
      number = 1
    }else{
      if (i > 0) {
        number = Number(this.sudoku[problemI[i-1]][problemJ[i-1]])
        i = i
      }else{
        i = 0
      }
    }
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
var board_string = fs.readFileSync('set-02_project-euler_50-easy-puzzles.txt')
  .toString()
  .split("\n")[3]

var game = new Sudoku(board_string)
console.log("sebelum");
game.board();

// Remember: this will just fill out what it can and not "guess"
game.solve()
console.log("solving");
game.board();
