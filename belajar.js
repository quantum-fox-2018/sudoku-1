function solve(num) {
	var papan = num.toString().split('');
	var papanArr = [];
	var hasilArr = [];

	var papanNum = [];
	for (let i = 0; i < papan.length; i++) {
		papanNum.push(Number(papan[i]));
		if (papanNum.length === 9) {
			papanArr.push(papanNum);
			papanNum = [];
		}
	}

	var tampungArr = [];
	var tampungTmp = [];
	for (let a = 0; a < papanArr.length; a++) {
		let column = 0;
		if (papanArr[a][column] !== 0) {
		}

		if (tampungTmp.length === 9) {
			tampungArr.push(tampungTmp);
			tampungTmp = [];
			column++;
		}
	}




	var hasilTmp = [];
	for (let k = 0; k < papanArr.length; k++) {

		for (let i = 0; i < papanArr[k].length; i++) {
			var nilai;

			if (i !== 0) {
				nilai = papanArr[k][i - 1] + 1;
				if (nilai > 9) {
					nilai = 1;
				}
			} else {
				nilai = 1;
			}

			if (papanArr[k][i] === 0) {
				while (
					papanArr[k].includes(nilai) === true ||
					hasilTmp.includes(nilai) === true
				) {
					if (nilai > 9) {
						nilai = 1;
					} else {
						nilai++;
					}
				}

				hasilTmp.push(nilai);
			} else {
				hasilTmp.push(papanArr[k][i]);
			}
		}

		if (hasilTmp.length === 9) {
			hasilArr.push(hasilTmp);
			hasilTmp = [];
		}
	}

	console.log(hasilArr);
}

console.log(
	solve(
		'105802000090076405200400819019007306762083090000061050007600030430020501600308900'
	)
);
