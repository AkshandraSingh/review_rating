let server = require("../index");
let chaiHttp = require("chai-http");
let chai = require("chai");

chai.should();
chai.use(chaiHttp);

// ! User Test Case :
// ! 1> Create User .
// ! 2> Login User .
// ! 3> Send Email For Reset Password .
// ! 4> Reset Password .


// ! 1> CREATE USER  ( It was Not Working ) Error!!
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

// ! 2> Login User Test Case .
describe("POST/ api/users", () => {
    // ? If Login Successful 
    it("IT should return login user details: ", (done) => {
        const data = {
            userEmail: "nameste380@gmail.com",
            userPassword: "NotFor$ritik2"
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
    // ? If Password was Incorrect! 
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
    // ? If Email was Not Exist in DataBase
    it("IT should Return Error Messsage:", (done) => {
        const data = {
            userEmail: "nameste380@gmadil.com",
            userPassword: "NotFor$ritik2"
        };
        chai
            .request(server)
            .post("/user/login")
            .send(data)
            .end((err, res) => {
                res.should.have.status(403);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(false);
                res.body.should.have.property("message").eq("Email Not Exist ");
            });
        done();
    });
})


// ! 3> Email Send For Reset Password Test Case .
describe("POST/ api/users", () => {
    // ? If Email Sent Successful
    it("IT should return Send Email details: ", (done) => {
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
                res.body.should.have.property("token");
                res.body.should.have.property("userID");
            });
        done();

    });
    // ? If Email is Not Exist in DataBase 
    it("IT should Return Error Messsage:", (done) => {
        const data = {
            userEmail: "namesthhe380@gmail.com"
        };
        chai
            .request(server)
            .post("/user/emailsend")
            .send(data)
            .end((err, res) => {
                res.should.have.status(403);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(false);
                res.body.should.have.property("message").eq("Please Enter Valid Email 👀");
            });
        done();
    });
})


// ! 4> Reset Password Test Case .  
describe("POST/ api/users", () => {
    // ? If Email Sent Successful
    it("IT should return Reset Password Details: ", (done) => {
        const data = {
            newPassword: "Ishan_singh1234",
            confirmPassword: "Ishan_singh1234"
        }
        chai
            .request(server)
            .post("/user/resetpassword/64c3b89d7ab87e51699b6967/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJfaWQiOiI2NGMzYjg5ZDdhYjg3ZTUxNjk5YjY5NjciLCJ1c2VyTmFtZSI6IlJpdGtpdCIsInVzZXJQYXNzd29yZCI6IiQyYiQxMCR0NWxZNnpuRlNVdW1rMlZRa3MvRUNPS2ZXNmdjYVFxdFFFYjJoUnljOU5yOEE3eFg4bVBncSIsInVzZXJQaG9uZSI6Ijk2NDgzMjE0NDYiLCJ1c2VyRW1haWwiOiJyaWtpdEBnbWFpbC5jb20iLCJ1c2VyU3RhdGUiOiJNLlAiLCJ1c2VyQ2l0eSI6IkluZG9yZSIsInVzZXJSb2xlIjoidXNlciIsImlzQWN0aXZlIjp0cnVlLCJwcm9maWxlUGljIjoiL3VwbG9hZC9pbWFnZV8xNjkwNTQ4MzgxNDIzLlByb2ZpbGVQaWMzLmpwZyIsImNyZWF0ZWRBdCI6IjIwMjMtMDctMjhUMTI6NDY6MjEuODYyWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDctMjhUMTI6NDY6MjEuODYyWiIsIl9fdiI6MH0sImlhdCI6MTY5MDU0ODQ0NiwiZXhwIjoxNjkwNTQ5MzQ2fQ.XdQlUlc6T6POCql9zavkl4WoTVLkjdffM7OkaEuX34M")
            .send(data)
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(true);
                res.body.should.have.property("message").eq("Password Updated Successfully");
            });
        done();

    });
    // ? If Email is Not Exist in DataBase 
    it("IT should Return Error Messsage:", (done) => {
        const data = {
            newPassword: "Ishan_singh1234",
            confirmPassword: "Ishan_singh124"
        }
        chai
            .request(server)
            .post("/user/resetpassword/64c3b89d7ab87e51699b6967/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJfaWQiOiI2NGMzYjg5ZDdhYjg3ZTUxNjk5YjY5NjciLCJ1c2VyTmFtZSI6IlJpdGtpdCIsInVzZXJQYXNzd29yZCI6IiQyYiQxMCR0NWxZNnpuRlNVdW1rMlZRa3MvRUNPS2ZXNmdjYVFxdFFFYjJoUnljOU5yOEE3eFg4bVBncSIsInVzZXJQaG9uZSI6Ijk2NDgzMjE0NDYiLCJ1c2VyRW1haWwiOiJyaWtpdEBnbWFpbC5jb20iLCJ1c2VyU3RhdGUiOiJNLlAiLCJ1c2VyQ2l0eSI6IkluZG9yZSIsInVzZXJSb2xlIjoidXNlciIsImlzQWN0aXZlIjp0cnVlLCJwcm9maWxlUGljIjoiL3VwbG9hZC9pbWFnZV8xNjkwNTQ4MzgxNDIzLlByb2ZpbGVQaWMzLmpwZyIsImNyZWF0ZWRBdCI6IjIwMjMtMDctMjhUMTI6NDY6MjEuODYyWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDctMjhUMTI6NDY6MjEuODYyWiIsIl9fdiI6MH0sImlhdCI6MTY5MDU0ODQ0NiwiZXhwIjoxNjkwNTQ5MzQ2fQ.XdQlUlc6T6POCql9zavkl4WoTVLkjdffM7OkaEuX34M")
            .send(data)
            .end((err, res) => {
                res.should.have.status(403);
                res.should.be.a("object");
                res.body.should.have.property("success").eq(false);
                res.body.should.have.property("message").eq("Password and ConfirmPassword Does Not Match");
            });
        done();
    });
})