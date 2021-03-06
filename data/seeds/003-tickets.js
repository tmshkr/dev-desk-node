exports.seed = function (knex, Promise) {
  return knex("tickets")
    .del()
    .then(function () {
      return knex("tickets").insert([
        {
          id: 1,
          posted_by: 1,
          status: "OPEN",
          title: "Ticket 1",
          description: "Ticket 1 description text ",
          what_ive_tried: "The steps that I've tried for ticket 1",
        },
        {
          id: 2,
          posted_by: 2,
          claimed_by: 1,
          status: "OPEN",
          title: "Ticket 2",
          description: "Ticket 2 description text ",
          what_ive_tried: "The steps that I've tried for ticket 2",
        },
        {
          id: 3,
          posted_by: 2,
          claimed_by: 1,
          status: "OPEN",
          title: "Ticket 3",
          description: "Ticket 3 description text ",
          what_ive_tried: "The steps that I've tried for ticket 3",
        },
        {
          id: 4,
          posted_by: 1,
          claimed_by: 2,
          status: "CLOSED",
          title: "Ticket 4",
          description: "Ticket 4 description text ",
          what_ive_tried: "The steps that I've tried for ticket 4",
        },
      ]);
    })
    .then(function () {
      return knex.schema.raw("ALTER SEQUENCE tickets_id_seq RESTART WITH 5");
    });
};
