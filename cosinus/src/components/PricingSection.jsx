import './PricingSection.css';
const base = import.meta.env.BASE_URL

const PricingSection = () => {
  const plans = [
    {
      name: 'Стартовый',
      price: '2000',
      period: 'в час',
      features: [
        'Предоплата от 2 часов',
        'Консультации и работы по SEO',
        'Услуги дизайнера',
        'Стандартное время реакции',
        'Неиспользованные оплаченные часы переносятся на следующий месяц'
      ],
      highlighted: false
    },
    {
      name: 'Бизнес',
      price: '2000',
      period: 'в час',
      features: [
        'Предоплата от 10 часов',
        'Консультации и работы по SEO',
        'Услуги дизайнера',
        'Высокое время реакции – до 2 рабочих дней',
        'Неиспользованные часы не переносятся'
      ],
      highlighted: true
    },
    {
      name: 'VIP',
      price: '1800',
      period: 'в час',
      features: [
        'Предоплата от 100 часов',
        'Консультации и работы по SEO',
        'Услуги дизайнера',
        'Максимальное время реакции – в день обращения',
        'Неиспользованные часы не переносятся'
      ],
      highlighted: false
    }
  ];

  return (
    <section id="pricing" className="pricing section">
      <div className="pricing-background"></div>
      <div className="container">
        <h2 className="heading-secondary pricing-title">Тарифы</h2>
        
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div key={index} className={`pricing-card card ${plan.highlighted ? 'highlighted' : ''}`}>
              <h3 className="pricing-name">{plan.name}</h3>
              <div className="pricing-price">
                <span className="price-value">{plan.price}</span>
                <span className="price-currency">₽</span>
              </div>
              <div className="pricing-period">{plan.period}</div>
              
              <div className="pricing-divider"></div>
              
              <ul className="pricing-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="pricing-feature">
                    <img src={`${base}icons/checkmark.svg`} alt="" className="feature-check" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`btn ${plan.highlighted ? 'btn-primary' : 'btn-outline'} pricing-btn`}>
                Оставить заявку!
              </button>
            </div>
          ))}
        </div>
        
        <p className="pricing-note">
          Вам не подходят наши тарифы? Оставьте заявку и мы предложим вам индивидуальные условия!
        </p>
        <a href="#contact" className="pricing-custom-link">
          Получить индивидуальный тариф
        </a>
      </div>
    </section>
  );
};

export default PricingSection;