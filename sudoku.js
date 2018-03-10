"use strict"


class Sudoku {
  constructor(board_string) {
    //this.Property -> ini sama aja kyk bikin varibale baru buat dipakai di dalam kelas
    //property dapat di akses oleh semua method di dalam kelas
    this.board_array = this.setBoard(board_string);
    this.zeroCoordinates = this.getZeroCoordinate(this.board_array);
  }

  setBoard(board_string) {
    let brd_str = board_string;
    let index = 0;
    var stringToArray = [];

    for(let row = 0; row < 9; row++) {
      for(let col = 0; col < 9; col++) {
        (stringToArray[row]) ? stringToArray[row].push(parseInt(brd_str[index])) : stringToArray[row] = [parseInt(brd_str[index])];
        index++;
      }
    }

    return stringToArray;
  }

  getZeroCoordinate(board_arr){
    let board = board_arr;
    let zeroCoordinates = [];
    let index = 0;

    for(let row = 0; row < 9; row++) {
      for(let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          zeroCoordinates.push({coordinate:''+row+col, value:0});
          index++;
        }
      }
    }

    return zeroCoordinates;
  }

  solve() {
    let zeroCord = this.zeroCoordinates;
    let mundur = false;

    for(let indexZero = 0; indexZero < zeroCord.length; indexZero++){
      debugger;
      let valueInserted = false;
      let checkValue = 0;
      if(zeroCord[indexZero].value === 0){
        checkValue = 1;
      }
      // else if(mundur === true && zeroCord[indexZero].value === 9){
      //   checkValue = 1;
      // }
      else if (mundur === true) {
        checkValue = zeroCord[indexZero].value+1;
      }else if (mundur === false){
        checkValue = zeroCord[indexZero].value;
      }
      for (let newValue = checkValue; newValue < 10; newValue++){
        debugger;
        if(this.checkHorizontal(zeroCord[indexZero].coordinate, newValue) &&
            this.checkVertical(zeroCord[indexZero].coordinate, newValue) &&
            this.checkKotak(zeroCord[indexZero].coordinate, newValue)) {
          zeroCord[indexZero].value = newValue;
          this.board_array[zeroCord[indexZero].coordinate[0]][zeroCord[indexZero].coordinate[1]] = newValue;
          valueInserted = true;
          mundur = false;
          break;
        }
      }
      debugger;
      //console.log(this.board_array);
      //console.log(zeroCord);
      if(!valueInserted){
        zeroCord[indexZero].value = 0;
        this.board_array[zeroCord[indexZero].coordinate[0]][zeroCord[indexZero].coordinate[1]] = 0;
        indexZero-=2;
        mundur = true;
      }

      console.log("\x1B[2J")
      console.log(this.board_array);
      this.sleep(100);
    }
  }

  checkHorizontal(checkedCoordinate, checkedValue){
    debugger;
    let board = this.board_array;
    let coordinate = checkedCoordinate;
    let value = checkedValue;

    for(let index = 0; index < 9; index++){
      if(index !== parseInt(coordinate[1]) && board[coordinate[0]][index] === value) return false;
    }

    return true;
  }

  checkVertical(checkedCoordinate, checkedValue){
    debugger;
    let board = this.board_array;
    let coordinate = checkedCoordinate;
    let value = checkedValue;

    for(let index = 0; index < 9; index++){
      if(index !== parseInt(coordinate[0]) && board[index][coordinate[1]] === value) return false;
    }

    return true;
  }

  checkKotak(checkedCoordinate, checkedValue){
    debugger;
    let board = this.board_array;
    let coordinate = this.getKotakDiCheck(checkedCoordinate);
    let value = checkedValue;

    for(let row = coordinate[0][0]; row < coordinate[1][0]; row++){
      for(let col = coordinate[0][1]; col < coordinate[1][1]; col++){
        if(row !== parseInt(coordinate[0]) && col !== parseInt(coordinate[1]) && board[row][col] === value) return false;
      }
    }

    return true;
  }

  getKotakDiCheck(coordinate){
    debugger;
    let kotak = [[],[]];
    //dapetin row awal sama akhir
    (coordinate[0] < 3) ? (kotak[0][0] = 0, kotak[1][0] = 3) :
    (coordinate[0] < 6) ? (kotak[0][0] = 3, kotak[1][0] = 6) :
    (kotak[0][0] = 6, kotak[1][0] = 9);
    //dapetin col awal sama akhir
    (coordinate[1] < 3) ? (kotak[0][1] = 0, kotak[1][1] = 3) :
    (coordinate[1] < 6) ? (kotak[0][1] = 3, kotak[1][1] = 6) :
    (kotak[0][1] = 6, kotak[1][1] = 9);

    //console.log(kotak);
    return kotak;
  }

  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }

  // Returns a string representing the current state of the board
  board() {
    return 'Puzzle sudoku terpecahkan';
  }
}


// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string);

//Remember: this will just fill out what it can and not "guess"
game.solve()

console.log(game.board())

//dikumpulin dalam sebuah array 2 dimensi informasi posisi semua 0 yang ada
//by: mba icha

//kan tiap kotak koordinat ada polanya
//kotak 1 [row 0-2][col 0-2], kotak 2 [row 0-2][col 3-5], //kotak 3 [row 0-2][col 6-8]
//kotak 4 [row 3-5][col 0-2], kotak 5 [row 3-5][col 3-5], //kotak 6 [row 3-5][col 6-8]
//kotak 7 [row 6-8][col 0-2], kotak 8 [row 6-8][col 3-5], //kotak 9 [row 6-8][col 6-8]
//row dan col ada 3 kategori [0-2] [3-5] [6-8]
//nah cek kalau koordinat 0 yang mau di cek itu masuk ke kotak mana
//by: rama

//kalau backtracking itu mencoba naruh satu di kotak kosong
//kalau tidak possible increment +1, terus looping sampai 9
//kalau sampai 9 enggak harus mundur ke coordinate 0 sebelumnya
//lalu melakukan increment di coordinate 0 tsb
//terus lakuin ini sampai index 81
//by: instructors

//langkah bikin codingan
//0. arrayObjectZeroCoordinate [{coordinate: '12',value:0},{coordinate: '23',value:0},{coordinate: '44',value:0}]
//1. bikin insert lalu cek horizontal => cek 1-9 baru insert
//2. bikin insert lalu cek horizontal, vertical => cek 1-9 baru insert
//3. bikin insert lalu cek horizontal, vertical, 3x3 => cek 1-9 baru insert
//4. backtracking , cek 1-9 kalau gagal, mundur ke indexZero sebelumnya
