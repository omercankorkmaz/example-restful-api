const chai = require('chai');
let chaiHttp = require('chai-http');
const request = require('supertest');

const app = require('../../app');

chai.use(chaiHttp);

describe('Countries', () => {

    it('should get all countries', (done) => {
        request(app)
        .get('/countries')
        .end((err, res) => {
            chai.expect(res.statusCode).to.deep.equal(200);
            chai.expect(res.body.length).not.to.deep.equal(0);
            done();
        });
    });

    it('without the region parameter it should return all countries', (done) => {
        request(app)
        .get('/countries?region=')
        .end((err, res) => {
            chai.expect(res.statusCode).to.deep.equal(200);
            chai.expect(res.body.length).not.to.deep.equal(0);
            done();
        });
    });

    let APACLength; 

    before(function(done){
        request(app)
        .get('/countries?region=APAC')
        .end((err, res) => {
            chai.expect(res.statusCode).to.deep.equal(200);
            APACLength = res.body.length;
            done();
        });
    });

    it('should region of Apac and APAC result be equal', (done) => {
        request(app)
        .get('/countries?region=Apac')
        .end((err, res) => {
            chai.expect(res.statusCode).to.deep.equal(200);
            chai.expect(res.body.length).to.deep.equal(APACLength);
            done();
        });
    });

});