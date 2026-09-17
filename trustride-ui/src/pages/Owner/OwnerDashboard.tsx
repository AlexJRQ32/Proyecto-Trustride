import { useState } from 'react';
import { Layout } from '../../components/Layout/Layout';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
import { Icon } from '../../components/Icon/Icon';
import { useApp } from '../../context/AppContext';
import './OwnerDashboard.css';

export function OwnerDashboard() {
  const { pets, walks, addPet, removePet, addWalk } = useApp();
  const [showPetModal, setShowPetModal] = useState(false);
  const [showWalkModal, setShowWalkModal] = useState(false);
  const [newPet, setNewPet] = useState({ name: '', breed: '', age: '', conditions: '' });
  const [newWalk, setNewWalk] = useState({ petId: '', date: '', time: '', duration: '45 min', route: '', price: '' });

  const pendingWalks = walks.filter(w => w.status === 'pending');
  const confirmedWalks = walks.filter(w => w.status === 'confirmed');
  const completedWalks = walks.filter(w => w.status === 'completed');
  const upcomingWalks = pendingWalks.length + confirmedWalks.length;
  const totalSpent = walks.reduce((sum, w) => sum + w.price, 0);
  const avgWalk = walks.length ? Math.round(totalSpent / walks.length) : 0;
  const completionRate = walks.length ? Math.round((completedWalks.length / walks.length) * 100) : 0;

  const handleAddPet = () => {
    if (!newPet.name || !newPet.breed) return;
    addPet({ name: newPet.name, breed: newPet.breed, age: parseInt(newPet.age) || 1, weight: 10, photo: `https://api.dicebear.com/7.x/adventurer/svg?seed=${newPet.name}`, conditions: newPet.conditions || 'Ninguna' });
    setNewPet({ name: '', breed: '', age: '', conditions: '' });
    setShowPetModal(false);
  };

  const handleAddWalk = () => {
    if (!newWalk.petId || !newWalk.date || !newWalk.time) return;
    const pet = pets.find(p => p.id === parseInt(newWalk.petId));
    if (!pet) return;
    addWalk({ petId: pet.id, petName: pet.name, ownerName: 'Carlos Ruiz', ownerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos', date: newWalk.date, time: newWalk.time, duration: newWalk.duration, route: newWalk.route || 'Por definir', price: parseInt(newWalk.price) || 3000, status: 'pending' });
    setNewWalk({ petId: '', date: '', time: '', duration: '45 min', route: '', price: '' });
    setShowWalkModal(false);
  };

  return (
    <Layout role="owner" title="Hola, Carlos" subtitle={`${pets.length} mascotas · ${walks.length} paseos`}>
      <div className="owner-dashboard">
        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon stat-icon--blue"><Icon name="map-pin" size={20} /></div>
            <div className="stat-info"><div className="stat-value">{walks.length}</div><div className="stat-label">Paseos totales</div></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon--orange"><Icon name="clock" size={20} /></div>
            <div className="stat-info"><div className="stat-value">{upcomingWalks}</div><div className="stat-label">Próximos paseos</div></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon--green"><Icon name="check-circle" size={20} /></div>
            <div className="stat-info"><div className="stat-value">{completedWalks.length}</div><div className="stat-label">Completados</div></div>
          </div>
          <div className="stat-card">
            <div className="stat-icon stat-icon--purple"><Icon name="credit-card" size={20} /></div>
            <div className="stat-info"><div className="stat-value">₡{totalSpent.toLocaleString()}</div><div className="stat-label">Total gastado</div></div>
          </div>
        </div>

        {/* Content */}
        <div className="content-grid">
          <div className="content-main">
            <Card variant="accent" padding="lg">
              <div className="quick-action-content">
                <div className="quick-action-text"><h2>Publicar un paseo</h2><p>Encuentra al paseador perfecto para tu mascota</p></div>
                <Button icon={<Icon name="plus" size={18} />} onClick={() => setShowWalkModal(true)}>Nuevo paseo</Button>
              </div>
            </Card>

            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--orange"><Icon name="clock" size={16} /></div>
                <div style={{ flex: 1 }}><div className="section-title">Paseos pendientes</div><div className="section-subtitle">{pendingWalks.length} esperando confirmación</div></div>
                <Button size="sm" variant="ghost" icon={<Icon name="plus" size={14} />} onClick={() => setShowWalkModal(true)}>Nuevo</Button>
              </div>
              {pendingWalks.length === 0 ? <div className="empty-state">No hay paseos pendientes. Publica uno nuevo.</div> : (
                <div className="walks-list">{pendingWalks.map(w => (
                  <div key={w.id} className="walk-item">
                    <img src={w.ownerAvatar} className="walk-avatar" alt="" />
                    <div className="walk-info"><div className="walk-name">{w.petName}</div><div className="walk-details">{w.date} · {w.time} · {w.route}</div></div>
                    <div className="walk-price">₡{w.price.toLocaleString()}</div>
                    <span className="walk-badge walk-badge--pending">Pendiente</span>
                  </div>
                ))}</div>
              )}
            </Card>

            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--green"><Icon name="check-circle" size={16} /></div>
                <div><div className="section-title">Confirmados</div><div className="section-subtitle">{confirmedWalks.length} con paseador asignado</div></div>
              </div>
              {confirmedWalks.length === 0 ? <div className="empty-state">Aún no tienes paseos confirmados.</div> : (
                <div className="walks-list">{confirmedWalks.map(w => (
                  <div key={w.id} className="walk-item">
                    <img src={w.walkerAvatar} className="walk-avatar" alt="" />
                    <div className="walk-info"><div className="walk-name">{w.walkerName} → {w.petName}</div><div className="walk-details">{w.date} · {w.time} · {w.route}</div></div>
                    <span className="walk-badge walk-badge--confirmed">Confirmado</span>
                  </div>
                ))}</div>
              )}
            </Card>
          </div>

          <div className="content-side">
            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--accent"><Icon name="paw-print" size={16} /></div>
                <div style={{ flex: 1 }}><div className="section-title">Mis mascotas</div><div className="section-subtitle">{pets.length} registradas</div></div>
                <Button size="sm" variant="ghost" icon={<Icon name="plus" size={14} />} onClick={() => setShowPetModal(true)}>Agregar</Button>
              </div>
              <div className="pets-list">
                {pets.length === 0 ? <div className="empty-state">No tienes mascotas aún.</div> : pets.map(pet => (
                  <div key={pet.id} className="pet-item">
                    <img src={pet.photo} alt="" className="pet-avatar" />
                    <div className="pet-info"><div className="pet-name">{pet.name}</div><div className="pet-breed">{pet.breed} · {pet.age} años</div></div>
                    <button className="pet-remove" onClick={() => removePet(pet.id)}><Icon name="trash-2" size={14} /></button>
                  </div>
                ))}
                {pets.length > 0 && <Button variant="ghost" size="sm" fullWidth icon={<Icon name="plus" size={14} />} onClick={() => setShowPetModal(true)}>Agregar mascota</Button>}
              </div>
            </Card>

            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--blue"><Icon name="bar-chart" size={16} /></div>
                <div className="section-title">Resumen</div>
              </div>
              <div className="info-list">
                <div className="info-item"><span className="info-label">Próximos paseos</span><span className="info-value">{upcomingWalks}</span></div>
                <div className="info-item"><span className="info-label">Gastado promedio</span><span className="info-value">₡{avgWalk.toLocaleString()}</span></div>
                <div className="info-item"><span className="info-label">Tasa de completitud</span><span className="info-value">{completionRate}%</span></div>
                <div className="info-item"><span className="info-label">Mascotas</span><span className="info-value">{pets.length}</span></div>
              </div>
            </Card>

            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--orange"><Icon name="activity" size={16} /></div>
                <div className="section-title">Actividad</div>
              </div>
              <div className="activity-list">
                {activityItems.map((item, i) => (
                  <div key={i} className="activity-item">
                    <div className={`activity-dot activity-dot--${item.type}`}></div>
                    <div className="activity-text">{item.text}</div>
                    <div className="activity-time">{item.time}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Modal isOpen={showPetModal} onClose={() => setShowPetModal(false)} title="Agregar mascota">
        <div className="form-group"><label className="form-label">Nombre</label><input className="form-input" placeholder="Nombre" value={newPet.name} onChange={e => setNewPet({ ...newPet, name: e.target.value })} /></div>
        <div className="form-row"><div className="form-group"><label className="form-label">Raza</label><input className="form-input" placeholder="Labrador" value={newPet.breed} onChange={e => setNewPet({ ...newPet, breed: e.target.value })} /></div><div className="form-group"><label className="form-label">Edad</label><input className="form-input" type="number" placeholder="3" value={newPet.age} onChange={e => setNewPet({ ...newPet, age: e.target.value })} /></div></div>
        <div className="form-group"><label className="form-label">Condiciones</label><input className="form-input" placeholder="Ninguna" value={newPet.conditions} onChange={e => setNewPet({ ...newPet, conditions: e.target.value })} /></div>
        <div className="modal-actions"><Button variant="secondary" onClick={() => setShowPetModal(false)}>Cancelar</Button><Button onClick={handleAddPet}>Guardar</Button></div>
      </Modal>

      <Modal isOpen={showWalkModal} onClose={() => setShowWalkModal(false)} title="Publicar paseo">
        <div className="form-group"><label className="form-label">Mascota</label><select className="form-input" value={newWalk.petId} onChange={e => setNewWalk({ ...newWalk, petId: e.target.value })}><option value="">Seleccionar</option>{pets.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
        <div className="form-row"><div className="form-group"><label className="form-label">Fecha</label><input className="form-input" type="date" value={newWalk.date} onChange={e => setNewWalk({ ...newWalk, date: e.target.value })} /></div><div className="form-group"><label className="form-label">Hora</label><input className="form-input" type="time" value={newWalk.time} onChange={e => setNewWalk({ ...newWalk, time: e.target.value })} /></div></div>
        <div className="form-group"><label className="form-label">Ruta</label><input className="form-input" placeholder="Parque Central" value={newWalk.route} onChange={e => setNewWalk({ ...newWalk, route: e.target.value })} /></div>
        <div className="form-group"><label className="form-label">Precio (₡)</label><input className="form-input" type="number" placeholder="3000" value={newWalk.price} onChange={e => setNewWalk({ ...newWalk, price: e.target.value })} /></div>
        <div className="modal-actions"><Button variant="secondary" onClick={() => setShowWalkModal(false)}>Cancelar</Button><Button onClick={handleAddWalk}>Publicar</Button></div>
      </Modal>
    </Layout>
  );
}

const activityItems = [
  { type: 'success', text: 'Paseo con Max completado', time: 'Hace 2h' },
  { type: 'info', text: 'María aceptó tu solicitud', time: 'Hace 5h' },
  { type: 'warning', text: 'Luna necesita vacunas', time: 'Ayer' },
  { type: 'success', text: 'Pago de ₡3,000 procesado', time: 'Ayer' },
];
