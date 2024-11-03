
class SudokuSolver {
  createGrid(puzzleString){
    const string = puzzleString;

    let finalArr = [];
    for( let x = 0; x < string.length; x+=9 ){
      let holderArr = [];

      for( let j = 0; j < 9; j++ ){
        if( string[x + j] == "." ){
          holderArr.push(0);
        } else {
         holderArr.push(string[x + j]);
          holderArr[j] *= 1;
        }
      }

      finalArr.push( holderArr );
    }

    return finalArr;
  }

  transformToNumber(rowLetter){
    const letter = rowLetter.toUpperCase();

    switch( letter ){
      case "A":
        return 1;

      case "B": 
        return 2;

      case "C":
        return 3;

      case "D":
        return 4;

      case "E": 
        return 5;

      case "F":
        return 6;

      case "G":
        return 7;

      case "H": 
        return 8;

      case "I":
        return 9;

      default:
        return none;
    }

  }

  validate(puzzleString) {
    const string = puzzleString;

    if( !(string.length === 81) ){
      return [ false, "Expected puzzle to be 81 characters long" ];
    };

    if( !/^[\.0-9]*$/.test( string ) ){ 
      // anything else than numbers and dots
      return [ false, "Invalid characters in puzzle" ];
    };

    return [ true ];

  }

  checkRowPlacement(grid, row, column, value) {

    if( grid[row-1][column-1] == value ) return true;

    for(let x = 0; x <= 8; x++){
      if (grid[row-1][x] == value) return false;
    };

    return true;
  }

  checkColPlacement(grid, row, column, value) {

    if( grid[row-1][column-1] == value ) return true;

    for(let x = 0; x <= 8; x++){
      if (grid[x][column-1] == value) return false;
    };

    return true;
  }

  checkRegionPlacement(grid, row, column, value) {

    if( grid[row-1][column-1] == value ) return true;

    let startRow = row - (row % 3);
    let startCol = column - (column % 3);
    
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        if (grid[i + startRow][j + startCol] == value) return false;
      };
    };
    
    return true;
  }

  isSafe(grid, row, col, num){
    
    for(let x = 0; x <= 8; x++) if (grid[row][x] == num) return false;

    for(let x = 0; x <= 8; x++) if (grid[x][col] == num) return false;

    let startRow = row - row % 3;
    let startCol = col - col % 3;
        
    for(let i = 0; i < 3; i++) for(let j = 0; j < 3; j++) if (grid[i + startRow][j + startCol] == num) return false;

    return true;
}

  solve(grid, row, column) {
    if(row == 9 - 1 && column == 9) return grid;

    if(column == 9){
      row++;
      column = 0;
    }

    if(grid[row][column] != 0) return this.solve(grid, row, column + 1);

    for(let num = 1; num < 10; num++){

      if(this.isSafe(grid, row, column, num)){

        grid[row][column] = num;

        if(this.solve(grid, row, column + 1)) return grid;
      }

      grid[row][column] = 0;
    }

    return false;
  }
}

module.exports = SudokuSolver;
