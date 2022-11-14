import './styles.scss';

const StatCard = ({ title, content, icon = null, variant = "primary" }) => {
  return (
    <div className={`stat-card stat-card--${variant}`} data-testid="stat-card">
      <div className="stat-card__content">
        <p data-testid="stat-card-title">{title}</p>
        <h2 data-testid="stat-card-content">{content}</h2>
      </div>
      <div className="stat-card__icon" data-testid="stat-card-icon">
        {icon}
      </div>
    </div>
  );
};

export default StatCard;
