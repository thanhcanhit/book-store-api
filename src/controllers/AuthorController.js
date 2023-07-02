const { default: mongoose } = require("mongoose");
const Author = require("../models/Author");
const Book = require("../models/Book");

class AuthorController {
	// [POST] /v1/author
	async add(req, res) {
		try {
			const newAuthor = new Author(req.body);
			const savedAuthor = await newAuthor.save();
			res.status(200).json(savedAuthor);
		} catch (err) {
			res.status(500).json(err);
		}
	}

	// [GET] /v1/author
	async getAll(req, res) {
		try {
			const authors = await Author.find({});
			res.status(200).json(authors);
		} catch (err) {
			res.status(500).json(err);
		}
	}

	// [GET] /v1/author/:id
	async get(req, res) {
		try {
			const requestId = req.params.id;
			const author = await Author.findOne({ _id: requestId }).populate(
				"books"
			);
			res.status(200).json(author);
		} catch (err) {
			res.status(500).json(err);
		}
	}

	// [PUT] /v1/author/:id
	async update(req, res) {
		try {
			await Author.findByIdAndUpdate(req.params.id, { $set: req.body });
			res.status(200).json("Updated successfully");
		} catch (err) {
			res.status(500).json(err);
		}
	}

	// [DELETE] /v1/author/:id
	async delete(req, res) {
		const authorId = req.params.id;
		try {
			await Book.updateMany({author: authorId}, {$set: {author: null}});
			await Author.findByIdAndDelete(authorId);
			res.status(200).json("Author deleted successfully");
		} catch (err) {
			res.status(500).json(err);
		}
	}
}

module.exports = new AuthorController();
