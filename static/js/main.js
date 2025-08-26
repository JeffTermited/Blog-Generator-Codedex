// Pack&Go 旅行社 - 主要JavaScript功能

document.addEventListener('DOMContentLoaded', function() {
    // 導航欄活躍狀態設定
    setActiveNavItem();
    
    // 自動隱藏提示訊息
    autoHideAlerts();
    
    // 平滑滾動
    initSmoothScroll();
    
    // 手機版導航選單
    initMobileMenu();
    
    // 表單驗證
    initFormValidation();
});

// 設定導航欄活躍狀態
function setActiveNavItem() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}

// 自動隱藏提示訊息
function autoHideAlerts() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.opacity = '0';
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 5000);
    });
}

// 平滑滾動
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 手機版導航選單
function initMobileMenu() {
    // 如果需要手機版選單功能，可以在這裡添加
    const navbar = document.querySelector('.navbar');
    if (window.innerWidth <= 768) {
        // 手機版特殊處理
        console.log('手機版檢測');
    }
}

// 表單驗證
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
    });
}

// 驗證表單
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, '此欄位為必填');
            isValid = false;
        } else {
            clearFieldError(field);
        }
        
        // Email 驗證
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                showFieldError(field, '請輸入有效的Email地址');
                isValid = false;
            }
        }
        
        // 電話驗證
        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[\d\-\(\)\+\s]+$/;
            if (!phoneRegex.test(field.value)) {
                showFieldError(field, '請輸入有效的電話號碼');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// 顯示欄位錯誤
function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#dc3545';
}

// 清除欄位錯誤
function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '';
}

// 滾動到頂部
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 格式化價格
function formatPrice(price) {
    return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD',
        minimumFractionDigits: 0
    }).format(price);
}

// 複製文字到剪貼簿
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        showNotification('已複製到剪貼簿', 'success');
    }).catch(function() {
        console.error('複製失敗');
    });
}

// 顯示通知
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.style.minWidth = '300px';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// 載入狀態
function showLoading(element) {
    element.style.opacity = '0.5';
    element.style.pointerEvents = 'none';
}

function hideLoading(element) {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
}

// 圖片懶載入
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// 工具函數
const utils = {
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    isMobile: function() {
        return window.innerWidth <= 768;
    },
    
    isTablet: function() {
        return window.innerWidth > 768 && window.innerWidth <= 1024;
    },
    
    isDesktop: function() {
        return window.innerWidth > 1024;
    }
};

// 響應式處理
window.addEventListener('resize', utils.debounce(function() {
    // 處理視窗大小變化
    setActiveNavItem();
}, 250));

// Console 訊息
console.log('%c Pack&Go 旅行社 ', 'background: #000; color: #fff; font-size: 16px; padding: 4px 8px;');
console.log('網站已載入完成，歡迎使用 Pack&Go 旅行社網站！');