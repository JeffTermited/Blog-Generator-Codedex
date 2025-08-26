import React from 'react';
import './Logo.css';

const Logo = ({ size = 'medium', color = 'black' }) => {
  const sizeClasses = {
    small: 'logo-small',
    medium: 'logo-medium',
    large: 'logo-large'
  };

  return (
    <div className={`logo ${sizeClasses[size]} logo-${color}`}>
      <div className="logo-container">
        <div className="logo-icon">
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* 包裹图标 - 简洁的包装盒 */}
            <rect 
              x="8" 
              y="12" 
              width="24" 
              height="20" 
              rx="2" 
              stroke="currentColor" 
              strokeWidth="2" 
              fill="none"
            />
            {/* 包装带 */}
            <path 
              d="M8 20 L32 20" 
              stroke="currentColor" 
              strokeWidth="2"
            />
            <path 
              d="M20 12 L20 32" 
              stroke="currentColor" 
              strokeWidth="2"
            />
            {/* 旅行元素 - 简化的地球图标 */}
            <circle 
              cx="20" 
              cy="8" 
              r="4" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              fill="none"
            />
            <path 
              d="M17 8 Q20 5 23 8 Q20 11 17 8" 
              stroke="currentColor" 
              strokeWidth="1" 
              fill="none"
            />
          </svg>
        </div>
        <div className="logo-text">
          <span className="logo-pack">Pack</span>
          <span className="logo-and">&</span>
          <span className="logo-go">Go</span>
        </div>
      </div>
    </div>
  );
};

export default Logo;