const expect = require('chai').expect;
const conn = require('../model/connection')
const request = require('supertest')
const index = require('../index')

describe('POST /adduser', () => {
    before(function(done) {
        conn.open().then(() => done()).catch(done);
    });

    after(function(done){
        conn.close().then(() => done()).catch(done);
    });

    it('OK, adding a new user', (done) => {
        const email = Math.random().toString(36).slice(2)+'@gmail.com';
        request(index).post('/adduser')
            .send({
                "email":email,
                "password":"Secret*727",
                "tasks":["create","update"]
            }).then((res) => {
                const body = res.body
                expect(body).to.contain.property('id');
                expect(body).to.contain.property('msg');
                done()
            }).catch((err) => done(err))
    })
})


describe('GET /getusers', () => {
    before(function(done) {
        conn.open().then(() => done()).catch(done);
    });

    after(function(done){
        conn.close().then(() => done()).catch(done);
    });

    it('OK, getting first 10 users', (done) => {
        request(index).get('/getusers')
            .then((res) => {
                const body = res.body
                expect(body).to.have.lengthOf(10);
                expect(body).to.be.an('array')
                expect(res.status).to.equal(200);
                done()
            }).catch((err) => done(err))
    })
})
