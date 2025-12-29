import React from 'react';
import './ContactSection.css';

const FeedbackModal = ({ 
  isOpen, 
  onClose, 
  formData, 
  onChange, 
  onSubmit, 
  isSubmitting, 
  status 
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay open" onClick={onClose}>
      <div className="modal-content contact-modal-bg" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <h2 className="modal-title">Завершение оформления</h2>
        <p style={{textAlign: 'center', color: '#ccc', marginBottom: '20px'}}>
          Проверьте введенные данные и подтвердите согласие.
        </p>
        
        <form className="contact-form" onSubmit={onSubmit}>
          <input 
            type="text" 
            name="name"
            placeholder="Ваше имя" 
            className="form-input"
            value={formData.name}
            onChange={onChange}
            required
          />
          <input 
            type="tel" 
            name="phone"
            placeholder="Телефон" 
            className="form-input"
            value={formData.phone}
            onChange={onChange}
            required
          />
          {/* Дополнительные поля, которых может не быть в футере, но есть тут */}
          <input 
            type="email" 
            name="email"
            placeholder="E-mail" 
            className="form-input"
            value={formData.email}
            onChange={onChange}
            required
          />
          <textarea 
            name="message"
            placeholder="Ваш комментарий" 
            className="form-textarea"
            rows="5"
            value={formData.message}
            onChange={onChange}
          ></textarea>
          
          <label className="form-checkbox">
            <input 
              type="checkbox" 
              name="consent"
              checked={formData.consent}
              onChange={onChange}
              required 
            />
            <img src="/icons/checkbox-checked.svg" alt="" className="checkbox-icon" />
            <span>Я даю согласие на обработку персональных данных</span>
          </label>
          
          <button type="submit" className="btn btn-primary form-submit" disabled={isSubmitting}>
            {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
          </button>

          {status.message && (
             <p className={`status-message ${status.type}`}>{status.message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;