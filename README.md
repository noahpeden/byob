# byob
This database is the start of something huge. The current American university system is broken. There are more than a dozen countries abroad that offer completely free or close to it college tuition. This database starts to gather all the info out there to start to make it into an informational portal for students.
Live DB: http://np-byob.herokuapp.com/

GET:
/api/v1/region -> This grabs all regions
/api/v1/region/:id -> This grabs all regions by id

/api/v1/country => This shows all countries
/api/v1/country/:id -> This shows all countries by region id, so you can see all the country options in Europe
/api/v1/country/:name/country -> This can grab a specific country by name

/api/v1/university -> shows all universities regardless of country
/api/v1/university/:id -> shows all unviversities in a specific country by country id

POST: 
/api/v1/region -> creates a new rgion
/api/v1/country -> creates a new country
/api/v1/university -> creates a new university

PUT: 
/api/v1/region/:id -> updates a specific region
/api/v1/country/:id -> updates a specific country
/api/v1/university/:id -> updates a specific university

DELETE:
/api/v1/university/:id -> deletes a university based on id
/api/v1/university/:name/university -> deletes a university based on name
/api/v1/university/:id/country -> deletes a university based on country_id
