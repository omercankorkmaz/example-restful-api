const chai = require('chai');
let chaiHttp = require('chai-http');
const request = require('supertest');
const should = chai.should();

const app = require('../../app');

chai.use(chaiHttp);

describe('Countries', () => {

    describe('GET /countries', () => {

        it('each element should have { name, region } attributes', (done) => {
            request(app)
                .get('/countries')
                .end((err, res) => {
                    chai.expect(res.statusCode).to.deep.equal(200);
                    chai.expect(res.body).to.be.a('array');
                    chai.expect(res.body.length).not.to.deep.equal(0);
                    res.body.forEach(el => {
                        chai.expect(el).to.have.property('name');
                        chai.expect(el).to.have.property('region');
                    });
                    done();
                });
        });
    
        it('should get all countries', (done) => {
            request(app)
                .get('/countries')
                .end((err, res) => {
                    chai.expect(res.statusCode).to.deep.equal(200);
                    chai.expect(res.body).to.be.a('array');
                    chai.expect(res.body.length).not.to.deep.equal(0);
                    done();
                });
        });
    
        it('without the region parameter it should return all countries', (done) => {
            request(app)
                .get('/countries?region=')
                .end((err, res) => {
                    chai.expect(res.statusCode).to.deep.equal(200);
                    chai.expect(res.body).to.be.a('array');
                    chai.expect(res.body.length).not.to.deep.equal(0);
                    done();
                });
        });
    
    });
    
    describe('GET /countries?region=REGION_NAME', () => {
    
        it('each element should have { name, region } attributes', (done) => {
            request(app)
                .get('/countries?region=Europe')
                .end((err, res) => {
                    chai.expect(res.statusCode).to.deep.equal(200);
                    chai.expect(res.body).to.be.a('array');
                    chai.expect(res.body.length).not.to.deep.equal(0);
                    res.body.forEach(el => {
                        chai.expect(el).to.have.property('name');
                        chai.expect(el).to.have.property('region');
                    });
                    done();
                });
        });
    
        let APACLength; 
    
        before((done) =>{
            request(app)
                .get('/countries?region=APAC')
                .end((err, res) => {
                    chai.expect(res.statusCode).to.deep.equal(200);
                    chai.expect(res.body).to.be.a('array');
                    chai.expect(res.body.length).not.to.deep.equal(0);
                    APACLength = res.body.length;
                    done();
                });
        });
    
        it('should region of Apac and APAC result be equal', (done) => {
            request(app)
                .get('/countries?region=Apac')
                .end((err, res) => {
                    chai.expect(res.statusCode).to.deep.equal(200);
                    chai.expect(res.body).to.be.a('array');
                    chai.expect(res.body.length).to.deep.equal(APACLength);
                    done();
                });
        });
    
    });

});