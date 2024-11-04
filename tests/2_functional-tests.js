const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

describe("Functional Tests", () => {
    describe("/api/solve", () => {
        it("Valid puzzle string", ( done ) => {
            chai
            .request( server )
            .post( "/api/solve" )
            .send({
                puzzle: "5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3"
            })
            .then(( res ) => {
                assert.equal( res.status, 200 );
                assert.equal( res.body.solution, "568913724342687519197254386685479231219538467734162895926345178473891652851726943" )
                done();
            })
            .catch(( err ) => console.log( err ));
        });

        it("Missing puzzle string", ( done ) => {
            chai
            .request( server )
            .post( "/api/solve" )
            .send({})
            .then(( res ) => {
                assert.equal( res.status, 200 );
                assert.equal( res.body.error, "Required field missing" )
                done();
            })
            .catch(( err ) => console.log( err ));
        });

        it("Invalid characters", ( done ) => {
            chai
            .request( server )
            .post( "/api/solve" )
            .send({
                puzzle: "5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72ABC3"
            })
            .then(( res ) => {
                assert.equal( res.status, 200 );
                assert.equal( res.body.error, "Invalid characters in puzzle" );
                done();
            })
            .catch(( err ) => console.log( err ));
        });

        it("Incorrect length", ( done ) => {
            chai
            .request( server )
            .post( "/api/solve" )
            .send({
                puzzle: "5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.723"
            })
            .then(( res ) => {
                assert.equal( res.status, 200 );
                assert.equal( res.body.error, "Expected puzzle to be 81 characters long" );
                done();
            })
            .catch(( err ) => console.log( err ));
        });

        it("Puzzle cannot be solved", ( done ) => {
            chai
            .request( server )
            .post( "/api/solve" )
            .send({
                puzzle: "59991372.3......8.5.999925..8.68.47.23...95..46.7.4.....5.2...99..4..8916..85.723"
            })
            .then(( res ) => {
                assert.equal( res.status, 200 );
                assert.equal( res.body.error, "Puzzle cannot be solved" );
                done();
            })
            .catch(( err ) => console.log( err ));
        });
    });

    describe("/api/check", () => {
        it("Puzzle placement with all fields", ( done ) => {
            chai
            .request( server )
            .post( "/api/check" )
            .send({
                puzzle: "..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1",
                coordinate: "a1",
                value: "1"
            })
            .then(( res ) => {
                assert.equal( res.status, 200 );
                assert.equal( res.body.valid, true );
                done();
            })
            .catch(( err ) => console.log( err ));
        });

        it("Puzzle placement with single placement conflict", ( done ) => {
            chai
            .request( server )
            .post( "/api/check" )
            .send({
                puzzle: "..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1",
                coordinate: "a1",
                value: "6"
            })
            .then(( res ) => {
                assert.equal( res.status, 200 );
                assert.equal( res.body.valid, false );
                assert.typeOf( res.body.conflict, "array" );
                assert.equal( res.body.conflict.length, 1 );
                assert.include( res.body.conflict, "column" );
                done();
            })
            .catch(( err ) => console.log( err ));
        });

        it("Puzzle placement with multiple placement conflicts", ( done ) => {
            chai
            .request( server )
            .post( "/api/check" )
            .send({
                puzzle: "..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1",
                coordinate: "e8",
                value: "8"
            })
            .then(( res ) => {
                assert.equal( res.status, 200 );
                assert.equal( res.body.valid, false );
                assert.typeOf( res.body.conflict, "array" );
                assert.equal( res.body.conflict.length, 2 );
                assert.include( res.body.conflict, "column" );
                assert.include( res.body.conflict, "region" );
                done();
            })
            .catch(( err ) => console.log( err ));
        });

        it("Puzzle placement with all placement conflicts", ( done ) => {
            chai
            .request( server )
            .post( "/api/check" )
            .send({
                puzzle: "..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1",
                coordinate: "a1",
                value: "7"
            })
            .then(( res ) => {
                assert.equal( res.status, 200 );
                assert.equal( res.body.valid, false );
                assert.typeOf( res.body.conflict, "array" );
                assert.equal( res.body.conflict.length, 3 );
                assert.include( res.body.conflict, "row" );
                assert.include( res.body.conflict, "column" );
                assert.include( res.body.conflict, "region" );
                done();
            })
            .catch(( err ) => console.log( err ));
        });

        it("Puzzle placement with missing required fields", ( done ) => {
            chai
            .request( server )
            .post( "/api/check" )
            .send({})
            .then(( res ) => {
                assert.equal( res.status, 200 );
                assert.equal( res.body.error, "Required field(s) missing" );
                done();
            })
            .catch(( err ) => console.log( err ));
        });

        it("Puzzle placement with invalid characters", ( done ) => {
            chai
            .request( server )
            .post( "/api/check" )
            .send({
                puzzle: "..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492..a1",
                coordinate: "a1",
                value: "7"
            })
            .then(( res ) => {
                assert.equal( res.status, 200 );
                assert.equal( res.body.error, "Invalid characters in puzzle" );
                done();
            })
            .catch(( err ) => console.log( err ));
        });

        it("Puzzle placement with incorrect length", ( done ) => {
            chai
            .request( server )
            .post( "/api/check" )
            .send({
                puzzle: "..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492..1",
                coordinate: "a1",
                value: "7"
            })
            .then(( res ) => {
                assert.equal( res.status, 200 );
                assert.equal( res.body.error, "Expected puzzle to be 81 characters long" );
                done();
            })
            .catch(( err ) => console.log( err ));
        });

        it("Puzzle placement with invalid placement coordinate", ( done ) => {
            chai
            .request( server )
            .post( "/api/check" )
            .send({
                puzzle: "..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1",
                coordinate: "j1",
                value: "7"
            })
            .then(( res ) => {
                assert.equal( res.status, 200 );
                assert.equal( res.body.error, "Invalid coordinate" );
                done();
            })
            .catch(( err ) => console.log( err ));
        });
        
        it("Puzzle placement with invalid placement value", ( done ) => {
            chai
            .request( server )
            .post( "/api/check" )
            .send({
                puzzle: "..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1",
                coordinate: "a1",
                value: "13"
            })
            .then(( res ) => {
                assert.equal( res.status, 200 );
                assert.equal( res.body.error, "Invalid value" );
                done();
            })
            .catch(( err ) => console.log( err ));
        });
    });
});
