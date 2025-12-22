import './CasesSection.css';

const CasesSection = () => {
  const cases = [
    {
      image: 'https://images.pexels.com/photos/139387/pexels-photo-139387.jpeg',
      title: 'Настройка выгрузки YML для Яндекс.Маркета',
      date: '22.04.2019',
      description: 'Эти слова совершенно справедливы, однако гипнотический рифф продолжает паузный пласт.',
      large: true
    },
    {
      image: 'https://images.pexels.com/photos/7109243/pexels-photo-7109243.jpeg',
      title: 'Настройка выгрузки YML для Яндекс.Маркета',
      date: '22.04.2019',
      large: true
    },
    {
      image: 'https://images.pexels.com/photos/257894/pexels-photo-257894.jpeg',
      title: 'Настройка выгрузки YML для Яндекс.Маркета',
      date: '22.04.2019',
      large: false
    },
    {
      image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg',
      title: 'Настройка выгрузки YML для Яндекс.Маркета',
      date: '22.04.2019',
      large: false
    },
    {
      image: 'https://images.unsplash.com/photo-1758691737278-3af15b37af48',
      title: 'Настройка выгрузки YML для Яндекс.Маркета',
      date: '22.04.2019',
      large: false
    },
    {
      image: 'https://images.pexels.com/photos/4064823/pexels-photo-4064823.jpeg',
      title: 'Настройка выгрузки YML для Яндекс.Маркета',
      date: '22.04.2019',
      large: false
    }
  ];

  return (
    <section id="cases" className="cases section">
      <div className="container">
        <h2 className="heading-secondary cases-title">Последние кейсы</h2>
        
        <div className="cases-grid">
          {cases.map((caseItem, index) => (
            <div key={index} className={`case-card ${caseItem.large ? 'case-large' : ''}`}>
              <img src={caseItem.image} alt={caseItem.title} className="case-image" />
              <div className="case-overlay">
                <h3 className="case-title">{caseItem.title}</h3>
                <p className="case-date">{caseItem.date}</p>
                {caseItem.description && (
                  <p className="case-description">{caseItem.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <button className="btn btn-outline cases-more">Показать ещё</button>
      </div>
    </section>
  );
};

export default CasesSection;