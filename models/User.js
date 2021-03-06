const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  username: {
    type: String,
    required: [true, "Please enter an username"],
    minlength: [4, "Minimum username length is 4 characters"],
  },
  birthDate: {
    type: Date,
    required: [true, "Please enter an birth date"],
  },
  personalColor: {
    type: String,
    required: [true, "Please select a personalcolor"],
  },
  city: {
    type: String,
    required: [true, "Please select a city"],
  },
  bio: {
    type: String,
    required: [true, "Tell me something about yourself"],
    minlength: [20, "Tell me more about yourself dont forget something"],
  },
  petCategory: {
    type: String,
    required: [true, "Please tell me what pet u got"],
  },
});

// fire a function before doc saved to db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
