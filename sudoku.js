"use strict"

class Sudoku {

  constructor(board_string) {

    this.boardSudoku = board_string
    this.papanSudoku = this.board()
    this.cariNol = this.cekNol()

  }

  solve() {

    let papan = this.papanSudoku

    for(let i = 0; i < this.cariNol.length; i++) {

      let baris = this.cariNol[i][0]
      let kolom = this.cariNol[i][1]

      if(papan[baris][kolom] == 0){

        for(let num = 1; num < 10; num++) {

          if(this.samping(baris, num) == true && this.bawah(kolom, num) == true && this.kotak(baris, kolom, num) == true) {

            papan[baris][kolom] = num

            console.log(papan) // cek proses
            console.log();

            let track = this.solve()

            if(track) {

              return true

            } else {

              papan[baris][kolom] = 0

            }

          }

        }

        return false

      }

    }

    return papan,'solved' +'\n' +' ==============================='

  }

  kotak(baris, kolom, num) {

    let areaBaris = Math.floor(baris/3)*3
    let areaKolom = Math.floor(kolom/3)*3

    for(let i = 0; i < 3; i++) {

      for(let j = 0; j < 3; j++) {

        if(this.papanSudoku[areaBaris+i][areaKolom+j] === num) {

          return false

        }

      }

    }

    return true

  }

  bawah(kolom, num) {

    let papan = this.boardSudoku

    for (var i = kolom; i < papan.length; i+=9) {

      if (papan[i] == num) {

        return false

      }

    }

    return true

  }

  samping(baris, num) {

    let papan = this.board()

      if (papan[baris].indexOf(num) !== -1) {

        return false

      }

    return true


  }

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

  cekNol() {

    let tmpPosisiNol = []

    for(let i = 0; i< this.papanSudoku.length; i++) {

      for(let j = 0; j < this.papanSudoku.length; j++) {

        if(this.papanSudoku[i][j] === 0) {

          tmpPosisiNol.push([i,j])

        }

      }

    }

    return tmpPosisiNol

  }

}

  // Returns a string representing the current state of the board


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
