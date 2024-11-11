import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: Number,
  },
  FatherName: {
    type: String,
  },
  LivingLocation: {
    type: String,
  },
  LivingNearby: {
    type: String,
  },
  IntialLocation: {
    type: String,
  },
  IntialNearby: {
    type: String,
  },
  work: {
    type: String,
  },
  DescriptionKnowledge: {
    type: String,
  },
  MonthlyIncome: {
    type: Number,
  },
  religion: {
    type: String,
  },
  OfficePhone: {
    type: Number,
  },
  PhoneLocation: {
    type: String,
  },
  preacher: {
    type: String,
  },
  witnesses: [
    {
      cnic: {
        type: Number,
      },
      name: {
        type: String,
      },
      FatherName: {
        type: String,
      },
      location: {
        type: String,
      },
      nearby: {
        type: String,
      },
      phone: {
        type: Number,
      },
      work: {
        type: String,
      },
      cnic_picture: {
        type: String,
      },
    },
  ],
  cnic: {
    type: Number,
  },
  cnic_picture: {
    type: String,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  MonthlyInstallment: {
    type: Number,
  },
  purchase: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  advance: {
    type: Number,
  },
  FirstInstallment: {
    type: Number,
  },
  ProductQuantity: {
    type: Number,
  },
  paid: {
    type: Number,
  },
  intialBalance: {
    type: Number,
  },
  TimeLimit: {
    type: Number,
  },
  status: {
    type: String,
  },
  invoice: {
    type: Number,
  },
  PendingDay: {
    type: Number,
  },
  InvoiceDate: {
    type: String,
  },
  createdAt: {
    type: Date,
    requried: true,
    default: Date.now,
  },
});

const Customer =
  mongoose.models.Customer || mongoose.model("Customer", customerSchema);
export default Customer;
