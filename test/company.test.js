let server = require("../index");
let chaiHttp = require("chai-http");
let chai = require("chai");

chai.should();
chai.use(chaiHttp);

// User Test Cases:
// 1. Create Company.
// 2. Company List.
// 3. Company Details.
// 4. Sort Details.
// 5. Company Search.

// 1. Create Company
describe('POST /api/company/createCompany', () => {
    it('should return Created Company detail', (done) => {
        const data = {
            companyName: "VsCode",
            companyLocation: "India",
            companyState: "M.P",
            companyCity: "Indore",
        };

        chai
            .request(server)
            .post('/api/company/createCompany')
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('message').eq('Company created');
                done();
            });
    });

    it('should return Same Email Error for User', (done) => {
        const data = {
            companyName: "VsCode",
            companyLocation: "India",
            companyState: "M.P",
            companyCity: "Indore",
        };

        chai
            .request(server)
            .post('/api/company/createCompany')
            .send(data)
            .end((err, res) => {
                res.should.have.status(401);
                res.should.be.a('object');
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('message').eq('Company already exists');
                done();
            });
    });
});

// 2. Company List
describe('GET /api/company/listCompany', () => {
    it('should return List Company detail', (done) => {
        chai
            .request(server)
            .get('/api/company/listCompany')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('message').eq('List Of Company');
                res.body.should.have.property('count');
                res.body.should.have.property('list');
                done();
            });
    });
});

// 3. Company Details
describe('GET /api/company/detailsCompany/:id', () => {
    it('should return Company Details', (done) => {
        chai
            .request(server)
            .get('/api/company/detailsCompany/64c3b97c7ab87e51699b6970')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('message').eq('Company details');
                res.body.should.have.property('company');
                res.body.should.have.property('review');
                done();
            });
    });
});

// 4. Sort Company
describe('GET /api/company/sortCompany', () => {
    it('should return List With Sort Company detail', (done) => {
        chai
            .request(server)
            .get('/api/company/sortCompany')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('message').eq('Company List With Sorted Format 😎');
                res.body.should.have.property('data');
                done();
            });
    });
});

// 5. Search Company
describe('GET /api/company/searchCompany/:letter', () => {
    it('should return Search Company detail', (done) => {
        chai
            .request(server)
            .get('/api/company/searchCompany/i')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('success').eq(true);
                res.body.should.have.property('message').eq('Company Found ✔');
                res.body.should.have.property('data');
                done();
            });
    });

    it('should return Search Company Error', (done) => {
        chai
            .request(server)
            .get('/api/company/searchCompany/z')
            .end((err, res) => {
                res.should.have.status(403);
                res.should.be.a('object');
                res.body.should.have.property('success').eq(false);
                res.body.should.have.property('message').eq('Company Not Found');
                done();
            });
    });
});
