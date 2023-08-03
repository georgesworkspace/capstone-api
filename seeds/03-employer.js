/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex("employer").del();
    await knex("employer").insert([
      {
        user_id: 404,
        companylocation:"23 St.george Toronto ON",
        companydescription:" glider AI inc is designated to build self-driving vehicle",
        companyname:"gluider AI inc",
        companycontact:"6477739175"
       
      },
      {
        user_id: 707,
        companylocation:"123 spadina ave Toronto ON",
        companydescription:"Land explorer is the leading company in outdoor hiking. ",
        companyname:"Land Explorer",
        companycontact:"2894768765"
      },
      {
        user_id: 808,
        companylocation:"56 Highway 7 Richmond Hill ON",
        companydescription:"Diving sports urged on developing AI to monitor body condition when people are exercising",
        companyname:"DivingSports",
        companycontact:"2894768765"
      },
      {
        user_id: 909,
        companylocation:"27 Kennedy Rd Toronto ON",
        companydescription:"Winter Storm is the pioneer on MMORPG game",
        companyname:"WinterStorm",
        companycontact:"2894768765"
      },
    
    
     
     
    
     
  
    ]);
  };