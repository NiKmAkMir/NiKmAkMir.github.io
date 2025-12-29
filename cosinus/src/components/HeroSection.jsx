import './HeroSection.css';
const base = import.meta.env.BASE_URL

export default function HeroSection() {
  return (
    <section className="hero">

      <video className="hero__video" autoPlay muted loop playsInline>
        <source src={`${base}video.mp4`} type="video/mp4" />
      </video>

      <div className="hero__overlay" />

      <div className="container hero__content">

        <div className="hero__left">
          <h1>
            Поддержка сайтов<br />на Drupal
          </h1>

          <p className="hero__desc">
            Сопровождение и поддержка сайтов<br />
            на CMS Drupal любых версий<br />
            и любой степени запущенности
          </p>

          <a href="#pricing" className="hero__button">Тарифы</a>
        </div>

        <div className="hero__stats">

          <div className="stat stat--main">
            <div className="stat__top-row">
              <b>#1</b>
              <img src={`${base}images/trophy-icon.png`} alt="" />
            </div>
                      
            <span style={{ marginTop: '-15px' }}>
              Drupal-разработчик<br />
              в России по версии<br />
              Рейтинга Рунета
            </span>
          </div>

          <div className="stat">
            <b>3+</b>
            <span>
              средний опыт<br />
              специалистов более 3 лет
            </span>
          </div>

          <div className="stat">
            <b>14</b>
            <span>
              лет опыта<br />
              в сфере Drupal
            </span>
          </div>

          <div className="stat">
            <b>200+</b>
            <span>
              модулей и тем<br />
              в формате DrupalGive
            </span>
          </div>

          <div className="stat">
            <b>35&nbsp;000</b>
            <span>
              часов поддержки<br />
              сайтов на Drupal
            </span>
          </div>

          <div className="stat">
            <b>200+</b>
            <span>
              проектов<br />
              на поддержке
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}