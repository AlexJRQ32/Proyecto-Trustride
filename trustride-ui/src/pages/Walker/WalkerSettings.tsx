import { Layout } from '../../components/Layout/Layout';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { Icon } from '../../components/Icon/Icon';
import '../Owner/OwnerDashboard.css';

export function WalkerSettings() {
  return (
    <Layout role="walker" title="Configuración" subtitle="Perfil de paseador">
      <div className="owner-dashboard">
        <div className="stats-grid">
          <div className="stat-card"><div className="stat-icon stat-icon--orange"><Icon name="star" size={20} /></div><div className="stat-info"><div className="stat-value">4.9</div><div className="stat-label">Calificación</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--blue"><Icon name="map-pin" size={20} /></div><div className="stat-info"><div className="stat-value">156</div><div className="stat-label">Paseos</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--green"><Icon name="credit-card" size={20} /></div><div className="stat-info"><div className="stat-value">₡420k</div><div className="stat-label">Ganados</div></div></div>
          <div className="stat-card"><div className="stat-icon stat-icon--purple"><Icon name="map" size={20} /></div><div className="stat-info"><div className="stat-value">3</div><div className="stat-label">Zonas</div></div></div>
        </div>

        <div className="content-grid">
          <div className="content-main">
            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--blue"><Icon name="user" size={16} /></div>
                <div><div className="section-title">Perfil profesional</div><div className="section-subtitle">Tu información como paseador</div></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Nombre</label><input className="form-input" defaultValue="María García" /></div>
                <div className="form-group"><label className="form-label">Email</label><input className="form-input" defaultValue="maria@email.com" /></div>
              </div>
              <div className="form-group"><label className="form-label">Zona</label><input className="form-input" defaultValue="San José, Escazú, Santa Ana" /></div>
              <Button style={{ marginTop: 8 }}>Guardar</Button>
            </Card>

            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--green"><Icon name="bell" size={16} /></div>
                <div><div className="section-title">Notificaciones</div><div className="section-subtitle">Alertas de la plataforma</div></div>
              </div>
              <label className="setting-toggle"><input type="checkbox" defaultChecked /><span>Nuevos paseos disponibles</span></label>
              <label className="setting-toggle"><input type="checkbox" defaultChecked /><span>Confirmación de paseo</span></label>
              <label className="setting-toggle"><input type="checkbox" /><span>Mensajes de dueños</span></label>
            </Card>
          </div>

          <div className="content-side">
            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--orange"><Icon name="calendar" size={16} /></div>
                <div><div className="section-title">Disponibilidad</div><div className="section-subtitle">Configura tu horario</div></div>
              </div>
              <label className="setting-toggle"><input type="checkbox" defaultChecked /><span>Lunes a Viernes</span></label>
              <label className="setting-toggle"><input type="checkbox" defaultChecked /><span>Sábados</span></label>
              <label className="setting-toggle"><input type="checkbox" /><span>Domingos</span></label>
            </Card>

            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--blue"><Icon name="shield" size={16} /></div>
                <div><div className="section-title">Seguridad</div><div className="section-subtitle">Acceso a tu cuenta</div></div>
              </div>
              <Button variant="secondary" fullWidth icon={<Icon name="lock" size={16} />} style={{ marginBottom: 8 }}>Cambiar contraseña</Button>
              <Button variant="ghost" fullWidth icon={<Icon name="user-check" size={16} />}>Verificar identidad</Button>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
