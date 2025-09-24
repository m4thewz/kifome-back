import "dotenv/config";
import express from "express";
import sequelize from "./src/db/index.js";
import { applyAssociations } from "./src/db/associations.js";
import routes from "./src/routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", routes);

applyAssociations();
sequelize.sync({ alter: true });

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
