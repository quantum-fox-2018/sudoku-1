'use strict';

class Sudoku {
	constructor(board_string) {
		this.strBoard = board_string;
	}

	solve() {
		let pos = this.getEmpty();
		let board = this.board();
		let max = 9;
    let count = 0
		while(count < pos.length) {
      console.log(board);
			let solveNum = board[pos[count][0]][pos[count][1]] + 1;
			let status = false;
			while (!status && solveNum <= max) {
				if (this.checkDuplicate(board, pos[count], solveNum)) {
					status = true;
					board[pos[count][0]][pos[count][1]] = solveNum;
					count++;
				} else {
					solveNum++;
				}
			}
			if (status == false) {
				board[pos[count][0]][pos[count][1]] = 0;
				count--;
			}
      this.sleep(50)
      this.reset_board()
		}
		return board;
	}
	checkDuplicate(board, pos, num) {
    //cek horizontal
		for (let i = 0; i < board.length; i++) {
			if (board[pos[0]][i] == num) {
				return false;
			}
		}
    //cek vertical
		for (let i = 0; i < board.length; i++) {
			if (board[i][pos[1]] == num) {
				return false;
			}
		}
    // cek kotak
    var box = []
    var outer = 0
    var inner = 0
    if (pos[0] >= 0 && pos[0] <= 2) {
      outer = 0;
    }else if (pos[0] >= 3 && pos[0] <= 5) {
      outer = 3;
    }else if (pos[0] >= 6 && pos[0] <= 8) {
      outer = 6;
    }
    if (pos[1] >= 0 && pos[1] <= 2) {
      inner = 0;
    }else if (pos[1] >= 3 && pos[1] <= 5) {
      inner = 3;
    }else if (pos[1] >= 6 && pos[1] <= 8) {
      inner = 6;
    }

    for (var i = outer; i < outer + 3; i++) {
      for (var j = inner; j < inner + 3; j++) {
        box.push(board[i][j].toString())
      }
    }
    if (box.indexOf(num) > -1) {
      return false;
    }
		return true;
	}

	board() {
		let num = this.strBoard;
		let rowCol = 9;
		let arrBoard = [];
		let counter = 0;
		for (let i = 0; i < rowCol; i++) {
			let tmp = [];
			for (let j = 0; j < rowCol; j++) {
				tmp.push(+num[counter]);
				counter++;
			}
			arrBoard.push(tmp);
		}
		return arrBoard;
	}
	getEmpty() {
		let arrBoard = this.board();
		let arrEmpty = [];

		for (let i = 0; i < arrBoard.length; i++) {
			for (let j = 0; j < arrBoard[i].length; j++) {
				if (arrBoard[i][j] == 0) {
					let pos = [];
					pos.push(i, j);
					arrEmpty.push(pos);
				}
			}
		}
		return arrEmpty;
	}
  sleep(milliseconds) {
  	var start = new Date().getTime();
  	for (var i = 0; i < 1e7; i++) {
  		if (new Date().getTime() - start > milliseconds) {
  			break;
  		}
  	}
  }
  reset_board() {
  	console.log('\x1B[2J');
  }
}

var fs = require('fs');
var board_string = fs
	.readFileSync('set-01_sample.unsolved.txt')
	.toString()
	.split('\n')[0];

var game = new Sudoku(board_string);
game.solve();
console.log(game.board());
console.log(game.solve());
console.log('SOLVED!!!');
