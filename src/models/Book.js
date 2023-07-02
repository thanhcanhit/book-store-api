const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	publishedDate: {
		type: Date,
	},
	genres: {
		type: [String],
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Author",
	},
});

module.exports = mongoose.model("Book", BookSchema);
