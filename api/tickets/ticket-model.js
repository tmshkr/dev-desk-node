const db = require("../../dbConfig.js");

// Returns an array of all tickets with user names and ids
async function find(filter) {
  return db("tickets as t")
    .join("users as p", "p.id", "t.posted_by")
    .leftJoin("users as c", "c.id", "t.claimed_by")
    .select(
      "p.id as posted_by_id",
      "p.name as posted_by_name",
      "t.id as ticket_id",
      "t.posted_at",
      "t.title",
      "t.description",
      "c.id as claimed_by_id",
      "c.name as claimed_by_name"
    );
}

// Add new ticket to database
function add(ticket) {
  return db("tickets")
    .insert(ticket)
    .returning(["id", "posted_at", "status", "title", "description"]);
}

// Removes ticket selected by id posted by user with `userID`
function remove(ticketID, userID) {
  return db("tickets").where({ id: ticketID, posted_by: userID }).delete();
}

// Updates ticket by id
function update(ticket, ticketID, userID) {
  return db("tickets")
    .where({ id: ticketID, posted_by: userID })
    .update(ticket)
    .returning(["id", "posted_at", "status", "title", "description"]);
}

module.exports = {
  find,
  add,
  remove,
  update,
};
