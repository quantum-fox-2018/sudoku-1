"use strict"

class Sudoku {
  constructor(board_string) {
  }

  solve() {
  }

  // Returns a string representing the current state of the board
  board() {
    var papan = []
    var mulai = 0
    var batas = 9
    for(let i=0; i<9; i++){
      let baris = []
      for(let j=mulai; j<batas; j++){
        baris.push(+(board_string)[j])
      }
      papan.push(baris)
      mulai = batas
      batas += 9
    }
    return papan
  }

  coordinats(){
    var papan = this.board()
    var Posisi = []
    for(let i=0; i<papan.length; i++){
    // for(let i=0; i<1; i++){
      debugger
      var baris = papan[i]
      for(let j=0; j<baris.length; j++){
        var koordinat = []
        debugger
        if(papan[i][j]===0){
          debugger
          koordinat.push(i)
          koordinat.push(j)
        }
        if(koordinat.length>0){
          Posisi.push(koordinat)
        }
      }
    }
    return Posisi
  }

  cekHorizontal(angka){
    //cek angka dibaris angka, jika -1 maka return true
    var papan = this.board()
    console.log(papan[0])
    console.log(angka)
    console.log(papan[0].indexOf(angka))
    if(papan[0].indexOf(angka)===-1){
      return true
    }
    else {
      return false
    }
  }

}

var input = Number(process.argv[2])

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()

// console.log('===================')
// console.log(game.board())
// console.log(game.coordinats())
console.log(game.cekHorizontal(input))
