import React from 'react';
import './ExpertiseSection.css';

const ExpertiseSection = () => {
  return (
    <section className="expertise">
      <div className="container">
        <div className="expertise-content">
          <div className="expertise-left">
            <div className="dashboard-mockup">
              {/* Используем изображение ноутбука целиком */}
              <img src="/icons/Group.svg" alt="Dashboard Interface" className="dashboard-image" />
            </div>
          </div>
          
          <div className="expertise-right">
            <h2 className="expertise-title">
              Экспертиза в Drupal,<br />опыт 14 лет!
            </h2>
            
            <div className="expertise-points">
              <div className="expertise-point">
                <div className="point-divider"></div>
                <p>Только системный подход – контроль версий, резервирование и тестирование!</p>
              </div>
              <div className="expertise-point">
                <div className="point-divider"></div>
                <p>Только Drupal сайты, не берем на поддержку сайты на других CMS!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;