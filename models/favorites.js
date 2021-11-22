const mongoose = require('mongoose');

const FavoritesSchema = mongoose.Schema({
  favorite: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

 
module.exports = mongoose.model('Favorite', FavoritesSchema);