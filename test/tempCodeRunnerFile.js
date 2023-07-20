let server = require("../index");
// var chai = require("chai");
// let chaiHttp = require("chai-http");
// let companyReviewRoutes = require("../routes/companyReviewRouter");
// let companyReviewSchema = require("../models/companyReviewSchema");

// chai.should();
// chai.use(chaiHttp);

// describe("POST/ api/companyReview", () => {
//     it("IT Should Return Email Send Detail : ", (done) => {
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
//                 res.should.have.status(201);
//                 res.should.be.a("object");
//                 res.body.should.have.property("success").eq(true);
//                 res.body.should.have.property("message").eq("Your review was successfully created");
//                 res.body.should.have.property("Data")
//             });
//         done();
//     });
// })