const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

describe("Unit Tests", () => {
    it("Valid puzzle of 81 characters", () => {
        const result = solver.validate( "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37." );

        assert.equal( result[0], true );
        assert.equal( result.length, 1 );
    });

    it("Puzzle with invalid characters", () => {
        const result = solver.validate( "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37A" );
        assert.equal( result[0], false );
        assert.equal( result[1], "Invalid characters in puzzle" );
    });

    it("Puzzle not 81 characters long", () => {
        const result = solver.validate( "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37" );
        assert.equal( result[0], false );
        assert.equal( result[1], "Expected puzzle to be 81 characters long" );
    });

    it("Valid row placement", () => {
        const grid = [
            [ 1, 0, 5, 0, 0, 2, 0, 8, 4 ],
            [ 0, 0, 6, 3, 0, 1, 2, 0, 7 ],
            [ 0, 2, 0, 0, 5, 0, 0, 0, 0 ],
            [ 0, 9, 0, 0, 1, 0, 0, 0, 0 ],
            [ 8, 0, 2, 0, 3, 6, 7, 4, 0 ],
            [ 3, 0, 7, 0, 2, 0, 0, 9, 0 ],
            [ 4, 7, 0, 0, 0, 8, 0, 0, 1 ],
            [ 0, 0, 1, 6, 0, 0, 0, 0, 9 ],
            [ 2, 6, 9, 1, 4, 0, 3, 7, 0 ]
        ];
        const row = 5, column = 8, value = 4;
        const result = solver.checkRowPlacement( grid, row, column, value );

        assert.equal( result, true );
    });

    it("Invalid row placement", () => {
        const grid = [
            [ 1, 0, 5, 0, 0, 2, 0, 8, 4 ],
            [ 0, 0, 6, 3, 0, 1, 2, 0, 7 ],
            [ 0, 2, 0, 0, 5, 0, 0, 0, 0 ],
            [ 0, 9, 0, 0, 1, 0, 0, 0, 0 ],
            [ 8, 0, 2, 0, 3, 6, 7, 4, 0 ],
            [ 3, 0, 7, 0, 2, 0, 0, 9, 0 ],
            [ 4, 7, 0, 0, 0, 8, 0, 0, 1 ],
            [ 0, 0, 1, 6, 0, 0, 0, 0, 9 ],
            [ 2, 6, 9, 1, 4, 0, 3, 7, 0 ]
        ];
        const row = 1, column = 5, value = 4;
        const result = solver.checkRowPlacement( grid, row, column, value );

        assert.equal( result, false );
    });

    it("Valid column placement", () => {
        const grid = [
            [ 1, 0, 5, 0, 0, 2, 0, 8, 4 ],
            [ 0, 0, 6, 3, 0, 1, 2, 0, 7 ],
            [ 0, 2, 0, 0, 5, 0, 0, 0, 0 ],
            [ 0, 9, 0, 0, 1, 0, 0, 0, 0 ],
            [ 8, 0, 2, 0, 3, 6, 7, 4, 0 ],
            [ 3, 0, 7, 0, 2, 0, 0, 9, 0 ],
            [ 4, 7, 0, 0, 0, 8, 0, 0, 1 ],
            [ 0, 0, 1, 6, 0, 0, 0, 0, 9 ],
            [ 2, 6, 9, 1, 4, 0, 3, 7, 0 ]
        ];
        const row = 5, column = 3, value = 4;
        const result = solver.checkColPlacement( grid, row, column, value );

        assert.equal( result, true );
    });

    it("Invalid column placement", () => {
        const grid = [
            [ 1, 0, 5, 0, 0, 2, 0, 8, 4 ],
            [ 0, 0, 6, 3, 0, 1, 2, 0, 7 ],
            [ 0, 2, 0, 0, 5, 0, 0, 0, 0 ],
            [ 0, 9, 0, 0, 1, 0, 0, 0, 0 ],
            [ 8, 0, 2, 0, 3, 6, 7, 4, 0 ],
            [ 3, 0, 7, 0, 2, 0, 0, 9, 0 ],
            [ 4, 7, 0, 0, 0, 8, 0, 0, 1 ],
            [ 0, 0, 1, 6, 0, 0, 0, 0, 9 ],
            [ 2, 6, 9, 1, 4, 0, 3, 7, 0 ]
        ];
        const row = 5, column = 9, value = 4;
        const result = solver.checkColPlacement( grid, row, column, value );

        assert.equal( result, false );
    });

    it("Valid region placement", () => {
        const grid = [
            [ 1, 0, 5, 0, 0, 2, 0, 8, 4 ],
            [ 0, 0, 6, 3, 0, 1, 2, 0, 7 ],
            [ 0, 2, 0, 0, 5, 0, 0, 0, 0 ],
            [ 0, 9, 0, 0, 1, 0, 0, 0, 0 ],
            [ 8, 0, 2, 0, 3, 6, 7, 4, 0 ],
            [ 3, 0, 7, 0, 2, 0, 0, 9, 0 ],
            [ 4, 7, 0, 0, 0, 8, 0, 0, 1 ],
            [ 0, 0, 1, 6, 0, 0, 0, 0, 9 ],
            [ 2, 6, 9, 1, 4, 0, 3, 7, 0 ]
        ];
        const row = 2, column = 2, value = 4;
        const result = solver.checkRegionPlacement( grid, row, column, value );

        assert.equal( result, true );
    });

    it("Invalid region placement", () => {
        const grid = [
            [ 1, 0, 5, 0, 0, 2, 0, 8, 4 ],
            [ 0, 0, 6, 3, 0, 1, 2, 0, 7 ],
            [ 0, 2, 0, 0, 5, 0, 0, 0, 0 ],
            [ 0, 9, 0, 0, 1, 0, 0, 0, 0 ],
            [ 8, 0, 2, 0, 3, 6, 7, 4, 0 ],
            [ 3, 0, 7, 0, 2, 0, 0, 9, 0 ],
            [ 4, 7, 0, 0, 0, 8, 0, 0, 1 ],
            [ 0, 0, 1, 6, 0, 0, 0, 0, 9 ],
            [ 2, 6, 9, 1, 4, 0, 3, 7, 0 ]
        ];
        const row = 2, column = 2, value = 5;
        const result = solver.checkRegionPlacement( grid, row, column, value );
        assert.equal( result, false );
    });

    it("Valid grid - solver pass", () => {
        const grid = [
            [ 1, 0, 5, 0, 0, 2, 0, 8, 4 ],
            [ 0, 0, 6, 3, 0, 1, 2, 0, 7 ],
            [ 0, 2, 0, 0, 5, 0, 0, 0, 0 ],
            [ 0, 9, 0, 0, 1, 0, 0, 0, 0 ],
            [ 8, 0, 2, 0, 3, 6, 7, 4, 0 ],
            [ 3, 0, 7, 0, 2, 0, 0, 9, 0 ],
            [ 4, 7, 0, 0, 0, 8, 0, 0, 1 ],
            [ 0, 0, 1, 6, 0, 0, 0, 0, 9 ],
            [ 2, 6, 9, 1, 4, 0, 3, 7, 0 ]
        ];
        const result = solver.solve( grid, 0, 0 );

        assert.typeOf( result, "array" );
        assert.equal( result.length, 9 );
    });

    it("Invalid grid - solver fail", () => {
        const grid = [
            [ 1, 9, 5, 9, 9, 2, 9, 8, 4 ],
            [ 0, 0, 6, 3, 0, 1, 2, 0, 7 ],
            [ 0, 2, 0, 0, 5, 0, 0, 0, 0 ],
            [ 0, 9, 0, 0, 1, 0, 0, 0, 9 ],
            [ 8, 0, 2, 0, 3, 6, 7, 4, 0 ],
            [ 3, 0, 7, 0, 2, 0, 0, 9, 0 ],
            [ 4, 7, 0, 0, 0, 8, 0, 0, 1 ],
            [ 0, 0, 1, 6, 0, 0, 0, 0, 9 ],
            [ 2, 6, 9, 1, 4, 0, 3, 7, 9 ]
        ];
        const result = solver.solve( grid, 0, 0 );

        assert.equal( result, false );
    });

    it("Solver returns expected solutions", () => {
        const grid = [
            [ 1, 0, 5, 0, 0, 2, 0, 8, 4 ],
            [ 0, 0, 6, 3, 0, 1, 2, 0, 7 ],
            [ 0, 2, 0, 0, 5, 0, 0, 0, 0 ],
            [ 0, 9, 0, 0, 1, 0, 0, 0, 0 ],
            [ 8, 0, 2, 0, 3, 6, 7, 4, 0 ],
            [ 3, 0, 7, 0, 2, 0, 0, 9, 0 ],
            [ 4, 7, 0, 0, 0, 8, 0, 0, 1 ],
            [ 0, 0, 1, 6, 0, 0, 0, 0, 9 ],
            [ 2, 6, 9, 1, 4, 0, 3, 7, 0 ]
        ];
        const resultArray = solver.solve( grid, 0, 0 );
        const resultString = resultArray.flat().join("");

        assert.typeOf( resultString, "string" );
        assert.equal( resultString, "135762984946381257728459613694517832812936745357824196473298561581673429269145378" );
    });
});
