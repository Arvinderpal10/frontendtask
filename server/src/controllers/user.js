const mongoose = require("mongoose");
const User = mongoose.model("User");
const sha256 = require("js-sha256");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const emailRegex = /@gmail.com/;

  try {
    if (!emailRegex.test(email))
      throw "Email domain not supported. Use only gmail domain.";
    if (password.length < 6)
      throw "Password length must be atleast 6 characters";

    const userExists = await User.findOne({
      email,
    });

    if (userExists) throw "User with same email already exits.";

    const user = new User({
      name,
      email,
      password: sha256(password + process.env.SALT),
      score: 0,
    });

    await user.save();

    res.json({
      message: "A new user, " + name + ", registered ",
      status: 201,
    });
  } catch (e) {
    res.json({
      message: "Something went wrong from our end.",
      errorMessage: e,
      status: 400,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email,
      password: sha256(password + process.env.SALT),
    });

    if (!user) throw "Email and Password didn't match";

    const token = await jwt.sign({ id: user.id }, process.env.SECRET);

    res.json({
      message: "User logged in successfully",
      token,
      status: 201,
    });
  } catch (e) {
    res.json({
      message: "Something went wrong from our end.",
      errorMessage: e,
      status: 400,
    });
  }
};

exports.getUserById = async (req, res) => {
  const id = req.params.userId;

  try {
    const userExists = await User.findOne({ _id: id });

    if (userExists) {
      res.json(userExists);
    } else {
      res.json({
        data: {},
        message: "No room found",
      });
    }
  } catch (e) {
    res.json({
      message: "Something went wrong from our end.",
    });
  }
};
