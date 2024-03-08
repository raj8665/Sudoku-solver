var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick =  () => {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board);
	}
	xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=easy')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	SudokuSolver(board, 0, 0, 9);
};

function isValid( board, i, j, num, n){
    //    // Row Check
    //    for(let x = 0;x<n;x++){
    //        if(board[i][x]==num){
    //         return false;
    //        }
    //    }
    //    // Col check 
    //    for(let x=0;x<n;x++){
    //     if(board[x][j]){
    //         return false;
    //     }
    //    }

    //Row and Col Checks
    for(let x = 0;x<n;x++){
            if(board[i][x]==num || board[x][j]==num){
             return false;
            }
        }

    // SubMAtrix Check
    let root_n = Math.sqrt(n);
    let starting_index_of_i = i - i%root_n;
    let starting_index_of_j = j - j%root_n; 

    for(let x=starting_index_of_i;x<starting_index_of_i+root_n;x++){
        for(let y=starting_index_of_j;y<starting_index_of_j+root_n;y++){
            if(board[x][y]==num){
                return false;
            }
        }
    }
	return true;
}

function SudokuSolver(board,i, j, n){
    // Base Case 
    if(i==n){
        // Print(board,n);
        FillBoard(board);
        return true;
    }
    // if we are not inside the board
    if(j==n){
       return SudokuSolver(board,i+1,0,n);
    }


    // If cell is already filled -> just move ahead
    if(board[i][j]!=0){
        return SudokuSolver(board,i,j+1,n);
    }

    // We try to fill the cell with an appropriate number

    for(let num=1;num<=9;num++){
        //Check is num can be filled
         if(isValid(board,i,j,num,n)){
            board[i][j]=num;
            let subAns = SudokuSolver(board,i,j+1,n);
            if(subAns){
                return true;
            }
            // Backtracking -> undo the changes
            board[i][j]=0;
        }
    }
    return false;
}
