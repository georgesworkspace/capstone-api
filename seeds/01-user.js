const MD5=require("crypto-js/md5");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing

  await knex("usertypes").del();
  await knex("usertypes").insert([
    {
      id: 1,
      type: "Immigrant",
    },
    {
      id: 2,
      type: "Helper",
    },
    {
      id: 3,
      type: "Employer",
    },
  ]);

  await knex("user").del();
  await knex("user").insert([
    {
      id: 101,
      username: "jonsmith@gmail.com",
      password: MD5("rootroot").toString(),
      user_type_id: 1
    },
    {
      id: 202,
      username: "gloriachu@gmail.com",
      password:MD5("rootroot").toString(),
      user_type_id: 2
    },
    {
      id: 303,
      username: "Andrewzhao@gmail.com",
      password:MD5("rootroot").toString(),
      user_type_id: 2
    },
    {
      id: 404,
      username: "glidertech@gmail.com",
      password:MD5("glider").toString(),
      user_type_id: 3
    },
    {
      id: 505,
      username: "Christinashen@gmail.com",
      password:MD5("chris123").toString(),
      user_type_id: 2
    },
    {
      id: 606,
      username: "Annali@gmail.com",
      password:MD5("anna2000").toString(),
      user_type_id: 2
    },
    {
      id: 707,
      username: "landexplorer@gmail.com",
      password:MD5("hot").toString(),
      user_type_id: 3
    },
    {
      id: 808,
      username: "divingsports@gmail.com",
      password:MD5("sport").toString(),
      user_type_id: 3
    }, {
      id: 909,
      username: "winterstorm@gmail.com",
      password:MD5("storm").toString(),
      user_type_id: 3
    }
  ]);
};
