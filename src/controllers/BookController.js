const { default: mongoose } = require("mongoose");
const Book = require("../models/Book");
const Author = require("../models/Author");

class BookController {
	// [POST] /v1/book
	async add(req, res) {
		try {
			const newBook = new Book(req.body);
			const savedBook = await newBook.save();

			const authorId = req.body.author;
			if (authorId) {
				await Author.updateOne(
					{ _id: authorId },
					{ $push: { books: savedBook._id } }
				);
			}
			res.status(200).json(savedBook);
		} catch (err) {
			res.status(500).json(err);
		}
	}

	// [GET] /v1/book
	async getAll(req, res) {
		try {
			const books = await Book.find({});
			res.status(200).json(books);
		} catch (err) {
			res.status(500).json(err);
		}
	}

	// [GET] /v1/book/:id
	async get(req, res) {
		try {
			const books = await Book.find({ _id: req.params.id }).populate(
				"author"
			);
			res.status(200).json(books);
		} catch (err) {
			res.status(500).json(err);
		}
	}

	// [PUT] /v1/book/:id
	async update(req, res) {
		try {
			await Book.findByIdAndUpdate(req.params.id, { $set: req.body });
			res.status(200).json("Updated successfully");
		} catch (err) {
			res.status(500).json(err);
		}
	}

	// [DELETE] /v1/book/:id
	async delete(req, res) {
		try {
			const bookId = req.params.id;
			await Author.updateMany(
				{ books: bookId },
				{ $pull: { books: bookId } }
			);
			await Book.findByIdAndDelete(bookId);
			res.status(200).json("Deleted successfully");
		} catch (err) {
			res.status(500).json(err);
		}
	}
}

module.exports = new BookController();
