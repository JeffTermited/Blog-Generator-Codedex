from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SECRET_KEY'] = 'packgo_secret_key_2024'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///packgo.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# 數據模型
class Tour(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    duration = db.Column(db.String(50), nullable=False)
    destination = db.Column(db.String(100), nullable=False)
    image_url = db.Column(db.String(200))
    is_featured = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Promotion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    discount_percent = db.Column(db.Integer, nullable=False)
    valid_until = db.Column(db.DateTime, nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)

# 路由
@app.route('/')
def index():
    featured_tours = Tour.query.filter_by(is_featured=True).limit(6).all()
    active_promotions = Promotion.query.filter_by(is_active=True).all()
    return render_template('index.html', featured_tours=featured_tours, promotions=active_promotions)

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/tours')
def tours():
    tours = Tour.query.all()
    return render_template('tours.html', tours=tours)

@app.route('/contact')
def contact():
    return render_template('contact.html')

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

@app.route('/admin/dashboard')
def admin_dashboard():
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))
    
    tours = Tour.query.all()
    promotions = Promotion.query.all()
    return render_template('admin/dashboard.html', tours=tours, promotions=promotions)

@app.route('/admin/add_tour', methods=['GET', 'POST'])
def add_tour():
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))
    
    if request.method == 'POST':
        tour = Tour(
            title=request.form['title'],
            description=request.form['description'],
            price=float(request.form['price']),
            duration=request.form['duration'],
            destination=request.form['destination'],
            image_url=request.form['image_url'],
            is_featured=bool(request.form.get('is_featured'))
        )
        db.session.add(tour)
        db.session.commit()
        flash('行程新增成功！')
        return redirect(url_for('admin_dashboard'))
    
    return render_template('admin/add_tour.html')

@app.route('/admin/add_promotion', methods=['GET', 'POST'])
def add_promotion():
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_login'))
    
    if request.method == 'POST':
        promotion = Promotion(
            title=request.form['title'],
            description=request.form['description'],
            discount_percent=int(request.form['discount_percent']),
            valid_until=datetime.strptime(request.form['valid_until'], '%Y-%m-%d'),
            is_active=bool(request.form.get('is_active'))
        )
        db.session.add(promotion)
        db.session.commit()
        flash('優惠新增成功！')
        return redirect(url_for('admin_dashboard'))
    
    return render_template('admin/add_promotion.html')

@app.route('/admin/logout')
def admin_logout():
    session.pop('admin_logged_in', None)
    return redirect(url_for('index'))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        # 創建默認管理員帳號
        if not Admin.query.filter_by(username='admin').first():
            admin = Admin(
                username='admin',
                password_hash=generate_password_hash('packgo2024')
            )
            db.session.add(admin)
            db.session.commit()
    app.run(debug=True)