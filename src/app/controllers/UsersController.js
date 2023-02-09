import User from "../models/User";

class UsersController {
  async show(req, res) {
    const users = await User.findAll();

    return res.status(200).send(users);
  }

  async login(req, res) {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(404).send({ message: "User not found!" });

      return;
    }

    // check if passwords match
    if (!password || password !== user.password_hash) {
      res.status(400).send({ message: "Invalid password!" });
    }

    res.status(200).send({ message: "Authentication successful!" });
  }

  async create(req, res) {
    const { name, email, password_hash, passwordConfirmation } = req.body;

    // validations
    if (!name) {
      res.status(422).json({ message: "Name is required!" });
      return;
    }
    if (!email) {
      res.status(422).json({ message: "Email is required!" });
      return;
    }
    if (!password_hash) {
      res.status(422).json({ message: "Password is required!" });
      return;
    }

    if (!passwordConfirmation) {
      res.status(422).json({ message: "Password Confirmation is required!" });
      return;
    }

    if (!passwordConfirmation || passwordConfirmation !== password_hash) {
      res.status(422).json({
        message: "Password Confirmation does not match Password!",
      });
      return;
    }

    // check if user already exists
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      res.status(422).json({ message: "The email is already being used!" });
    } else if (!userExists) {
      await User.create({ name, email, password_hash });
      res.status(201).json({ message: "Successfully registered user!" });
    }

    // res.status(500).json({ message: "Unable to process your request!" });
  }

  async update(req, res) {
    // eslint-disable-next-line prefer-destructuring
    const id = req.params.id;

    const user = await User.findByPk(id);

    if (!user) {
      res.status(422).json({ message: "User not found!" });
      return;
    }

    // res.status(200).json(user);

    const { name, email, password_hash, passwordConfirmation } = req.body;

    // validations
    if (!name) {
      res.status(422).json({ message: "Name is required!" });
      return;
    }
    if (!email) {
      res.status(422).json({ message: "Email is required!" });
      return;
    }
    if (!password_hash) {
      res.status(422).json({ message: "Password is required!" });
      return;
    }

    if (!passwordConfirmation) {
      res.status(422).json({ message: "Password Confirmation is required!" });
      return;
    }

    if (!passwordConfirmation || passwordConfirmation !== password_hash) {
      res.status(422).json({
        message: "Password Confirmation does not match Password!",
      });
      return;
    }
    await User.update(
      { name, email, password_hash },
      {
        where: {
          id,
        },
      }
    );
    res.status(201).json({ message: "Successfully updated user!" });
  }

  async destroy(req, res) {
    // eslint-disable-next-line prefer-destructuring
    const id = req.params.id;

    // find user
    const user = await User.findByPk(id);

    await user.destroy();

    res.status(201).json({ message: "Successfully deleted user!" });
  }
}

export default new UsersController();
