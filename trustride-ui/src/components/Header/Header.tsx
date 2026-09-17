import { Icon } from '../Icon/Icon';
import './Header.css';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onMenuClick?: () => void;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-left">
        <div>
          <h1 className="header-title">{title}</h1>
          {subtitle && <p className="header-subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="header-right">
        <button className="header-icon-btn" aria-label="Buscar">
          <Icon name="search" size={20} />
        </button>
        <button className="header-icon-btn header-notification" aria-label="Notificaciones">
          <Icon name="bell" size={20} />
          <span className="header-notification-dot"></span>
        </button>
        <div className="header-avatar">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Trustride" alt="Avatar" className="header-avatar-img" />
        </div>
      </div>
    </header>
  );
}
