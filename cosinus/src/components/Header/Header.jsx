import { useState } from 'react';
import './Header.css';
const base = import.meta.env.BASE_URL

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="header">
      <div className="container header__inner">

        <div className="header__logo">
          <img src={`${base}drupal-coder.svg`} alt="Drupal-coder" />
        </div>

        <button 
          className={`header__burger ${isNavOpen ? 'active' : ''}`} 
          onClick={toggleNav}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`header__nav ${isNavOpen ? 'open' : ''}`}>
          <a className="active" href="#support" onClick={() => setIsNavOpen(false)}>Поддержка сайтов</a>
          <a href="#pricing" onClick={() => setIsNavOpen(false)}>Тарифы</a>
          <a href="#cases" onClick={() => setIsNavOpen(false)}>Наши работы</a>
          <a href="#reviews" onClick={() => setIsNavOpen(false)}>Отзывы</a>
          <a href="#contacts" onClick={() => setIsNavOpen(false)}>Контакты</a>
        </nav>

        <div className="header__right">
          <span className="header__phone">8 800 222-26-73</span>

          <span className="header__lang">
            RU
            <img src={`${base}icons/arrow-lang.svg`} alt="" />
          </span>
        </div>

      </div>
    </header>
  );
}