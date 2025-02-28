import mongoose from "mongoose";



const AdminSchema = new mongoose.Schema({
    auth0Id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["admin"], default: "admin" },
    createdAt: { type: Date, default: Date.now }
  });
export const Admin = mongoose.model("Admin", AdminSchema);


