import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="container header__inner">

        <div className="header__logo">
          <img src="/drupal-coder.svg" alt="Drupal-coder" />
        </div>

        <nav className="header__nav">
          <a className="active" href="#support">Поддержка сайтов</a>
          <a href="#pricing">Тарифы</a>
          <a href="#cases">Наши работы</a>
          <a href="#reviews">Отзывы</a>
          <a href="#contacts">Контакты</a>
        </nav>

        <div className="header__right">
          <span className="header__phone">8 800 222-26-73</span>

          <span className="header__lang">
            RU
            <img src="/icons/arrow-lang.svg" alt="" />
          </span>
        </div>

      </div>
    </header>
  );
}
