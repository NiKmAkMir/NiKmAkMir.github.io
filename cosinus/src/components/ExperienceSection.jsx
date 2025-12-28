import React from 'react';
import './ExperienceSection.css';

const ExperienceSection = () => {
  const services = [
    {
      id: 1,
      icon: '/icons/1.svg',
      title: 'Добавление информации на сайт, создание новых разделов'
    },
    {
      id: 2,
      icon: '/icons/2.svg',
      title: 'Разработка и оптимизация модулей сайта'
    },
    {
      id: 3,
      icon: '/icons/3.svg',
      title: 'Интеграция с CRM, 1C, платежными системами, любыми веб-сервисами'
    },
    {
      id: 4,
      icon: '/icons/4.svg',
      title: 'Любые доработки функционала и дизайна'
    },
    {
      id: 5,
      icon: '/icons/5.svg',
      title: 'Аудит и мониторинг безопасности Drupal сайтов'
    },
    {
      id: 6,
      icon: '/icons/6.svg',
      title: 'Миграция, импорт контента и апгрейд Drupal'
    },
    {
      id: 7,
      icon: '/icons/7.svg',
      title: 'Оптимизация и ускорение Drupal-сайтов'
    },
    {
      id: 8,
      icon: '/icons/8.svg',
      title: 'Веб-маркетинг, консультации и работы по SEO'
    }
  ];

  return (
    <section className="experience">
      <div className="container">
        <div className="experience-header">
          <h2 className="experience-title">
            13 лет совершенствуем<br />компетенции в Drupal<br />поддержке!
          </h2>
          <p className="experience-description">
            Разрабатываем и оптимизируем модули, расширяем функциональность сайтов, обновляем дизайн
          </p>
        </div>
        
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-item">
              <div className="service-icon-wrapper">
                <img src={service.icon} alt={service.title} className="service-icon" />
              </div>
              <p className="experience-description">{service.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;