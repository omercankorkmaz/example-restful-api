const chai = require('chai');
let chaiHttp = require('chai-http');
const request = require('supertest');

const app = require('../../app');

chai.use(chaiHttp);

describe('Salesrep', () => {
    it('Each region should have at least 1 representative', (done) => {
        request(app)
        .get('/salesrep')
        .end((err, res) => {
            chai.expect(res.statusCode).to.deep.equal(200);
            res.body.forEach(element => {
                chai.expect(element.minSalesReq).to.greaterThanOrEqual(1);
            });
            done();
        });
    });
});