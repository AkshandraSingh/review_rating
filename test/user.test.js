const server = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('User Test Cases', () => {
    // Test 1: Create User
    it('should create a user', async () => {
        const userData = {
            userEmail: 'deepak@example.com',
            userPassword: 'Password123',
            userName: 'Deepak',
            userPhone: '8307521931',
            userCity: 'Barwala',
            userState: 'HR',
            userRole: 'admin',
        };

        const res = await chai
            .request(server)
            .post('/api/users/create')
            .set('content-Type', 'application/json')
            .send(userData);

        res.should.have.status(201);
        res.body.should.have.property('success').eq(true);
        res.body.should.have.property('message').eq('User has been created successfully');
    });

    // Test 2: Login User
    it('should login a user', async () => {
        const loginData = {
            userEmail: 'deepak@example.com',
            userPassword: 'Password123',
        };

        const res = await chai
            .request(server)
            .post('/api/users/login')
            .set('content-Type', 'application/json')
            .send(loginData);

        res.should.have.status(200);
        res.body.should.have.property('success').eq(true);
        res.body.should.have.property('message').eq('Login successful');
        res.body.should.have.property('token');
    });

    // Test 3: Send Email For Reset Password
    it('should send an email for password reset', async () => {
        const resetData = {
            userEmail: 'deepak@example.com',
        };

        const res = await chai
            .request(server)
            .post('/api/users/reset-password')
            .set('content-Type', 'application/json')
            .send(resetData);

        res.should.have.status(200);
        res.body.should.have.property('success').eq(true);
        res.body.should.have.property('message').eq('Email sent successfully');
        res.body.should.have.property('token');
    });

    // Test 4: Reset Password
    it('should reset user password', async () => {
        const resetPasswordData = {
            newPassword: 'NewPassword123',
            confirmPassword: 'NewPassword123',
        };

        const res = await chai
            .request(server)
            .post('/api/users/reset-password/USER_ID/RESET_TOKEN')
            .set('content-Type', 'application/json')
            .send(resetPasswordData);

        res.should.have.status(200);
        res.body.should.have.property('success').eq(true);
        res.body.should.have.property('message').eq('Password updated successfully');
    });
});
