const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../models/validation");

router.post("/register", async (req, res) => {
  //Validate
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //user email already present in db
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists!");
  //user phone no. already present in db
  const phoneExist = await User.findOne({ phone: req.body.phone });
  if (phoneExist) return res.status(400).send("Phone number already exists!");

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashpass = await bcrypt.hash(req.body.password, salt);
  //create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: hashpass,
  });
  try {
    const savedUser = await user.save();
    const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET);
  // res.header("auth-token", token).send(token);
      res.json({
        token: token
      }).status(200);
      
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  //Validate
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //user email already present in db
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email doesn't exist!");

  //checking password
  const validpass = await bcrypt.compare(req.body.password, user.password);
  if (!validpass) return res.status(400).send("Password incorrect");

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  // res.header("auth-token", token).send(token);
      res.json({
        token: token
      }).status(200);
  
});
router.get("/profile", async (req, res) => {

  const user = await User.find();
  if(!user) return res.status(400).send('User not found');
  res.send(user);
  console.log(user);
});

module.exports = router;
