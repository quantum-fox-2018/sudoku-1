"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = new function() {
      board_string = board_string.match(/(.{1,9})/g);
      for(let i = 0; i < board_string.length; i++) {
        board_string[i] = board_string[i].split('');
      }
      return board_string;
    }
  }

  checkHorizontal(col) {
    let kemungkinanHor = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let index;
    for(let i = 0; i < 9; i++) {
      index = kemungkinanHor.indexOf(Number(this.board_string[col][i]));
      if(index !== -1) {
        kemungkinanHor.splice(index, 1);
      }
    }
    return kemungkinanHor;
  }

  checkVertikal(row) {
    let kemungkinanVar = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for(let i = 0; i < 9; i++) {
      let index = kemungkinanVar.indexOf(Number(this.board_string[i][row]));
      if(index !== -1) {
        kemungkinanVar.splice(index, 1);
      }
    }
    return kemungkinanVar;
  }

  checkKotak(col, row) {
    let kemungkinanKotak = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let kebawah;
    let kesamping;
    let bagian;

    if(col >= 6) {
      kebawah = 6;
      if(row >= 6) {
        kesamping = 6;
        bagian = 9;
      } else if(row >= 3) {
        kesamping = 3;
        bagian = 8;
      } else {
        kesamping = 0;
        bagian = 7;
      }
    } else if(col >= 3) {
      kebawah = 3;
      if(row >= 6) {
        kesamping = 6;
        bagian = 6;
      } else if(row >= 3) {
        kesamping = 3;
        bagian = 5;
      } else {
        kesamping = 0;
        bagian = 4;
      }
    } else {
      kebawah = 0;
      if(row >= 6) {
        kesamping = 6;
        bagian = 3;
      } else if(row >= 3) {
        kesamping = 3;
        bagian = 2;
      } else {
        kesamping = 0;
        bagian = 1;
      }
    }

    for(let i = kebawah; i < kebawah+3; i++) {
      for(let j = kesamping; j < kesamping+3; j++) {
        let index = kemungkinanKotak.indexOf(Number(this.board_string[i][j]));
        if(index !== -1) {
          kemungkinanKotak.splice(index, 1);
        }
      }
    }
    return [kemungkinanKotak, bagian];
  }

  checkKemungkinan(arr1, arr2, arr3) {
    let arrTampung = arr1.filter(function(e) {
      return arr2.indexOf(e) > -1;
    });
    let arrHasil = arrTampung.filter(function(e) {
      return arr3.indexOf(e) > -1;
    });

    return arrHasil;
  }

  solve() {
    let sudokuKosong = [];
    let kemungkinanYangAda;
    let tmpObjSudoku;
    for(let i = 0; i < this.board_string.length; i++) {
      for(let j = 0; j < this.board_string[i].length; j++) {
        tmpObjSudoku = {};
        if(this.board_string[i][j] == 0) {
          let cekKotak = this.checkKotak(i, j);
          kemungkinanYangAda = this.checkKemungkinan(this.checkHorizontal(i), this.checkVertikal(j), cekKotak[0]);
          tmpObjSudoku = {
            index: [i, j],
            kemungkinan: kemungkinanYangAda,
            bagian: cekKotak[1]
          };
          sudokuKosong.push(tmpObjSudoku);
        }
      }
    }

    let kebawah;
    let kesamping;
    let bagianBoard;
    let index0 = true;
    let aaaa = 0;
    while(index0) {
      index0 = false;
      for(let i = 0; i < this.board_string.length; i++) {
        for(let j = 0; j < this.board_string[i].length; j++) {
          let check = Number(this.board_string[i][j]);
          if(check === 0) {
            index0 = true;
          }
        }
      }
      let angka = 0;
      while(angka != sudokuKosong.length) {
        //cek horizontal dan vertikal
        for(let i = 0; i < sudokuKosong.length; i++) {
          kebawah = sudokuKosong[i].index[0];
          kesamping = sudokuKosong[i].index[1];
          if(sudokuKosong[i].kemungkinan.length === 1) {
            for(let j = 0; j < sudokuKosong.length; j++) {
              if(sudokuKosong[j].index[0] === kebawah && sudokuKosong[j].kemungkinan.length != 1) {
                let index = sudokuKosong[j].kemungkinan.indexOf(Number(sudokuKosong[i].kemungkinan));
                if(index !== -1) {
                  sudokuKosong[j].kemungkinan.splice(index, 1);
                }
              }
              if(sudokuKosong[j].index[1] === kesamping && sudokuKosong[j].kemungkinan.length != 1) {
                let index = sudokuKosong[j].kemungkinan.indexOf(Number(sudokuKosong[i].kemungkinan));
                if(index !== -1) {
                  sudokuKosong[j].kemungkinan.splice(index, 1);
                }
              }
            }
          }
        }
        angka++;
      }

      for(let i = 0; i < sudokuKosong.length; i++) {
        if(sudokuKosong[i].kemungkinan.length === 1) {
          this.board_string[sudokuKosong[i].index[0]][sudokuKosong[i].index[1]] = sudokuKosong[i].kemungkinan;
        }
      }

      let arrTmp;
      let arrTmpKemungkinan = {};
      for(let i = 1; i <= 9; i++) {
        arrTmp = [];
        arrTmpKemungkinan = [];
        for(let j = 0; j < sudokuKosong.length; j++) {
          if(sudokuKosong[j].bagian === i) {
            arrTmp.push(sudokuKosong[j]);
          }
        }

        for(let k = 0; k < arrTmp.length; k++) {
          for(let l = 0; l < arrTmp[k].kemungkinan.length; l++) {
            arrTmpKemungkinan.push(arrTmp[k].kemungkinan[l]);
          }
        }

        let arrTampungYangBeda = [];
        for(let k = 0; k < arrTmpKemungkinan.length; k++) {
          let checkKemungkinanIsFind = false;
          for(let l = 0; l < arrTmpKemungkinan.length; l++) {
            if(k !== l) {
              if(arrTmpKemungkinan[k] === arrTmpKemungkinan[l]) {
                checkKemungkinanIsFind = true;
              }
            }
          }

          if(!checkKemungkinanIsFind) {
            arrTampungYangBeda.push(arrTmpKemungkinan[k]);
          }
        }

        for(let k = 0; k < arrTampungYangBeda.length; k++) {
          for(let l = 0; l < sudokuKosong.length; l++) {
            if(sudokuKosong[l].bagian === i) {
              if(sudokuKosong[l].kemungkinan.indexOf(arrTampungYangBeda[k]) !== -1){
                sudokuKosong[l].kemungkinan = [arrTampungYangBeda[k]];
              }
            }
          }
        }
      }

      //console.log(sudokuKosong);
      for(let i = 0; i < sudokuKosong.length; i++) {
        if(sudokuKosong[i].kemungkinan.length === 1) {
          this.board_string[sudokuKosong[i].index[0]][sudokuKosong[i].index[1]] = sudokuKosong[i].kemungkinan;
        }
      }
      aaaa++;
    }
  }

  // Returns a string representing the current state of the board
  board() {
    let tampilanBoard = "";
    for(let i = 0; i < this.board_string.length; i++) {
      if(i%3 === 0) {
        tampilanBoard+=("-----------" + "\n");
      }
      for(let j = 0; j < this.board_string[i].length; j++) {
        if(j%3 === 0 && j != 0) {
          tampilanBoard+= "|";
        }
        tampilanBoard+=(this.board_string[i][j]);
      }
      tampilanBoard+="\n";
      if(i === this.board_string.length-1) {
        tampilanBoard+=("-----------");
      }
    }
    return tampilanBoard;
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs');
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0];

var game = new Sudoku(board_string);

// Remember: this will just fill out what it can and not "guess"
game.solve();

// console.log(game.checkKemungkinan([1, 2, 5, 6], [4, 5, 6], [6, 5, 8]));
console.log(game.board());
