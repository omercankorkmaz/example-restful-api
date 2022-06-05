const chai = require('chai');
let chaiHttp = require('chai-http');
const request = require('supertest');

const app = require('../../app');

chai.use(chaiHttp);

describe('Optimal', () => {
    it('should countryList and countryCount match', (done) => {
        request(app)
        .get('/optimal')
        .end((err, res) => {
            chai.expect(res.statusCode).to.deep.equal(200);
            res.body.forEach(element => {
                chai.expect(element.countryList.length).to.deep.equal(element.countryCount);
            });
            done();
        });
    });
    it('Each representative should have at least 3 countries and at most 7 countries assigned to them', (done) => {
        request(app)
        .get('/optimal')
        .end((err, res) => {
            chai.expect(res.statusCode).to.deep.equal(200);
            res.body.forEach(element => {
                chai.expect(element.countryList.length).to.greaterThanOrEqual(3);
                chai.expect(element.countryList.length).to.lessThanOrEqual(7);
            });
            done();
        });
    });
});