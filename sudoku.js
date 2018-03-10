"use strict"

class Sudoku {
  constructor(board_string) {
    this.sudokuBoard = board_string;
  }

  solve() {
    var number = 1
    var array = [];
    var index = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var indexHorizontal = 0;
    var indexVertikal = 3;
    var stringBoard = this.board();

    for (var i = 0; i < stringBoard.length; i++) {
      for (var j = 0; j < stringBoard[i].length; j++) {
        if (stringBoard[i][j] == '0') {
          stringBoard[i][j] = number.toString()
          if (i % 3 == 0) {
            indexHorizontal = i;
            for (var k = indexHorizontal; k < indexHorizontal + 3; k++ ) {
              for (var l = 0; l < 3; l++) {
                if (stringBoard[k][l] == number) {
                  number += 1;
                }
              }
            }
          }
        }
      }
    }

    return stringBoard

    // function dalamRow(row, number) {
    //   for (var i = 0; i < 9; i++) {
    //     if (stringBoard[row][i] == number) {
    //       return true
    //     }
    //   }
    //   return false;
    // }
    //
    // function dalamCol(col, number) {
    //   for (var i = 0; i < 9; i++) {
    //     if (stringBoard[i][col] == number) {
    //       return true;
    //     }
    //   }
    //   return false;
    // }
    //
    // function dalamKotak(row, col, number) {
    //   var r = row - row % 3;
    //   var c = col - col % 3;
    //
    //   for (var i = r; i < r+3; i++) {
    //     for (var j = c; j < c + 3; j++) {
    //       if (stringBoard[i][j] == number) {
    //         return true;
    //       }
    //     }
    //   }
    //   return false;
    // }
    //
    // function allowed(row, col, number) {
    //   return !(dalamRow(row, number) || dalamCol(col, number) || dalamKotak(row, col, number))
    // }




    return selesai()
  }

  // Returns a string representing the current state of the board
  board() {
    var string = board_string.toString();
    var arrSudoku = [];
    var arr = []
    for (var i = 0; i < string.length; i++) {
      arr.push(string[i])
      if (arr.length == 9) {
        arrSudoku.push(arr);
        arr = []
      }

      // if (arrSudoku.length % 4 == 0) {
      //   arrSudoku.push('----------------------------------------------')
      // }
    }
    return arrSudoku
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
