import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../components/Icon/Icon';
import { Button } from '../../components/Button/Button';
import './Login.css';

export function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'owner' | 'walker' | 'admin'>('owner');

  const handleLogin = () => {
    navigate(`/${selectedRole}`);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left side - Branding */}
        <div className="login-branding">
          <div className="login-brand-content">
            <div className="login-logo">
              <div className="login-logo-icon">
                <Icon name="paw-print" size={24} color="var(--accent)" />
              </div>
              <span className="login-logo-text">Trustride</span>
            </div>
            <h1>Tu paseador de confianza</h1>
            <p>Conectamos a dueños de mascotas con paseadores verificados y confiables.</p>

            <div className="login-features">
              <div className="login-feature">
                <div className="login-feature-icon">
                  <Icon name="shield-check" size={20} />
                </div>
                <div>
                  <div className="login-feature-title">Paseadores verificados</div>
                  <div className="login-feature-desc">Todos pasan por un proceso de verificación</div>
                </div>
              </div>
              <div className="login-feature">
                <div className="login-feature-icon">
                  <Icon name="map-pin" size={20} />
                </div>
                <div>
                  <div className="login-feature-title">Seguimiento en tiempo real</div>
                  <div className="login-feature-desc">Sabe dónde está tu mascota en todo momento</div>
                </div>
              </div>
              <div className="login-feature">
                <div className="login-feature-icon">
                  <Icon name="star" size={20} />
                </div>
                <div>
                  <div className="login-feature-title">Sistema de calificaciones</div>
                  <div className="login-feature-desc">Elige al mejor paseador con reseñas reales</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="login-form-container">
          <div className="login-form">
            <h2>Iniciar sesión</h2>
            <p className="login-subtitle">Selecciona tu rol para continuar</p>

            {/* Role selector */}
            <div className="role-selector">
              {roles.map((role) => (
                <button
                  key={role.value}
                  className={`role-option ${selectedRole === role.value ? 'role-option--active' : ''}`}
                  onClick={() => setSelectedRole(role.value)}
                >
                  <div className="role-icon">
                    <Icon name={role.icon} size={24} />
                  </div>
                  <div className="role-label">{role.label}</div>
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="tu@email.com"
                  defaultValue="carlos@trustride.com"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Contraseña</label>
                <div className="form-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-input"
                    placeholder="••••••••"
                    defaultValue="password123"
                  />
                  <button
                    type="button"
                    className="form-input-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Icon name={showPassword ? 'eye-off' : 'eye'} size={18} />
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="form-checkbox">
                  <input type="checkbox" defaultChecked />
                  <span>Recordarme</span>
                </label>
                <a href="#" className="form-forgot">¿Olvidaste tu contraseña?</a>
              </div>

              <Button type="submit" fullWidth icon={<Icon name="arrow-right" size={18} />} iconPosition="right">
                Iniciar sesión
              </Button>
            </form>

            <div className="login-divider">
              <span>o continúa con</span>
            </div>

            <div className="social-buttons">
              <button className="social-btn">
                <Icon name="chrome" size={20} />
                Google
              </button>
              <button className="social-btn">
                <Icon name="facebook" size={20} />
                Facebook
              </button>
            </div>

            <p className="login-footer">
              ¿No tienes cuenta? <a href="#">Regístrate gratis</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const roles = [
  { value: 'owner' as const, label: 'Dueño', icon: 'dog' },
  { value: 'walker' as const, label: 'Paseador', icon: 'map-pin' },
  { value: 'admin' as const, label: 'Admin', icon: 'settings' },
];
