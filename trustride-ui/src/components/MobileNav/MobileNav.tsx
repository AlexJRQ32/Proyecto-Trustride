import { NavLink } from 'react-router-dom';
import { Icon } from '../Icon/Icon';
import './MobileNav.css';

interface MobileNavProps {
  role: 'owner' | 'walker' | 'admin';
}

const navItems = {
  owner: [
    { to: '/owner', icon: 'home', label: 'Inicio' },
    { to: '/owner/pets', icon: 'paw-print', label: 'Mascotas' },
    { to: '/owner/walks', icon: 'map-pin', label: 'Paseos' },
    { to: '/owner/settings', icon: 'settings', label: 'Más' },
  ],
  walker: [
    { to: '/walker', icon: 'home', label: 'Inicio' },
    { to: '/walker/available', icon: 'clipboard-list', label: 'Paseos' },
    { to: '/walker/history', icon: 'map-pin', label: 'Historial' },
    { to: '/walker/settings', icon: 'settings', label: 'Más' },
  ],
  admin: [
    { to: '/admin', icon: 'home', label: 'Inicio' },
    { to: '/admin/users', icon: 'user-plus', label: 'Usuarios' },
    { to: '/admin/walks', icon: 'clipboard-list', label: 'Paseos' },
    { to: '/admin/settings', icon: 'settings', label: 'Más' },
  ],
};

export function MobileNav({ role }: MobileNavProps) {
  const items = navItems[role];

  return (
    <nav className="mobile-nav">
      {items.map((item, index) => (
        <NavLink
          key={item.to + index}
          to={item.to}
          end={item.to === `/${role}`}
          className={({ isActive }) =>
            `mobile-nav-item ${isActive ? 'mobile-nav-item--active' : ''}`
          }
        >
          <Icon name={item.icon} size={20} />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
