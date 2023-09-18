const server = require('../index');
const chaiHttp = require('chai-http');
const chai = require('chai');

chai.should();
chai.use(chaiHttp);

describe('Company Review Test Cases', () => {
    // Test 1: Create Review
    it('should create a company review', async () => {
        const data = {
            companyReviewSubject: 'Instagram',
            userId: '64c3b89d7ab87e51699b6967',
            companyId: '64c3b97c7ab87e51699b6970',
            companyReview: 'Jai Shree Ram',
            companyReviewReateing: '2',
        };

        const res = await chai
            .request(server)
            .post('/api/companyreview/createreview')
            .send(data);

        res.should.have.status(202);
        res.should.be.a('object');
        res.body.should.have.property('success').eq(true);
        res.body.should.have.property('message').eq('Your Review is Successfully Created');
        res.body.should.have.property('Data');
    });

    // Test 2: Update Review
    it('should update a company review', async () => {
        const data = {
            companyReviewSubject: 'Ab Saii Ha',
            userId: '64b7ca4c4b9ea492578f7bb0',
            companyId: '64b1485a501d52b6b130f39e',
            companyReview: 'Hello@',
            companyReviewRateing: '5',
        };

        const res = await chai
            .request(server)
            .patch('/api/companyReview/updateReview/64c3ba5f7ab87e51699b6977')
            .send(data);

        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('success').eq(true);
        res.body.should.have.property('message').eq('Review Updated Successfully');
        res.body.should.have.property('updateReview');
    });

    // Test 3: Delete Review
    it('should delete a company review', async () => {
        const res = await chai
            .request(server)
            .delete('/api/companyReview/deleteReview/64c3e8a281b30a9e5bfe4f8b');

        res.should.have.status(202);
        res.should.be.a('object');
        res.body.should.have.property('success').eq(true);
        res.body.should.have.property('message').eq('Review Deleted Successfully');
        res.body.should.have.property('Data');
    });
});
