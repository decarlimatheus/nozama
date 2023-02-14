import Books from "../models/Book";

class BooksController {
  async index(req, res) {
    const book = await Books.findAll();

    return res.status(200).send(book);
  }

  async getById(req, res) {
    const { id } = req.params;

    const book = await Books.findByPk(id);

    return res.status(200).send(book);
  }

  async create(req, res) {
    const { title, author, pages, category } = req.body;

    // validations
    if (!title) {
      res.status(422).json({ message: "Title is required!" });
      return;
    }

    if (!author) {
      res.status(422).json({ message: "Author is required!" });
      return;
    }

    if (!pages) {
      res.status(422).json({ message: "Pages is required!" });
      return;
    }

    if (!category) {
      res.status(422).json({ message: "Category is required!" });
      return;
    }

    // check if book already exists
    const bookExists = await Books.findOne({ where: { title } });

    if (bookExists) {
      res.status(422).json({ message: "The book has already been added!" });
    } else if (!bookExists) {
      await Books.create({ title, author, pages, category });
      res.status(201).json({ message: "Successfully registered book!" });
    }
  }

  async update(req, res) {
    const { id } = req.params;

    const book = await Books.findByPk(id);

    if (!book) {
      res.status(422).json({ message: "Book not found!" });
      return;
    }

    const { title, author, pages, category } = req.body;

    // validations
    if (!title) {
      res.status(422).json({ message: "Title is required!" });
      return;
    }

    if (!author) {
      res.status(422).json({ message: "Author is required!" });
      return;
    }

    if (!pages) {
      res.status(422).json({ message: "Pages is required!" });
      return;
    }

    if (!category) {
      res.status(422).json({ message: "Category is required!" });
      return;
    }

    // check if book already exists
    const bookExists = await Books.findOne({ where: { title } });

    if (bookExists) {
      res.status(422).json({ message: "The book has already been added!" });
    } else if (!bookExists) {
      await Books.update(
        { title, author, pages, category },
        {
          where: {
            id,
          },
        }
      );
      res.status(201).json({ message: "Successfully updated book!" });
    }
  }

  async destroy(req, res) {
    const { id } = req.params;

    // find book
    const book = await Books.findByPk(id);

    const { title } = req.body;

    // validations
    if (!title) {
      res.status(422).json({ message: "Title is required!" });
      return;
    }

    await book.destroy();

    res.status(201).json({ message: "Successfully deleted book!" });
  }
}

export default new BooksController();
