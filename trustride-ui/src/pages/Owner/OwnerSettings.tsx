import { Layout } from '../../components/Layout/Layout';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { Icon } from '../../components/Icon/Icon';
import { useApp } from '../../context/AppContext';
import '../Owner/OwnerDashboard.css';

export function OwnerSettings() {
  const { pets, walks } = useApp();
  const completed = walks.filter(w => w.status === 'completed').length;

  return (
    <Layout role="owner" title="Configuración" subtitle="Administra tu cuenta">
      <div className="owner-dashboard">
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-icon stat-icon--orange"><Icon name="star" size={20} /></div><div className="stat-info"><div className="stat-value">4.8</div><div className="stat-label">Calificación</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--blue"><Icon name="message-square" size={20} /></div><div className="stat-info"><div className="stat-value">24</div><div className="stat-label">Reseñas</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--green"><Icon name="paw-print" size={20} /></div><div className="stat-info"><div className="stat-value">{pets.length}</div><div className="stat-label">Mascotas</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--purple"><Icon name="map-pin" size={20} /></div><div className="stat-info"><div className="stat-value">{completed}</div><div className="stat-label">Paseos hechos</div></div></div>
        </div>

        <div className="content-grid">
          <div className="content-main">
            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--blue"><Icon name="user" size={16} /></div>
                <div><div className="section-title">Perfil</div><div className="section-subtitle">Tu información personal</div></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Nombre</label><input className="form-input" defaultValue="Carlos Ruiz" /></div>
                <div className="form-group"><label className="form-label">Teléfono</label><input className="form-input" defaultValue="8888-8888" /></div>
              </div>
              <div className="form-group"><label className="form-label">Email</label><input className="form-input" defaultValue="carlos@email.com" /></div>
              <Button>Guardar cambios</Button>
            </Card>

            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--green"><Icon name="bell" size={16} /></div>
                <div><div className="section-title">Notificaciones</div><div className="section-subtitle">Configura tus alertas</div></div>
              </div>
              <label className="setting-toggle"><input type="checkbox" defaultChecked /><span>Confirmación de paseo</span></label>
              <label className="setting-toggle"><input type="checkbox" defaultChecked /><span>Recordatorios</span></label>
              <label className="setting-toggle"><input type="checkbox" /><span>Promociones</span></label>
            </Card>
          </div>

          <div className="content-side">
            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--orange"><Icon name="shield" size={16} /></div>
                <div><div className="section-title">Seguridad</div><div className="section-subtitle">Protege tu cuenta</div></div>
              </div>
              <Button variant="secondary" fullWidth icon={<Icon name="lock" size={16} />} style={{ marginBottom: 8 }}>Cambiar contraseña</Button>
              <Button variant="danger" fullWidth icon={<Icon name="trash-2" size={16} />}>Eliminar cuenta</Button>
            </Card>

            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--blue"><Icon name="info" size={16} /></div>
                <div className="section-title">Cuenta</div>
              </div>
              <div className="info-list">
                <div className="info-item"><span className="info-label">Estado</span><span className="info-value">Activa</span></div>
                <div className="info-item"><span className="info-label">Miembro desde</span><span className="info-value">2024</span></div>
                <div className="info-item"><span className="info-label">Plan</span><span className="info-value">Gratis</span></div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
