const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  likes: Number,
  title: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
  },
  author: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
  },
  url: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
