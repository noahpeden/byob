exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('region', function(table) {
            table.increments('id').primary();
            table.string('name');
            table.timestamps();
        }),

        knex.schema.createTable('country', function(table){
            table.increments('id').primary();
            table.string('name');
            table.integer('region_id')
                 .references('id')
                 .inTable('region');

            table.timestamps();
        }),

        knex.schema.createTable('university', function(table){
            table.increments('id').primary();
            table.string('name');
            table.string('tuition_fee');
            table.string('language');
            table.string('link');
            table.integer('country_id')
                 .references('id')
                 .inTable('country');

            table.timestamps();
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('university'),
        knex.schema.dropTable('country'),
        knex.schema.dropTable('region')
    ])
};
