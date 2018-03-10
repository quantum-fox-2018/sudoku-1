"use strict"
var arr = []

class Sudoku {

  constructor(board_string) {

    this.boardSudoku = board_string

  }

  solve() {

      let papan = this.board()
      let inputAngkaSudoku = this.boardSudoku
      let validasi = true

    for (let i = 0; i < papan.length; i++) {

      for (let j = 0; j < papan[i].length; j++) {

        if (papan[i][j] == 0) {

          for (let k = 9; k >= 0; k--) {

            if (this.kotak(i, k) == true && this.samping(i, k) && this.bawah(j, k) == true) {

              papan[Math.floor( i / 9 )][i] = j

              break

            }

          }

        }

      }

    }

    return papan

  }

  kotak(index, num){
    let papan = this.boardSudoku
    let x = index % 9
    let y = Math.floor(index / 9)

    index = index - (x % 3)
    index = index - (y % 3) * 9

    for (let i = index; i < index + 3; i++) {

      if (papan[i] == num) {
        return false
      }
    }

    for (let i = index + 9; i < index + 12; i++) {

      if (papan[i] == num) {

        return false

      }

    }

    for (let i = index + 18; i < index + 21; i++) {

      if (papan[i] == num) {

        return false

      }

    }

    return true

  }

  bawah(index, num){

    let papan = this.boardSudoku

    for (var i = index; i < papan.length; i+=9) {

      if (papan[i] == num) {

        return false

      }

    }

    return true

  }

  samping(index, num){

    let papan = this.board()

      if (papan[index].indexOf(num) !== -1) {

        return false

      }

    return true

  }

  // Returns a string representing the current state of the board
  board() {
    let papan = []
    let isiPapan = []
    let isi = this.boardSudoku;

    for (var i = 0; i <= isi.length; i++) {

      if (isiPapan.length == 9) {
        papan.push(isiPapan)
        isiPapan = []
      }

      isiPapan.push(+(isi[i]))

    }

    return papan

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

console.log(game.solve());
console.log(game.board())
