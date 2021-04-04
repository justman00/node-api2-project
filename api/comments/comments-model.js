const db = require("../../data/db-config");

module.exports = {
  findCommentById,
  insertComment,
};
function findCommentById(id) {
  return db("comments")
    .join("posts", "posts.id", "post_id")
    .select("comments.*", "title as post")
    .where("comments.id", id)
    .first();
}

function insertComment(comment) {
  return db("comments")
    .insert(comment)
    .then((ids) => ({ id: ids[0] }));
}
