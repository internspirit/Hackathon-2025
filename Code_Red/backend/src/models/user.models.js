import mongoose from "mongoose";

const goaCities = [
  "Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda",
  "Bicholim", "Curchorem", "Sanquelim", "Canacona", "Quepem",
  "Sanguem", "Porvorim", "Tiswadi", "Dabolim", "Calangute",
  "Candolim", "Siolim", "Colva", "Anjuna", "Assagao",
];

const UserSchema = new mongoose.Schema({
  auth0Id: { type: String, required: true, unique: true }, // Auth0 User ID
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true, enum: goaCities }, // Only predefined cities allowed
  role: { type: String, enum: ["user", "vendor", "admin"], default: "user" },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model("User", UserSchema);
