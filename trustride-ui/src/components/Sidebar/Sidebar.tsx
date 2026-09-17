import { NavLink } from 'react-router-dom';
import { Icon } from '../Icon/Icon';
import './Sidebar.css';

interface SidebarProps {
  role: 'owner' | 'walker' | 'admin';
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = {
  owner: [
    { to: '/', icon: 'home', label: 'Inicio' },
    { to: '/owner', icon: 'layout-dashboard', label: 'Dashboard' },
    { to: '/owner/pets', icon: 'paw-print', label: 'Mascotas' },
    { to: '/owner/walks', icon: 'map-pin', label: 'Paseos' },
    { to: '/owner/ratings', icon: 'star', label: 'Favoritos' },
  ],
  walker: [
    { to: '/', icon: 'home', label: 'Inicio' },
    { to: '/walker', icon: 'layout-dashboard', label: 'Dashboard' },
    { to: '/walker/available', icon: 'clipboard-list', label: 'Disponibles' },
    { to: '/walker/history', icon: 'map-pin', label: 'Historial' },
    { to: '/walker/ratings', icon: 'star', label: 'Favoritos' },
  ],
  admin: [
    { to: '/', icon: 'home', label: 'Inicio' },
    { to: '/admin', icon: 'layout-dashboard', label: 'Dashboard' },
    { to: '/admin/users', icon: 'users', label: 'Usuarios' },
    { to: '/admin/walks', icon: 'clipboard-list', label: 'Paseos' },
    { to: '/admin/reports', icon: 'bar-chart', label: 'Reportes' },
  ],
};

const recentItems = {
  owner: [
    'Paseo de Max - Hoy',
    'Luna - Paseo confirmado',
    'Consulta sobre ruta',
  ],
  walker: [
    'Paseo en Parque Central',
    'Solicitud de Laura',
    'Paseo completado ayer',
  ],
  admin: [
    'Reporte de usuarios',
    'Nuevo paseador registrado',
    'Pago pendiente #1234',
  ],
};

export function Sidebar({ role, collapsed, onToggle }: SidebarProps) {
  const items = navItems[role];
  const recent = recentItems[role];

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}>
      <div className="sidebar-top">
        {!collapsed && (
          <NavLink to="/" className="sidebar-logo">
            <div className="sidebar-logo-icon">
              <Icon name="paw-print" size={18} color="white" />
            </div>
            <span className="sidebar-logo-text">Trustride</span>
          </NavLink>
        )}
        <button className="sidebar-toggle" onClick={onToggle} title={collapsed ? 'Expandir' : 'Colapsar'}>
          <Icon name={collapsed ? 'panel-left-open' : 'panel-left-close'} size={16} />
        </button>
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === `/${role}` || item.to === '/'}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'sidebar-link--active' : ''}`
            }
            title={collapsed ? item.label : undefined}
          >
            <Icon name={item.icon} size={18} />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {!collapsed && (
        <div className="sidebar-recent">
          <div className="sidebar-recent-header">
            <span>Recientes</span>
            <Icon name="search" size={14} />
          </div>
          <div className="sidebar-recent-list">
            {recent.map((item, i) => (
              <div key={i} className="sidebar-recent-item">
                <Icon name="clock" size={13} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="sidebar-footer">
        <NavLink to={`/${role}/settings`} className="sidebar-link" title={collapsed ? 'Configuración' : undefined}>
          <Icon name="settings" size={18} />
          {!collapsed && <span>Configuración</span>}
        </NavLink>
      </div>
    </aside>
  );
}
