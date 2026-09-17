import './Card.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'accent';
  padding?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}

export function Card({
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  style,
}: CardProps) {
  return (
    <div className={`card card--${variant} card--${padding} ${className}`} style={style}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function CardHeader({ title, subtitle, action }: CardHeaderProps) {
  return (
    <div className="card-header">
      <div>
        <h3 className="card-title">{title}</h3>
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
      </div>
      {action && <div className="card-action">{action}</div>}
    </div>
  );
}
