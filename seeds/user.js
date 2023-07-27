/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex("user").del();
    await knex("user").insert([
      {
        id: 1,
        username:"jonsmith@gmail.com",
        password:"rootroot"
      },
      {
        id: 2,
        username:"gloriachu@gmail.com",
        password:"rootroot"
      }
    
     
     
    
     
  
    ]);
  };
  