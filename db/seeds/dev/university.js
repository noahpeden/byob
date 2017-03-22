exports.seed = function(knex, Promise) {
  return knex('university').del()
  .then(() => {
    return Promise.all([
      knex('university').insert({
        id: 1,
        name: "Universidad de Espana",
        tuition_fee: 500,
        language: "Spanish",
        country_id: 1
      }),
      knex('university').insert({
        id: 2,
        name: "University de Britannia",
        tuition_fee: 500,
        language: "English-Roman",
        country_id: 2
      })
    ]);
  });
};
