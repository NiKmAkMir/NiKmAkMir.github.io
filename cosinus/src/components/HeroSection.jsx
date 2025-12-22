import './HeroSection.css';

const HeroSection = () => {
  const stats = [
    {
      icon: '/images/trophy-icon.png',
      value: '#1',
      label: 'Drupal-разработчик\nв России по версии\nРейтинга Рунета'
    },
    {
      value: '3+',
      label: 'средний опыт\nспециалистов более\n3 лет'
    },
    {
      value: '14',
      label: 'лет опыта в сфере\nDrupal'
    },
    {
      value: '200+',
      label: 'модулей и тем\nв формате DrupalGive'
    },
    {
      value: '35 000',
      label: 'часов поддержки\nсайтов на Drupal'
    },
    {
      value: '200+',
      label: 'Проектов\nна поддержке'
    }
  ];

  return (
    <section className="hero">
      <div className="hero-background"></div>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Поддержка<br />сайтов на Drupal
          </h1>
          <p className="hero-subtitle">
            Сопровождение и поддержка сайтов<br />
            на CMS Drupal любых версий и запущенности
          </p>
          <button className="btn btn-primary hero-cta">Тарифы</button>
        </div>
        
        <div className="hero-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              {stat.icon && (
                <img src={stat.icon} alt="" className="stat-icon" />
              )}
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              {index < stats.length - 1 && (
                <div className="stat-divider"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;