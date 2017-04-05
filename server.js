const express = require('express');
const app = express();
const md5 = require('md5')
const bodyParser = require('body-parser')
const fs = require('fs')


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
  response.sendFile( __dirname + "/" + "index.html")
})
// regions
app.get('/api/v1/region', (request, response) => {
  database('region').select()
  .then((region)=> {
    if (region.length < 1) {
      res.status(404).send({ error: 'region does not exist' })
    }
    response.status(200).json(region);
  })
  .catch(function(error) {
  console.error('somethings wrong with regions')
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
            console.error(error)
            response.status(404)
          });
})


// countries
app.get('/api/v1/country', (request, response) => {
  database('country').select()
  .then((country)=> {
    if (country.length < 1) {
      res.status(404).send({ error: 'region does not exist' })
    }
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

// universities
app.get('/api/v1/university', (request, response) => {
  database('university').select()
  .then((university)=> {
    if (university.length < 1) {
      response.status(404).send({ error: 'region does not exist' })
    }
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
            response.status(404).send({ error: 'university does not exist' })
          }
            response.status(200).json(university);
          })
          .catch(function(error) {
            console.error(error)
            response.status(404)
          });
})
app.get('/api/v1/university/language/:language', (request, response) => {
  database('university').where('language', request.params.language).select()
  .then(function(university) {
          if (university.length < 1) {
            response.status(404).send({ error: 'language does not exist' })
          }
            response.status(200).json(university);
          })
          .catch(function(error) {
            console.error('somethings wrong with language')
            response.status(404)
          });
})

app.post('/api/v1/region', (request, response) => {
  const { id, name } = request.body
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
});

app.post('/api/v1/country', (request, response) => {
  const { id, name, region_id } = request.body
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
});

app.post('/api/v1/university', (request, response) => {
  const { id, name, tuition_fee, language, link, country_id } = request.body
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
});


app.put('/api/v1/region/:id', (request, response) => {
  const { id, name } = request.body
  const updated_at = new Date
  const region = { id, name, updated_at: new Date }
  database('region').where('id', request.body.id).update(region)
        .then(() => {
          database('region').select()
          .then((region) => {
            response.status(200).json(region)
          })
        })
      .catch((error) => {
        response.status(404).send(error)
      })
});


app.put('/api/v1/country/:id', (request, response) => {
  const { id, name, region_id } = request.body
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
});

app.put('/api/v1/university/:id', (request, response) => {
  const { id, name, tuition_fee, language, link, country_id } = request.body
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
});

app.delete('/api/v1/university/:id', (request, response) => {
  database('university').where('id', request.params.id).del()
      .then(() => {
        database('university').select()
        .then((university) => {
          if (university.length < 1) {
            res.status(404).send({ error: 'region does not exist' })
          }
          response.status(200).json(university)
        })
      })
      .catch((error)=>{
        response.status(500)
        console.error('DELETE UNI BY ID NOT WORKING')
      })
});

app.delete('/api/v1/university/language/:language', (request, response) => {
  database('university').where('language', request.params.language).del()
      .then(() => {
        database('university').select()
        .then((university) => {
          response.status(200).json(university)
        })
      })
      .catch((error)=>{
        response.status(500)
        console.error('DELETE UNI BY LANGUAGE NOT WORKING')
      })
});

app.delete('/api/v1/university/country/:id', (request, response) => {
  database('university').where('country_id', request.params.id).del()
      .then(() => {
        database('university').select()
        .then((university) => {
          response.status(200).json(university)
        })
      })
      .catch((error)=>{
        response.status(500)
        console.error('DELETE UNI BY COUNTRY ID NOT WORKING')
      })
});

if (!module.parent) {
  app.listen(3001, () => {
    console.log('app listening port 3001');
  });
}

module.exports = app;
