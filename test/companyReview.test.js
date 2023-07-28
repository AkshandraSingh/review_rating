let server = require("../index");
let chaiHttp = require("chai-http");
let chai = require("chai");

chai.should();
chai.use(chaiHttp);

// ! Company Review Test Case :
// ! 1> Create Review .
// ! 2> Update Review .
// ! 3> Delete Review.


// ! 1> Create Review 
describe('POST /api/companyreview', () => {
    it('IT should return Creation Review detail :', (done) => {
        const data = {
            companyReviewSubject: "Instagram",
            userId: "64c3b89d7ab87e51699b6967",
            companyId: "64c3b97c7ab87e51699b6970",
            companyReview: "Jai Shree Ram ",
            companyReviewReateing: "2"
        }
        chai
            .request(server)
            .post('/companyreview/createreview')
            .send(data)
            .end((err, res) => {
                res.should.have.status(202);
                res.should.be.a('object');
                res.body.should.have.property('sucess').eq(true);
                res.body.should.have.property('message').eq('Your Review is Successfully Created');
                res.body.should.have.property('Data');
            }); done();
    });
})


// ! 2> Update Review 
describe('POST /api/companyreview', () => {
    it('IT should return Updation Review detail :', (done) => {
        const data = {
            companyReviewSubject: "Ab Saii Ha",
            userId: "64b7ca4c4b9ea492578f7bb0",
            companyId: "64b1485a501d52b6b130f39e",
            companyReview: "Hello@",
            companyReviewReateing: "5"
        }
        chai
            .request(server)
            .patch('/companyreview/updateReview/64c3ba5f7ab87e51699b6977')
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('message').eq('Review Updated Successfully');
                res.body.should.have.property('updateReview');
            }); done();
    });
})

// ! 3> Delete Review 
describe('POST /api/companyreview', () => {
    it('IT should return Deleteing Review detail :', (done) => {
        chai
            .request(server)
            .delete('/companyreview/deletereview/64c3e8a281b30a9e5bfe4f8b')
            .end((err, res) => {
                res.should.have.status(202);
                res.should.be.a('object');
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('message').eq('Review Deleted Successfully');
                res.body.should.have.property('Data');
            }); done();
    });
})