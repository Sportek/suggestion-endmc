import { UsersData } from "@/app/database/UsersData";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const usersData = new UsersData();
  const user = await usersData.getAccountByID(params.userId);
  if (!user) return new NextResponse("Not found", { status: 404 });

  // On n'envoie pas le mail, c'est un peu confidentiel.
  const { email, ...userData } = user;

  return NextResponse.json(userData);
}
