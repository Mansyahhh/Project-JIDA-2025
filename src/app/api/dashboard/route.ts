// src/app/api/dashboard/route.ts
import {
  getSiswaStats,
  getPegawaiStats,
  getPembayaranStats,
} from "@/lib/prisma/dashboardStats";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const siswa = await getSiswaStats();
    const pegawai = await getPegawaiStats();
    const pembayaran = await getPembayaranStats();
    return NextResponse.json({ siswa, pegawai, pembayaran });
  } catch (error) {
    console.error("Gagal ambil statistik dashboard:", error);
    return NextResponse.json({ error: "Gagal memuat data" }, { status: 500 });
  }
}
