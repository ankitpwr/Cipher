import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

const authUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Please Login ",
    });
  }

  const decodedData = jwt.verify(token, JWT_SECRET);
  if (!decodedData) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }

  req.body.userId = decodedData.userId;
  next();
};

export default authUser;
