const express = require('express');
const app = express();
const md5 = require('md5')
const bodyParser = require('body-parser')

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log(`Running on ${app.get('port')}.`)
})

app.get('/', (request, response) => {
  response.sendFile( __dirname + "/" + "index.html" )
})
// regions
app.get('/api/v1/region', (request, response) => {
  database('region').select()
  .then((region)=> {
    response.status(200).json(region);
  })
  .catch(function(error) {
  console.error('somethings wrong with db')
  console.log(error)
  response.status(404)
  });
})

app.get('/api/v1/region/:id', (request, response) => {
  database('region').where('id', request.params.id).select()
  .then(function(region) {
          if (region.length < 1) {
            res.status(404).send({ error: 'region does not exist' })
          }
            response.status(200).json(region);
          })
          .catch(function(error) {
            console.error('somethings wrong with redirect')
          });
})


// countries
app.get('/api/v1/country', (request, response) => {
  database('country').select()
  .then((country)=> {
    response.status(200).json(country);
  })
  .catch(function(error) {
  console.error('somethings wrong with country general')
  console.log(error)
  response.status(404)
  });
})

app.get('/api/v1/country/:id', (request, response) => {
  database('country').where('region_id', request.params.id).select()
  .then(function(country) {
          if (country.length < 1) {
            response.status(404).send({ error: 'country does not exist' })
          }
            response.status(200).json(country);
          })
          .catch(function(error) {
          console.error('somethings wrong with country region')
          console.log(error)
          response.status(404)
          });
})

app.get('/api/v1/country/:name/country', (request, response) => {
  database('country').where('name', request.params.name).select()
  .then(function(country) {
  if (country.length < 1) {
    res.status(404).send({ error: 'country does not exist' })
  }
    response.status(200).json(country);
  })
  .catch(function(error) {
    console.error('somethings wrong with country name')
  });
})


// universities
app.get('/api/v1/university', (request, response) => {
  database('university').select()
  .then((university)=> {
    response.status(200).json(university);
  })
  .catch(function(error) {
  console.error('somethings wrong with db')
  console.log(error)
  response.status(404)
  });
})

app.get('/api/v1/university/:id', (request, response) => {
  database('university').where('country_id', request.params.id).select()

  .then(function(university) {
          if (university.length < 1) {
            res.status(404).send({ error: 'university does not exist' })
          }
            response.status(200).json(university);
          })
          .catch(function(error) {
            console.error('somethings wrong with redirect')
          });
})

app.post('/api/v1/region', (request, response) => {
  const id = request.body.id
  const name = request.body.name
  const created_at = new Date
  const region = { id, name, created_at}
  database('region').insert(region)
        .then(() => {
          database('region').select()
          .then((region) => {
            response.status(200).json(region)
          })
        })
      .catch((error) => {
        response.status(404).send(error)
      })
      .catch((error) => {
        response.status(422).send(error, '422')
      })
});

app.post('/api/v1/country', (request, response) => {
  const id = request.body.id
  const name = request.body.name
  const region_id = request.body.region_id
  const created_at = new Date
  const country = {id, name, region_id, created_at}
  database('country').insert(country)
        .then(() => {
          database('country').select()
          .then((country) => {
            response.status(200).json(country)
          })
        })
      .catch((error) => {
        response.status(404).send(error)
      })
      .catch((error) => {
        response.status(422).send(error, '422')
      })
});

app.post('/api/v1/university', (request, response) => {
  const id = request.body.id
  const name = request.body.name
  const tuition_fee = request.body.tuition_fee
  const language = request.body.language
  const link = request.body.link
  const country_id = request.body.country_id
  const created_at = new Date
  const university = { id, name, tuition_fee, language, link, country_id, created_at }
  database('university').insert(university)
        .then(() => {
          database('university').select()
          .then((university) => {
            response.status(200).json(university)
          })
        })
      .catch((error) => {
        response.status(404).send(error)
      })
      .catch((error) => {
        response.status(422).send(error, '422')
      })
});


app.put('/api/v1/region/:id', (req, res) => {
  const id = req.body.id
  const name = req.body.name
  const updated_at = new Date
  const region = { id, name, updated_at: new Date }
  database('region').where('id', req.body.id).update(region)
        .then(() => {
          database('region').select()
          .then((region) => {
            res.status(200).json(region)
          })
        })
      .catch((error) => {
        res.status(404).send(error)
      })
      .catch((error) => {
        res.status(422).send(error, '422')
      })
});


app.put('/api/v1/country/:id', (request, response) => {
  const id = request.body.id
  const name = request.body.name
  const region_id = request.body.region_id
  const created_at = new Date
  const country = {id, name, region_id, created_at}
  database('country').update(country)
        .then(() => {
          database('country').select()
          .then((country) => {
            response.status(200).json(country)
          })
        })
      .catch((error) => {
        response.status(404).send(error)
      })
      .catch((error) => {
        response.status(422).send(error, '422')
      })
});

app.put('/api/v1/university/:id', (request, response) => {
  const id = request.body.id
  const name = request.body.name
  const tuition_fee = request.body.tuition_fee
  const language = request.body.language
  const link = request.body.link
  const country_id = request.body.country_id
  const created_at = new Date
  const university = { id, name, tuition_fee, language, link, country_id, created_at }
  database('university').update(university)
        .then(() => {
          database('university').select()
          .then((university) => {
            response.status(200).json(university)
          })
        })
      .catch((error) => {
        response.status(404).send(error)
      })
      .catch((error) => {
        response.status(422).send(error, '422')
      })
});

app.delete('/api/v1/university/:id', (request, response) => {
  database('university').where('id', request.params.id).del()
      .then(() => {
        database('university').select()
        .then((university) => {
          response.status(200).json(university)
        })
      })
      .catch((error) => {
        response.status(404).send(error)
      })
});

app.delete('/api/v1/university/:name/university', (request, response) => {
  database('university').where('name', request.params.name).del()
      .then(() => {
        database('university').select()
        .then((university) => {
          response.status(200).json(university)
        })
      })
      .catch((error) => {
        response.status(404).send(error)
      })
});

app.delete('/api/v1/university/:id/country_id', (req, res) => {
  database('university').where('country_id', req.params.id).del()
      .then(() => {
        database('university').select()
        .then((university) => {
          res.status(200).json(university)
        })
      })
      .catch((error) => {
        res.status(404).send(error)
      })
});

// custom endpoints


if (!module.parent) {
  app.listen(3001, () => {
    console.log('app listening port 3001');
  });
}

module.exports = app;
