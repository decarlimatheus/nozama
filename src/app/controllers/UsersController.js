import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authConfig from "../../config/auth";
import User from "../models/User";

class UsersController {
  async show(req, res) {
    const users = await User.findAll({
      attributes: { exclude: ["password_hash"] },
    });

    return res.status(200).send(users);
  }

  async login(req, res) {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(422).send({ message: "User not found!" });

      return;
    }

    // check if passwords match
    const checkPassword = await bcrypt.compare(password, user.password_hash);

    if (!checkPassword) {
      res.status(422).send({ message: "Invalid password!" });
    }

    const { id, name } = user;

    res.status(200).json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }

  async create(req, res) {
    const { name, email, password, passwordConfirmation } = req.body;

    // validations
    if (!name) {
      res.status(422).json({ message: "Name is required!" });
      return;
    }
    if (!email) {
      res.status(422).json({ message: "Email is required!" });
      return;
    }
    if (!password) {
      res.status(422).json({ message: "Password is required!" });
      return;
    }

    if (!passwordConfirmation) {
      res.status(422).json({ message: "Password Confirmation is required!" });
      return;
    }

    if (!passwordConfirmation || passwordConfirmation !== password) {
      res.status(422).json({
        message: "Password Confirmation does not match Password!",
      });
      return;
    }

    // check if user already exists
    const userExists = await User.findOne({ where: { email } });

    // create password
    const salt = await bcrypt.genSalt(12);
    const password_hash = await bcrypt.hash(password, salt);

    if (userExists) {
      res.status(422).json({ message: "The email is already being used!" });
    } else if (!userExists) {
      await User.create({ name, email, password_hash });
      res.status(201).json({ message: "Successfully registered user!" });
    }
  }

  async update(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      res.status(422).json({ message: "User not found!" });
      return;
    }

    const { name, email, password } = req.body;

    // validations
    if (!name) {
      res.status(422).json({ message: "Name is required!" });
      return;
    }
    if (!email) {
      res.status(422).json({ message: "Email is required!" });
      return;
    }
    if (!password) {
      res.status(422).json({ message: "Password is required!" });
      return;
    }

    // check if passwords match
    const passwordMatches = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatches) {
      res.status(422).send({ message: "Invalid password!" });
    }

    // update name and/or email
    await User.update(
      { name, email },
      {
        where: {
          id,
        },
      }
    );
    res.status(201).json({ message: "Successfully updated user!" });
  }

  async destroy(req, res) {
    const { id } = req.params;

    // find user
    const user = await User.findByPk(id);

    await user.destroy();

    res.status(201).json({ message: "Successfully deleted user!" });
  }
}

export default new UsersController();
