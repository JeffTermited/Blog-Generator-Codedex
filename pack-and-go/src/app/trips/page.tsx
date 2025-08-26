import { prisma } from "@/lib/prisma";

export default async function TripsPage() {
  const trips = await prisma.trip.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">行程</h1>
      {trips.length === 0 ? (
        <p className="text-neutral-300">目前沒有行程，請稍後再來。</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trips.map((t) => (
            <div key={t.id} className="border border-neutral-800 rounded-xl p-6">
              <div className="text-xl font-semibold">{t.title}</div>
              <div className="text-neutral-400 mt-2">{t.destination}</div>
              <div className="text-neutral-300 mt-2 text-sm">{t.description}</div>
              <div className="text-neutral-400 mt-2 text-sm">
                {t.startDate ? new Date(t.startDate).toISOString().slice(0,10) : "-"} ~ {t.endDate ? new Date(t.endDate).toISOString().slice(0,10) : "-"}
              </div>
              <div className="mt-2">{t.price ? `NT$ ${t.price}` : "價格洽詢"}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

