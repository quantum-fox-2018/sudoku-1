"use strict"

class Sudoku {
  constructor(board_string) {
    this.board = this.generateBoard(board_string)
    this.koordinat = this.coordinatesZero()
  }



  coordinatesZero(){
    var kotak = this.board
    var koor=[];
      for (var f = 0; f < kotak.length; f++) {
        var isi=kotak[f]

        for (var s = 0; s < isi.length; s++) {
  //console.log(isi[s]);
          if(isi[s]== 0){
            koor.push([f,s])
          }
       }

      }
  return koor;
  }



  solve() {

    console.log(this.board);
    console.log(`++++++++++++++++++++++++++++++++++++++++++++++++++`);

    let i=0;
    let max = 9;
    while(i<this.koordinat.length){
      let baris = this.koordinat[i][0];
      let kolom = this.koordinat[i][1];
      let num = Number(this.board[baris][kolom])+1;
      var numBoard = Number(this.board[baris][kolom])
      let status = false;
      while(!status && num<=max){
        if(this.checkAll(this.board,baris,kolom,num)){
          numBoard = num;
          i++;
          status = true;
        } else {
          num++;
        }
      }
      if(!status){
        numBoard = 0;
        i--;
      }
    }
    return numBoard;
    }





  // Returns a string representing the current state of the board
  generateBoard(inputStr) {
    let board = [];
    let baris = [];
    for(let i=0; i<inputStr.length; i++){

      if(i%9==0){
      if(i==27||i==54){
        board.push(baris);
        baris = ['__________________________________'];
      }
        //console.log('ini A ' + index,str[index]);
            board.push(baris);
            baris = [];
            baris.push(Number(inputStr[i]));
      } else if(i%3==0){
        baris.push('|');
        baris.push(Number(inputStr[i]));
      }else{
        //console.log('ini B ' + index,str[index]);
        baris.push(Number(inputStr[i]));
      }

    }
    board.push(baris);
    board.shift();


    return board
  }

  checkRow(board,row,num){
    for(let i=0; i<board.length; i++){``
      if(board[row][i]==num  && !board[3][i] && !board[7][i] ){
        return false;
      }
    }
    return true;
  }


  checkCol(board,col,num){
    for(let j=0; j<board.length; j++){
      if(board[j][col]==num && !board[j][3]&& !board[j][7]){
        return false;
      }
    }
    return true;
  }

  checkBox(board,row,col,num){

      if(row == '|'){
        var baris = (Math.floor(row/3)*3)+1;
        var kolom = (Math.floor(col/3)*3)+1;
      }else{
        var baris = Math.floor(row/3)*3;
        var kolom = Math.floor(col/3)*3;
      }

    for(let i=baris; i<baris+3; i++){
      for(let j=kolom; j<kolom+3; j++){
        if(board[baris][kolom]==num){
          return false;
        }
      }
    }
    return true;
  }

  checkAll(kotak,row,col,num){
    if(this.checkRow(kotak,row,num)==true && this.checkCol(kotak,col,num)==true && this.checkBox(kotak,row,col,num==true)){
      return true;
    }else{
      return false;
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
//console.log(game)
// Remember: this will just fill out what it can and not "guess"
game.solve()

//console.log(game.Board)
//console.log(game.coordinatesZero());
//console.log(game.board());
//console.log(game.solve());
