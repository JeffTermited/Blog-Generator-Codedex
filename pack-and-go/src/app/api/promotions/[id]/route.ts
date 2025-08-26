import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const promo = await prisma.promotion.findUnique({ where: { id } });
  if (!promo) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(promo);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const body = await req.json();
  const { title, details, discountPct, active, tripId } = body;
  const promo = await prisma.promotion.update({
    where: { id },
    data: {
      title,
      details,
      discountPct: discountPct ?? null,
      active,
      tripId: tripId ?? null,
    },
  });
  return NextResponse.json(promo);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  await prisma.promotion.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

