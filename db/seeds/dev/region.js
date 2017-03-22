exports.seed = function(knex, Promise) {
  return knex('region').del()
  .then(() => {
    return Promise.all([
      knex('region').insert({
        id: 1,
        name: 'Eurasia',
        created_at: new Date
      }),
      knex('region').insert({
        id: 2,
        name: 'Afrimerica',
        created_at: new Date
      })
    ]);
  });
};
