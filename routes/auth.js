const express = require("express");
const router = express.Router();
const Account = require("../models/account");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secretKey = "myverysecretkey";

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingAccount = await Account.findOne({ username });
    if (existingAccount) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAccount = new Account({
      username,
      password: hashedPassword,
    });

    await newAccount.save();
    res.json({ message: "Account created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const account = await Account.findOne({ username });
    if (!account) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, account.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ userId: account._id }, secretKey, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
