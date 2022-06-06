const chai = require('chai');
let chaiHttp = require('chai-http');
const request = require('supertest');

const app = require('../../app');

chai.use(chaiHttp);

describe('Salesrep', () => {

    describe('GET /salesrep', () => {
        it('Each element should have { region, minSalesReq, maxSalesReq } attributes', (done) => {
            request(app)
                .get('/salesrep')
                .end((err, res) => {
                    chai.expect(res.statusCode).to.deep.equal(200);
                    chai.expect(res.body).to.be.a('array');
                    chai.expect(res.body.length).not.to.deep.equal(0);
                    res.body.forEach(el => {
                        chai.expect(el).to.have.property('region');
                        chai.expect(el).to.have.property('minSalesReq');
                        chai.expect(el).to.have.property('maxSalesReq');
                    });
                    done();
                });
        });
    
        it('Each region should have at least 1 representative', (done) => {
            request(app)
                .get('/salesrep')
                .end((err, res) => {
                    chai.expect(res.statusCode).to.deep.equal(200);
                    chai.expect(res.body).to.be.a('array');
                    chai.expect(res.body.length).not.to.deep.equal(0);
                    res.body.forEach(el => {
                        chai.expect(el.minSalesReq).to.greaterThanOrEqual(1);
                    });
                    done();
                });
        });
    });

});