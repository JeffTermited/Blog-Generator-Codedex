import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  MapPin, 
  Ship, 
  Plane, 
  Building2, 
  FileText, 
  ArrowRight,
  Star,
  Clock,
  Shield
} from 'lucide-react';
import './Home.css';

const Home = () => {
  const services = [
    {
      id: 'group-tour',
      icon: <Users size={32} />,
      title: '包團旅遊',
      description: '專業規劃團體旅遊行程，提供完整的包團服務，讓您的團體旅行輕鬆無憂。',
      features: ['客製化行程', '專業導遊', '團體優惠價格', '完整保險']
    },
    {
      id: 'custom-tour',
      icon: <MapPin size={32} />,
      title: '客製旅遊',
      description: '量身打造專屬您的旅遊行程，從住宿、交通到景點安排，完全依您的需求規劃。',
      features: ['個人化行程', '彈性安排', 'VIP服務', '24小時支援']
    },
    {
      id: 'cruise',
      icon: <Ship size={32} />,
      title: '郵輪',
      description: '豪華郵輪假期，享受海上度假的奢華體驗，多條航線供您選擇。',
      features: ['豪華郵輪', '多國航線', '船上娛樂', '全包式服務']
    },
    {
      id: 'flight',
      icon: <Plane size={32} />,
      title: '機票',
      description: '提供全球機票預訂服務，優惠價格、彈性票期，滿足您的出行需求。',
      features: ['優惠價格', '彈性改期', '全球航線', '即時確認']
    },
    {
      id: 'hotel',
      icon: <Building2 size={32} />,
      title: '飯店',
      description: '全球精選飯店預訂，從經濟型到奢華型住宿，為您找到最適合的選擇。',
      features: ['精選飯店', '優惠房價', '即時預訂', '品質保證']
    },
    {
      id: 'china-visa',
      icon: <FileText size={32} />,
      title: '中國簽證',
      description: '專業中國簽證代辦服務，快速、便利、安全，讓您的中國之行順利成行。',
      features: ['快速辦理', '專業諮詢', '高成功率', '安全保密']
    }
  ];

  const whyChooseUs = [
    {
      icon: <Star size={24} />,
      title: '專業服務',
      description: '20年旅遊業經驗，專業團隊為您服務'
    },
    {
      icon: <Clock size={24} />,
      title: '快速回應',
      description: '24小時客服支援，即時解決您的問題'
    },
    {
      icon: <Shield size={24} />,
      title: '安全保障',
      description: '完整旅遊保險，讓您的旅程安心無憂'
    }
  ];

  return (
    <div className="home page-transition">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Pack&Go 旅行社
              <span className="hero-subtitle">打包你的夢想，出發去探索世界</span>
            </h1>
            <p className="hero-description">
              從包團旅遊到客製行程，從機票飯店到簽證代辦，
              我們提供全方位的旅遊服務，讓您的每一次旅行都成為美好回憶。
            </p>
            <div className="hero-buttons">
              <Link to="/contact" className="btn btn-primary">
                立即諮詢 <ArrowRight size={20} />
              </Link>
              <Link to="/services" className="btn btn-secondary">
                查看服務
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section services-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">我們的服務</h2>
            <p className="section-description">
              提供完整的旅遊服務，滿足您的各種出行需求
            </p>
          </div>
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="service-card card">
                <div className="service-icon">
                  {service.icon}
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <Link 
                  to={`/services#${service.id}`} 
                  className="service-link"
                >
                  了解更多 <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section why-choose-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">為什麼選擇我們</h2>
            <p className="section-description">
              專業、快速、安全 - 您最值得信賴的旅遊夥伴
            </p>
          </div>
          <div className="why-choose-grid">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="why-choose-card">
                <div className="why-choose-icon">
                  {item.icon}
                </div>
                <h3 className="why-choose-title">{item.title}</h3>
                <p className="why-choose-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">準備開始您的旅程了嗎？</h2>
            <p className="cta-description">
              聯絡我們，讓專業的旅遊顧問為您規劃完美的旅行
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                立即聯絡我們
              </Link>
              <Link to="/about" className="btn btn-secondary">
                了解更多關於我們
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;