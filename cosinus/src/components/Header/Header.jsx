import React, { useState } from 'react';
import './Header.css';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    const handleMouseEnter = (menuName) => {
        setActiveDropdown(menuName);
    };

    const handleMouseLeave = () => {
        setActiveDropdown(null);
    };

    const menuItems = [
        { id: 'support', title: 'ПОДДЕРЖКА DRUPAL', hasDropdown: false },
        { 
            id: 'administration', 
            title: 'АДМИНИСТРИРОВАНИЕ ▼', 
            hasDropdown: true,
            subItems: ['МИГРАЦИЯ', 'БЭКАПЫ', 'АУДИТ БЕЗОПАСНОСТИ', 'ОПТИМИЗАЦИЯ СКОРОСТИ', 'ПЕРЕЕЗД НА HTTPS']
        },
        { id: 'promotion', title: 'ПРОДВИЖЕНИЕ', hasDropdown: false },
        { id: 'advertising', title: 'РЕКЛАМА', hasDropdown: false },
        { 
            id: 'about', 
            title: 'О НАС ▼', 
            hasDropdown: true,
            subItems: ['КОМАНДА', 'DRUPALCIVE', 'БЛОГ', 'КУРСЫ DRUPAL', 'ПРОЕКТЫ', 'КОНТАКТЫ']
        }
    ];

    return (
        <header className="header">
            {/* Видео-фон */}
            <video className="header-video" autoPlay muted loop playsInline>
                <source src="/video.mp4" type="video/mp4" />
                Ваш браузер не поддерживает видео.
            </video>
            
            <div className="header-top">
                <div className="container">
                    <div className="header-top-inner">
                        <div className="logo">
                            <img src="/logo.png" alt="Drupal-coder" />
                        </div>
                        
                        <nav className="main-menu">
                            <ul className="menu-list">
                                {menuItems.map(item => (
                                    <li 
                                        key={item.id}
                                        className={`menu-item ${item.hasDropdown ? 'dropdown' : ''}`}
                                        onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.id)}
                                        onMouseLeave={() => item.hasDropdown && handleMouseLeave()}
                                    >
                                        <a href={`#${item.id}`} className="menu-link">
                                            {item.title}
                                        </a>
                                        
                                        {item.hasDropdown && (
                                            <ul className={`dropdown-menu ${activeDropdown === item.id ? 'active' : ''}`}>
                                                {item.subItems.map((subItem, index) => (
                                                    <li key={index}>
                                                        <a href="#">{subItem}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        
                        <button 
                            className={`menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Меню"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>
            
            <nav className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                <ul className="mobile-menu-list">
                    {menuItems.map(item => (
                        <React.Fragment key={item.id}>
                            {item.hasDropdown ? (
                                <MobileDropdownItem 
                                    title={item.title} 
                                    subItems={item.subItems} 
                                />
                            ) : (
                                <li>
                                    <a 
                                        href={`#${item.id}`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.title.replace(' ▼', '')}
                                    </a>
                                </li>
                            )}
                        </React.Fragment>
                    ))}
                </ul>
            </nav>
            
            <div className="header-content">
                <div className="container">
                    <h1 className="header-title">Поддержка сайтов на Drupal</h1>
                    <p className="header-subtitle">
                        Сопровождение и поддержка сайтов на CMS Drupal любых версий и запущенности
                    </p>
                    <a href="#support" className="btn btn-primary">
                        ПОДДЕРЖКА DRUPAL
                    </a>
                </div>
            </div>
        </header>
    );
};

const MobileDropdownItem = ({ title, subItems }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li className="mobile-dropdown">
            <button 
                className="mobile-dropdown-toggle"
                onClick={() => setIsOpen(!isOpen)}
            >
                {title.replace(' ▼', '')}
                <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
            </button>
            <ul className={`mobile-submenu ${isOpen ? 'active' : ''}`}>
                {subItems.map((item, index) => (
                    <li key={index}>
                        <a href="#">{item}</a>
                    </li>
                ))}
            </ul>
        </li>
    );
};

export default Header;