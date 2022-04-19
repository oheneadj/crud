const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    author:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title:{
        type: String,
        required: [true, 'Please add a title']
    },
    content:{
        type: String,
        required: [true, 'Please content']
    }
},
{
    timestamps:true,
})

module.exports = mongoose.model('Blog', blogSchema)