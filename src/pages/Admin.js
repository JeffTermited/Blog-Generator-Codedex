import React, { useState } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users,
  Package,
  Target
} from 'lucide-react';
import './Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('trips');
  const [showTripModal, setShowTripModal] = useState(false);
  const [showPromotionModal, setShowPromotionModal] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [editingPromotion, setEditingPromotion] = useState(null);

  // 示例旅行行程數據
  const [trips, setTrips] = useState([
    {
      id: 1,
      title: '日本櫻花之旅',
      destination: '日本東京、京都',
      duration: '5天4夜',
      price: 35000,
      type: '包團旅遊',
      description: '欣賞日本春季櫻花的絕美景色，走訪東京、京都等知名景點。',
      status: '可預訂'
    },
    {
      id: 2,
      title: '歐洲浪漫之旅',
      destination: '法國、義大利',
      duration: '10天9夜',
      price: 75000,
      type: '客製旅遊',
      description: '深度體驗歐洲浪漫風情，巴黎、羅馬、威尼斯等城市。',
      status: '可預訂'
    }
  ]);

  // 示例優惠活動數據
  const [promotions, setPromotions] = useState([
    {
      id: 1,
      title: '早鳥優惠',
      description: '提前60天預訂享9折優惠',
      discount: '10%',
      validUntil: '2024-12-31',
      type: '折扣',
      status: '進行中'
    },
    {
      id: 2,
      title: '團體優惠',
      description: '10人以上團體可享特別優惠價',
      discount: '15%',
      validUntil: '2024-06-30',
      type: '團體',
      status: '進行中'
    }
  ]);

  const [tripForm, setTripForm] = useState({
    title: '',
    destination: '',
    duration: '',
    price: '',
    type: '',
    description: '',
    status: '可預訂'
  });

  const [promotionForm, setPromotionForm] = useState({
    title: '',
    description: '',
    discount: '',
    validUntil: '',
    type: '',
    status: '進行中'
  });

  // 處理新增/編輯旅行行程
  const handleTripSubmit = (e) => {
    e.preventDefault();
    if (editingTrip) {
      setTrips(trips.map(trip => 
        trip.id === editingTrip.id 
          ? { ...tripForm, id: editingTrip.id }
          : trip
      ));
    } else {
      setTrips([...trips, { ...tripForm, id: Date.now() }]);
    }
    resetTripForm();
  };

  // 處理新增/編輯優惠活動
  const handlePromotionSubmit = (e) => {
    e.preventDefault();
    if (editingPromotion) {
      setPromotions(promotions.map(promotion => 
        promotion.id === editingPromotion.id 
          ? { ...promotionForm, id: editingPromotion.id }
          : promotion
      ));
    } else {
      setPromotions([...promotions, { ...promotionForm, id: Date.now() }]);
    }
    resetPromotionForm();
  };

  // 重置表單
  const resetTripForm = () => {
    setTripForm({
      title: '',
      destination: '',
      duration: '',
      price: '',
      type: '',
      description: '',
      status: '可預訂'
    });
    setEditingTrip(null);
    setShowTripModal(false);
  };

  const resetPromotionForm = () => {
    setPromotionForm({
      title: '',
      description: '',
      discount: '',
      validUntil: '',
      type: '',
      status: '進行中'
    });
    setEditingPromotion(null);
    setShowPromotionModal(false);
  };

  // 編輯項目
  const handleEditTrip = (trip) => {
    setTripForm(trip);
    setEditingTrip(trip);
    setShowTripModal(true);
  };

  const handleEditPromotion = (promotion) => {
    setPromotionForm(promotion);
    setEditingPromotion(promotion);
    setShowPromotionModal(true);
  };

  // 刪除項目
  const handleDeleteTrip = (id) => {
    if (window.confirm('確定要刪除此行程嗎？')) {
      setTrips(trips.filter(trip => trip.id !== id));
    }
  };

  const handleDeletePromotion = (id) => {
    if (window.confirm('確定要刪除此優惠活動嗎？')) {
      setPromotions(promotions.filter(promotion => promotion.id !== id));
    }
  };

  return (
    <div className="admin-page page-transition">
      <div className="admin-container">
        {/* 側邊導航 */}
        <div className="admin-sidebar">
          <div className="admin-logo">
            <h2>Pack&Go 管理後台</h2>
          </div>
          <nav className="admin-nav">
            <button
              className={`admin-nav-item ${activeTab === 'trips' ? 'active' : ''}`}
              onClick={() => setActiveTab('trips')}
            >
              <MapPin size={20} />
              旅行行程管理
            </button>
            <button
              className={`admin-nav-item ${activeTab === 'promotions' ? 'active' : ''}`}
              onClick={() => setActiveTab('promotions')}
            >
              <Target size={20} />
              優惠活動管理
            </button>
          </nav>
        </div>

        {/* 主要內容 */}
        <div className="admin-main">
          {/* 旅行行程管理 */}
          {activeTab === 'trips' && (
            <div className="admin-content">
              <div className="admin-header">
                <h1>旅行行程管理</h1>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowTripModal(true)}
                >
                  <Plus size={20} />
                  新增行程
                </button>
              </div>

              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>行程名稱</th>
                      <th>目的地</th>
                      <th>天數</th>
                      <th>價格</th>
                      <th>類型</th>
                      <th>狀態</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trips.map(trip => (
                      <tr key={trip.id}>
                        <td>{trip.title}</td>
                        <td>{trip.destination}</td>
                        <td>{trip.duration}</td>
                        <td>NT$ {trip.price?.toLocaleString()}</td>
                        <td>{trip.type}</td>
                        <td>
                          <span className={`status-badge ${trip.status === '可預訂' ? 'available' : 'unavailable'}`}>
                            {trip.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="btn-icon edit"
                              onClick={() => handleEditTrip(trip)}
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              className="btn-icon delete"
                              onClick={() => handleDeleteTrip(trip.id)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 優惠活動管理 */}
          {activeTab === 'promotions' && (
            <div className="admin-content">
              <div className="admin-header">
                <h1>優惠活動管理</h1>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowPromotionModal(true)}
                >
                  <Plus size={20} />
                  新增優惠
                </button>
              </div>

              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>活動名稱</th>
                      <th>描述</th>
                      <th>折扣</th>
                      <th>有效期限</th>
                      <th>類型</th>
                      <th>狀態</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {promotions.map(promotion => (
                      <tr key={promotion.id}>
                        <td>{promotion.title}</td>
                        <td>{promotion.description}</td>
                        <td>{promotion.discount}</td>
                        <td>{promotion.validUntil}</td>
                        <td>{promotion.type}</td>
                        <td>
                          <span className={`status-badge ${promotion.status === '進行中' ? 'active' : 'inactive'}`}>
                            {promotion.status}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="btn-icon edit"
                              onClick={() => handleEditPromotion(promotion)}
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              className="btn-icon delete"
                              onClick={() => handleDeletePromotion(promotion.id)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 新增/編輯行程 Modal */}
      {showTripModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingTrip ? '編輯行程' : '新增行程'}</h2>
              <button className="btn-icon" onClick={resetTripForm}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleTripSubmit} className="modal-form">
              <div className="form-group">
                <label>行程名稱</label>
                <input
                  type="text"
                  value={tripForm.title}
                  onChange={(e) => setTripForm({...tripForm, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>目的地</label>
                <input
                  type="text"
                  value={tripForm.destination}
                  onChange={(e) => setTripForm({...tripForm, destination: e.target.value})}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>天數</label>
                  <input
                    type="text"
                    value={tripForm.duration}
                    onChange={(e) => setTripForm({...tripForm, duration: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>價格 (NT$)</label>
                  <input
                    type="number"
                    value={tripForm.price}
                    onChange={(e) => setTripForm({...tripForm, price: parseInt(e.target.value)})}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>類型</label>
                  <select
                    value={tripForm.type}
                    onChange={(e) => setTripForm({...tripForm, type: e.target.value})}
                    required
                  >
                    <option value="">選擇類型</option>
                    <option value="包團旅遊">包團旅遊</option>
                    <option value="客製旅遊">客製旅遊</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>狀態</label>
                  <select
                    value={tripForm.status}
                    onChange={(e) => setTripForm({...tripForm, status: e.target.value})}
                  >
                    <option value="可預訂">可預訂</option>
                    <option value="暫停">暫停</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>描述</label>
                <textarea
                  value={tripForm.description}
                  onChange={(e) => setTripForm({...tripForm, description: e.target.value})}
                  rows="4"
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={resetTripForm}>
                  取消
                </button>
                <button type="submit" className="btn btn-primary">
                  <Save size={16} />
                  {editingTrip ? '更新' : '新增'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 新增/編輯優惠 Modal */}
      {showPromotionModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{editingPromotion ? '編輯優惠' : '新增優惠'}</h2>
              <button className="btn-icon" onClick={resetPromotionForm}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handlePromotionSubmit} className="modal-form">
              <div className="form-group">
                <label>活動名稱</label>
                <input
                  type="text"
                  value={promotionForm.title}
                  onChange={(e) => setPromotionForm({...promotionForm, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>描述</label>
                <input
                  type="text"
                  value={promotionForm.description}
                  onChange={(e) => setPromotionForm({...promotionForm, description: e.target.value})}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>折扣</label>
                  <input
                    type="text"
                    value={promotionForm.discount}
                    onChange={(e) => setPromotionForm({...promotionForm, discount: e.target.value})}
                    placeholder="例：10% 或 NT$1000"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>有效期限</label>
                  <input
                    type="date"
                    value={promotionForm.validUntil}
                    onChange={(e) => setPromotionForm({...promotionForm, validUntil: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>類型</label>
                  <select
                    value={promotionForm.type}
                    onChange={(e) => setPromotionForm({...promotionForm, type: e.target.value})}
                    required
                  >
                    <option value="">選擇類型</option>
                    <option value="折扣">折扣</option>
                    <option value="團體">團體</option>
                    <option value="早鳥">早鳥</option>
                    <option value="季節">季節</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>狀態</label>
                  <select
                    value={promotionForm.status}
                    onChange={(e) => setPromotionForm({...promotionForm, status: e.target.value})}
                  >
                    <option value="進行中">進行中</option>
                    <option value="暫停">暫停</option>
                    <option value="已結束">已結束</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={resetPromotionForm}>
                  取消
                </button>
                <button type="submit" className="btn btn-primary">
                  <Save size={16} />
                  {editingPromotion ? '更新' : '新增'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;