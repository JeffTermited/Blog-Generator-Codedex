import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const promotions = await prisma.promotion.findMany({
    orderBy: { createdAt: "desc" },
    include: { trip: true },
  });
  return NextResponse.json(promotions);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, details, discountPct, active = true, tripId } = body;
  if (!title || !details) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const promo = await prisma.promotion.create({
    data: {
      title,
      details,
      discountPct: discountPct ?? null,
      active,
      tripId: tripId ?? null,
    },
  });
  return NextResponse.json(promo, { status: 201 });
}

