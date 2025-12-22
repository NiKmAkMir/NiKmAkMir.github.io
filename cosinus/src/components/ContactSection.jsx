import './ContactSection.css';

const ContactSection = () => {
  return (
    <section id="contact" className="contact">
      <div className="contact-background"></div>
      <div className="container">
        <div className="contact-content">
          <div className="contact-left">
            <h2 className="heading-secondary contact-title">
              Оставить заявку на<br />поддержку сайта
            </h2>
            <p className="contact-description">
              Срочно нужна поддержка сайта? Ваша команда не успевает справиться самостоятельно или предыдущий подрядчик не справился с работой? Тогда вам точно к нам! Просто оставьте заявку и наш менеджер с вами свяжется!
            </p>
            
            <div className="contact-info">
              <div className="contact-info-item">
                <img src="/icons/phone-icon.svg" alt="" className="contact-icon" />
                <a href="tel:88002222673" className="contact-phone">8 800 222-26-73</a>
              </div>
              <div className="contact-info-item">
                <img src="/icons/email-icon.svg" alt="" className="contact-icon" />
                <a href="mailto:info@drupal-coder.ru" className="contact-email">info@drupal-coder.ru</a>
              </div>
            </div>
          </div>
          
          <div className="contact-right">
            <form className="contact-form">
              <input 
                type="text" 
                placeholder="Ваше имя" 
                className="form-input"
                required
              />
              <input 
                type="tel" 
                placeholder="Телефон" 
                className="form-input"
                required
              />
              <input 
                type="email" 
                placeholder="E-mail" 
                className="form-input"
                required
              />
              <textarea 
                placeholder="Ваш комментарий" 
                className="form-textarea"
                rows="5"
              ></textarea>
              
              <label className="form-checkbox">
                <input type="checkbox" required />
                <img src="/icons/checkbox-checked.svg" alt="" className="checkbox-icon" />
                <span>Отправляя заявку, я даю согласие на обработку своих персональных данных</span>
              </label>
              
              <button type="submit" className="btn btn-primary form-submit">
                Оставить заявку!
              </button>
            </form>
          </div>
        </div>
        
        <div className="contact-footer">
          <p>Проект ООО «Инитлаб», Краснодар, Россия.</p>
          <p>Drupal является зарегистрированной торговой маркой Dries Buytaert.</p>
        </div>
      </div>
      
      <img src="/images/d-logo-footer.svg" alt="" className="contact-logo" />
    </section>
  );
};

export default ContactSection;