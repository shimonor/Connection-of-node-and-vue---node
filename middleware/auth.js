const { UserModel } = require("../models/index");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      return res.status(401).json({ msg: "Invalid token structure" });
    }
    const user = await UserModel.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ msg: "Invalid token" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

module.exports = auth;
