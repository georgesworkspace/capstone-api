/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("helper").del();
  await knex("helper").insert([
    {
      user_id: 202,
      helperregion: "Markham",
      helpercontact: "6475648974",
    },
    {
      user_id: 303,
      helperregion: "Missisagua",
      helpercontact: "4165367384",
    },
    {
      user_id: 505,
      helperregion: "Richmond Hill",
      helpercontact: "2895632384",
    },
    {
      user_id: 606,
      helperregion: "Scarbrough",
      helpercontact: "9055632264",
    },
  ]);
};
