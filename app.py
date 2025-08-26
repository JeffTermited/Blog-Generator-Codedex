from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SECRET_KEY'] = 'packandgo_secret_key_2024'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///packandgo.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# 資料庫模型
class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)

class Tour(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    duration = db.Column(db.String(50), nullable=False)
    category = db.Column(db.String(50), nullable=False)  # 包團旅遊, 客製旅遊, 郵輪
    image_url = db.Column(db.String(200))
    is_featured = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Promotion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    discount_percentage = db.Column(db.Integer, nullable=False)
    valid_until = db.Column(db.DateTime, nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20))
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# 首頁
@app.route('/')
def index():
    featured_tours = Tour.query.filter_by(is_featured=True).limit(6).all()
    active_promotions = Promotion.query.filter_by(is_active=True).limit(3).all()
    return render_template('index.html', featured_tours=featured_tours, promotions=active_promotions)

# 服務頁面
@app.route('/services')
def services():
    return render_template('services.html')

# 旅遊行程頁面
@app.route('/tours')
def tours():
    category = request.args.get('category', '')
    if category:
        tours = Tour.query.filter_by(category=category).all()
    else:
        tours = Tour.query.all()
    return render_template('tours.html', tours=tours, category=category)

# 優惠活動頁面
@app.route('/promotions')
def promotions():
    promotions = Promotion.query.filter_by(is_active=True).all()
    return render_template('promotions.html', promotions=promotions)

# 關於我們
@app.route('/about')
def about():
    return render_template('about.html')

# 聯絡我們
@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        phone = request.form['phone']
        message = request.form['message']
        
        contact = Contact(name=name, email=email, phone=phone, message=message)
        db.session.add(contact)
        db.session.commit()
        
        flash('感謝您的訊息！我們會盡快回覆您。', 'success')
        return redirect(url_for('contact'))
    
    return render_template('contact.html')

# 管理員登入
@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        admin = Admin.query.filter_by(username=username).first()
        if admin and check_password_hash(admin.password_hash, password):
            session['admin_logged_in'] = True
            session['admin_id'] = admin.id
            flash('登入成功！', 'success')
            return redirect(url_for('admin_dashboard'))
        else:
            flash('帳號或密碼錯誤！', 'error')
    
    return render_template('admin/login.html')

# 管理員登出
@app.route('/admin/logout')
def admin_logout():
    session.pop('admin_logged_in', None)
    session.pop('admin_id', None)
    flash('已登出！', 'success')
    return redirect(url_for('admin_login'))

# 管理員儀表板
@app.route('/admin/dashboard')
def admin_dashboard():
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))
    
    tours_count = Tour.query.count()
    promotions_count = Promotion.query.filter_by(is_active=True).count()
    contacts_count = Contact.query.count()
    
    return render_template('admin/dashboard.html', 
                         tours_count=tours_count,
                         promotions_count=promotions_count,
                         contacts_count=contacts_count)

# 管理旅遊行程
@app.route('/admin/tours')
def admin_tours():
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))
    
    tours = Tour.query.order_by(Tour.created_at.desc()).all()
    return render_template('admin/tours.html', tours=tours)

# 新增旅遊行程
@app.route('/admin/tours/add', methods=['GET', 'POST'])
def admin_add_tour():
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))
    
    if request.method == 'POST':
        title = request.form['title']
        description = request.form['description']
        price = float(request.form['price'])
        duration = request.form['duration']
        category = request.form['category']
        image_url = request.form['image_url']
        is_featured = 'is_featured' in request.form
        
        tour = Tour(title=title, description=description, price=price,
                   duration=duration, category=category, image_url=image_url,
                   is_featured=is_featured)
        db.session.add(tour)
        db.session.commit()
        
        flash('旅遊行程新增成功！', 'success')
        return redirect(url_for('admin_tours'))
    
    return render_template('admin/add_tour.html')

# 編輯旅遊行程
@app.route('/admin/tours/edit/<int:tour_id>', methods=['GET', 'POST'])
def admin_edit_tour(tour_id):
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))
    
    tour = Tour.query.get_or_404(tour_id)
    
    if request.method == 'POST':
        tour.title = request.form['title']
        tour.description = request.form['description']
        tour.price = float(request.form['price'])
        tour.duration = request.form['duration']
        tour.category = request.form['category']
        tour.image_url = request.form['image_url']
        tour.is_featured = 'is_featured' in request.form
        
        db.session.commit()
        flash('旅遊行程更新成功！', 'success')
        return redirect(url_for('admin_tours'))
    
    return render_template('admin/edit_tour.html', tour=tour)

# 刪除旅遊行程
@app.route('/admin/tours/delete/<int:tour_id>')
def admin_delete_tour(tour_id):
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))
    
    tour = Tour.query.get_or_404(tour_id)
    db.session.delete(tour)
    db.session.commit()
    flash('旅遊行程刪除成功！', 'success')
    return redirect(url_for('admin_tours'))

# 管理優惠活動
@app.route('/admin/promotions')
def admin_promotions():
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))
    
    promotions = Promotion.query.order_by(Promotion.created_at.desc()).all()
    return render_template('admin/promotions.html', promotions=promotions)

# 新增優惠活動
@app.route('/admin/promotions/add', methods=['GET', 'POST'])
def admin_add_promotion():
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))
    
    if request.method == 'POST':
        title = request.form['title']
        description = request.form['description']
        discount_percentage = int(request.form['discount_percentage'])
        valid_until = datetime.strptime(request.form['valid_until'], '%Y-%m-%d')
        is_active = 'is_active' in request.form
        
        promotion = Promotion(title=title, description=description,
                            discount_percentage=discount_percentage,
                            valid_until=valid_until, is_active=is_active)
        db.session.add(promotion)
        db.session.commit()
        
        flash('優惠活動新增成功！', 'success')
        return redirect(url_for('admin_promotions'))
    
    return render_template('admin/add_promotion.html')

# 查看聯絡訊息
@app.route('/admin/contacts')
def admin_contacts():
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))
    
    contacts = Contact.query.order_by(Contact.created_at.desc()).all()
    return render_template('admin/contacts.html', contacts=contacts)

# 編輯優惠活動
@app.route('/admin/promotions/edit/<int:promotion_id>', methods=['GET', 'POST'])
def admin_edit_promotion(promotion_id):
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))
    
    promotion = Promotion.query.get_or_404(promotion_id)
    
    if request.method == 'POST':
        promotion.title = request.form['title']
        promotion.description = request.form['description']
        promotion.discount_percentage = int(request.form['discount_percentage'])
        promotion.valid_until = datetime.strptime(request.form['valid_until'], '%Y-%m-%d')
        promotion.is_active = 'is_active' in request.form
        
        db.session.commit()
        flash('優惠活動更新成功！', 'success')
        return redirect(url_for('admin_promotions'))
    
    return render_template('admin/edit_promotion.html', promotion=promotion)

# 刪除優惠活動
@app.route('/admin/promotions/delete/<int:promotion_id>')
def admin_delete_promotion(promotion_id):
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))
    
    promotion = Promotion.query.get_or_404(promotion_id)
    db.session.delete(promotion)
    db.session.commit()
    flash('優惠活動刪除成功！', 'success')
    return redirect(url_for('admin_promotions'))

# 初始化資料庫和管理員帳號
def init_db():
    with app.app_context():
        db.create_all()
        
        # 檢查是否已有管理員帳號
        admin = Admin.query.filter_by(username='admin').first()
        if not admin:
            admin = Admin(username='admin', password_hash=generate_password_hash('admin123'))
            db.session.add(admin)
            db.session.commit()
            print("管理員帳號已建立 - 帳號: admin, 密碼: admin123")

if __name__ == '__main__':
    init_db()
    app.run(debug=True, host='0.0.0.0', port=5000)