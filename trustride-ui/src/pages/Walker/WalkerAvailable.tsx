import { Layout } from '../../components/Layout/Layout';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { Icon } from '../../components/Icon/Icon';
import { useApp } from '../../context/AppContext';
import '../Owner/OwnerDashboard.css';

export function WalkerAvailable() {
  const { walks, acceptWalk } = useApp();
  const available = walks.filter(w => w.status === 'pending');
  const potential = available.reduce((s, w) => s + w.price, 0);
  const medium = available.filter(w => w.duration === '45 min').length;
  const short = available.filter(w => w.duration === '30 min' || w.duration === '20 min').length;
  const long = available.filter(w => w.duration === '60 min').length;
  const avgPrice = available.length ? Math.round(potential / available.length) : 0;
  const minPrice = available.length ? Math.min(...available.map(w => w.price)) : 0;
  const maxPrice = available.length ? Math.max(...available.map(w => w.price)) : 0;

  return (
    <Layout role="walker" title="Paseos Disponibles" subtitle={`${available.length} solicitudes cerca de ti`}>
      <div className="owner-dashboard">
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-icon stat-icon--blue"><Icon name="clipboard-list" size={20} /></div><div className="stat-info"><div className="stat-value">{available.length}</div><div className="stat-label">Disponibles</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--orange"><Icon name="clock" size={20} /></div><div className="stat-info"><div className="stat-value">{medium}</div><div className="stat-label">Medianos</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--green"><Icon name="dollar-sign" size={20} /></div><div className="stat-info"><div className="stat-value">₡{potential.toLocaleString()}</div><div className="stat-label">Potencial</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--purple"><Icon name="star" size={20} /></div><div className="stat-info"><div className="stat-value">4.9</div><div className="stat-label">Tu rating</div></div></div>
        </div>

        <div className="content-grid">
          <div className="content-main">
            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--accent"><Icon name="clipboard-list" size={16} /></div>
                <div style={{ flex: 1 }}><div className="section-title">Solicitudes</div><div className="section-subtitle">{available.length} paseos buscando paseador</div></div>
              </div>
              {available.length === 0 ? (
                <div className="empty-state">No hay paseos disponibles ahora. Vuelve pronto.</div>
              ) : (
                <div className="walks-list">{available.map(w => (
                  <div key={w.id} className="walk-item">
                    <img src={w.ownerAvatar} className="walk-avatar" alt="" />
                    <div className="walk-info"><div className="walk-name">{w.ownerName}</div><div className="walk-details">{w.petName} · {w.route} · {w.duration}</div></div>
                    <div className="walk-price">₡{w.price.toLocaleString()}</div>
                    <Button size="sm" onClick={() => acceptWalk(w.id, 'María García', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria')}><Icon name="check" size={16} /> Aceptar</Button>
                  </div>
                ))}</div>
              )}
            </Card>
          </div>

          <div className="content-side">
            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--blue"><Icon name="bar-chart" size={16} /></div>
                <div className="section-title">Detalle</div>
              </div>
              <div className="info-list">
                <div className="info-item"><span className="info-label">Precio promedio</span><span className="info-value">₡{avgPrice.toLocaleString()}</span></div>
                <div className="info-item"><span className="info-label">Rango precio</span><span className="info-value">₡{minPrice.toLocaleString()}–{maxPrice.toLocaleString()}</span></div>
                <div className="info-item"><span className="info-label">Cortos</span><span className="info-value">{short}</span></div>
                <div className="info-item"><span className="info-label">Largos</span><span className="info-value">{long}</span></div>
              </div>
            </Card>

            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--green"><Icon name="info" size={16} /></div>
                <div className="section-title">Consejo</div>
              </div>
              <div className="empty-state" style={{ textAlign: 'left', padding: 0, color: 'var(--text-secondary)' }}>
                Acepta rápido los paseos cercanos para mejorar tu tasa de respuesta y mantener tu rating.
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
