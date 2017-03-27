process.env.NODE_ENV = 'test';

const configuration = require('../knexfile')['test'];
const database = require('knex')(configuration);
const chai = require('chai');

const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../server.js');


chai.use(chaiHttp);

describe('Server', () => {
  beforeEach((done) => {
    database.migrate.rollback()
  .then(() => {
    database.migrate.latest()
    .then(() => {
      return database.seed.run()
      .then(() => {
        done();
      });
    });
  });
  });
  it('should exist', () => {
    expect(app).to.exist;
  });

  describe('GET /', () => {
    it('should return a 200 and html', (done) => {
      chai.request(app)
      .get('/')
      .end((err, res) => {
        if (err) { done(err); }
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        done();
      });
    });
  });

      //  Region TEST

  describe('GET /api/v1/region', () => {
    it('should return all region', (done) => {
      chai.request(app)
      .get('/api/v1/region')
      .end((err, res) => {
        if (err) { done(err); }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(5);
        expect(res.body[0]).to.have.property('name');
        done();
      });
    });
  });

  describe('POST /api/v1/region', () => {
    it('should add a new region', (done) => {
      chai.request(app)
        .post('/api/v1/region')
        .send({
          name: 'Pangea',
          id: 6
        })
        .end((err, res) => {
          if (err) { done(err); }
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body.length).to.equal(6);
          expect(res.body[5].name).to.equal('Pangea');
          expect(res.body[5].id).to.equal(6);
          done();
        });
    });
  });

  describe('GET /api/region/:id', () => {
    context('if region is found', () => {
      it('should return a specific region', (done) => {
        chai.request(app)
          .get('/api/v1/region/1')
          .end((err, res) => {
            if (err) { done(err); }
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.a('array');
            expect(res.body[0].name).to.equal('North America\r');
            done();
          });
      });
    });
  });
  describe('GET /api/v1/country', () => {
    it('should return all country', (done) => {
      chai.request(app)
      .get('/api/v1/country')
      .end((err, res) => {
        if (err) { done(err); }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(18);
        expect(res.body[0]).to.have.property('name');
        done();
      });
    });
  });

  describe('POST /api/v1/country', () => {
    it('should add a new country', (done) => {
      chai.request(app)
        .post('/api/v1/country')
        .send({
          name: 'Brittania',
          id: 19,
          region_id: 4
        })
        .end((err, res) => {
          if (err) { done(err); }
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body.length).to.equal(19);
          expect(res.body[18].name).to.equal('Brittania');
          expect(res.body[18].id).to.equal(19);
          done();
        });
    });
  });

  describe('GET /api/country/:id', () => {
    context('if country is found', () => {
      it('should return a specific country', (done) => {
        chai.request(app)
          .get('/api/v1/country/1')
          .end((err, res) => {
            if (err) { done(err); }
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.a('array');
            expect(res.body[0].name).to.equal('Cuba');
            done();
          });
      });
    });
  });
});
  describe('GET /api/v1/university', () => {
    it('should return all university', (done) => {
      chai.request(app)
      .get('/api/v1/university')
      .end((err, res) => {
        if (err) { done(err); }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(33);
        expect(res.body[0]).to.have.property('name');
        done();
      });
    });
  });

  describe('POST /api/v1/university', () => {
    it('should add a new university', (done) => {
      chai.request(app)
        .post('/api/v1/university')
        .send({
          name: 'Test University',
          id: 34,
          tuition_fee: 'Free',
          country_id: 18,
          link: "google.com"
        })
        .end((err, res) => {
          if (err) { done(err); }
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body.length).to.equal(34);
          expect(res.body[33].name).to.equal('Test University');
          expect(res.body[33].id).to.equal(34);
          done();
        });
    });
  });

  describe('GET /api/university/:id', () => {
    context('if university is found', () => {
      it('should return a specific university', (done) => {
        chai.request(app)
          .get('/api/v1/university/1')
          .end((err, res) => {
            if (err) { done(err); }
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.a('array');
            expect(res.body[0].name).to.equal('University of Buenos Aires');
            done();
          });
      });
    });
  });


    context('if no country is found', () => {
      it('should return a 404', (done) => {
        chai.request(app)
          .get('/api/v1/country/5000')
          .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res.body).to.be.a('object');
            done();
          });
      });
    });


  describe('DELETE /api/university/:id', () => {
    context('if university is found', () => {
      it('should delete a specific university', (done) => {
        chai.request(app)
          .delete('/api/v1/university/33')
          .end((err, res) => {
            if (err) { done(err); }
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.a('array');
            expect(res.body.length).to.equal(33);
            done();
          });
      });
    });
  });
  describe('DELETE /api/university/:id/country_id', () => {
    context('if university is found', () => {
      it('should delete a specific university by country id', (done) => {
        chai.request(app)
          .delete('/api/v1/university/18/country_id')
          .end((err, res) => {
            if (err) { done(err); }
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.a('array');
            expect(res.body.length).to.equal(31);
            done();
          });
      });
    });
  });
  describe('DELETE /api/university/:name/university', () => {
    context('if university is found by name', () => {
      it('should delete a specific university by name', (done) => {
        chai.request(app)
          .delete('/api/v1/university/Test_University/university')
          .end((err, res) => {
            if (err) { done(err); }
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.a('array');
            expect(res.body.length).to.equal(31);
            done();
          });
      });
    });
  });
