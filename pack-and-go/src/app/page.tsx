export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Pack&Go 旅行社</h1>
        <p className="text-neutral-300 max-w-2xl mx-auto">
          我們提供包團旅遊、客製旅遊、郵輪、機票、飯店與中國簽證等一站式旅遊服務。
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "包團旅遊", href: "/trips" },
          { title: "客製旅遊", href: "/trips" },
          { title: "郵輪", href: "/trips" },
          { title: "機票", href: "/contact" },
          { title: "飯店", href: "/contact" },
          { title: "中國簽證", href: "/contact" },
        ].map((item) => (
          <a
            key={item.title}
            href={item.href}
            className="border border-neutral-800 rounded-xl p-6 hover:bg-neutral-900 transition"
          >
            <div className="text-xl font-semibold">{item.title}</div>
            <div className="text-neutral-400 text-sm mt-2">了解更多</div>
          </a>
        ))}
      </section>
    </div>
  );
}

