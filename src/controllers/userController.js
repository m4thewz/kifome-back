import User from "../db/models/user.js";
import bcrypt from "bcrypt";

async function register(req, res) {
  try {
    const { name, username, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, username, email, password: hashedPassword });
    return res.status(201).json(user);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Error creating user" });
  }
};

async function getAll(_, res) {
  try {
    const users = await User.findAll();
    return res.json(users);
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
  try {
    const { id } = req.params;
    const { name, username } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.update({ name, username });
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "Error updating user" });
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
    return res.json({ message: "Deleted user with success" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error deleting user" });
  }
};

export default { register, getAll, getById, update, remove };
