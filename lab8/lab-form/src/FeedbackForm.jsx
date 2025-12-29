import React, { useState, useEffect } from 'react';
import './FeedbackForm.css';

// Для примера используем сервис formcarry или аналогичный.
// ЗАМЕНИТЕ ЭТОТ URL на свой реальный endpoint (например, с formcarry.com)
const FORM_ENDPOINT = "https://formcarry.com/s/NrOjFi_gd9P"; 

const FeedbackForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Состояние полей формы
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    organization: '',
    message: '',
    consent: false
  });

  // --- Логика 1: LocalStorage (Загрузка) ---
  useEffect(() => {
    const savedData = localStorage.getItem('feedbackFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // --- Логика 1: LocalStorage (Сохранение при изменении) ---
  useEffect(() => {
    // Сохраняем черновик при каждом изменении formData
    localStorage.setItem('feedbackFormData', JSON.stringify(formData));
  }, [formData]);

  // --- Логика 2: History API ---
  useEffect(() => {
    // Функция обработки кнопки "Назад" в браузере
    const handlePopState = (event) => {
      // Если мы вернулись назад и в state больше нет флага modal, закрываем
      // Или просто проверяем URL, если там нет параметра
      if (!event.state || !event.state.modalOpen) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Проверка при загрузке страницы (если пользователь обновил страницу с открытым попапом)
    const params = new URLSearchParams(window.location.search);
    if (params.get('modal') === 'feedback') {
        setIsOpen(true);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const openModal = () => {
    setIsOpen(true);
    setStatus({ type: '', message: '' }); // Сброс статуса
    // Добавляем запись в историю браузера
    window.history.pushState({ modalOpen: true }, '', '?modal=feedback');
  };

  const closeModal = () => {
    // Чтобы закрыть, мы эмулируем нажатие "Назад", 
    // так как мы ранее сделали pushState. 
    // Это автоматически вызовет popstate и закроет модалку.
    window.history.back();
  };

  // Обработчик инпутов
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // --- Логика 3: Отправка формы (Fetch) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Сообщение успешно отправлено!' });
        
        // Очистка формы и хранилища при успехе
        const emptyState = {
          fullname: '',
          email: '',
          phone: '',
          organization: '',
          message: '',
          consent: false
        };
        setFormData(emptyState);
        localStorage.removeItem('feedbackFormData');
        
        // Можно автоматически закрыть форму через пару секунд, если нужно
        // setTimeout(closeModal, 2000); 
      } else {
        setStatus({ type: 'error', message: 'Ошибка при отправке данных.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Сетевая ошибка.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Кнопка вызова (обычно где-то в хедере или футере, здесь для примера) */}
      <button onClick={openModal} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Открыть форму связи
      </button>

      {/* Само модальное окно */}
      <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
        <div className="modal-content">
          <button className="close-btn" onClick={closeModal}>&times;</button>
          
          <h2>Свяжитесь с нами</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>ФИО</label>
              <input 
                type="text" 
                name="fullname" 
                value={formData.fullname} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Телефон</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label>Организация</label>
              <input 
                type="text" 
                name="organization" 
                value={formData.organization} 
                onChange={handleChange} 
              />
            </div>

            <div className="form-group">
              <label>Сообщение</label>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="checkbox-group">
              <input 
                type="checkbox" 
                name="consent" 
                id="consent"
                checked={formData.consent} 
                onChange={handleChange} 
                required 
              />
              <label htmlFor="consent">
                Я согласен с политикой обработки персональных данных
              </label>
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Отправка...' : 'Отправить'}
            </button>

            {status.message && (
              <div className={`status-message ${status.type}`}>
                {status.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default FeedbackForm;