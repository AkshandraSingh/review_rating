let server = require("../index");
let chaiHttp = require("chai-http");
var chai = require("chai");
const userSchema = require("../models/userSchema");
let userRoutes = require("../routes/userRouter");

chai.should();
chai.use(chaiHttp);

// // lOGIN USER ❤
describe("POST/ api/users", () => {
    it("IT should return login user details: ", (done) => {
        const data = {
            userEmail: "ishanpy4@gmail.com",
            userPassword: "Ishan_1234"
        };
        chai
            .request(server)
            .post("/user/login")
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("Login Successful ✔");
                res.body.should.have.property("token");
            });
        done();
    });

    it("IT should Return Error Messsage:", (done) => {
        const data = {
            userEmail: "nameste380@gmail.com",
            userPassword: "NotYou@ritik"
        };
        chai
            .request(server)
            .post("/user/login")
            .send(data)
            .end((err, res) => {
                res.should.have.status(401);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(false);
                res.body.should.have.property("message").eq("Email or Password is Incorrect ");
            });
        done();
    });

})

// // CREATE USER ✌
// describe('POST /api/users', () => {
//     it('IT should return created user detail :', (done) => {
//         const data = {
//             userEmail: "deepakpuYWEUIFYSDUIHnia13426@gmail.com",
//             userPassword: "Punia@123",
//             userName: "Deepak",
//             userPhone: "8307521931",
//             userCity: "barwala",
//             userState: "hr",
//             userRole: "admin",
//         };
//         chai
//             .request(server)
//             .post('/user/create')
//             .set("content-Type", "application/x-www-form-urlencoded")
//             .field(data)
//             .attach("profilePic", "C:/Users/workspace/review_rating/uploads/image_1689340229509.ProfilePic2")


//             .end((err, res) => {
//                 res.should.have.status(201);
//                 res.should.be.a('object');
//                 res.body.should.have.property('success').eq(true);
//                 res.body.should.have.property('message').eq('User has been Created ✔');
//             }); done();
//     });

//     it('IT should return Same Email Error for User :', (done) => {
//         const data = {
//             userEmail: "deepakpuYWEUIFYSDUIHnia13426@gmail.com",
//             userPassword: "Punia@123",
//             userName: "Deepak",
//             userPhone: "8307521931",
//             userCity: "barwala",
//             userState: "hr",
//             userRole: "admin",
//         };
//         chai
//             .request(server)
//             .post('/user/create')
//             .set("content-Type", "application/x-www-form-urlencoded")
//             .field(data)
//             .attach("profilePic", "C:/Users/workspace/review_rating/uploads/image_1689340229509.ProfilePic2")


//             .end((err, res) => {
//                 res.should.have.status(201);
//                 res.should.be.a('object');
//                 res.body.should.have.property('success').eq(false);
//                 res.body.should.have.property('message').eq('User has been Created ✔');
//             }); done();
//     });
// })

// // Email For Reset Password 😀
describe("POST/ api/users", () => {
    it("IT Should Return Email Send Detail : ", (done) => {
        const data = {
            userEmail: "nameste380@gmail.com",
        };
        chai
            .request(server)
            .post("/user/emailsend")
            .send(data)
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("Email Sent Successfully ❤");
                res.body.should.have.property("token")  
            });
        done();
    });
})

// Reset Password ✌
describe("POST/ api/users", () => {
    it("IT Should Return Reset Password Detail : ", (done) => {
        const data = {
            newPassword: "Ishan_singh1234",
            confirmPassword: "Ishan_singh1234"
        }
        chai
            .request(server)
            .post("/user/resetpassword/64b14945501d52b6b130f3b0/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NGIxNDk0NTUwMWQ1MmI2YjEzMGYzYjAiLCJpYXQiOjE2ODk4NTU1ODIsImV4cCI6MTY4OTg1Njc4Mn0.ktxui0RmGsQhP8VoWxnwszCeAzfrua2mPRUSMUPcHoU")
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("Password Updated Successfully ✔");
            });
        done();
    });
    // Reset Password Error Case 😁
    it("IT should Return Error Messsage For Reset Password (New Password and Confirm Password):", (done) => {
        const data = {
            newPassword: "Ishan_singh1234",
            confirmPassword: "Ishdan_singh1234"
        }
        chai
            .request(server)
            .post("/user/resetpassword/64b14945501d52b6b130f3b0/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NGIxNDk0NTUwMWQ1MmI2YjEzMGYzYjAiLCJpYXQiOjE2ODk4NTU1ODIsImV4cCI6MTY4OTg1Njc4Mn0.ktxui0RmGsQhP8VoWxnwszCeAzfrua2mPRUSMUPcHoU")
            .send(data)
            .end((err, res) => {
                res.should.have.status(403);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(false);
                res.body.should.have.property("message").eq("New Password Does not Match With Confirmation 🤦‍♂️");
            });
        done();
    });
})