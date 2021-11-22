const Post = require("../models/favorites");

module.exports = {
  favorite,
  index,
};

async function favorite(req, res) {
  console.log(req.body, req.user);

    try {
      const post = await Post.create({
        user: req.user
      });

      res.status(201).json({ post: post });
    } catch (err) {
      res.status(400).json({ err });
    
  };
}

async function index(req, res) {
 
  try {
    console.log(req.body, 'index console.log');
    // this populates the user when you find the posts
    // so you'll have access to the users information
    // when you fetch teh posts
    const posts = await Post.find({}).populate("user").exec();
    res.status(200).json({ posts: posts });
  } catch (err) {
    console.log('posts didnt work')
    res.status(400).json({ err });
  }
}
