import { useState } from 'react';
import { Layout } from '../../components/Layout/Layout';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { Icon } from '../../components/Icon/Icon';
import '../Owner/OwnerDashboard.css';

export function AdminUsers() {
  const [query, setQuery] = useState('');
  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.email.toLowerCase().includes(query.toLowerCase()) ||
    u.role.toLowerCase().includes(query.toLowerCase())
  );
  const owners = users.filter(u => u.role === 'Dueño').length;
  const walkers = users.filter(u => u.role === 'Paseador').length;
  const pending = users.filter(u => u.status === 'pending').length;

  return (
    <Layout role="admin" title="Usuarios" subtitle="Gestiona la comunidad">
      <div className="owner-dashboard">
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-icon stat-icon--blue"><Icon name="users" size={20} /></div><div className="stat-info"><div className="stat-value">1,248</div><div className="stat-label">Total</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--green"><Icon name="user-check" size={20} /></div><div className="stat-info"><div className="stat-value">{owners}</div><div className="stat-label">Dueños</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--orange"><Icon name="user-plus" size={20} /></div><div className="stat-info"><div className="stat-value">{walkers}</div><div className="stat-label">Paseadores</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--purple"><Icon name="clock" size={20} /></div><div className="stat-info"><div className="stat-value">{pending}</div><div className="stat-label">Pendientes</div></div></div>
        </div>

        <div className="content-grid">
          <div className="content-main">
            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--accent"><Icon name="search" size={16} /></div>
                <div style={{ flex: 1 }}>
                  <input className="form-input" placeholder="Buscar por nombre, email o rol..." style={{ borderRadius: 8 }} value={query} onChange={e => setQuery(e.target.value)} />
                </div>
                <span className="walk-badge walk-badge--confirmed">{filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</span>
              </div>
              {filtered.length === 0 ? (
                <div className="empty-state">No se encontraron usuarios para “{query}”.</div>
              ) : (
                <div className="walks-list">
                  {filtered.map(u => (
                    <div key={u.id} className="walk-item">
                      <img src={u.avatar} className="walk-avatar" alt="" />
                      <div className="walk-info"><div className="walk-name">{u.name}</div><div className="walk-details">{u.email} · {u.role}</div></div>
                      <span className={`walk-badge ${u.status === 'active' ? 'walk-badge--confirmed' : 'walk-badge--pending'}`}>{u.status === 'active' ? 'Activo' : 'Pendiente'}</span>
                      <Button variant="ghost" size="sm" icon={<Icon name="eye" size={14} />}>Ver</Button>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          <div className="content-side">
            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--blue"><Icon name="bar-chart" size={16} /></div>
                <div className="section-title">Distribución</div>
              </div>
              <div className="info-list">
                <div className="info-item"><span className="info-label">Dueños</span><span className="info-value">{owners}</span></div>
                <div className="info-item"><span className="info-label">Paseadores</span><span className="info-value">{walkers}</span></div>
                <div className="info-item"><span className="info-label">Pendientes</span><span className="info-value">{pending}</span></div>
                <div className="info-item"><span className="info-label">Total plataforma</span><span className="info-value">1,248</span></div>
              </div>
            </Card>

            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--green"><Icon name="user-check" size={16} /></div>
                <div className="section-title">Acciones</div>
              </div>
              <Button variant="secondary" fullWidth icon={<Icon name="download" size={16} />} style={{ marginBottom: 8 }}>Exportar CSV</Button>
              <Button variant="ghost" fullWidth icon={<Icon name="user-plus" size={16} />}>Invitar paseador</Button>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const users = [
  { id: 1, name: 'Carlos Ruiz', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos', email: 'carlos@email.com', role: 'Dueño', status: 'active' },
  { id: 2, name: 'María García', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria', email: 'maria@email.com', role: 'Paseador', status: 'active' },
  { id: 3, name: 'Laura Díaz', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura', email: 'laura@email.com', role: 'Dueño', status: 'active' },
  { id: 4, name: 'Juan López', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan', email: 'juan@email.com', role: 'Paseador', status: 'active' },
  { id: 5, name: 'Pedro Sánchez', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro', email: 'pedro@email.com', role: 'Paseador', status: 'pending' },
];
