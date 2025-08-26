#!/bin/bash

echo "🚀 啟動 Pack&Go 旅行社網站..."

# 檢查虛擬環境是否存在
if [ ! -d "venv" ]; then
    echo "📦 創建虛擬環境..."
    python3 -m venv venv
fi

# 啟動虛擬環境
echo "🔧 啟動虛擬環境..."
source venv/bin/activate

# 安裝依賴
echo "📥 安裝依賴套件..."
pip install -r requirements.txt

# 運行網站
echo "🌐 啟動網站伺服器..."
echo "📍 前台網站: http://localhost:5000"
echo "🔐 後台管理: http://localhost:5000/admin/login"
echo "📋 管理員帳號: admin"
echo "🔑 管理員密碼: admin123"
echo ""
echo "按 Ctrl+C 停止伺服器"
echo ""

python app.py