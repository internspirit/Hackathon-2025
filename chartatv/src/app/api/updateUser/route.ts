import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.models";
import { connectDB } from "@/config/dbConfig";
import jwt from "jsonwebtoken"
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        
        const {bussinessName,  industry, revenue, employees, description, hs_code } = await req.json();
        console.log(bussinessName, industry, revenue, employees, description, hs_code);
        const cookieStore = await cookies()
        const authToken: string | undefined = cookieStore.get('token')?.value
        if (!authToken) {
            return NextResponse.json(
                { error: "Authentication token is missing" },
                { status: 401 }
            );
        }
        const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET!) as unknown as jwt.JwtPayload & { email: string };
        if (!decodedToken) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 422 }
            );
        }

        // Find user by email
        const user = await User.findOne({ email: decodedToken.email });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Update user details (excluding name, email, and password)
        user.bussinessName = bussinessName ?? user.bussinessName;
        user.industry = industry ?? user.industry;
        user.revenue = revenue ?? user.revenue;
        user.employees = employees ?? user.employees;
        user.description = description ?? user.description;
        user.hs_code = hs_code ?? user.hs_code;

        await user.save();

        return NextResponse.json(
            {
                user,
                id: user._id,
                message: "User details updated successfully",
                success: true,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error at update user route:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
