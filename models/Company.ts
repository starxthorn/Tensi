import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  company: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Company =
  mongoose.models.Company || mongoose.model("Company", CompanySchema);
export default Company;
