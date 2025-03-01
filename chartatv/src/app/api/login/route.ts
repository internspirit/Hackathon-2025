import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/user.models";
import { connectDB } from "@/config/dbConfig";


export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const { email, password } = await req.json();
        console.log(email, password);

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 422 }
            );
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        const isPasswordValid = password === user.password;

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        const token = jwt.sign({ 
            _id: user._id,
            name: user.name,
            email: email ,
            industry: user.industry,
            revenue: user.revenue,
            employees: user.employees,
            description: user.description,
            hs_code: user.hs_code,
            

         }, process.env.JWT_SECRET!, {
            expiresIn: "1d",
        });

        

        const response = NextResponse.json(
            {
                user: user,
                id: user._id,
                name: user.name,
                token: token,
                message: "Login successful",
                success: true,
            },
            { status: 200 }
        );
        response.cookies.set("token", token, {
            // httpOnly: true,
        });
        return response;
    } catch (error: unknown) {
        console.error(error);
        console.log("error at login route");
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectDB();
        const user = await User.countDocuments({});
        return NextResponse.json({ user: user });
    } catch (error: unknown) {
        return NextResponse.json({ error: (error as Error).message });
    }
}
