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
            .post("/user/resetpassword/64c3b89d7ab87e51699b6967/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJfaWQiOiI2NGMzYmIzYTdhYjg3ZTUxNjk5YjY5N2MiLCJ1c2VyTmFtZSI6IklzaGFuIFNpbmdoIiwidXNlclBhc3N3b3JkIjoiJDJiJDEwJGk5M2taMEFXdUpUbTBsQ2RsMGMuNGUzYnpDbURpWmJwQWEvbzljd0x2TC5XWG5TLldOYjdPIiwidXNlclBob25lIjoiOTY0ODMyMTQ0NiIsInVzZXJFbWFpbCI6Im5hbWVzdGUzODBAZ21haWwuY29tIiwidXNlclN0YXRlIjoiTS5QIiwidXNlckNpdHkiOiJJbmRvcmUiLCJ1c2VyUm9sZSI6InVzZXIiLCJpc0FjdGl2ZSI6dHJ1ZSwicHJvZmlsZVBpYyI6Ii91cGxvYWQvaW1hZ2VfMTY5MDU0OTA1MDY2MS5Qcm9maWxlUGljMy5qcGciLCJjcmVhdGVkQXQiOiIyMDIzLTA3LTI4VDEyOjU3OjMxLjAwN1oiLCJ1cGRhdGVkQXQiOiIyMDIzLTA3LTI4VDEyOjU3OjMxLjAwN1oiLCJfX3YiOjB9LCJpYXQiOjE2OTA2MDE3MDYsImV4cCI6MTY5MDYwNTMwNn0.c3-WNF-RzfQEdqQgS-ElB3XcQyKnou96R4kN0vKZheI")
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
            .post("/user/resetpassword/64c3b89d7ab87e51699b6967/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJfaWQiOiI2NGMzYmIzYTdhYjg3ZTUxNjk5YjY5N2MiLCJ1c2VyTmFtZSI6IklzaGFuIFNpbmdoIiwidXNlclBhc3N3b3JkIjoiJDJiJDEwJGk5M2taMEFXdUpUbTBsQ2RsMGMuNGUzYnpDbURpWmJwQWEvbzljd0x2TC5XWG5TLldOYjdPIiwidXNlclBob25lIjoiOTY0ODMyMTQ0NiIsInVzZXJFbWFpbCI6Im5hbWVzdGUzODBAZ21haWwuY29tIiwidXNlclN0YXRlIjoiTS5QIiwidXNlckNpdHkiOiJJbmRvcmUiLCJ1c2VyUm9sZSI6InVzZXIiLCJpc0FjdGl2ZSI6dHJ1ZSwicHJvZmlsZVBpYyI6Ii91cGxvYWQvaW1hZ2VfMTY5MDU0OTA1MDY2MS5Qcm9maWxlUGljMy5qcGciLCJjcmVhdGVkQXQiOiIyMDIzLTA3LTI4VDEyOjU3OjMxLjAwN1oiLCJ1cGRhdGVkQXQiOiIyMDIzLTA3LTI4VDEyOjU3OjMxLjAwN1oiLCJfX3YiOjB9LCJpYXQiOjE2OTA2MDE3MDYsImV4cCI6MTY5MDYwNTMwNn0.c3-WNF-RzfQEdqQgS-ElB3XcQyKnou96R4kN0vKZheI")
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