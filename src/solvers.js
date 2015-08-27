/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var board = new Board({n:n});

  for (var i=0; i<n; i++) {
    for (var j=0; j<n; j++) {
      j = j+i;
      board.togglePiece(i,j);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(i,j);
        break;
      }
    }
  }
  var solution = board.rows();
//  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // var solutionCount = 0;
  // var positions = [[]];
  // var solved = false;
  // var startingI = 0;
  // var startingJ = 0;
  var arr = [];
  for(var i = n; i > 0; i--){
    arr.push(i);
  }
  var solutionCount = _.reduce(arr, function(acc, val){
    acc = acc * val;
    return acc;
  });
  

  // var generateSolutionCount = function(n,solutionCount) {
/*with this approach are we attempting to create an array of 
all matrices in order to offer all possible solutions as the final
result?*/
// we can just return the result count

    //rows left to search
  //   var availableRows;
  //   //for the first row
  //   if (currentRow===0) {
  //     //set our available rows to n less 1 : never hit last one
  //     var availableRows = n-1;
  //   }
  //   //if our current row is less than half (rounded up for odds)
  //   if (currentRow<Math.ceil(n/2)) {
  //     //rows left to run through is 'half'
  //     availableRows = Math.ceil(n/2);
  //   }

  //   //if there are no more avail positions, we are at end of currentRow possibilites, move to next row
  //   if (!availablePositions) {
  //     //increment count
  //     currentRow++;
  //     return;
  //   }

  //   for (var i=0;i<availableRows;i++) {
  //     // set initial value
  //     //
  //     // recurse(inital_row)
  //   }

  // };
  
//  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n:n});
  var even = (n%2===0)?true:false;
  var innerStart = (even)?1:0;
  for (var i=0; i<n; i++) {
    for (var j=innerStart; j<n; j++) {
      j = j+(i*2);
      if (even) {
        if ( i===((n/2)-1) )  {
          innerStart=;
        }
      }
      if (j>=n) {
        j = j-n;
        // i++;
      }
      console.log(n+' board toggle: '+i+','+j);
      board.togglePiece(i,j);
      break;
    }
  }
  var solution = board.rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
