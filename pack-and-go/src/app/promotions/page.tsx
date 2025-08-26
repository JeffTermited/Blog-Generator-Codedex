import { prisma } from "@/lib/prisma";

export default async function PromotionsPage() {
  const promotions = await prisma.promotion.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
    include: { trip: true },
  });
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">優惠</h1>
      {promotions.length === 0 ? (
        <p className="text-neutral-300">目前沒有優惠活動，請稍後再來。</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {promotions.map((p) => (
            <div key={p.id} className="border border-neutral-800 rounded-xl p-6">
              <div className="text-xl font-semibold">{p.title}</div>
              <div className="text-neutral-300 mt-2">{p.details}</div>
              <div className="text-neutral-400 mt-2 text-sm">折扣：{p.discountPct ?? "-"}%</div>
              {p.trip && (
                <div className="text-neutral-400 mt-2 text-sm">對應行程：{p.trip.title}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

