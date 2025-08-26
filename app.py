from flask import Flask, render_template, request, jsonify, session, redirect, url_for, flash
import json
import os
from datetime import datetime
from functools import wraps

app = Flask(__name__)
app.secret_key = 'pack_and_go_travel_secret_key_2024'

# 簡單的管理員驗證 (實際應用中應使用更安全的方法)
ADMIN_USERNAME = 'admin'
ADMIN_PASSWORD = 'packgo2024'

# 數據存儲文件
TRAVEL_PACKAGES_FILE = 'data/travel_packages.json'
PROMOTIONS_FILE = 'data/promotions.json'

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'logged_in' not in session:
            return redirect(url_for('admin_login'))
        return f(*args, **kwargs)
    return decorated_function

def load_data(filename):
    """載入JSON數據文件"""
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

def save_data(filename, data):
    """保存數據到JSON文件"""
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

# 前台路由
@app.route('/')
def index():
    """首頁"""
    travel_packages = load_data(TRAVEL_PACKAGES_FILE)
    promotions = load_data(PROMOTIONS_FILE)
    return render_template('index.html', 
                         travel_packages=travel_packages[:3],  # 顯示前3個套裝
                         promotions=promotions[:2])  # 顯示前2個優惠

@app.route('/services')
def services():
    """服務頁面"""
    return render_template('services.html')

@app.route('/services/<service_type>')
def service_detail(service_type):
    """具體服務詳情頁面"""
    services = {
        'group-tour': {'title': '包團旅遊', 'description': '專業團體旅遊服務'},
        'custom-tour': {'title': '客製旅遊', 'description': '量身打造的個人化旅遊'},
        'cruise': {'title': '郵輪服務', 'description': '豪華郵輪假期'},
        'flight': {'title': '機票服務', 'description': '國內外機票預訂'},
        'hotel': {'title': '飯店住宿', 'description': '精選優質住宿'},
        'visa': {'title': '中國簽證', 'description': '中國簽證申請代辦'}
    }
    
    if service_type in services:
        service = services[service_type]
        travel_packages = load_data(TRAVEL_PACKAGES_FILE)
        # 篩選相關的旅遊套裝
        related_packages = [pkg for pkg in travel_packages if pkg.get('service_type') == service_type]
        return render_template('service_detail.html', 
                             service=service, 
                             service_type=service_type,
                             related_packages=related_packages)
    else:
        return render_template('404.html'), 404

@app.route('/packages')
def packages():
    """旅遊套裝頁面"""
    travel_packages = load_data(TRAVEL_PACKAGES_FILE)
    return render_template('packages.html', travel_packages=travel_packages)

@app.route('/contact')
def contact():
    """聯絡我們頁面"""
    return render_template('contact.html')

# 管理員後台路由
@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    """管理員登入"""
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
            session['logged_in'] = True
            flash('登入成功！', 'success')
            return redirect(url_for('admin_dashboard'))
        else:
            flash('帳號或密碼錯誤！', 'error')
    
    return render_template('admin/login.html')

@app.route('/admin/logout')
def admin_logout():
    """管理員登出"""
    session.pop('logged_in', None)
    flash('已登出！', 'info')
    return redirect(url_for('index'))

@app.route('/admin')
@login_required
def admin_dashboard():
    """管理員控制台"""
    travel_packages = load_data(TRAVEL_PACKAGES_FILE)
    promotions = load_data(PROMOTIONS_FILE)
    return render_template('admin/dashboard.html', 
                         travel_packages=travel_packages,
                         promotions=promotions)

@app.route('/admin/packages')
@login_required
def admin_packages():
    """旅遊套裝管理"""
    travel_packages = load_data(TRAVEL_PACKAGES_FILE)
    return render_template('admin/packages.html', travel_packages=travel_packages)

@app.route('/admin/packages/add', methods=['GET', 'POST'])
@login_required
def admin_add_package():
    """新增旅遊套裝"""
    if request.method == 'POST':
        travel_packages = load_data(TRAVEL_PACKAGES_FILE)
        
        new_package = {
            'id': len(travel_packages) + 1,
            'title': request.form.get('title'),
            'description': request.form.get('description'),
            'price': request.form.get('price'),
            'duration': request.form.get('duration'),
            'service_type': request.form.get('service_type'),
            'image_url': request.form.get('image_url', '/static/images/default-tour.jpg'),
            'highlights': request.form.get('highlights', '').split('\n'),
            'created_at': datetime.now().isoformat()
        }
        
        travel_packages.append(new_package)
        save_data(TRAVEL_PACKAGES_FILE, travel_packages)
        flash('旅遊套裝新增成功！', 'success')
        return redirect(url_for('admin_packages'))
    
    return render_template('admin/add_package.html')

@app.route('/admin/packages/edit/<int:package_id>', methods=['GET', 'POST'])
@login_required
def admin_edit_package(package_id):
    """編輯旅遊套裝"""
    travel_packages = load_data(TRAVEL_PACKAGES_FILE)
    package = next((p for p in travel_packages if p['id'] == package_id), None)
    
    if not package:
        flash('找不到指定的旅遊套裝！', 'error')
        return redirect(url_for('admin_packages'))
    
    if request.method == 'POST':
        package.update({
            'title': request.form.get('title'),
            'description': request.form.get('description'),
            'price': request.form.get('price'),
            'duration': request.form.get('duration'),
            'service_type': request.form.get('service_type'),
            'image_url': request.form.get('image_url'),
            'highlights': request.form.get('highlights', '').split('\n'),
            'updated_at': datetime.now().isoformat()
        })
        
        save_data(TRAVEL_PACKAGES_FILE, travel_packages)
        flash('旅遊套裝更新成功！', 'success')
        return redirect(url_for('admin_packages'))
    
    return render_template('admin/edit_package.html', package=package)

@app.route('/admin/packages/delete/<int:package_id>', methods=['POST'])
@login_required
def admin_delete_package(package_id):
    """刪除旅遊套裝"""
    travel_packages = load_data(TRAVEL_PACKAGES_FILE)
    travel_packages = [p for p in travel_packages if p['id'] != package_id]
    save_data(TRAVEL_PACKAGES_FILE, travel_packages)
    flash('旅遊套裝刪除成功！', 'success')
    return redirect(url_for('admin_packages'))

@app.route('/admin/promotions')
@login_required
def admin_promotions():
    """優惠管理"""
    promotions = load_data(PROMOTIONS_FILE)
    return render_template('admin/promotions.html', promotions=promotions)

@app.route('/admin/promotions/add', methods=['GET', 'POST'])
@login_required
def admin_add_promotion():
    """新增優惠"""
    if request.method == 'POST':
        promotions = load_data(PROMOTIONS_FILE)
        
        new_promotion = {
            'id': len(promotions) + 1,
            'title': request.form.get('title'),
            'description': request.form.get('description'),
            'discount': request.form.get('discount'),
            'valid_until': request.form.get('valid_until'),
            'terms': request.form.get('terms'),
            'is_active': True,
            'created_at': datetime.now().isoformat()
        }
        
        promotions.append(new_promotion)
        save_data(PROMOTIONS_FILE, promotions)
        flash('優惠新增成功！', 'success')
        return redirect(url_for('admin_promotions'))
    
    return render_template('admin/add_promotion.html')

@app.route('/admin/promotions/edit/<int:promotion_id>', methods=['GET', 'POST'])
@login_required
def admin_edit_promotion(promotion_id):
    """編輯優惠"""
    promotions = load_data(PROMOTIONS_FILE)
    promotion = next((p for p in promotions if p['id'] == promotion_id), None)
    
    if not promotion:
        flash('找不到指定的優惠！', 'error')
        return redirect(url_for('admin_promotions'))
    
    if request.method == 'POST':
        promotion.update({
            'title': request.form.get('title'),
            'description': request.form.get('description'),
            'discount': request.form.get('discount'),
            'valid_until': request.form.get('valid_until'),
            'terms': request.form.get('terms'),
            'is_active': request.form.get('is_active') == 'on',
            'updated_at': datetime.now().isoformat()
        })
        
        save_data(PROMOTIONS_FILE, promotions)
        flash('優惠更新成功！', 'success')
        return redirect(url_for('admin_promotions'))
    
    return render_template('admin/edit_promotion.html', promotion=promotion)

@app.route('/admin/promotions/delete/<int:promotion_id>', methods=['POST'])
@login_required
def admin_delete_promotion(promotion_id):
    """刪除優惠"""
    promotions = load_data(PROMOTIONS_FILE)
    promotions = [p for p in promotions if p['id'] != promotion_id]
    save_data(PROMOTIONS_FILE, promotions)
    flash('優惠刪除成功！', 'success')
    return redirect(url_for('admin_promotions'))

if __name__ == '__main__':
    # 確保數據目錄存在
    os.makedirs('data', exist_ok=True)
    app.run(debug=True, host='0.0.0.0', port=5000)