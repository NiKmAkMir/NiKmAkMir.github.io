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
          <div className="stat-item">
            {stats[0].icon && (
              <img src={stats[0].icon} alt="" className="stat-icon" />
            )}
            <div className="stat-value">{stats[0].value}</div>
            <div className="stat-label">{stats[0].label}</div>
            <div className="stat-divider"></div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{stats[1].value}</div>
            <div className="stat-label">{stats[1].label}</div>
            <div className="stat-divider"></div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{stats[2].value}</div>
            <div className="stat-label">{stats[2].label}</div>
          </div>
        </div>
        
        <div className="hero-stats hero-stats-second">
          <div className="stat-item">
            <div className="stat-value">{stats[3].value}</div>
            <div className="stat-label">{stats[3].label}</div>
            <div className="stat-divider"></div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{stats[4].value}</div>
            <div className="stat-label">{stats[4].label}</div>
            <div className="stat-divider"></div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{stats[5].value}</div>
            <div className="stat-label">{stats[5].label}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;