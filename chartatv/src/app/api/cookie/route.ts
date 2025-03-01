import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("token")?.value;
  if (authToken) return NextResponse.json({ success: true });
  else return NextResponse.json({ success: false });
}
