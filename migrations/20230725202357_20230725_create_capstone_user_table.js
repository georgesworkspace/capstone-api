/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("usertypes", (table) => {
      table.increments("id").primary();
      table.string("type").notNullable();
    })
    .createTable("user", (table) => {
      table.increments("id").primary();
      table.string("password").notNullable();
      table.string("username").notNullable();
      table
        .integer("user_type_id")
        .unsigned()
        .references("usertypes.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table
        .timestamp("updated_at")
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("user").dropTable('usertypes')
};
