import './PartnersSection.css';
const base = import.meta.env.BASE_URL

const logos = [
  `${base}images/partner-rosatom.png`,
  `${base}images/partner-logo-2.png`,
  `${base}images/partner-gazprom.png`,
  `${base}images/partner-vtb.png`,
  `${base}images/partner-logo-2.png`,
];

const PartnersSection = () => {
  return (
    <section className="partners">
      <div className="container">
        <h2 className="heading-secondary partners-title">
          С нами работают
        </h2>

        <p className="partners-description">
          Десятки компаний доверяют нам самое ценное, что у них есть в интернете — свои сайты.
          Мы делаем все, чтобы наше сотрудничество было долгим.
        </p>
      </div>

      {/* Верхняя лента */}
      <div className="partners-marquee">
        <div className="partners-track track-left">
          {[...logos, ...logos].map((logo, index) => (
            <div className="partner-card" key={`top-${index}`}>
              <img src={logo} alt="" />
            </div>
          ))}
        </div>
      </div>

      {/* Нижняя лента */}
      <div className="partners-marquee second">
        <div className="partners-track track-right">
          {[...logos, ...logos].map((logo, index) => (
            <div className="partner-card" key={`bottom-${index}`}>
              <img src={logo} alt="" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
