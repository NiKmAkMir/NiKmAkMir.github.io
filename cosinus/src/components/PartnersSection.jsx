import './PartnersSection.css';

const PartnersSection = () => {
  const partners = [
    '/images/partner-rosatom.png',
    '/images/partner-logo-2.png',
    '/images/partner-gazprom.png',
    '/images/partner-vtb.png',
    '/images/partner-logo-2.png',
    '/images/partner-rosatom.png',
    '/images/partner-vtb.png',
    '/images/partner-logo-2.png',
    '/images/partner-vtb.png'
  ];

  return (
    <section className="partners section">
      <div className="container">
        <h2 className="heading-secondary partners-title">С нами работают</h2>
        <p className="partners-description">
          Десятки компаний доверяют нам самое ценное, что у них есть в интернете – свои сайты. Мы делаем всё, чтобы наше сотрудничество было долгим.
        </p>
        
        <div className="partners-grid">
          {partners.map((logo, index) => (
            <div key={index} className="partner-logo">
              <img src={logo} alt={`Partner ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;