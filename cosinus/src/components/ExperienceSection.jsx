import './ExperienceSection.css';

const ExperienceSection = () => {
  const services = [
    {
      icon: '/icons/service-add-info.svg',
      title: 'Добавление информации на сайт, создание новых разделов'
    },
    {
      icon: '/icons/service-crm.svg',
      title: 'Разработка и оптимизация модулей сайта',
      badge: 'CRM'
    },
    {
      icon: '/icons/service-code.svg',
      title: 'Интеграция с CRM, 1C, платежными системами, любыми веб-сервисами'
    },
    {
      icon: '/icons/service-custom.svg',
      title: 'Любые доработки функционала и дизайна'
    },
    {
      icon: '/icons/service-audit.svg',
      title: 'Аудит и мониторинг безопасности Drupal сайтов'
    },
    {
      icon: '/icons/service-migration.svg',
      title: 'Миграция, импорт контента и апгрейд Drupal'
    },
    {
      icon: '/icons/service-optimization.svg',
      title: 'Оптимизация и ускорение Drupal-сайтов'
    },
    {
      icon: '/icons/service-seo.svg',
      title: 'Веб-маркетинг, консультации и работы по SEO'
    }
  ];

  return (
    <section className="experience section">
      <div className="container">
        <h2 className="heading-secondary experience-title">
          13 лет совершенствуем<br />компетенции в Drupal<br />поддержке!
        </h2>
        <p className="text-body experience-description">
          Разрабатываем и оптимизируем модули, расширяем функциональность сайтов, обновляем дизайн
        </p>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-item">
              <div className="service-icon-wrapper">
                <img src={service.icon} alt="" className="service-icon" />
                {service.badge && <span className="service-badge">{service.badge}</span>}
              </div>
              <p className="service-title">{service.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;