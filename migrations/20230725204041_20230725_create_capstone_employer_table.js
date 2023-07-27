/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('employer', (table) => {
        table.increments('id').primary();
        table.string('password').notNullable();
        table.string('username').notNullable();
        table.string('companyContact').notNullable();
        table.string('companyLocation').notNullable();
        table.string('companyDescription').notNullable();
        table.string('companyName').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('employer');
};
