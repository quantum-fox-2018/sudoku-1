"use strict"

var angkaArgv = Number(process.argv[2])
var barisArgv = Number(process.argv[3])
var kolomArgv = Number(process.argv[4])

class Sudoku {
  constructor(board_string) {
  }

  solve(angka, baris, kolom) {
    var horizontal = this.cekHorizontal(angka, baris)
    var vertical = this.cekVertikal(angka, kolom)

    console.log(horizontal)
    console.log(vertical)

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

  cekHorizontal(angka, baris){
    //cek angka dibaris angka, jika -1 maka return true
    var papan = this.board()
    // console.log(papan[baris])
    // console.log(angka)
    // console.log(papan[baris].indexOf(angka))
    if(papan[baris].indexOf(angka)===-1){
      return true
    }
    else {
      return false
    }
  }

  cekVertikal(angka, kolom){
    var papan = this.board()
    // console.log(papan)
    var colom = []
    for(let i=0; i<papan.length; i++){
      // var baris = papan[i]
      // console.log(baris[1])
      colom.push(papan[i][kolom])
    }
    // console.log(colom)
    if(colom.indexOf(angka)===-1){
      return true
    }
    else {
      return false
    }
  }

  cekKotak(angka, baris, kolom){
    var papan = this.board()
    var barisAwal = Math.floor(baris/3)*3
    var kolomAwal = Math.floor(kolom/3)*3
    // console.log(angka)
    // console.log(barisAwal)
    // console.log(kolomAwal)
    var kotak = []
    for(let i=barisAwal; i<barisAwal+3; i++){
      for(let j=kolomAwal; j<kolomAwal+3; j++){
        // console.log(papan[i][j])
        kotak.push(papan[i][j])
      }
    }
    // console.log(kotak)
    if(kotak.indexOf(angka)===-1){
      return true
    }
    else {
      return false
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
// game.solve()

// console.log(game.board())
// console.log('===================')
// console.log(game.coordinats())
// console.log(game.cekHorizontal(angkaArgv, barisArgv))
// console.log(game.cekVertikal(angkaArgv, kolomArgv))
console.log(game.cekKotak(angkaArgv, barisArgv, kolomArgv))
// console.log(game.solve(angkaArgv, barisArgv, kolomArgv))
