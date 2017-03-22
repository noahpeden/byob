exports.seed = function(knex, Promise) {
  return knex('country').del()
  .then(() => {
    return Promise.all([
      knex('country').insert({
        id: 1,
        name: "Espana",
        region_id: 1
      }),
      knex('country').insert({
        id: 2,
        name: "Prussia",
        region_id: 2
      }),
      knex('country').insert({
        id: 3,
        name: "Rome",
        region_id: 1
      })
    ]);
  });
};
