const router = require("express").Router();
const { User, validate } = require("../models/user.js");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  try {
    const { error } = validate(req.body);
    console.log(error);
    if (error) {
      console.log(error.details);
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(409).send({ message: "User with the given email already exists" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
