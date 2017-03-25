const path = require('path');
const seedFile = require('knex-seed-file');


exports.seed = function (knex, Promise) {
  return Promise.all([knex('university').del(), knex('country').del(), knex('region').del()])
    .then(_ => seedFile(knex, path.resolve('region.tsv'), 'region', [
      'id',
      'name',
    ], {
      ignoreFirstLine: true,
    }))
    .then(_ => seedFile(knex, path.resolve('country.tsv'), 'country', [
      'id',
      'name',
      'region_id'
    ], {
      ignoreFirstLine: true,
    }))
    .then(_ => seedFile(knex, path.resolve('university.tsv'), 'university', [
      'id',
      'name',
      'tuition_fee',
      'language',
      'link',
      'country_id'
    ], {
      ignoreFirstLine: true,
    }))
}
