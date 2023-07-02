const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	year: {
		type: Number,
		required: true,
	},
	books: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Book",
		},
	],
});
module.exports = mongoose.model("Author", AuthorSchema);
