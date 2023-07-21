let server = require("../index");
var chai = require("chai");
let chaiHttp = require("chai-http");
let companyReviewRoutes = require("../routes/companyReviewRouter");
let companyReviewSchema = require("../models/companyReviewSchema");

chai.should();
chai.use(chaiHttp);

// Create Company Review 😁
// describe("POST/ api/companyReview", () => {
//     it("IT Should Return Review Create Deatil : ", (done) => {
//         const data = {
//             companyReviewSubject: "Not sooo Nice 😶",
//             userId: "64b7ca4c4b9ea492578f7bb0",
//             companyId: "64b51baee011d6f6b86aa4c4",
//             companyReview: "I think it can be Better because ....",
//             companyReviewReateing: "2"
//         }
//         chai
//             .request(server)
//             .post("/companyreview/createreview")
//             .send(data)
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.should.be.a("object");
//                 res.body.should.have.property("sucess").eq(true);
//                 res.body.should.have.property("message").eq("Your review was successfully created");
//                 res.body.should.have.property("Data")
//             });
//         done();
//     });
// })

// Comapny Delete Review
describe("POST/ api/companyReview", () => {
    it("IT Should Return Review Create Deatil : ", (done) => {
        chai
            .request(server)
            .delete("/companyreview/deletereview/64b9623c7777cbb83ddf1ddd")
            .end((err, res) => {
                res.should.have.status(202);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("Review Deleted Successfully");
                res.body.should.have.property("Data")
            });
        done();
    });
})

// Update Review 😎
describe("POST/ api/companyReview", () => {
    it("IT Should Return Review Updated Detail : ", (done) => {
        const data = {
            companyReviewSubject: "Ab Saii Ha",
            userId: "64b7ca4c4b9ea492578f7bb0",
            companyId: "64b1485a501d52b6b130f39e",
            companyReview: "Hello@",
            companyReviewReateing: "5"
        }
        chai
            .request(server)
            .patch("/companyreview/updateReview/64b961eac9dc8188bf3046dd")
            .send(data)
            .end((err, res) => {
                res.should.have.status(202);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("Review Updated Successfully");
                res.body.should.have.property("updateReview")
            });
        done();
    });
})