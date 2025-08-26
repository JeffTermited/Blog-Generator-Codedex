export default function ServicesPage() {
  const services = [
    { title: "包團旅遊", description: "企業、學校、家族包團，一站式規劃與領隊服務。", href: "/trips" },
    { title: "客製旅遊", description: "依您的喜好與預算量身打造專屬行程。", href: "/contact?service=custom" },
    { title: "郵輪", description: "熱門航線與季節航班，團體與自由行皆可。", href: "/trips" },
    { title: "機票", description: "比價與票務服務，提供多家航空最佳選擇。", href: "/contact?service=flights" },
    { title: "飯店", description: "全球飯店預訂與優惠，行程住宿一次到位。", href: "/contact?service=hotels" },
    { title: "中國簽證", description: "代辦各類中國簽證，流程透明、省時省力。", href: "/contact?service=visa" },
  ];
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">服務項目</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((s) => (
          <a key={s.title} href={s.href} className="border border-neutral-800 rounded-xl p-6 hover:bg-neutral-900 transition block">
            <div className="text-xl font-semibold">{s.title}</div>
            <div className="text-neutral-300 mt-2 text-sm">{s.description}</div>
            <div className="text-neutral-400 mt-3 text-sm underline underline-offset-4">了解更多</div>
          </a>
        ))}
      </div>
    </div>
  );
}