let server = require("../index");
var chai = require("chai");
let chaiHttp = require("chai-http");
let companyRoutes = require("../routes/companyRouter");
let companySchema = require("../models/companySchema");

chai.should();
chai.use(chaiHttp);

// Create Company 👍
// describe("POST /api/companies", () => {
//     it("IT should return company register successfuly detail :", (done) => {
//         const data = {
//             companyName: "TCS111",
//             companyCity: "indore",
//             companyLocation: "vijaynagar",
//         };
//         chai
//             .request(server)
//             .post("/company/create")
//             .set("content-Type", "application/x-www-form-urlencoded")
//             .field(data)
//             .attach("companyPic", "C:/Users/workspace/review_rating/uploads/image_1689340096105.Netflix-logo")
//             .end((err, res) => {
//                 res.should.have.status(201);
//                 res.should.be.a("object");
//                 res.body.should.have.property("success").eq(true);
//                 res.body.should.have.property("message").eq("Company created");
//             });
//         done();
//     });
//     it("IT should return already registered detail :", (done) => {
//         const data = {
//             companyName: "TCS11",
//             companyCity: "indore",
//             companyLocation: "vijaynagar",
//         };
//         chai
//             .request(server)
//             .post("/company/create")
//             .send(data)
//             .end((err, res) => {
//                 res.should.have.status(401);
//                 res.should.be.a("object");
//                 res.body.should.have.property("success").eq(false);
//                 res.body.should.have.property("message").eq("Company allready exists");;
//             });
//         done();
//     });
// });

// Company List ✌
describe("POST/ api/company", () => {
    it("IT Should Return Company List Detail : ", (done) => {
        chai
            .request(server)
            .get("/company/listcompany")
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("List Of Company");
                res.body.should.have.property("count")
            });
        done();
    });
})
// Comapny Sort ❤
describe("POST/ api/company", () => {
    it("IT Should Return Company List Detail With Sort : ", (done) => {
        chai
            .request(server)
            .get("/company/sortcompany")
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("Company List With Sorted Format 😎");
                res.body.should.have.property("data")
            });
        done();
    });
})

// Search Company ✌
describe("POST/ api/company", () => {
    it("IT Should Return Company Searching Detail : ", (done) => {
        chai
            .request(server)
            .get("/company/searchcompany/IshanSingh")
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("Company Found ✔");
                res.body.should.have.property("data")
            });
        done();
    });
    it("IT Should Return Error Company Searching : ", (done) => {
        chai
            .request(server)
            .get("/company/searchcompany/data")
            .end((err, res) => {
                res.should.have.status(403);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(false);
                res.body.should.have.property("message").eq("Company Not Found 🙂");
            });
        done();
    });
})