from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SECRET_KEY'] = 'packandgo_secret_key_2024'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///packandgo.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# 數據模型
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

class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)

# 前台路由
@app.route('/')
def index():
    featured_tours = Tour.query.filter_by(is_featured=True).limit(6).all()
    active_promotions = Promotion.query.filter_by(is_active=True).all()
    return render_template('index.html', featured_tours=featured_tours, promotions=active_promotions)

@app.route('/tours')
def tours():
    category = request.args.get('category', '')
    if category:
        tours = Tour.query.filter_by(category=category).all()
    else:
        tours = Tour.query.all()
    return render_template('tours.html', tours=tours, category=category)

@app.route('/tour/<int:tour_id>')
def tour_detail(tour_id):
    tour = Tour.query.get_or_404(tour_id)
    return render_template('tour_detail.html', tour=tour)

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

# 管理員路由
@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        
        admin = Admin.query.filter_by(username=username).first()
        if admin and check_password_hash(admin.password_hash, password):
            session['admin_logged_in'] = True
            return redirect(url_for('admin_dashboard'))
        else:
            flash('登入失敗，請檢查用戶名和密碼')
    
    return render_template('admin/login.html')

@app.route('/admin/logout')
def admin_logout():
    session.pop('admin_logged_in', None)
    return redirect(url_for('index'))

@app.route('/admin/dashboard')
def admin_dashboard():
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))
    
    tours = Tour.query.all()
    promotions = Promotion.query.all()
    return render_template('admin/dashboard.html', tours=tours, promotions=promotions)

@app.route('/admin/tours')
def admin_tours():
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))
    
    tours = Tour.query.all()
    return render_template('admin/tours.html', tours=tours)

@app.route('/admin/tour/add', methods=['GET', 'POST'])
def add_tour():
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))
    
    if request.method == 'POST':
        tour = Tour(
            title=request.form['title'],
            description=request.form['description'],
            price=float(request.form['price']),
            duration=request.form['duration'],
            category=request.form['category'],
            image_url=request.form['image_url'],
            is_featured=bool(request.form.get('is_featured'))
        )
        db.session.add(tour)
        db.session.commit()
        flash('行程新增成功！')
        return redirect(url_for('admin_tours'))
    
    return render_template('admin/add_tour.html')

@app.route('/admin/tour/edit/<int:tour_id>', methods=['GET', 'POST'])
def edit_tour(tour_id):
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
        tour.is_featured = bool(request.form.get('is_featured'))
        
        db.session.commit()
        flash('行程更新成功！')
        return redirect(url_for('admin_tours'))
    
    return render_template('admin/edit_tour.html', tour=tour)

@app.route('/admin/tour/delete/<int:tour_id>')
def delete_tour(tour_id):
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))
    
    tour = Tour.query.get_or_404(tour_id)
    db.session.delete(tour)
    db.session.commit()
    flash('行程刪除成功！')
    return redirect(url_for('admin_tours'))

@app.route('/admin/promotions')
def admin_promotions():
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))
    
    promotions = Promotion.query.all()
    return render_template('admin/promotions.html', promotions=promotions)

@app.route('/admin/promotion/add', methods=['GET', 'POST'])
def add_promotion():
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))
    
    if request.method == 'POST':
        promotion = Promotion(
            title=request.form['title'],
            description=request.form['description'],
            discount_percentage=int(request.form['discount_percentage']),
            valid_until=datetime.strptime(request.form['valid_until'], '%Y-%m-%d'),
            is_active=bool(request.form.get('is_active'))
        )
        db.session.add(promotion)
        db.session.commit()
        flash('優惠新增成功！')
        return redirect(url_for('admin_promotions'))
    
    return render_template('admin/add_promotion.html')

@app.route('/admin/promotion/edit/<int:promotion_id>', methods=['GET', 'POST'])
def edit_promotion(promotion_id):
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))
    
    promotion = Promotion.query.get_or_404(promotion_id)
    
    if request.method == 'POST':
        promotion.title = request.form['title']
        promotion.description = request.form['description']
        promotion.discount_percentage = int(request.form['discount_percentage'])
        promotion.valid_until = datetime.strptime(request.form['valid_until'], '%Y-%m-%d')
        promotion.is_active = bool(request.form.get('is_active'))
        
        db.session.commit()
        flash('優惠更新成功！')
        return redirect(url_for('admin_promotions'))
    
    return render_template('admin/edit_promotion.html', promotion=promotion)

@app.route('/admin/promotion/delete/<int:promotion_id>')
def delete_promotion(promotion_id):
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))
    
    promotion = Promotion.query.get_or_404(promotion_id)
    db.session.delete(promotion)
    db.session.commit()
    flash('優惠刪除成功！')
    return redirect(url_for('admin_promotions'))

# 初始化數據庫和管理員帳號
def init_db():
    with app.app_context():
        db.create_all()
        
        # 創建默認管理員帳號
        if not Admin.query.filter_by(username='admin').first():
            admin = Admin(
                username='admin',
                password_hash=generate_password_hash('packandgo2024')
            )
            db.session.add(admin)
            db.session.commit()
            print("默認管理員帳號已創建：")
            print("用戶名：admin")
            print("密碼：packandgo2024")

if __name__ == '__main__':
    init_db()
    app.run(debug=True, host='0.0.0.0', port=5000)