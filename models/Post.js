const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  name: {           // this is the name of the user, not the post 
    type: String,
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
      type: Schema.Types. ObjectId,
      ref: 'users'
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String,
      },
      avatar: {
        type: String
      },
      date: {         // this is the date of the comment
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {             // this is the date of the post itself 
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('post', PostSchema);