import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Report = sequelize.define("Report", {
  product: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  location: { type: DataTypes.STRING },
  image: { type: DataTypes.STRING },
  userId: { type: DataTypes.INTEGER },
});

export default Report;