"use client";
import { useEffect, useState } from "react";

type Trip = {
  id: number;
  title: string;
  description: string;
  destination: string;
  startDate?: string | null;
  endDate?: string | null;
  price?: number | null;
};

type Promotion = {
  id: number;
  title: string;
  details: string;
  discountPct?: number | null;
  active: boolean;
  tripId?: number | null;
};

export default function AdminDashboard() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  const [tripForm, setTripForm] = useState({
    title: "",
    description: "",
    destination: "",
    startDate: "",
    endDate: "",
    price: "",
  });

  const [promoForm, setPromoForm] = useState({
    title: "",
    details: "",
    discountPct: "",
    active: true,
    tripId: "",
  });

  async function load() {
    const [t, p] = await Promise.all([
      fetch("/api/trips").then((r) => r.json()),
      fetch("/api/promotions").then((r) => r.json()),
    ]);
    setTrips(t);
    setPromotions(p);
  }

  useEffect(() => {
    load();
  }, []);

  async function addTrip(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/trips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...tripForm,
        price: tripForm.price ? Number(tripForm.price) : null,
      }),
    });
    setTripForm({ title: "", description: "", destination: "", startDate: "", endDate: "", price: "" });
    await load();
  }

  async function removeTrip(id: number) {
    await fetch(`/api/trips/${id}`, { method: "DELETE" });
    await load();
  }

  async function addPromotion(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/promotions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...promoForm,
        discountPct: promoForm.discountPct ? Number(promoForm.discountPct) : null,
        tripId: promoForm.tripId ? Number(promoForm.tripId) : null,
      }),
    });
    setPromoForm({ title: "", details: "", discountPct: "", active: true, tripId: "" });
    await load();
  }

  async function removePromotion(id: number) {
    await fetch(`/api/promotions/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="space-y-12">
      <h1 className="text-3xl font-bold">管理後台</h1>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">新增行程</h2>
        <form onSubmit={addTrip} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input placeholder="標題" value={tripForm.title} onChange={(e) => setTripForm({ ...tripForm, title: e.target.value })} />
          <input placeholder="目的地" value={tripForm.destination} onChange={(e) => setTripForm({ ...tripForm, destination: e.target.value })} />
          <input placeholder="開始日期 (YYYY-MM-DD)" value={tripForm.startDate} onChange={(e) => setTripForm({ ...tripForm, startDate: e.target.value })} />
          <input placeholder="結束日期 (YYYY-MM-DD)" value={tripForm.endDate} onChange={(e) => setTripForm({ ...tripForm, endDate: e.target.value })} />
          <input placeholder="價格 (NT$)" value={tripForm.price} onChange={(e) => setTripForm({ ...tripForm, price: e.target.value })} />
          <textarea placeholder="描述" className="md:col-span-2" value={tripForm.description} onChange={(e) => setTripForm({ ...tripForm, description: e.target.value })} />
          <div className="md:col-span-2"><button type="submit">新增行程</button></div>
        </form>
        <div className="border border-neutral-800 rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-neutral-900">
              <tr>
                <th className="text-left p-3">標題</th>
                <th className="text-left p-3">目的地</th>
                <th className="text-left p-3">日期</th>
                <th className="text-left p-3">價格</th>
                <th className="text-left p-3">操作</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((t) => (
                <tr key={t.id} className="border-t border-neutral-800">
                  <td className="p-3">{t.title}</td>
                  <td className="p-3">{t.destination}</td>
                  <td className="p-3">{t.startDate ?? "-"} ~ {t.endDate ?? "-"}</td>
                  <td className="p-3">{t.price ?? "-"}</td>
                  <td className="p-3">
                    <button onClick={() => removeTrip(t.id)}>刪除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">新增優惠</h2>
        <form onSubmit={addPromotion} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input placeholder="標題" value={promoForm.title} onChange={(e) => setPromoForm({ ...promoForm, title: e.target.value })} />
          <input placeholder="折扣百分比 (例如 10)" value={promoForm.discountPct} onChange={(e) => setPromoForm({ ...promoForm, discountPct: e.target.value })} />
          <input placeholder="對應行程ID (選填)" value={promoForm.tripId} onChange={(e) => setPromoForm({ ...promoForm, tripId: e.target.value })} />
          <textarea placeholder="詳細內容" className="md:col-span-2" value={promoForm.details} onChange={(e) => setPromoForm({ ...promoForm, details: e.target.value })} />
          <div className="md:col-span-2"><button type="submit">新增優惠</button></div>
        </form>
        <div className="border border-neutral-800 rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-neutral-900">
              <tr>
                <th className="text-left p-3">標題</th>
                <th className="text-left p-3">折扣</th>
                <th className="text-left p-3">啟用</th>
                <th className="text-left p-3">行程ID</th>
                <th className="text-left p-3">操作</th>
              </tr>
            </thead>
            <tbody>
              {promotions.map((p) => (
                <tr key={p.id} className="border-t border-neutral-800">
                  <td className="p-3">{p.title}</td>
                  <td className="p-3">{p.discountPct ?? "-"}%</td>
                  <td className="p-3">{p.active ? "是" : "否"}</td>
                  <td className="p-3">{p.tripId ?? "-"}</td>
                  <td className="p-3">
                    <button onClick={() => removePromotion(p.id)}>刪除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

