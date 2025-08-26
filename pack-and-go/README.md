# Pack&Go 旅行社網站

黑白基調、包含公開頁面與管理後台。

## 功能
- 公開網站：首頁、行程、優惠、聯絡我們
- 管理後台：登入、建立/刪除行程與優惠
- 資料庫：SQLite + Prisma

## 開發
1. Node.js 18+
2. 安裝依賴：
```bash
npm install
```
3. 設定環境變數（可選）：在 `.env` 設定管理員密碼：
```bash
ADMIN_PASSWORD=your-strong-password
```
4. 啟動開發伺服器：
```bash
npm run dev
```
5. 編譯建置：
```bash
npm run build && npm start
```

## Prisma
- Schema：`prisma/schema.prisma`
- 資料庫：`.env` 的 `DATABASE_URL`（預設為 SQLite 檔案 `prisma/dev.db`）
- 遷移與產生 client：
```bash
npx prisma migrate dev --name init
npx prisma generate
```

## Logo
- 目前使用 `public/logo.svg` 佔位，可將名片的 logo 檔案覆蓋為相同路徑與檔名。

## 部署
- 可部署於 Vercel 或任何支援 Node.js 的平台。

