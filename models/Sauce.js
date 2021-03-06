const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    name: { type: String, required: true }, 
    manufacturer: { type: String }, 
    description: { type: String },
    mainPepper: { type: String },  
    imageUrl: { type: String }, 
    heat: { type: Number }, 
    usersLiked: { type: [String] }, 
    usersDisliked: { type: [String] }, 
    userId: {type: String },
    likes: {type: Number, default: 0 },
    dislikes: {type: Number, default: 0 },
});

module.exports = mongoose.model('Sauce', sauceSchema);