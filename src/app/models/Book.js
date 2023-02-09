import Sequelize, { Model } from "sequelize";

class Books extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        author: Sequelize.STRING,
        pages: Sequelize.INTEGER,
        category: Sequelize.STRING,
      },
      {
        sequelize,
        name: {
          singular: "book",
          plural: "books",
        },
      }
    );
  }
}

export default Books;
