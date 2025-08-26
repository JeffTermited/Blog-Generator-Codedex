import React from 'react';
import { Users, MapPin, Ship, Plane, Building2, FileText, Check } from 'lucide-react';
import './Services.css';

const Services = () => {
  const services = [
    {
      id: 'group-tour',
      icon: <Users size={48} />,
      title: '包團旅遊',
      description: '專業規劃團體旅遊行程，提供完整的包團服務，讓您的團體旅行輕鬆無憂。',
      features: [
        '客製化行程規劃',
        '專業領隊導遊服務',
        '團體優惠價格',
        '完整旅遊保險',
        '24小時緊急支援',
        '彈性出發日期'
      ],
      benefits: [
        '節省規劃時間',
        '享受團體優惠',
        '專業服務保障',
        '安全無憂旅行'
      ]
    },
    {
      id: 'custom-tour',
      icon: <MapPin size={48} />,
      title: '客製旅遊',
      description: '量身打造專屬您的旅遊行程，從住宿、交通到景點安排，完全依您的需求規劃。',
      features: [
        '個人化行程設計',
        '彈性時間安排',
        'VIP專屬服務',
        '私人導遊安排',
        '高端住宿選擇',
        '專車接送服務'
      ],
      benefits: [
        '完全客製化',
        '隨時調整行程',
        'VIP級服務',
        '獨特體驗'
      ]
    },
    {
      id: 'cruise',
      icon: <Ship size={48} />,
      title: '郵輪',
      description: '豪華郵輪假期，享受海上度假的奢華體驗，多條航線供您選擇。',
      features: [
        '豪華郵輪艙房',
        '多國航線選擇',
        '船上娛樂設施',
        '全包式餐飲',
        '岸上觀光行程',
        '免費WiFi服務'
      ],
      benefits: [
        '一票玩多國',
        '豪華享受',
        '娛樂豐富',
        '物超所值'
      ]
    },
    {
      id: 'flight',
      icon: <Plane size={48} />,
      title: '機票',
      description: '提供全球機票預訂服務，優惠價格、彈性票期，滿足您的出行需求。',
      features: [
        '全球航線覆蓋',
        '優惠票價保證',
        '彈性改期退票',
        '即時出票確認',
        '座位預選服務',
        '行李額度升級'
      ],
      benefits: [
        '價格優惠',
        '彈性便利',
        '快速確認',
        '全球通達'
      ]
    },
    {
      id: 'hotel',
      icon: <Building2 size={48} />,
      title: '飯店',
      description: '全球精選飯店預訂，從經濟型到奢華型住宿，為您找到最適合的選擇。',
      features: [
        '全球精選飯店',
        '優惠房價保證',
        '即時預訂確認',
        '免費取消政策',
        '會員積分累積',
        '24小時客服'
      ],
      benefits: [
        '品質保證',
        '價格透明',
        '預訂便利',
        '服務完善'
      ]
    },
    {
      id: 'china-visa',
      icon: <FileText size={48} />,
      title: '中國簽證',
      description: '專業中國簽證代辦服務，快速、便利、安全，讓您的中國之行順利成行。',
      features: [
        '快速辦理流程',
        '專業諮詢服務',
        '高成功率保證',
        '安全保密處理',
        '多種簽證類型',
        '完整文件指導'
      ],
      benefits: [
        '專業辦理',
        '快速出簽',
        '安全保密',
        '成功率高'
      ]
    }
  ];

  return (
    <div className="services-page page-transition">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <h1 className="page-title">服務項目</h1>
            <p className="page-description">
              提供完整的旅遊服務，滿足您的各種出行需求
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="section services-detail-section">
        <div className="container">
          <div className="services-detail-grid">
            {services.map((service, index) => (
              <div key={service.id} className="service-detail-card" id={service.id}>
                <div className="service-detail-header">
                  <div className="service-detail-icon">
                    {service.icon}
                  </div>
                  <div className="service-detail-info">
                    <h2 className="service-detail-title">{service.title}</h2>
                    <p className="service-detail-description">{service.description}</p>
                  </div>
                </div>
                
                <div className="service-detail-content">
                  <div className="service-detail-features">
                    <h3>服務特色</h3>
                    <ul>
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex}>
                          <Check size={16} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="service-detail-benefits">
                    <h3>選擇我們的理由</h3>
                    <div className="benefits-grid">
                      {service.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="benefit-item">
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section contact-cta-section">
        <div className="container">
          <div className="contact-cta-content">
            <h2 className="contact-cta-title">想了解更多服務詳情？</h2>
            <p className="contact-cta-description">
              聯絡我們的專業顧問，為您提供最適合的旅遊方案
            </p>
            <a href="/contact" className="btn btn-primary">
              立即諮詢
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;