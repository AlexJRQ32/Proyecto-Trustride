import { Layout } from '../../components/Layout/Layout';
import { Card } from '../../components/Card/Card';
import { Icon } from '../../components/Icon/Icon';
import '../Owner/OwnerDashboard.css';

export function WalkerRatings() {
  const distribution = [
    { stars: 5, count: 140, pct: 90 },
    { stars: 4, count: 12, pct: 8 },
    { stars: 3, count: 3, pct: 2 },
    { stars: 2, count: 1, pct: 0 },
    { stars: 1, count: 0, pct: 0 },
  ];

  return (
    <Layout role="walker" title="Calificaciones" subtitle="Tu reputación como paseador">
      <div className="owner-dashboard">
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-icon stat-icon--orange"><Icon name="star" size={20} /></div><div className="stat-info"><div className="stat-value">4.9</div><div className="stat-label">Mi calificación</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--blue"><Icon name="message-square" size={20} /></div><div className="stat-info"><div className="stat-value">156</div><div className="stat-label">Reseñas</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--green"><Icon name="thumbs-up" size={20} /></div><div className="stat-info"><div className="stat-value">99%</div><div className="stat-label">Recomendado</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--purple"><Icon name="zap" size={20} /></div><div className="stat-info"><div className="stat-value">100%</div><div className="stat-label">Puntualidad</div></div></div>
        </div>

        <div className="content-grid">
          <div className="content-main">
            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--orange"><Icon name="star" size={16} /></div>
                <div style={{ flex: 1 }}><div className="section-title">Reseñas de dueños</div><div className="section-subtitle">Lo que dicen sobre ti</div></div>
              </div>
              <div className="reviews-list">
                {reviews.map((r, i) => (
                  <div key={i} className="review-item">
                    <img src={r.avatar} alt="" className="review-avatar" />
                    <div className="review-content">
                      <div className="review-header"><span className="review-name">{r.name}</span><span className="review-date">{r.date}</span></div>
                      <div style={{ display: 'flex', gap: 2, marginBottom: 4 }}>{[1, 2, 3, 4, 5].map(j => <Icon key={j} name="star-fill" size={12} color={j <= r.stars ? '#ff9500' : '#ddd'} />)}</div>
                      <div className="review-text">{r.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="content-side">
            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--blue"><Icon name="bar-chart" size={16} /></div>
                <div className="section-title">Distribución</div>
              </div>
              <div className="rating-bars">
                {distribution.map(({ stars, count, pct }) => (
                  <div key={stars} className="rating-bar-item">
                    <span className="rating-bar-label">{stars} ★</span>
                    <div className="rating-bar"><div className="rating-bar-fill" style={{ width: `${pct}%` }}></div></div>
                    <span className="rating-bar-count">{count}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--green"><Icon name="award" size={16} /></div>
                <div className="section-title">Fortalezas</div>
              </div>
              <div className="info-list">
                <div className="info-item"><span className="info-label">Puntualidad</span><span className="info-value">100%</span></div>
                <div className="info-item"><span className="info-label">Cuidado</span><span className="info-value">98%</span></div>
                <div className="info-item"><span className="info-label">Comunicación</span><span className="info-value">99%</span></div>
                <div className="info-item"><span className="info-label">Rango</span><span className="info-value">Top 3%</span></div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const reviews = [
  { name: 'Carlos Ruiz', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos', date: 'Hoy', stars: 5, text: 'María es increíble. Max la espera todos los días.' },
  { name: 'Laura Díaz', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura', date: 'Hace 3 días', stars: 5, text: 'Muy profesional. Mis perros están felices.' },
  { name: 'Pedro Sánchez', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro', date: 'Hace 1 semana', stars: 5, text: 'Puntual y responsable.' },
];
