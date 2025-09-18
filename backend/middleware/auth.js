import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const header = req.header("Authorization");
  if (!header) return res.status(401).json({ message: "No token, authorization denied" });

  const token = header.startsWith("Bearer ") ? header.slice(7) : header;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // payload has { id, role } from login/register
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

export default auth;
