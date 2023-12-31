/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("employer", (table) => {
    table.increments("id").primary();
    table.string("companycontact").notNullable();
    table.string("companylocation").notNullable();
    table.string("companydescription").notNullable();
    table.string("companyname").notNullable();
    table
      .integer("user_id")
      .unsigned()
      .references("user.id")
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
  return knex.schema.dropTable("employer");
};
