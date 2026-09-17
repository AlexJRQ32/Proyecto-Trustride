import { useState } from 'react';
import { Layout } from '../../components/Layout/Layout';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
import { Icon } from '../../components/Icon/Icon';
import { useApp } from '../../context/AppContext';
import '../Owner/OwnerDashboard.css';

export function OwnerPets() {
  const { pets, addPet, removePet } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [newPet, setNewPet] = useState({ name: '', breed: '', age: '', conditions: '' });

  const young = pets.filter(p => p.age < 3).length;
  const adults = pets.filter(p => p.age >= 3).length;
  const totalAge = pets.reduce((s, p) => s + p.age, 0);
  const avgAge = pets.length ? (totalAge / pets.length).toFixed(1) : '0';
  const avgWeight = pets.length ? Math.round(pets.reduce((s, p) => s + p.weight, 0) / pets.length) : 0;
  const withConditions = pets.filter(p => p.conditions && p.conditions !== 'Ninguna').length;
  const youngest = pets.length ? [...pets].sort((a, b) => a.age - b.age)[0].name : '-';
  const oldest = pets.length ? [...pets].sort((a, b) => b.age - a.age)[0].name : '-';

  const handleAdd = () => {
    if (!newPet.name || !newPet.breed) return;
    addPet({ name: newPet.name, breed: newPet.breed, age: parseInt(newPet.age) || 1, weight: 10, photo: `https://api.dicebear.com/7.x/adventurer/svg?seed=${newPet.name}`, conditions: newPet.conditions || 'Ninguna' });
    setNewPet({ name: '', breed: '', age: '', conditions: '' });
    setShowModal(false);
  };

  return (
    <Layout role="owner" title="Mis Mascotas" subtitle={`${pets.length} mascotas registradas`}>
      <div className="owner-dashboard">
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-icon stat-icon--blue"><Icon name="paw-print" size={20} /></div><div className="stat-info"><div className="stat-value">{pets.length}</div><div className="stat-label">Mascotas</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--green"><Icon name="heart" size={20} /></div><div className="stat-info"><div className="stat-value">{young}</div><div className="stat-label">Jóvenes</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--orange"><Icon name="clock" size={20} /></div><div className="stat-info"><div className="stat-value">{adults}</div><div className="stat-label">Adultos</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--purple"><Icon name="activity" size={20} /></div><div className="stat-info"><div className="stat-value">{totalAge}</div><div className="stat-label">Años total</div></div></div>
        </div>

        <div className="content-grid">
          <div className="content-main">
            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--accent"><Icon name="paw-print" size={16} /></div>
                <div style={{ flex: 1 }}><div className="section-title">Mis mascotas</div><div className="section-subtitle">Gestiona el perfil de tus mascotas</div></div>
                <Button size="sm" icon={<Icon name="plus" size={14} />} onClick={() => setShowModal(true)}>Agregar</Button>
              </div>
              {pets.length === 0 ? (
                <div className="empty-state">No tienes mascotas registradas. Agrega la primera.</div>
              ) : (
                <div className="pets-grid-large">
                  {pets.map(pet => (
                    <div key={pet.id} className="pet-card-large">
                      <img src={pet.photo} alt="" className="pet-card-photo" />
                      <div className="pet-card-info">
                        <div className="pet-card-name">{pet.name}</div>
                        <div className="pet-card-breed">{pet.breed}</div>
                        <div className="pet-card-meta">{pet.age} años · {pet.weight} kg · {pet.conditions}</div>
                      </div>
                      <div className="pet-card-actions">
                        <Button variant="ghost" size="sm" icon={<Icon name="edit" size={14} />}>Editar</Button>
                        <button className="pet-remove" onClick={() => removePet(pet.id)}><Icon name="trash-2" size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          <div className="content-side">
            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--blue"><Icon name="info" size={16} /></div>
                <div className="section-title">Resumen</div>
              </div>
              <div className="info-list">
                <div className="info-item"><span className="info-label">Edad promedio</span><span className="info-value">{avgAge} años</span></div>
                <div className="info-item"><span className="info-label">Peso promedio</span><span className="info-value">{avgWeight} kg</span></div>
                <div className="info-item"><span className="info-label">Con cuidados</span><span className="info-value">{withConditions}</span></div>
                <div className="info-item"><span className="info-label">Más joven</span><span className="info-value">{youngest}</span></div>
                <div className="info-item"><span className="info-label">Mayor</span><span className="info-value">{oldest}</span></div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Agregar mascota">
        <div className="form-group"><label className="form-label">Nombre</label><input className="form-input" placeholder="Nombre" value={newPet.name} onChange={e => setNewPet({ ...newPet, name: e.target.value })} /></div>
        <div className="form-row"><div className="form-group"><label className="form-label">Raza</label><input className="form-input" placeholder="Labrador" value={newPet.breed} onChange={e => setNewPet({ ...newPet, breed: e.target.value })} /></div><div className="form-group"><label className="form-label">Edad</label><input className="form-input" type="number" placeholder="3" value={newPet.age} onChange={e => setNewPet({ ...newPet, age: e.target.value })} /></div></div>
        <div className="form-group"><label className="form-label">Condiciones</label><input className="form-input" placeholder="Ninguna" value={newPet.conditions} onChange={e => setNewPet({ ...newPet, conditions: e.target.value })} /></div>
        <div className="modal-actions"><Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button><Button onClick={handleAdd}>Guardar</Button></div>
      </Modal>
    </Layout>
  );
}
