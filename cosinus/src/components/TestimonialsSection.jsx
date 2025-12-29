import { useState } from 'react';
import './TestimonialsSection.css';

const testimonials = [
  {
    logo: '/images/winamp-logo.png',
    quote: 'Команда Drupal Coder вызвала только положительные впечатления!',
    author: 'Нуреев Александр, менеджер проекта Winamp Russian Community',
  },
  {
    logo: '/images/winamp-logo.png',
    quote: 'Отличная коммуникация и высокий уровень экспертизы.',
    author: 'Иван Петров, руководитель IT-направления',
  },
  {
    logo: '/images/winamp-logo.png',
    quote: 'Работа выполнена в срок и без лишних правок.',
    author: 'Алексей Смирнов, CTO',
  },
  // можешь добавлять сколько угодно
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const { logo, quote, author } = testimonials[current];

  return (
    <section id="testimonials" className="testimonials section">
      <div className="container">
        <h2 className="heading-secondary testimonials-title">Отзывы</h2>

        <div className="testimonial-card">
          <img src={logo} alt="" className="testimonial-logo" />

          <h3 className="testimonial-quote">
            {quote}
          </h3>

          <p className="testimonial-author">
            {author}
          </p>

          <div className="testimonial-nav">
            <button className="nav-arrow" onClick={prev}>
              <img src="/icons/arrow-left.svg" alt="Previous" />
            </button>

            <span className="nav-counter">
              {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>

            <button className="nav-arrow" onClick={next}>
              <img src="/icons/arrow-right.svg" alt="Next" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
