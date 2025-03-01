import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/user.models";
import { connectDB } from "@/config/dbConfig";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const {
      name,
      email,
      industry,
      revenue,
      employees,
      description,
      password,
      hs_code,
    } = await req.json();

    console.log(name, email, password);

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Full name, email, and password are required" },
        { status: 422 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      industry,
      revenue,
      employees,
      description,
      password: password,
      hs_code,
      bussinessName: "none"
    });

    await newUser.save();

    // Generate JWT Token
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      {
        user: newUser,
        id: newUser._id,
        name: newUser.name,
        token: token,
        message: "User registered successfully",
        success: true,
      },
      { status: 201 }
    );

    // Set cookie with token
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    console.error("Error at register route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
