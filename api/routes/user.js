const router = require ('express').Router ();
const Post = require ('../models/Post');
const User = require ('../models/Users');
const bcrypt = require ('bcrypt');

//UPDATE
router.put ('/:id', async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt (10);
      req.body.password = await bcrypt.hash (req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate (
        req.params.id,
        {
          $set: req.body,
        },
        {new: true}
      );
      if (req.body.username.length < 6) {
        return res
          .status (400)
          .json ('Username length must be grater than 6 chars');
      } else {
        return res.status (200).json (updatedUser);
      }
    } catch (err) {
      return res.status (500).json (err);
    }
  } else {
    return res.status (401).json ('You can update only your account');
  }
});
//DELETE
router.delete ('/:id', async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById (req.params.id);
      try {
        await Post.deleteMany ({username: user.username});
        await User.findByIdAndDelete (req.params.id);
        return res.status (200).json ('Deleted Successfully');
      } catch (err) {
        return res.status (500).json (err);
      }
    } catch (err) {
      return res.status (404).json ('User Not Found...');
    }
  } else {
    return res.status (401).json ('You can Delete only your account');
  }
});
//Get User ById
router.get ('/:id', async (req, res) => {
  try {
    const user = await User.findById (req.params.id);
    const {password, ...others} = user._doc;

    return res.status (200).json (others);
  } catch (err) {
    return res.status (500).json (err);
  }
});
//Get All
router.get ('/', async (req, res) => {
  try {
    const users = await User.find();

    return res.status (200).json (users);
  } catch (err) {
    return res.status (500).json (err);
  }
});
module.exports = router;
