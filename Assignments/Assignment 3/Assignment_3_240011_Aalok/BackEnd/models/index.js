import sequelize from "../config/db.js";
import User from "./User.js";
import Report from "./Report.js";
import Claim from "./Claim.js";

User.hasMany(Report);
Report.belongsTo(User);

User.hasMany(Claim);
Claim.belongsTo(User);

Report.hasMany(Claim);
Claim.belongsTo(Report);

export {
  sequelize,
  User,
  Report,
  Claim
};