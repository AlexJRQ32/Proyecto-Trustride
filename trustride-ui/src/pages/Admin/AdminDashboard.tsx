import { Layout } from '../../components/Layout/Layout';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { Icon } from '../../components/Icon/Icon';
import { useApp } from '../../context/AppContext';
import './AdminDashboard.css';
import '../Owner/OwnerDashboard.css';

export function AdminDashboard() {
  const { walks } = useApp();
  const totalWalks = walks.length;
  const completedWalks = walks.filter(w => w.status === 'completed').length;
  const pendingWalks = walks.filter(w => w.status === 'pending').length;
  const confirmedWalks = walks.filter(w => w.status === 'confirmed').length;
  const totalRevenue = completedWalks * 3000;
  const weeklyGrowth = 12;

  return (
    <Layout role="admin" title="Dashboard" subtitle="Vista general de Trustride">
      <div className="admin-dashboard">
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-icon stat-icon--blue"><Icon name="users" size={20} /></div><div className="stat-info"><div className="stat-value">1,248</div><div className="stat-label">Usuarios</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--green"><Icon name="map-pin" size={20} /></div><div className="stat-info"><div className="stat-value">{totalWalks}</div><div className="stat-label">Paseos</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--orange"><Icon name="credit-card" size={20} /></div><div className="stat-info"><div className="stat-value">₡{totalRevenue.toLocaleString()}</div><div className="stat-label">Ingresos</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--purple"><Icon name="clipboard-list" size={20} /></div><div className="stat-info"><div className="stat-value">{pendingWalks}</div><div className="stat-label">Pendientes</div></div></div>
        </div>

        <div className="content-grid">
          <div className="content-main">
            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--accent"><Icon name="clipboard-list" size={16} /></div>
                <div style={{ flex: 1 }}><div className="section-title">Todos los paseos</div><div className="section-subtitle">{totalWalks} registrados</div></div>
              </div>
              {totalWalks === 0 ? (
                <div className="empty-state">No hay paseos registrados.</div>
              ) : (
                <div className="walks-list">{walks.map(w => (
                  <div key={w.id} className="walk-item">
                    <img src={w.ownerAvatar} className="walk-avatar" alt="" />
                    <div className="walk-info">
                      <div className="walk-name">{w.petName}</div>
                      <div className="walk-details">{w.ownerName} → {w.walkerName || 'Sin asignar'}</div>
                      <div className="walk-meta">{w.date} · {w.time} · {w.route}</div>
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
                <div className="section-icon section-icon--blue"><Icon name="trophy" size={16} /></div>
                <div className="section-title">Top paseadores</div>
              </div>
              <div className="top-walkers">
                {topWalkers.map((w, i) => (
                  <div key={i} className="top-walker">
                    <span className="top-walker-rank">#{i + 1}</span>
                    <img src={w.avatar} className="top-walker-avatar" alt="" />
                    <div className="top-walker-info"><div className="top-walker-name">{w.name}</div><div className="top-walker-stats">{w.walks} paseos</div></div>
                  </div>
                ))}
              </div>
            </Card>

            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--orange"><Icon name="user-check" size={16} /></div>
                <div style={{ flex: 1 }}><div className="section-title">Aprobaciones</div><div className="section-subtitle">{pendingApprovals.length} pendientes</div></div>
              </div>
              <div className="approval-list">
                {pendingApprovals.map((a, i) => (
                  <div key={i} className="approval-item">
                    <img src={a.avatar} className="approval-avatar" alt="" />
                    <div className="approval-info"><div className="approval-name">{a.name}</div><div className="approval-meta">{a.experience}</div></div>
                    <div className="approval-actions">
                      <Button variant="ghost" size="sm"><Icon name="check" size={16} /></Button>
                      <Button variant="ghost" size="sm"><Icon name="x" size={16} /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--purple"><Icon name="trending-up" size={16} /></div>
                <div className="section-title">Crecimiento</div>
              </div>
              <div className="info-list">
                <div className="info-item"><span className="info-label">Nuevos esta semana</span><span className="info-value">+{weeklyGrowth}%</span></div>
                <div className="info-item"><span className="info-label">Completados</span><span className="info-value">{completedWalks}</span></div>
                <div className="info-item"><span className="info-label">Confirmados</span><span className="info-value">{confirmedWalks}</span></div>
                <div className="info-item"><span className="info-label">Ingresos</span><span className="info-value">₡{totalRevenue.toLocaleString()}</span></div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const topWalkers = [
  { name: 'María García', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria', walks: 156 },
  { name: 'Juan López', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan', walks: 142 },
  { name: 'Ana Martínez', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana', walks: 128 },
];

const pendingApprovals = [
  { name: 'Pedro Sánchez', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro', experience: '2 años' },
  { name: 'Laura Díaz', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura', experience: '1 año' },
];
