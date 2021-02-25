// implement your posts router here
const Posts = require("./posts-model");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  Posts.find()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(500).json({
        message: "The posts information could not be retrieved",
      });
    });
});

router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((founded) => {
      if (founded) {
        res.status(200).json(founded);
      } else
        res.status(404).json({
          message: "The post with the specified ID does not exist",
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "The post information could not be retrieved",
      });
    });
});

router.post("/", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      message: "Please provide title or contents for the post",
    });
  } else
    Posts.insert(req.body)
      .then((addePost) => {
        res.status(201).json(addePost);
      })
      .catch((error) => {
        res.status(500).json({
          message: "There was an error while saving the post to the database",
        });
      });
});

router.put("/:id", (req, res) => {
  Posts.findById(req.params.id).then((found) => {
    if (found) {
      if (!req.body.title || !req.body.contents) {
        res.status(400).json({
          message: "Please provide title and contents for the post",
        });
      } else
        Posts.update(req.params.id, req.body)
          .then((edited) => {
            res.status(200).json(edited);
          })
          .catch((error) => {
            res.status(500).json({
              message: "The post information could not be modified",
            });
          });
    } else
      res.status(404).json({
        message: "The post with the specified ID does not exist",
      });
  });
});

router.delete("/:id", (req, res) => {
  Posts.findById(req.params.id).then((found) => {
    if (found) {
      Posts.remove(req.params.id)
        .then((removed) => {
          res.status(201).json(removed);
        })
        .catch((error) => {
          res.status(500).json({
            message: "The post could not be removed",
          });
        });
    } else
      res.status(404).json({
        message: "The post with the specified ID does not exist",
      });
  });
});

router.post("/:id", (req, res) => {
  if (!req.body.text) {
    return res.status(400).json({
      message: "Please leave a comment before apply",
    });
  } else
    Posts.insertComment(req.body)
      .then((comment) => {
        res.status(201).json(comment);
      })
      .catch((error) => {
        res.status(500).json({
          message: "Something went wrong",
        });
      });
});

router.get("/:id/comments", (req, res) => {
  Posts.findPostComments(req.params.id)
    .then((comment) => {
      if (comment) {
        res.status(200).json(comment);
      } else
        res.status(404).json({
          message: "The comment with the specified ID does not exist",
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "The comment information could not be retrieved",
      });
    });
});

router.get("/:id/comments/:id", (req, res) => {
  Posts.findCommentById(req.params.id)
    .then((commentId) => {
      if (commentId) {
        res.status(200).json(commentId);
      } else
        res.status(404).json({
          message: "The comment with the specified ID does not exist",
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "The comment information could not be retrieved",
      });
    });
});

module.exports = router;
