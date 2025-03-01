import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.models";
import { connectDB } from "@/config/dbConfig";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        
        const {  countries } = await req.json();
        console.log(countries)
        const cookieStore = await cookies()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const authToken:any = cookieStore.get('token')?.value
                const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET!) as jwt.JwtPayload & { email: string };
                if (!decodedToken) {
                    return NextResponse.json(
                        { error: "Email is required" },
                        { status: 422 }
                    );
                }

        if (!decodedToken || !Array.isArray(countries)) {
            return NextResponse.json(
                { error: "Email and countries array are required" },
                { status: 422 }
            );
        }

        // Find user by email
        const user = await User.findOne({ email:decodedToken.email });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Ensure user has a countries field (default to empty array if undefined)
        if (!Array.isArray(user.countries)) {
            user.countries = [];
        }

        // Add new countries without duplicates
        user.countries = Array.from(new Set([...user.countries, ...countries]));

        await user.save();

        return NextResponse.json(
            {
                user,
                id: user._id,
                message: "Countries added successfully",
                success: true,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error at adding countries route:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
