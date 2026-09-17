import { Layout } from '../../components/Layout/Layout';
import { Card } from '../../components/Card/Card';
import { Icon } from '../../components/Icon/Icon';
import { useApp } from '../../context/AppContext';
import '../Owner/OwnerDashboard.css';

export function WalkerHistory() {
  const { walks } = useApp();
  const completed = walks.filter(w => w.status === 'completed');
  const confirmed = walks.filter(w => w.status === 'confirmed' && w.walkerName);
  const earnings = completed.reduce((s, w) => s + w.price, 0);
  const avgEarning = completed.length ? Math.round(earnings / completed.length) : 0;

  return (
    <Layout role="walker" title="Historial" subtitle="Tu actividad reciente">
      <div className="owner-dashboard">
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-icon stat-icon--blue"><Icon name="map-pin" size={20} /></div><div className="stat-info"><div className="stat-value">{completed.length}</div><div className="stat-label">Completados</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--green"><Icon name="check-circle" size={20} /></div><div className="stat-info"><div className="stat-value">{confirmed.length}</div><div className="stat-label">En curso</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--orange"><Icon name="credit-card" size={20} /></div><div className="stat-info"><div className="stat-value">₡{earnings.toLocaleString()}</div><div className="stat-label">Ganancias</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--purple"><Icon name="star" size={20} /></div><div className="stat-info"><div className="stat-value">4.9</div><div className="stat-label">Calificación</div></div></div>
        </div>

        <div className="content-grid">
          <div className="content-main">
            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--green"><Icon name="navigation" size={16} /></div>
                <div style={{ flex: 1 }}><div className="section-title">En curso</div><div className="section-subtitle">{confirmed.length} activos</div></div>
              </div>
              {confirmed.length === 0 ? (
                <div className="empty-state">No tienes paseos en curso.</div>
              ) : (
                <div className="walks-list">{confirmed.map(w => (
                  <div key={w.id} className="walk-item"><div className="walk-info"><div className="walk-name">{w.petName} — {w.ownerName}</div><div className="walk-details">{w.route} · {w.time}</div></div><div className="walk-price">₡{w.price.toLocaleString()}</div></div>
                ))}</div>
              )}
            </Card>

            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--blue"><Icon name="history" size={16} /></div>
                <div><div className="section-title">Completados</div><div className="section-subtitle">{completed.length} paseos</div></div>
              </div>
              {completed.length === 0 ? (
                <div className="empty-state">Sin historial todavía.</div>
              ) : (
                <div className="walks-list">{completed.map(w => (
                  <div key={w.id} className="walk-item"><div className="walk-info"><div className="walk-name">{w.petName} — {w.ownerName}</div><div className="walk-details">{w.date} · {w.route}</div></div><div className="walk-price">₡{w.price.toLocaleString()}</div></div>
                ))}</div>
              )}
            </Card>
          </div>

          <div className="content-side">
            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--purple"><Icon name="bar-chart" size={16} /></div>
                <div className="section-title">Resumen</div>
              </div>
              <div className="info-list">
                <div className="info-item"><span className="info-label">Ganancia total</span><span className="info-value">₡{earnings.toLocaleString()}</span></div>
                <div className="info-item"><span className="info-label">Promedio / paseo</span><span className="info-value">₡{avgEarning.toLocaleString()}</span></div>
                <div className="info-item"><span className="info-label">En curso</span><span className="info-value">{confirmed.length}</span></div>
                <div className="info-item"><span className="info-label">Completados</span><span className="info-value">{completed.length}</span></div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
