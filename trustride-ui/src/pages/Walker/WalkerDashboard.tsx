import { Layout } from '../../components/Layout/Layout';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { Icon } from '../../components/Icon/Icon';
import { useApp } from '../../context/AppContext';
import '../Owner/OwnerDashboard.css';

export function WalkerDashboard() {
  const { walks, acceptWalk, completeWalk } = useApp();
  const availableWalks = walks.filter(w => w.status === 'pending');
  const myWalks = walks.filter(w => w.status === 'confirmed' && w.walkerName);
  const completedWalks = walks.filter(w => w.status === 'completed');
  const totalEarnings = completedWalks.reduce((sum, walk) => sum + walk.price, 0);
  const avgEarning = completedWalks.length ? Math.round(totalEarnings / completedWalks.length) : 0;

  return (
    <Layout role="walker" title="Hola, María" subtitle={`${availableWalks.length} disponibles · ₡${totalEarnings.toLocaleString()} ganados`}>
      <div className="owner-dashboard">
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-icon stat-icon--green"><Icon name="credit-card" size={20} /></div><div className="stat-info"><div className="stat-value">₡{totalEarnings.toLocaleString()}</div><div className="stat-label">Ganancias</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--blue"><Icon name="map-pin" size={20} /></div><div className="stat-info"><div className="stat-value">{completedWalks.length}</div><div className="stat-label">Realizados</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--orange"><Icon name="star" size={20} /></div><div className="stat-info"><div className="stat-value">4.9</div><div className="stat-label">Calificación</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--purple"><Icon name="clipboard-list" size={20} /></div><div className="stat-info"><div className="stat-value">{availableWalks.length}</div><div className="stat-label">Disponibles</div></div></div>
        </div>

        <div className="content-grid">
          <div className="content-main">
            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--green"><Icon name="navigation" size={16} /></div>
                <div style={{ flex: 1 }}><div className="section-title">Mis paseos activos</div><div className="section-subtitle">{myWalks.length} en curso</div></div>
              </div>
              {myWalks.length === 0 ? (
                <div className="empty-state">No tienes paseos activos ahora.</div>
              ) : (
                <div className="walks-list">{myWalks.map(w => (
                  <div key={w.id} className="walk-item">
                    <div className="walk-info"><div className="walk-name">{w.petName}</div><div className="walk-details">{w.ownerName} · {w.route}</div></div>
                    <div className="walk-price">₡{w.price.toLocaleString()}</div>
                    <Button size="sm" onClick={() => completeWalk(w.id)}><Icon name="check" size={16} /> Finalizar</Button>
                  </div>
                ))}</div>
              )}
            </Card>

            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--accent"><Icon name="clipboard-list" size={16} /></div>
                <div><div className="section-title">Paseos disponibles</div><div className="section-subtitle">{availableWalks.length} solicitudes cerca</div></div>
              </div>
              {availableWalks.length === 0 ? <div className="empty-state">No hay paseos disponibles ahora.</div> : (
                <div className="walks-list">{availableWalks.map(w => (
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
                <div className="section-icon section-icon--blue"><Icon name="calendar" size={16} /></div>
                <div className="section-title">Mi agenda hoy</div>
              </div>
              <div className="schedule-list">
                {todaySchedule.map((item, i) => (
                  <div key={i} className="schedule-item">
                    <div className="schedule-time">{item.time}</div>
                    <div className="schedule-info"><div className="schedule-title">{item.title}</div><div className="schedule-subtitle">{item.subtitle}</div></div>
                    <span className={`walk-badge walk-badge--${item.status}`}>{item.status === 'active' ? 'Ahora' : 'Pendiente'}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--orange"><Icon name="history" size={16} /></div>
                <div className="section-title">Historial</div>
              </div>
              {completedWalks.length === 0 ? (
                <div className="empty-state">Sin historial todavía.</div>
              ) : (
                <div className="walks-list">
                  {completedWalks.slice(0, 4).map(w => (
                    <div key={w.id} className="walk-item">
                      <div className="walk-info"><div className="walk-name">{w.petName}</div><div className="walk-details">{w.date}</div></div>
                      <div className="walk-price">₡{w.price.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--purple"><Icon name="bar-chart" size={16} /></div>
                <div className="section-title">Resumen</div>
              </div>
              <div className="info-list">
                <div className="info-item"><span className="info-label">Ganancia promedio</span><span className="info-value">₡{avgEarning.toLocaleString()}</span></div>
                <div className="info-item"><span className="info-label">Paseos activos</span><span className="info-value">{myWalks.length}</span></div>
                <div className="info-item"><span className="info-label">Disponibles</span><span className="info-value">{availableWalks.length}</span></div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const todaySchedule = [
  { time: '10:00', title: 'Paseo con Luna', subtitle: 'Parque Central · 45 min', status: 'active' },
  { time: '14:00', title: 'Paseo con Max', subtitle: 'Barrio Norte · 30 min', status: 'pending' },
  { time: '17:30', title: 'Paseo con Coco', subtitle: 'Residencial Sur · 45 min', status: 'pending' },
];
