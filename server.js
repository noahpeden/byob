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
app.locals.title = 'byob'


app.get('/', (request, response) => {
  response.sendFile( __dirname + "/" + "index.html" )
})

app.get('/api/v1/region', (request, response) = {
  database('')
})
app.get('/api/v1/region', (request, response) = {
  database('')
})
app.get('/api/v1/region', (request, response) = {
  database('')
})
app.get('/api/v1/region', (request, response) = {
  database('')
})
app.get('/api/v1/region', (request, response) = {
  database('')
})
app.get('/api/v1/region', (request, response) = {
  database('')
})

app.post('/api/v1/region', (request, response) = {
  database('')
})
app.post('/api/v1/region', (request, response) = {
  database('')
})
app.post('/api/v1/region', (request, response) = {
  database('')
})
app.put('/api/v1/region', (request, response) = {
  database('')
})
app.put('/api/v1/region', (request, response) = {
  database('')
})
app.patch('/api/v1/region', (request, response) = {
  database('')
})
app.delete('/api/v1/region', (request, response) = {
  database('')
})
app.delete('/api/v1/region', (request, response) = {
  database('')
})
app.delete('/api/v1/region', (request, response) = {
  database('')
})






module.exports = app;
