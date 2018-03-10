"use strict"

class Sudoku {
  constructor(board_string) {}

  solve() {
    var puzzle = this.board()
    for (var i = 0; i < 9; i++) {
      // var angkaYgAda = []
      // --------------------------------------------test doang--------------
      for (var j = 0; j < 9; j++) {
      //   if (puzzle[i][j] === ' ') {
      //     puzzle[i][j] += '*'
      //   }
      //   ------------------------------------------------
        if (puzzle[i][j] === ' ') {
          // menampung angka yang ada
          var angkaYgAda = []
          // check horizontal-------------------
          for (var k = 0; k < 9; k++) {
            if (puzzle[i][k] !== ' ') {
              angkaYgAda.push(Number(puzzle[i][k]))
            }
          }
          // check vertikal-------------------
          for (var l = 0; l < 9; l++) {
            if (puzzle[l][j] !== ' ') {
              angkaYgAda.push(Number(puzzle[l][j]))
            }
          }
          // check box----------------------
          var koorI = 0
          var koorJ = 0
          if (i < 3) {
            koorI = 0
          } else if (i >= 3 && i < 6) {
            koorI = 3
          } else if (i >= 6) {
            koorI = 6
          }

          if (j < 3) {
            koorJ = 0
          } else if (j >= 3 && j < 6) {
            koorJ = 3
          } else if (j >= 6) {
            koorJ = 6
          }

          for (var m = koorI; m < koorI+3; m++) {
            for (var n = koorJ; n < koorJ+3; n++) {
              if (puzzle[m][n] !== ' ') {
                angkaYgAda.push(Number(puzzle[m][n]))
              }
            }
          }

          //-----------------------jangang di uncommand----------
          //generate angka yg belum ada
          // var hasil = angkaYgAda[0]
          // while (angkaYgAda.includes(hasil) === true) {
          //   hasil = Math.floor(Math.random() * 9) + 1
          // }
          //---------------------------

          var hasil = this.generateAngka(angkaYgAda)

          // console.log(hasil);
          puzzle[i][j] += hasil

        }
      }
    }
    return puzzle
  }


  // Returns a string representing the current state of the board
  board() {
    var puzzle = board_string
    var counter = 0
    var boardArr = []

    for (var i = 0; i < 9; i++) {
      var horArr = []
      for (var j = 0; j < 9; j++) {
        if (puzzle[counter] === '0') {
          horArr.push(' ')
        }else {
          horArr.push(puzzle[counter])
        }
        counter++
      }
      boardArr.push(horArr)
    }
    return boardArr
  }

  generateAngka(arr) {

    var hasil = 0
    var o = 1
    while (o<=9) {
      if (arr.includes(o) === false) {
        return o
      }
      o++
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
console.log(game.solve());

// console.log(game.board())
