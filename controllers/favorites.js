const Favorite = require("../models/favorites");

module.exports = {
  favorite,
  index,
};

async function favorite(req, res) {

    try {
      const post = await Favorite.create({
        userId: req.user._id, 
        favorite: JSON.stringify(req.body)
      });
      const favoriteObject = JSON.parse(post.favorite)
      const newPost = {...post, favorite: favoriteObject}
      res.status(201).json({ data: newPost });
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
    const posts = await Favorite.find({}).populate("userId");
    res.status(200).json({ posts: posts });
  } catch (err) {
    console.log('posts didnt work')
    res.status(400).json({ err });
  }
}
