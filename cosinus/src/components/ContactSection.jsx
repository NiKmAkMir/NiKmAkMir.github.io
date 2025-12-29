import { useState } from 'react';
import './ContactSection.css';

const ContactSection = () => {
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSending(true);
    setStatus(null);

    const formData = new FormData(e.target);

    try {
      const response = await fetch(
        'https://formcarry.com/s/FyOmszibGz-',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Formcarry error');
      }

      setStatus('success');
      e.target.reset();
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-background"></div>

      <div className="container">
        <div className="contact-content">
          <div className="contact-left">
            <h2 className="heading-secondary contact-title">
              Оставить заявку на<br />поддержку сайта
            </h2>

            <img
              src="/images/d-flying-logo.svg"
              alt=""
              className="contact-logo1"
            />

            <p className="contact-description">
              Срочно нужна поддержка сайта? Просто оставьте заявку — мы свяжемся с вами.
            </p>

            <div className="contact-info">
              <div className="contact-info-item">
                <img src="/icons/phone.svg" alt="" className="contact-icon" />
                <a href="tel:88002222673" className="contact-phone">
                  8 800 222-26-73
                </a>
              </div>

              <div className="contact-info-item">
                <img src="/icons/mail.svg" alt="" className="contact-icon2" />
                <a
                  href="mailto:info@drupal-coder.ru"
                  className="contact-email"
                >
                  info@drupal-coder.ru
                </a>
              </div>
            </div>
          </div>

          <div className="contact-right">
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Ваше имя"
                className="form-input"
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Телефон"
                className="form-input"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="E-mail"
                className="form-input"
                required
              />

              <textarea
                name="message"
                placeholder="Ваш комментарий"
                className="form-textarea"
                rows="5"
              />

              <label className="form-checkbox">
                <input type="checkbox" required />
                <span className="checkbox-icon"></span>
                <span>
                  Отправляя заявку, я даю согласие на обработку персональных данных
                </span>
              </label>

              <button
                type="submit"
                className="btn btn-primary form-submit"
                disabled={isSending}
              >
                {isSending ? 'Отправка...' : 'Оставить заявку!'}
              </button>

              {status === 'success' && (
                <p className="form-success">
                  Заявка успешно отправлена ✅
                </p>
              )}

              {status === 'error' && (
                <p className="form-error">
                  Ошибка отправки. Попробуйте позже.
                </p>
              )}
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
