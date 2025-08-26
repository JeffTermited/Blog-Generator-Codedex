export default function ContactPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">聯絡我們</h1>
      <p className="text-neutral-300">請留下您的需求，我們將盡快與您聯繫。</p>
      <form className="space-y-4 max-w-xl">
        <div>
          <label className="block mb-1">姓名</label>
          <input type="text" name="name" placeholder="例如：王小姐" className="w-full" />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input type="email" name="email" placeholder="you@example.com" className="w-full" />
        </div>
        <div>
          <label className="block mb-1">需求內容</label>
          <textarea name="message" rows={5} placeholder="請描述您的旅遊需求..." className="w-full" />
        </div>
        <button type="submit">送出</button>
      </form>
    </div>
  );
}

