import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const guru = await prisma.guru.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(guru);
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal ambil data guru" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const guru = await prisma.guru.create({ data: body });
    return NextResponse.json(guru);
  } catch (error) {
    return NextResponse.json({ error: "Gagal tambah guru" }, { status: 500 });
  }
}
