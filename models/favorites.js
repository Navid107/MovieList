const mongoose = require('mongoose');

const FavoritesSchema = mongoose.Schema({
  favorite:{type: mongoose.Schema.Types.Mixed},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

 
module.exports = mongoose.model('Favorite', FavoritesSchema);