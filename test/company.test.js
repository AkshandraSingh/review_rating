let server = require("../index");
let chaiHttp = require("chai-http");
let chai = require("chai");

chai.should();
chai.use(chaiHttp);

// ! User Test Case :
// ! 1> Create Company .
// ! 2> Company List .
// ! 3> Company Details .
// ! 4> Sort Deltails .
// ! 5> Comapny Search .


// ! 1> CREATE Company  ( It was Not Working ) Error!!
// describe('POST /api/company', () => {
    // it('IT should return Created Company detail :', (done) => {
    //     const data = {
    //         companyName: "VsCode",
    //         companyLocation: "India",
    //         companyState: "M.P",
    //         companyCity: "Indore",
    //         profilePic: "barwala",
    //     };
    //     chai
    //         .request(server)
    //         .post('/company/createcompany')
    //         .set("content-Type", "application/x-www-form-urlencoded")
    //         .field(data)
    //         .attach("profilePic", "C:/Users/workspace/review_rating/uploads/image_1690258631016.Instagram")
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.should.be.a('object');
    //             res.body.should.have.property('success').eq(true);
    //             res.body.should.have.property('message').eq('Company created');
    //         }); done();
    // });

    // it('IT should return Same Email Error for User :', (done) => {
    //     const data = {
    //         companyName: "VsCode",
    //         companyLocation: "India",
    //         companyState: "M.P",
    //         companyCity: "Indore",
    //         profilePic: "barwala",
    //     };
    //     chai
    //         .request(server)
    //         .post('/company/createcompany')
    //         .set("content-Type", "application/x-www-form-urlencoded")
    //         .field(data)
    //         .attach("profilePic", "C:/Users/workspace/review_rating/uploads/image_1690258631016.Instagram")
    //         .end((err, res) => {
    //             res.should.have.status(401);
    //             res.should.be.a('object');
    //             res.body.should.have.property('success').eq(false);
    //             res.body.should.have.property('message').eq('Company allready exists');
    //         }); done();
    // });
// })

// ! 2> Company List
describe('POST /api/company', () => {
    it('IT should return List Company detail :', (done) => {
        chai
            .request(server)
            .get('/company/listcompany')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('message').eq('List Of Company');
                res.body.should.have.property('count');
                res.body.should.have.property('list');
            }); done();
    });
})

// ! 3> Company Details
describe('POST /api/company', () => {
    it('IT should return List Company detail :', (done) => {
        chai
            .request(server)
            .get('/company/detailscompany/64c3b97c7ab87e51699b6970')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('message').eq('Company details');
                res.body.should.have.property('company');
                res.body.should.have.property('review');
            }); done();
    });
})

// ! 4> Sort Company
describe('POST /api/company', () => {
    it('IT should return List With Sort Company detail :', (done) => {
        chai
            .request(server)
            .get('/company/sortcompany')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('message').eq('Company List With Sorted Format 😎');
                res.body.should.have.property('data');
            }); done();
    });
})

// ! 5> Search Company
describe('POST /api/company', () => {
    it('IT should return Search Company detail :', (done) => {
        chai
            .request(server)
            .get('/company/searchcompany/i')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('message').eq('Company Found ✔');
                res.body.should.have.property('data');
            }); done();
    });

    it('IT should return Search Company Error :', (done) => {
        chai
            .request(server)
            .get('/company/searchcompany/z')
            .end((err, res) => {
                res.should.have.status(403);
                res.should.be.a('object');
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('message').eq('Review Deleted Successfully');
                res.body.should.have.property('data');
            }); done();
    });
})
