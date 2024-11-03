'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value } = req.body;

      if( !puzzle || !coordinate || !value ){
        res.json({ error: 'Required field(s) missing' });
        return;
      }

      if( value > 9 || value < 1 ){
        res.json({ error: 'Invalid value' });
        return;
      }

      const rowLetter = coordinate.split('')[0];
      const column = coordinate.split('')[1];

      if( coordinate.length != 2 || !/[a-i]/i.test( rowLetter ) || !/[1-9]/i.test( column ) ){
        res.json({ error: "Invalid coordinate" });
        return;
      }

      if( !/[1-9]/i.test( value ) ){
        res.json({ error: "Invalid value" });
      }

      const validationResult = solver.validate( puzzle );
      if( !validationResult[0] ){
        res.send({ error: validationResult[1] });
        return;
      }

      const grid = solver.createGrid( puzzle );
      const row = solver.transformToNumber( rowLetter );

      const rowCheck = solver.checkRowPlacement( grid, row, column, value );
      const colCheck = solver.checkColPlacement( grid, row, column, value );
      const regCheck = solver.checkRegionPlacement( grid, row, column, value );

      if( !rowCheck || !colCheck || !regCheck ){
        let conflictArray = [];

        if( !rowCheck ) conflictArray.push( "row" );
        if( !colCheck ) conflictArray.push( "column" );
        if( !regCheck ) conflictArray.push( "region" );

        res.json({ valid: false, conflict: conflictArray });
        return;
      }

      res.json({ valid: true });

    });

  app.route('/api/solve')
    .post((req, res) => {
      const { puzzle } = req.body;

      if( !puzzle ){
        res.json({ error: 'Required field missing' });
        return;
      }

      const validationResult = solver.validate( puzzle );
      if( !validationResult[0] ){
        res.json({ error: validationResult[1] });
        return;
      }

      const grid = solver.createGrid( puzzle );
      const solved = solver.solve( grid, 0, 0 );


      if( !solved ){
        res.json({ error: 'Puzzle cannot be solved' })
      } else {
        const solvedString = solved.flat().join("");
        res.json({ solution: solvedString });
      };
    });
};
