const router = require ('express').Router ();
const Post = require ('../models/Post');
const User = require ('../models/Users');
const bcrypt = require ('bcrypt');

//CREATE
router.post ('/', async (req, res) => {
  const newPost = new Post (req.body);

  try {
    const savedPost = await newPost.save ();
    return res.status (200).json (savedPost);
  } catch (err) {
    return res.status (500).json ("SomeError Here I do noT know");
  }
});
//UPDATE POST
router.put ('/:id', async (req, res) => {
  try {
    const post = await Post.findById (req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate (
          req.params.id,
          {
            $set: req.body,
          },
          {new: true}
        );
        res.status (200).json (updatedPost);
      } catch (err) {
        res.status (500).json (err);
      }
    } else {
      res.status (401).json ('You can update only your post!');
    }
  } catch (err) {
    res.status (500).json (err);
  }
});
//DELETED POST
router.delete ('/:id', async (req, res) => {
  try {
    const post = await Post.findById (req.params.id);
    if (post.username === req.body.username) {
      try {
        await Post.findByIdAndDelete (req.params.id);
        res.status (200).json ('One post Delted succesfully...');
      } catch (err) {
        res.status (500).json (err);
      }
    } else {
      res.status (401).json ('You can Delete only your post!');
    }
  } catch (err) {
    res.status (500).json (err);
  }
});
//Get Post
router.get ('/:id', async (req, res) => {
  try {
    const post = await Post.findById (req.params.id);
    return res.status (200).json (post);
  } catch (err) {
    return res.status (404).json ('Post not found');
  }
});
//Get All Post
router.get ('/', async (req, res) => {
  const user = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (user) {
      posts = await Post.find ({user});
    } else if (catName) {
      posts = await Post.find ({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find ();
    }
    return res.status (200).json (posts);
  } catch (err) {
    return res.status (404).json ('Postsss not found');
  }
});
module.exports = router;
