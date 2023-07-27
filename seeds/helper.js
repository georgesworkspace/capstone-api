/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex("helper").del();
    await knex("helper").insert([
      {
        id: 1,
        helperusername:"jonsmith@gmail.com",
        password:"rootroot",
        helperregion:"Downtown",
        helpercontact:"2890948723",
      },
      {
        id: 2,
        helperusername:"gloriachu@gmail.com",
        password:"rootroot",
        helperregion:"Markham",
        helpercontact:"6475632384", 
      }
    
     
     
    
     
  
    ]);
  };