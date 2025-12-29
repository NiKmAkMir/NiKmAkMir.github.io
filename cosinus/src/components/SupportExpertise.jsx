import React from 'react';
import './SupportExpertise.css';

const SupportExpertise = () => {
  const features = [
    {
      number: '01.',
      title: 'Постановка задачи по Email',
      description: 'Удобная и привычная модель постановки задач, при которой задачи фиксируются и никогда не теряются.',
      icon: '/icons/support-email.svg'
    },
    {
      number: '02.',
      title: 'Система Helpdesk – отчетность, прозрачность',
      description: 'Возможность посмотреть все заявки в работе и отработанные часы в личном кабинете через браузер.',
      icon: '/icons/support-helpdesk.svg'
    },
    {
      number: '03.',
      title: 'Расширенная техническая поддержка',
      description: 'Возможность организации расширенной техподдержки с 6:00 до 22:00 без выходных.',
      icon: '/icons/support-technical.svg'
    },
    {
      number: '04.',
      title: 'Персональный менеджер проекта',
      description: 'Ваш менеджер проекта всегда в курсе текущего состояния проекта и в любой момент готов ответить на любые вопросы.',
      icon: '/icons/support-manager.svg'
    },
    {
      number: '05.',
      title: 'Удобные способы оплаты',
      description: 'Безналичный расчет по договору или электронные деньги: WebMoney, Яндекс.Деньги, Paypal.',
      icon: '/icons/support-payment.svg'
    },
    {
      number: '06.',
      title: 'Работаем с SLA и NDA',
      description: 'Работа в рамках соглашений о конфиденциальности и об уровне качества работ.',
      icon: '/icons/support-sla.svg'
    },
    {
      number: '07.',
      title: 'Штатные специалисты',
      description: 'Надежные штатные специалисты, никаких фрилансеров.',
      icon: '/icons/support-team.svg'
    },
    {
      number: '08.',
      title: 'Удобные каналы связи',
      description: 'Консультации по телефону, скайпу, в мессенджерах.',
      icon: '/icons/support-communication.svg'
    }
  ];

  return (
    <div className="se-wrapper">
      <section className="se-top">
        <div className="container">
          <h2 className="se-title">
            Поддержка<br />от Drupal-coder
          </h2>
          
          <div className="se-grid">
            {features.map((feature, index) => (
              <div key={index} className="se-card">
                <div className="se-card-content">
                  <div className="se-number">{feature.number}</div>
                  <h3 className="se-card-title">{feature.title}</h3>
                  <p className="se-card-description">{feature.description}</p>
                </div>
                <img src={feature.icon} alt="" className="se-card-icon" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="se-bottom">
        <div className="se-notebook-wrapper">
           <img src="/icons/Group.svg" alt="Dashboard Interface" className="se-notebook-img" />
           <div className="se-notebook-shadow"></div>
        </div>

        <div className="container">
          <div className="se-bottom-content">
            <div className="se-bottom-spacer"></div>
            
            <div className="se-bottom-text">
              <h2 className="se-bottom-title">
                Экспертиза в Drupal,<br />опыт 14 лет!
              </h2>
              
              <div className="se-points">
                <div className="se-point">
                  <div className="se-divider"></div>
                  <p>Только системный подход – контроль версий, резервирование и тестирование!</p>
                </div>
                <div className="se-point">
                  <div className="se-divider"></div>
                  <p>Только Drupal сайты, не берем на поддержку сайты на других CMS!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportExpertise;