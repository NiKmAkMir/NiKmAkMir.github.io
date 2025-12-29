import './TeamSection.css';
const base = import.meta.env.BASE_URL
const TeamSection = () => {
  const team = [
    {
      photo: `${base}images/team-lesha.png`,
      name: 'Лёша',
      role: 'руководитель поддержки, планирование задач'
    },
    {
      photo: `${base}images/team-roman.png`,
      name: 'Роман',
      role: 'инфраструктура веб-проектов'
    },
    {
      photo: `${base}images/team-dasha.png`,
      name: 'Ирина',
      role: 'менеджер по работе с клинетами, организация оказания услуг'
    },
    {
      photo: `${base}images/team-dasha.png`,
      name: 'Даша',
      role: 'SEO, веб-маркетинг'
    },
    {
      photo: `${base}images/team-lesha.png`,
      name: 'Сергей',
      role: 'технический директор, 14 лет опыт работы с Drupal'
    },
    {
      photo: `${base}images/team-roman.png`,
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