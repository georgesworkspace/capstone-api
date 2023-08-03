/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex("event").del();
    await knex("event").insert([
      {
        id: 1,
        eventlocation:"460 King st Toronto ON",
        eventdescription:"BrainStation Demo day",
        eventname:"Demoday",
        eventtime:"3pm-5pm 8/2/2023",
      }
    ]);
  };