import { useState } from 'react';
import './TestimonialsSection.css';

const testimonials = [
  {
    logo: '/images/winamp-logo.png',
    text: 'Команда Drupal Coder вызвала только положительные впечатления!',
    author: 'Нуреев Александр, менеджер проекта Winamp Russian Community',
  },
  {
    logo: '/images/winamp-logo.png',
    text: 'Отличная коммуникация и высокий уровень экспертизы.',
    author: 'Иван Петров, CTO',
  },
  {
    logo: '/images/winamp-logo.png',
    text: 'Работа выполнена в срок, результатом довольны.',
    author: 'Анна Смирнова, Project Manager',
  },
];

const TestimonialsSection = () => {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;

  const prev = () => {
    setIndex((prev) => (prev - 1 + total) % total);
  };

  const next = () => {
    setIndex((prev) => (prev + 1) % total);
  };

  const current = testimonials[index];

  return (
    <section className="testimonials section">
      <div className="container testimonials-wrapper">

        {/* Декор слева (кавычка + прямоугольник) */}
        {/* <img
          src="icons/right-quote-sign.svg"
          alt=""
          className="testimonial-decor quote"
        />
        <img
          src="/icons/Rectangle 3.1.png"
          alt=""
          className="testimonial-decor rect-left"
        /> */}

        {/* Декор справа */}
        {/* <img
          src="/icons/Rectangle 3.2.png"
          alt=""
          className="testimonial-decor rect-right"
        /> */}

        <h2 className="heading-secondary testimonials-title">Отзывы</h2>

        <div className="testimonial-card">
          <div className="testimonial-content">
            <div className="testimonial-left">
              <img
                src={current.logo}
                alt="logo"
                className="testimonial-logo"
              />

              <h3 className="testimonial-quote">
                {current.text}
              </h3>

              <p className="testimonial-author">
                {current.author}
              </p>
            </div>

            <div className="testimonial-right">
              <button className="nav-arrow" onClick={prev}>
                ‹
              </button>

              <span className="nav-counter">
                {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>

              <button className="nav-arrow" onClick={next}>
                ›
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
