import './SupportSection.css';

const SupportSection = () => {
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
      description: 'Работа в рамках соглашений о конфиденциальности и об уровне качетсва работ.',
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
      description: 'Консультации по телефону, скайпу, в месенджерах.',
      icon: '/icons/support-communication.svg'
    }
  ];

  return (
    <section className="support section">
      <div className="container">
        <h2 className="heading-secondary support-title">
          Поддержка<br />от Drupal-coder
        </h2>
        
        <div className="support-grid">
          {features.map((feature, index) => (
            <div key={index} className="support-card card">
              <div className="support-number">{feature.number}</div>
              <h3 className="support-card-title">{feature.title}</h3>
              <p className="support-card-description">{feature.description}</p>
              <img src={feature.icon} alt="" className="support-card-icon" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportSection;