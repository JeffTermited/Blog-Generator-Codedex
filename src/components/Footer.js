import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import Logo from './Logo';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* 公司信息 */}
          <div className="footer-section">
            <Logo size="medium" color="white" />
            <p className="footer-description">
              Pack&Go 旅行社致力於提供最優質的旅遊服務，
              讓您的每一次旅行都充滿驚喜與美好回憶。
            </p>
            <div className="footer-contact">
              <div className="contact-item">
                <Phone size={16} />
                <span>+886-2-1234-5678</span>
              </div>
              <div className="contact-item">
                <Mail size={16} />
                <span>info@packandgo.tw</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>台北市信義區忠孝東路四段123號</span>
              </div>
              <div className="contact-item">
                <Clock size={16} />
                <span>週一至週五 9:00-18:00</span>
              </div>
            </div>
          </div>

          {/* 服務項目 */}
          <div className="footer-section">
            <h3 className="footer-title">服務項目</h3>
            <ul className="footer-links">
              <li><Link to="/services#group-tour">包團旅遊</Link></li>
              <li><Link to="/services#custom-tour">客製旅遊</Link></li>
              <li><Link to="/services#cruise">郵輪</Link></li>
              <li><Link to="/services#flight">機票</Link></li>
              <li><Link to="/services#hotel">飯店</Link></li>
              <li><Link to="/services#china-visa">中國簽證</Link></li>
            </ul>
          </div>

          {/* 快速連結 */}
          <div className="footer-section">
            <h3 className="footer-title">快速連結</h3>
            <ul className="footer-links">
              <li><Link to="/">首頁</Link></li>
              <li><Link to="/about">關於我們</Link></li>
              <li><Link to="/services">服務項目</Link></li>
              <li><Link to="/contact">聯絡我們</Link></li>
            </ul>
          </div>

          {/* 營業資訊 */}
          <div className="footer-section">
            <h3 className="footer-title">營業資訊</h3>
            <div className="business-info">
              <p><strong>交觀甲字第 12345 號</strong></p>
              <p><strong>品保北字第 67890 號</strong></p>
              <p>統一編號：12345678</p>
              <p>負責人：張先生</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} Pack&Go 旅行社. 版權所有.</p>
            <div className="footer-bottom-links">
              <Link to="/privacy">隱私政策</Link>
              <Link to="/terms">服務條款</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;