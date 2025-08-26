import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page page-transition">
      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <h1 className="page-title">聯絡我們</h1>
            <p className="page-description">
              歡迎聯絡我們，讓專業顧問為您服務
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>聯絡資訊</h2>
              <div className="contact-item">
                <Phone size={20} />
                <div>
                  <h3>電話</h3>
                  <p>+886-2-1234-5678</p>
                </div>
              </div>
              <div className="contact-item">
                <Mail size={20} />
                <div>
                  <h3>電子郵件</h3>
                  <p>info@packandgo.tw</p>
                </div>
              </div>
              <div className="contact-item">
                <MapPin size={20} />
                <div>
                  <h3>地址</h3>
                  <p>台北市信義區忠孝東路四段123號</p>
                </div>
              </div>
              <div className="contact-item">
                <Clock size={20} />
                <div>
                  <h3>營業時間</h3>
                  <p>週一至週五 9:00-18:00</p>
                </div>
              </div>
            </div>
            
            <div className="contact-form">
              <h2>線上諮詢</h2>
              <form>
                <div className="form-group">
                  <label>姓名</label>
                  <input type="text" placeholder="請輸入您的姓名" />
                </div>
                <div className="form-group">
                  <label>電話</label>
                  <input type="tel" placeholder="請輸入您的電話" />
                </div>
                <div className="form-group">
                  <label>電子郵件</label>
                  <input type="email" placeholder="請輸入您的電子郵件" />
                </div>
                <div className="form-group">
                  <label>諮詢內容</label>
                  <textarea placeholder="請描述您的需求"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  送出諮詢
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;