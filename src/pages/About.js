import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page page-transition">
      <section className="page-header">
        <div className="container">
          <div className="page-header-content">
            <h1 className="page-title">關於我們</h1>
            <p className="page-description">
              Pack&Go 旅行社 - 您最值得信賴的旅遊夥伴
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="about-content">
            <h2>公司簡介</h2>
            <p>
              Pack&Go 旅行社成立於2003年，致力於提供最優質的旅遊服務。
              20年來，我們已為超過10萬名客戶創造了難忘的旅行回憶。
            </p>
            <p>
              我們的服務包括包團旅遊、客製旅遊、郵輪、機票、飯店預訂以及中國簽證代辦。
              無論您是想要輕鬆的團體旅行，還是追求個人化的旅遊體驗，我們都能為您提供最適合的方案。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;