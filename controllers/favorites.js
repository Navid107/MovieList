const Favorite = require("../models/favorites");
const User = require("../models/user")

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
    const user = await User.findById(req.user._id)
    const posts = await Favorite.find({userId: user._id});
    res.status(200).json({ posts: posts });
  } catch (err) {
    console.log(err)
    res.status(400).json( err );
  }
}
