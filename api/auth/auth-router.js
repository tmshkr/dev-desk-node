const router = require("express").Router();
const Users = require("../users/users-model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../../config/secrets.js");

router.post("/register", async (req, res, next) => {
  const { name, email, password, roles } = req.body;
  if (!(name && email && password && roles))
    return next({
      code: 400,
      message: "Please provide a name, email, password, and role",
    });

  if (!roles.every((role) => ["ADMIN", "STUDENT", "HELPER"].includes(role)))
    return next({
      code: 400,
      message: "Please provide a valid role",
    });

  const hash = bcrypt.hashSync(password, 8);

  Users.add({ name, email, password: hash, roles })
    .then((user) => {
      console.log(user);
      const token = generateToken(user);
      return res.status(201).json({ ...user, token });
    })
    .catch((err) => {
      console.log(err);
      return next({
        code: 500,
        message: "There was a problem creating the user",
      });
    });
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!(email && password))
    return next({ code: 400, message: "Please provide an email and password" });

  Users.findOneBy({ email })
    .then((user) => {
      if (!user) return next({ code: 404, message: "User not found" });
      if (bcrypt.compareSync(password, user.password)) {
        delete user.password;
        const token = generateToken(user);
        res.json({ ...user, token });
      } else return next({ code: 401, message: "Invalid credentials" });
    })
    .catch((err) => {
      console.log(err);
      return next({
        code: 500,
        message: "There was a problem logging in",
      });
    });
});

function generateToken(user) {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    roles: user.roles,
  };

  const options = {
    expiresIn: "2h",
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
