import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <div className="nav-logo">
            <span className="logo-icon">🚀</span>
            <span className="logo-text">Drupal-coder</span>
          </div>
          
          <ul className="nav-menu">
            <li className="nav-item">
              <a href="#support" className="nav-link active">Поддержка сайтов</a>
            </li>
            <li className="nav-item">
              <a href="#pricing" className="nav-link">Тарифы</a>
            </li>
            <li className="nav-item">
              <a href="#cases" className="nav-link">Наши работы</a>
            </li>
            <li className="nav-item">
              <a href="#testimonials" className="nav-link">Отзывы</a>
            </li>
            <li className="nav-item">
              <a href="#contact" className="nav-link">Контакты</a>
            </li>
          </ul>
          
          <div className="nav-right">
            <a href="tel:88002222673" className="nav-phone">8 800 222-26-73</a>
            <div className="nav-lang">
              <span>RU</span>
              <img src="/icons/arrow-lang.svg" alt="" className="lang-arrow" />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;