import { Layout } from '../../components/Layout/Layout';
import { Card } from '../../components/Card/Card';
import { Icon } from '../../components/Icon/Icon';
import { useApp } from '../../context/AppContext';
import '../Owner/OwnerDashboard.css';

export function AdminWalks() {
  const { walks } = useApp();
  const total = walks.length;
  const pending = walks.filter(w => w.status === 'pending').length;
  const confirmed = walks.filter(w => w.status === 'confirmed').length;
  const completed = walks.filter(w => w.status === 'completed');
  const completedCount = completed.length;
  const revenue = completed.reduce((s, w) => s + w.price, 0);
  const routeCounts: Record<string, number> = {};
  walks.forEach(w => { routeCounts[w.route] = (routeCounts[w.route] || 0) + 1; });
  const topRoute = Object.entries(routeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Ninguna';

  return (
    <Layout role="admin" title="Paseos" subtitle="Todos los paseos del sistema">
      <div className="owner-dashboard">
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-icon stat-icon--blue"><Icon name="map-pin" size={20} /></div><div className="stat-info"><div className="stat-value">{total}</div><div className="stat-label">Total</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--orange"><Icon name="clock" size={20} /></div><div className="stat-info"><div className="stat-value">{pending}</div><div className="stat-label">Pendientes</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--green"><Icon name="check-circle" size={20} /></div><div className="stat-info"><div className="stat-value">{confirmed}</div><div className="stat-label">Confirmados</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--purple"><Icon name="check" size={20} /></div><div className="stat-info"><div className="stat-value">{completedCount}</div><div className="stat-label">Completados</div></div></div>
        </div>

        <div className="content-grid">
          <div className="content-main">
            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--accent"><Icon name="clipboard-list" size={16} /></div>
                <div style={{ flex: 1 }}><div className="section-title">Historial</div><div className="section-subtitle">{total} paseos</div></div>
              </div>
              {total === 0 ? (
                <div className="empty-state">No hay paseos registrados.</div>
              ) : (
                <div className="walks-list">{walks.map(w => (
                  <div key={w.id} className="walk-item">
                    <img src={w.ownerAvatar} className="walk-avatar" alt="" />
                    <div className="walk-info">
                      <div className="walk-name">{w.petName}</div>
                      <div className="walk-details">{w.ownerName} → {w.walkerName || 'Sin asignar'}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2 }}>{w.date} · {w.time} · {w.route}</div>
                    </div>
                    <div className="walk-price">₡{w.price.toLocaleString()}</div>
                    <span className={`walk-badge walk-badge--${w.status}`}>{w.status === 'pending' ? 'Pendiente' : w.status === 'confirmed' ? 'Confirmado' : 'Completado'}</span>
                  </div>
                ))}</div>
              )}
            </Card>
          </div>

          <div className="content-side">
            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--blue"><Icon name="bar-chart" size={16} /></div>
                <div className="section-title">Resumen</div>
              </div>
              <div className="info-list">
                <div className="info-item"><span className="info-label">Ingresos estimados</span><span className="info-value">₡{revenue.toLocaleString()}</span></div>
                <div className="info-item"><span className="info-label">Pendientes</span><span className="info-value">{pending}</span></div>
                <div className="info-item"><span className="info-label">Confirmados</span><span className="info-value">{confirmed}</span></div>
                <div className="info-item"><span className="info-label">Completados</span><span className="info-value">{completedCount}</span></div>
                <div className="info-item"><span className="info-label">Ruta top</span><span className="info-value">{topRoute}</span></div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
