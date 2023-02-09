import Sequelize from "sequelize";

import config from "../config/database";

import Books from "../app/models/Book";
import Users from "../app/models/User";

const models = [Books, Users];

class Database {
  constructor() {
    this.connection = new Sequelize(config);
    this.init();
  }

  init() {
    models.forEach((model) => model.init(this.connection));
  }
}

export default new Database();
