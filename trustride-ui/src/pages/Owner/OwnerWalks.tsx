import { useState } from 'react';
import { Layout } from '../../components/Layout/Layout';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
import { Icon } from '../../components/Icon/Icon';
import { useApp } from '../../context/AppContext';
import '../Owner/OwnerDashboard.css';

export function OwnerWalks() {
  const { pets, walks, addWalk } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [newWalk, setNewWalk] = useState({ petId: '', date: '', time: '', duration: '45 min', route: '', price: '' });

  const pending = walks.filter(w => w.status === 'pending');
  const confirmed = walks.filter(w => w.status === 'confirmed');
  const completed = walks.filter(w => w.status === 'completed');
  const totalSpent = walks.reduce((s, w) => s + w.price, 0);
  const avgWalk = walks.length ? Math.round(totalSpent / walks.length) : 0;
  const maxPrice = walks.length ? Math.max(...walks.map(w => w.price)) : 0;
  const minPrice = walks.length ? Math.min(...walks.map(w => w.price)) : 0;

  const routeCounts: Record<string, number> = {};
  walks.forEach(w => { routeCounts[w.route] = (routeCounts[w.route] || 0) + 1; });
  const topRoute = Object.entries(routeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Ninguna';

  const handleAdd = () => {
    if (!newWalk.petId || !newWalk.date || !newWalk.time) return;
    const pet = pets.find(p => p.id === parseInt(newWalk.petId));
    if (!pet) return;
    addWalk({ petId: pet.id, petName: pet.name, ownerName: 'Carlos Ruiz', ownerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos', date: newWalk.date, time: newWalk.time, duration: newWalk.duration, route: newWalk.route || 'Por definir', price: parseInt(newWalk.price) || 3000, status: 'pending' });
    setNewWalk({ petId: '', date: '', time: '', duration: '45 min', route: '', price: '' });
    setShowModal(false);
  };

  return (
    <Layout role="owner" title="Mis Paseos" subtitle={`${walks.length} paseos en total`}>
      <div className="owner-dashboard">
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-icon stat-icon--blue"><Icon name="map-pin" size={20} /></div><div className="stat-info"><div className="stat-value">{walks.length}</div><div className="stat-label">Total</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--orange"><Icon name="clock" size={20} /></div><div className="stat-info"><div className="stat-value">{pending.length}</div><div className="stat-label">Pendientes</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--green"><Icon name="check-circle" size={20} /></div><div className="stat-info"><div className="stat-value">{confirmed.length}</div><div className="stat-label">Confirmados</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--purple"><Icon name="credit-card" size={20} /></div><div className="stat-info"><div className="stat-value">₡{totalSpent.toLocaleString()}</div><div className="stat-label">Gastado</div></div></div>
        </div>

        <div className="content-grid">
          <div className="content-main">
            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--orange"><Icon name="clock" size={16} /></div>
                <div style={{ flex: 1 }}><div className="section-title">Pendientes</div><div className="section-subtitle">{pending.length} esperando confirmación</div></div>
                <Button size="sm" icon={<Icon name="plus" size={14} />} onClick={() => setShowModal(true)}>Nuevo</Button>
              </div>
              {pending.length === 0 ? <div className="empty-state">Sin paseos pendientes.</div> : (
                <div className="walks-list">{pending.map(w => (
                  <div key={w.id} className="walk-item"><div className="walk-info"><div className="walk-name">{w.petName}</div><div className="walk-details">{w.date} · {w.time} · {w.route}</div></div><div className="walk-price">₡{w.price.toLocaleString()}</div><span className="walk-badge walk-badge--pending">Pendiente</span></div>
                ))}</div>
              )}
            </Card>

            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--green"><Icon name="check-circle" size={16} /></div>
                <div><div className="section-title">Confirmados</div><div className="section-subtitle">{confirmed.length} con paseador</div></div>
              </div>
              {confirmed.length === 0 ? <div className="empty-state">Sin paseos confirmados.</div> : (
                <div className="walks-list">{confirmed.map(w => (
                  <div key={w.id} className="walk-item"><img src={w.walkerAvatar} className="walk-avatar" alt="" /><div className="walk-info"><div className="walk-name">{w.walkerName} → {w.petName}</div><div className="walk-details">{w.date} · {w.time} · {w.route}</div></div><span className="walk-badge walk-badge--confirmed">Confirmado</span></div>
                ))}</div>
              )}
            </Card>

            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--blue"><Icon name="history" size={16} /></div>
                <div><div className="section-title">Historial</div><div className="section-subtitle">{completed.length} completados</div></div>
              </div>
              {completed.length === 0 ? <div className="empty-state">Sin historial todavía.</div> : (
                <div className="walks-list">{completed.map(w => (
                  <div key={w.id} className="walk-item"><div className="walk-info"><div className="walk-name">{w.petName}</div><div className="walk-details">{w.date} · {w.route}</div></div><div className="walk-price">₡{w.price.toLocaleString()}</div><span className="walk-badge walk-badge--completed">Completado</span></div>
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
                <div className="info-item"><span className="info-label">Promedio por paseo</span><span className="info-value">₡{avgWalk.toLocaleString()}</span></div>
                <div className="info-item"><span className="info-label">Más caro</span><span className="info-value">₡{maxPrice.toLocaleString()}</span></div>
                <div className="info-item"><span className="info-label">Más barato</span><span className="info-value">₡{minPrice.toLocaleString()}</span></div>
                <div className="info-item"><span className="info-label">Ruta favorita</span><span className="info-value">{topRoute}</span></div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Publicar paseo">
        <div className="form-group"><label className="form-label">Mascota</label><select className="form-input" value={newWalk.petId} onChange={e => setNewWalk({ ...newWalk, petId: e.target.value })}><option value="">Seleccionar</option>{pets.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
        <div className="form-row"><div className="form-group"><label className="form-label">Fecha</label><input className="form-input" type="date" value={newWalk.date} onChange={e => setNewWalk({ ...newWalk, date: e.target.value })} /></div><div className="form-group"><label className="form-label">Hora</label><input className="form-input" type="time" value={newWalk.time} onChange={e => setNewWalk({ ...newWalk, time: e.target.value })} /></div></div>
        <div className="form-group"><label className="form-label">Ruta</label><input className="form-input" placeholder="Parque Central" value={newWalk.route} onChange={e => setNewWalk({ ...newWalk, route: e.target.value })} /></div>
        <div className="form-group"><label className="form-label">Precio (₡)</label><input className="form-input" type="number" placeholder="3000" value={newWalk.price} onChange={e => setNewWalk({ ...newWalk, price: e.target.value })} /></div>
        <div className="modal-actions"><Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button><Button onClick={handleAdd}>Publicar</Button></div>
      </Modal>
    </Layout>
  );
}
