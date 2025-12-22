import './TestimonialsSection.css';

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="testimonials section">
      <div className="container">
        <h2 className="heading-secondary testimonials-title">Отзывы</h2>
        
        <div className="testimonial-card">
          <img src="/images/winamp-logo.png" alt="Winamp" className="testimonial-logo" />
          <h3 className="testimonial-quote">
            Команда Drupal Coder вызвала только положительные впечатления!
          </h3>
          <p className="testimonial-author">
            Нуреев Александр, менеджер проекта Winamp Russian Community
          </p>
          
          <div className="testimonial-nav">
            <button className="nav-arrow">
              <img src="/icons/arrow-left.svg" alt="Previous" />
            </button>
            <span className="nav-counter">01 / 14</span>
            <button className="nav-arrow">
              <img src="/icons/arrow-right.svg" alt="Next" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;