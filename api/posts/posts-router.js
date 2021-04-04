// implement your posts router here

const express = require("express");
const Post = require("./posts-model");
const router = express.Router();

//Get an array of all the post objects contained in the database

router.get("/", (req, res) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ msg: "The posts information could not be retrieved" });
    });
});

//Get the post object with the specified id

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ msg: "The post with the specified ID does not exist" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ msg: "The post information could not be retrieved" });
    });
});

//Create a post using the information sent inside the request body and return the newly created post object

router.post("/", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res
      .status(400)
      .json({ msg: "Please provide title and contents for the post" });
  }

  Post.insert(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      res.status(500).json({
        msg: "There was an error while saving the post to the database",
      });
    });
});

//Update the post with the specified id using data from the request body and return the modified document, not the original

router.put("/:id", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res
      .status(400)
      .json({ msg: "Please provide title and contents for the post" });
  }
  Post.findById(req.params.id).then((post) => {
    if (!post) {
      return res
        .status(404)
        .json({ msg: "The post with the specified ID does not exist" });
    }
  });

  Post.update(req.params.id, req.body)
    .then((updatedPost) => {
      res.status(200).json({ updatedPost });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ msg: "The post information could not be modified" });
    });
});

//Remove the post with the specified id and return the deleted post object

router.delete("/:id", (req, res) => {
  Post.remove(req.params.id)
    .then((deletedPost) => {
      res.status(200).json(deletedPost);
    })
    .catch((err) => {
      res.status(500).json({ msg: "The post could not be removed" });
    });
});

//Return an array of all the comment objects associated with the post with the specified id

router.get("/:id/comments", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res
      .status(404)
      .json({ msg: "The post with the specified ID does not exist" });
  }

  Post.findPostComments(req.params.id)
    .then((comments) => {
      if (comments.length === 0) {
        res.status(404).json({ msg: "No comments for this post" });
      }
      res.status(200).json(comments);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ msg: "The comments information could not be retrieved" });
    });
});

module.exports = router;
