import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Clear existing
  await prisma.promotion.deleteMany();
  await prisma.trip.deleteMany();

  const taipei = await prisma.trip.create({
    data: {
      title: "台北城市漫遊 3 日",
      description: "故宮、中正紀念堂、士林夜市，含飯店與導覽。",
      destination: "台灣・台北",
      startDate: new Date(),
      endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      price: 9800,
    },
  });

  const okinawaCruise = await prisma.trip.create({
    data: {
      title: "沖繩郵輪 5 日",
      description: "海上假期與沖繩觀光，適合親子與好友同遊。",
      destination: "日本・沖繩",
      startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      endDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
      price: 26800,
    },
  });

  await prisma.promotion.create({
    data: {
      title: "早鳥 9 折",
      details: "於開團前 30 天報名，享全額 9 折優惠。",
      discountPct: 10,
      active: true,
      tripId: taipei.id,
    },
  });

  await prisma.promotion.create({
    data: {
      title: "好友成行折 2000",
      details: "兩人以上同行每人現折 2000 元（指定行程）",
      active: true,
      tripId: okinawaCruise.id,
    },
  });

  console.log("Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });