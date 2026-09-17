import { Layout } from '../../components/Layout/Layout';
import { Card } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { Icon } from '../../components/Icon/Icon';
import '../Owner/OwnerDashboard.css';

export function AdminSettings() {
  return (
    <Layout role="admin" title="Configuración" subtitle="Configuración de la plataforma">
      <div className="owner-dashboard">
        <div className="content-grid">
          <div className="content-main">
            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--blue"><Icon name="settings" size={16} /></div>
                <div><div className="section-title">General</div><div className="section-subtitle">Configuración de Trustride</div></div>
              </div>
              <div className="form-group"><label className="form-label">Plataforma</label><input className="form-input" defaultValue="Trustride" /></div>
              <div className="form-group"><label className="form-label">Email soporte</label><input className="form-input" defaultValue="soporte@trustride.com" /></div>
              <div className="form-row">
                <div className="form-group"><label className="form-label">Comisión (%)</label><input className="form-input" type="number" defaultValue="15" /></div>
                <div className="form-group"><label className="form-label">Moneda</label><input className="form-input" defaultValue="CRC (₡)" /></div>
              </div>
              <Button style={{ marginTop: 8 }}>Guardar</Button>
            </Card>

            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--green"><Icon name="user-check" size={16} /></div>
                <div><div className="section-title">Aprobaciones</div><div className="section-subtitle">Configuración de paseadores</div></div>
              </div>
              <label className="setting-toggle"><input type="checkbox" defaultChecked /><span>Aprobación automática con experiencia</span></label>
              <label className="setting-toggle"><input type="checkbox" defaultChecked /><span>Requerir verificación de identidad</span></label>
              <label className="setting-toggle"><input type="checkbox" /><span>Revisión manual de documentos</span></label>
            </Card>
          </div>

          <div className="content-side">
            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--orange"><Icon name="bar-chart" size={16} /></div>
                <div className="section-title">Estadísticas</div>
              </div>
              <div className="info-list">
                <div className="info-item"><span className="info-label">Usuarios</span><span className="info-value">1,248</span></div>
                <div className="info-item"><span className="info-label">Paseos hoy</span><span className="info-value">37</span></div>
                <div className="info-item"><span className="info-label">Comisión activa</span><span className="info-value">15%</span></div>
                <div className="info-item"><span className="info-label">Estado</span><span className="info-value">Operativa</span></div>
              </div>
            </Card>

            <Card padding="md">
              <div className="section-header">
                <div className="section-icon section-icon--purple"><Icon name="alert-triangle" size={16} /></div>
                <div><div className="section-title">Zona de peligro</div><div className="section-subtitle">Acciones irreversibles</div></div>
              </div>
              <Button variant="danger" fullWidth icon={<Icon name="power" size={16} />}>Pausar plataforma</Button>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
