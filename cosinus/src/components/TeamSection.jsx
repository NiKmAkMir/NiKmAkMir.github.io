import './TeamSection.css';

const TeamSection = () => {
  const team = [
    {
      photo: '/images/team-lesha.png',
      name: 'Лёша',
      role: 'руководитель поддержки, планирование задач'
    },
    {
      photo: '/images/team-roman.png',
      name: 'Роман',
      role: 'инфраструктура веб-проектов'
    },
    {
      photo: '/images/team-dasha.png',
      name: 'Ирина',
      role: 'менеджер по работе с клинетами, организация оказания услуг'
    },
    {
      photo: '/images/team-dasha.png',
      name: 'Даша',
      role: 'SEO, веб-маркетинг'
    },
    {
      photo: '/images/team-lesha.png',
      name: 'Сергей',
      role: 'технический директор, 14 лет опыт работы с Drupal'
    },
    {
      photo: '/images/team-roman.png',
      name: 'Вадим',
      role: 'UX/UI дизайн'
    }
  ];

  return (
    <section className="team section">
      <div className="container">
        <h2 className="heading-secondary team-title">Команда</h2>
        
        <div className="team-grid">
          {team.map((member, index) => (
            <div key={index} className="team-card">
              <img src={member.photo} alt={member.name} className="team-photo" />
              <h3 className="team-name">{member.name}</h3>
              <p className="team-role">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;