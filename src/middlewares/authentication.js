import jwt from "jsonwebtoken";
import User from "../db/models/user.js";

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ error: err });
    }

    const user = await User.findByPk(decoded?.userID);
    if (!user) return res.status(403).json({ error: "Unauthorized" });
    req.user = { id: user.id, username: user.username };

    next();
  });
}

export { authenticateToken };
