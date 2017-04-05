process.env.NODE_ENV = 'test';

const configuration = require('../knexfile')['test'];
const database = require('knex')(configuration);
const chai = require('chai');

const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../server.js');


chai.use(chaiHttp);

describe('App', () => {
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
    it('should send back an html file', (done) => {
      chai.request(app)
      .get('/')
      .end((err, res) => {
        if(err) { done(err); }
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        done();
      });
    });
  });
  describe('GET /', () => {
    it('should respond back with a 404 error', (done) => {
      chai.request(app)
      .get('/ /')
      .end((err, res) => {
        expect(res).to.have.status(404);
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
    it('should return a 404 if region does not exist', (done) => {
      chai.request(app)
      .get('/api/v1/regions/')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a('object');
        done()
      })
    })
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
    describe('POST /api/v1/region', function() {
      it('should respond with a 404', function(done) {
        chai.request(app)
        .post('/api/v1/regionss')
        .send({
          name: "BS",
          id: 5000
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.a('object');
          done();
        });
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
      it('should return a 404 if region id does not exist', () => {
        chai.request(app)
        .get('/api/v1/region/12')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.a('object');
          done()
        })
      });
    });
  });
  describe('GET /api/v1/country', () => {
    it('should return all countries', (done) => {
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
    it('should return a 404 if country is not called correctly', (done) => {
      chai.request(app)
      .get('/api/v1/countrysss/')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a('object');
        done()
      })
    });
  });

  describe('POST /api/v1/country', () => {
    it('should add a new country', (done) => {
      chai.request(app)
      .post('/api/v1/country')
      .send({
        name: 'Argentina',
        id: 19,
        region_id: 4
      })
      .end((err, res) => {
        if (err) { done(err); }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(19);
        expect(res.body[18].name).to.equal('Argentina');
        expect(res.body[18].id).to.equal(19);
        done();
      });
    });
    describe('POST /api/v1/country', function() {
      it('should respond with a 404', function(done) {
        chai.request(app)
        .post('/api/v1/countryssss')
        .send({
          name: "BS",
          id: 5000,
          region_id: 959595
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.a('object');
          done();
        });
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
      it('should return a 404 if country id does not exist', (done) => {
        chai.request(app)
        .get('/api/v1/country/5000')
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body).to.be.a('object');
          done()
        })
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
  it('should return a 404 if university is not called correctly', (done) => {
    chai.request(app)
    .get('/api/v1/universityyyyy/')
    .end((err, res) => {
      expect(res).to.have.status(404);
      expect(res.body).to.be.a('object');
      done()
    })
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
  describe('POST /api/v1/university', function() {
    it('should respond with a 404', function(done) {
      chai.request(app)
      .post('/api/v1/universityssss')
      .send({
        name: 'Test University',
        id: 34,
        tuition_fee: 'Free',
        country_id: 18,
        link: "google.com"
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a('object');
        done();
      });
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
    it('should return a 404 if university id does not exist', (done) => {
      chai.request(app)
      .get('/api/v1/university/5000')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a('object');
        done()
      })
    });
  });
});
describe('GET /api/university/language/:language', () => {
  context('if university is found', () => {
    it('should return by language', (done) => {
      chai.request(app)
      .get('/api/v1/university/language/English')
      .end((err, res) => {
        if (err) { done(err); }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body[0].name).to.equal('University of Vienna');
        done();
      });
    });
    it('should return a 404 if university id does not exist', (done) => {
      chai.request(app)
      .get('/api/v1/university/5000')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.a('object');
        done()
      })
    });
  });
});

describe('PUT /api/region/:id', () => {
  it('should edit a region name', (done)=> {
    chai.request(app)
    .patch('/api/v1/region/6')
    .send({
      name: 'Nova Pangea',
      id: 6
    })
    .end((error, res)=> {
      expect(res).to.have.status(404)
      expect(res.body).to.be.a('object')
      done()
    })
  })
})

describe('PUT /api/v1/region/:id', ()=> {
  it('should return 404 if incorrect path is entered', (done)=> {
    chai.request(app)
    .post('/api/v1/region/8')
    .end((error, res)=> {
      expect(res).to.have.status(404)
      done()
    })
  })
})
describe('PUT /api/country/:id', () => {
  it('should edit a country name', (done)=> {
    chai.request(app)
    .patch('/api/v1/country/10')
    .send({
      name: 'Nova Brittania',
      id: 10
    })
    .end((error, res)=> {
      expect(res).to.have.status(404)
      expect(res.body).to.be.a('object')
      done()
    })
  })
})
describe('PUT /api/v1/country/:id', ()=> {
  it('should return 404 if incorrect path is entered', (done)=> {
    chai.request(app)
    .post('/api/v1/country/800')
    .end((error, res)=> {
      expect(res).to.have.status(404)
      done()
    })
  })
})
describe('PUT /api/university/:id', () => {
  it('should edit a university name', (done)=> {
    chai.request(app)
    .patch('/api/v1/university/6')
    .send({
      name: 'Nova Roma',
      id: 6
    })
    .end((error, res)=> {
      expect(res).to.have.status(404)
      expect(res.body).to.be.a('object')
      done()
    })
  })
})
describe('PUT /api/v1/university/:id', ()=> {
  it('should return 404 if incorrect path is entered', (done)=> {
    chai.request(app)
    .post('/api/v1/university/800')
    .end((error, res)=> {
      expect(res).to.have.status(404)
      done()
    })
  })
})


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
    describe('DELETE /api/v1/university/:id', function() {
      it('should return a 404 if university is not found', function(done) {
        chai.request(app)
        .delete('/api/v1/university/1999')
        .end(function(err, res) {
          expect(res).to.have.status(500);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          done();
        });
      });
    });
  });
});
describe('DELETE /api/university/country/:id', () => {
  context('if university is found', () => {
    it('should delete a specific university by country id', (done) => {
      chai.request(app)
      .delete('/api/v1/university/country/18')
      .end((err, res) => {
        if (err) { done(err); }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(31);
        done();
      });
    });
    describe('DELETE /api/v1/university/country/:id', function() {
      it('should return a 404 if university by country is not found', function(done) {
        chai.request(app)
        .delete('/api/v1/university/country/1999')
        .end(function(err, res) {
          expect(res).to.have.status(500);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          done();
        });
      });
    });
  });
});
describe('DELETE /api/university/language/:language', () => {
  context('if university is found by language', () => {
    it('should delete a specific university by language', (done) => {
      chai.request(app)
      .delete('/api/v1/university/language/Spanish')
      .end((err, res) => {
        if (err) { done(err); }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body.length).to.equal(22);
        done();
      });
    });
    describe('DELETE /api/v1/university/language/:language', function() {
      it('should return a 404 if university is not found', function(done) {
        chai.request(app)
        .delete('/api/v1/university/language/Latin')
        .end(function(err, res) {
          expect(res).to.have.status(500);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          done();
        });
      });
    });
  });
});
