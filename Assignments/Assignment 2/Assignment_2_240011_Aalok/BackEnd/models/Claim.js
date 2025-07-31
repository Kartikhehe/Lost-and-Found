import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Claim = sequelize.define("Claim", {
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  reason: { type: DataTypes.TEXT, allowNull: false },
  proof: { type: DataTypes.STRING },
});

export default Claim;