function sudoku(num) {
  var string = num.toString();
  var arrSudoku = [];
  var arr = []
  for (var i = 0; i < string.length + 1; i++) {
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

console.log(sudoku('105802000090076405200400819019007306762083090000061050007600030430020501600308900'))
