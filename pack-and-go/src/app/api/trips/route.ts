import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const trips = await prisma.trip.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(trips);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { title, description, destination, startDate, endDate, price } = body;
  if (!title || !description || !destination) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const trip = await prisma.trip.create({
    data: {
      title,
      description,
      destination,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      price: price ?? null,
    },
  });
  return NextResponse.json(trip, { status: 201 });
}

