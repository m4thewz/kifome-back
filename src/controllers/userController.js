import User from "../db/models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().max(100).allow(null, ""),
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(8).max(255).required()
});

async function register(req, res) {
  const { name, username, email, password } = req.body;
  const validationResult = userSchema.validate({ name, username, email, password });

  if (validationResult.error) {
    console.error("Validation error:", validationResult.error.message)
    return res.status(400).json({ error: validationResult.error.message })
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ name, username, email, password: hashedPassword });
    return res.status(201).json(user);
  } catch (err) {
    console.error(err);

    if (err.name == "SequelizeUniqueConstraintError") {
      return res.status(409).json({ error: "Email or username already exists "});
    }
    return res.status(400).json({ error: "Error creating user" });
  }
};

// TODO: implement username login
async function login(req, res) {
  const { email, password } = req.body;
  const userPartialSchema = Joi.object({ email: userSchema.extract("email"), password: userSchema.extract("password") })
  const validationResult = userPartialSchema.validate({ email, password });

  if (validationResult.error) {
    console.log("Validation error: ", validationResult.error.message);
    return res.status(400).json({ error: validationResult.error.message });
  };

  const user = await User.findOne({ where: { email }});
  if (!user) return res.status(404).json({ error: "User not found" });

  const correctPassword = await bcrypt.compare(password, user.password);
  if (!correctPassword) return res.status(400).json({ error: "Incorrect password" });

  const token = jwt.sign({ userID: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  return res.status(200).json({ token });
}

async function getAll(_, res) {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["id", "password"]
      }
    });
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error searching users" });
  }
};

async function getById(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error finding user" });
  }
};

async function update(req, res) {
    const { id } = req.params;
    const { name, username } = req.body;
    const userPartialSchema = Joi.object({ name: userSchema.extract("name"), username: userSchema.extract("username") })
    const validationResult = userPartialSchema.validate({ name, username })

    if (validationResult.error) {
      console.error("Validation error: ", validationResult.error.message)
      return res.status(400).json({ error: validationResult.error.message })
    }

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.update({ name, username });
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error updating user" });
  }
};

async function remove(req, res) {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();
    return res.sendStatus(204);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error deleting user" });
  }
};

export default { register, login, getAll, getById, update, remove };
