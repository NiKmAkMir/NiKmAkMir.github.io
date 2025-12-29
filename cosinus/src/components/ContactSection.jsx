import React, { useState, useEffect } from 'react';
import './ContactSection.css';
import FeedbackModal from './FeedbackModal';

const FORM_ENDPOINT = "https://formcarry.com/s/ВАШ_ID"; 

const ContactSection = () => {
  // 1. Единое хранилище данных для футера и попапа
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    consent: false
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. LocalStorage: Загрузка
  useEffect(() => {
    const savedData = localStorage.getItem('sharedFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // 3. LocalStorage: Сохранение (срабатывает при вводе в любом месте)
  useEffect(() => {
    localStorage.setItem('sharedFormData', JSON.stringify(formData));
  }, [formData]);

  // 4. History API
  useEffect(() => {
    const handlePopState = (event) => {
      setIsModalOpen(!!(event.state && event.state.modalOpen));
    };
    window.addEventListener('popstate', handlePopState);
    
    // Проверка URL при загрузке
    const params = new URLSearchParams(window.location.search);
    if (params.get('modal') === 'contact') setIsModalOpen(true);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Общий обработчик изменений (для футера и модалки)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Открытие модалки (переход к шагу 2)
  const openModal = (e) => {
    if(e) e.preventDefault(); // Чтобы форма в футере не пыталась отправить данные сама
    setIsModalOpen(true);
    window.history.pushState({ modalOpen: true }, '', '?modal=contact');
    setStatus({ type: '', message: '' }); // Сброс ошибок при открытии
  };

  // Закрытие модалки
  const closeModal = () => {
    window.history.back();
  };

  // Финальная отправка (вызывается из модалки)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Заявка успешно отправлена!' });
        setFormData({ name: '', phone: '', email: '', message: '', consent: false });
        localStorage.removeItem('sharedFormData');
        setTimeout(() => {
            // Закрываем модалку через history API, если она открыта
            window.history.back();
        }, 3000);
      } else {
        setStatus({ type: 'error', message: 'Ошибка сервиса отправки.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Ошибка сети.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section id="contact" className="contact">
        <div className="contact-background"></div>
        <div className="container">
          <div className="contact-content">
            {/* ЛЕВАЯ КОЛОНКА */}
            <div className="contact-left">
              <h2 className="heading-secondary contact-title">
                Оставить заявку на<br />поддержку сайта
              </h2>
              <img src="/images/d-flying-logo.svg" alt="" className="contact-logo1" />
              <p className="contact-description">
                Срочно нужна поддержка сайта? Просто оставьте заявку!
              </p>
              
              <div className="contact-info">
                <div className="contact-info-item">
                  <img src="icons/phone.svg" alt="" className="contact-icon" />
                  <a href="tel:88002222673" className="contact-phone">8 800 222-26-73</a>
                </div>
                <div className="contact-info-item">
                  <img src="/icons/mail.svg" alt="" className="contact-icon2" />
                  <a href="mailto:info@drupal-coder.ru" className="contact-email">info@drupal-coder.ru</a>
                </div>
              </div>
            </div>
            
            {/* ПРАВАЯ КОЛОНКА - "ТИЗЕР" ФОРМЫ */}
            <div className="contact-right">
              {/* Это НЕ form tag, чтобы Enter не отправлял ничего раньше времени. Или form без action */}
              <div className="contact-form">
                <p style={{color: 'rgba(255,255,255,0.7)', marginBottom: '10px'}}>
                   Начните заполнять здесь:
                </p>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="Ваше имя" 
                  className="form-input"
                  value={formData.name} // Данные связаны
                  onChange={handleChange}
                />
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Телефон" 
                  className="form-input"
                  value={formData.phone} // Данные связаны
                  onChange={handleChange}
                />
                
                {/* Кнопка просто открывает попап */}
                <button 
                  type="button" 
                  className="btn btn-primary form-submit"
                  onClick={openModal}
                >
                  Продолжить оформление
                </button>
              </div>
            </div>
          </div>
          
          <div className="contact-footer">
            <p>Проект ООО «Инитлаб», Краснодар, Россия.<br/>
Drupal является зарегистрированной торговой маркой Dries Buytaert.</p>
          </div>
        </div>
        <img src="/images/d-logo-footer.svg" alt="" className="contact-logo" />
      </section>

      {/* МОДАЛКА - получает все данные и управление */}
      <FeedbackModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        formData={formData} 
        onChange={handleChange}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        status={status}
      />
    </>
  );
};

export default ContactSection;