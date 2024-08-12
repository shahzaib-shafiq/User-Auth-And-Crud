const jwt = require("jsonwebtoken");

const User = require("../Models/user_model");

exports.verifyToken = async (req, res, next) => {
  try {
    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization !== "null" &&
      req.headers.authorization !== undefined
    ) {
      const token = req.headers.authorization;
      const split_token = token.split(" ");
      const decode = jwt.verify(split_token[1], "secret");

      const user = await User.findOne({
        where: {
          id: decode.id,
        },
      });

      if (user) {
        req.id = decode.id;

        next();
      } else {
        res.status(401).json({
          status: false,
          message: "Not authorized to access this route",
        });
      }
    } else {
      res.status(401).json({
        status: false,
        message: "Token required",
      });
    }
  } catch (error) {
    res.status(401).json({
      status: false,
      message: "Not authorized to access this route",
    });
  }
};
