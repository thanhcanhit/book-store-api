const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
  year: {
    type: Number
  },
  books: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }]
});

export default mongoose.model("Author", AuthorSchema);
