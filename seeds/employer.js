/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex("employer").del();
    await knex("employer").insert([
      {
        id: 1,
        username:"haley0922@gmail.com",
        password:"rootroot",
        companyLocation:"23 St.george Toronto ON",
        companyDescription:" glider AI inc is a start up company designated to build AI built in application",
        companyName:"glider AI inc",
        companyContact:"6477739175"
       
      },
      {
        id: 2,
        username:"jona1997@gmail.com",
        password:"rootroot",
        companyLocation:"123 spadina ave Toronto ON",
        companyDescription:"Land explorer is the leading company in outdoor hiking",
        companyName:"land explorer",
        companyContact:"2894768765"
       
      }
    
     
     
    
     
  
    ]);
  };