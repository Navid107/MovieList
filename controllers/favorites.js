const Favorite = require("../models/favorites");
const User = require("../models/user")

module.exports = {
  favorite,
  index,
	remove,
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
      res.status(400).json(err);
    
  };
}
async function remove(req, res){
	try{
		await Favorite.deleteOne({ _id: req.body.uniqueId })
		res.status(200).json({data: 'good'})
	}catch(err){
		res.status(400).json(err)
	}
}
async function index(req, res) {
 
  try {
    const user = await User.findById(req.user._id)
    const posts = await Favorite.find({userId: user._id});
    const newPosts = posts.map(post => {
      const favoriteObject = JSON.parse(post.favorite)
			return {...post, favorite: favoriteObject }
		})
    res.status(200).json({ posts: newPosts });
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
}