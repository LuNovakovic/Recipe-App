const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    numberofservings: {
        type: String
        
    },
    cookingtime: {
        type: String
    },
    ingredients: {
        type: String
    },
    preparationsteps: {
        type: String
    },
});

module.exports = mongoose.model('recipe', RecipeSchema);