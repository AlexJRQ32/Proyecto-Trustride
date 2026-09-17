import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../components/Icon/Icon';
import { Button } from '../../components/Button/Button';
import './Landing.css';

export function Landing() {
  const navigate = useNavigate();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="landing">
      {/* Navigation */}
      <nav className="landing-nav landing-nav--visible">
        <div className="landing-nav-content">
          <div className="landing-logo">
            <div className="landing-logo-icon">
              <Icon name="paw-print" size={18} color="white" />
            </div>
            <span className="landing-logo-text">Trustride</span>
          </div>
          <div className="landing-nav-links">
            <a href="#features">Cómo funciona</a>
            <a href="#benefits">Beneficios</a>
            <a href="#testimonials">Testimonios</a>
            <a href="#pricing">Precios</a>
          </div>
          <div className="landing-nav-actions">
            <Button variant="ghost" onClick={() => navigate('/login')}>Iniciar sesión</Button>
            <Button onClick={() => navigate('/login')}>Registrarse</Button>
          </div>
          <button className="landing-hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Icon name={mobileMenuOpen ? 'x' : 'menu'} size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-links">
              <a href="#features" onClick={() => setMobileMenuOpen(false)}>Cómo funciona</a>
              <a href="#benefits" onClick={() => setMobileMenuOpen(false)}>Beneficios</a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Testimonios</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Precios</a>
            </div>
            <div className="mobile-menu-actions">
              <Button fullWidth variant="secondary" onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}>Iniciar sesión</Button>
              <Button fullWidth onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}>Registrarse</Button>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="landing-hero">
        <div className="landing-hero-bg">
          <img 
            src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1600&h=900&fit=crop" 
            alt="Paseador con perro" 
            className="hero-bg-image"
          />
          <div className="hero-bg-overlay"></div>
        </div>
        <div className="landing-hero-content">
          <div className="landing-hero-badge">
            <Icon name="shield-check" size={14} />
            Paseadores verificados
          </div>
          <h1>El paseo perfecto para tu mascota</h1>
          <p>Conectamos a dueños de mascotas con paseadores profesionales. Seguimiento en tiempo real y tranquilidad total.</p>
          <div className="landing-hero-actions">
            <Button size="lg" icon={<Icon name="arrow-right" size={18} />} iconPosition="right">
              Encontrar paseador
            </Button>
            <Button size="lg" variant="secondary" className="hero-btn-glass">
              Ver demo
            </Button>
          </div>
          <div className="landing-hero-stats">
            <div className="landing-stat">
              <div className="landing-stat-value">1,200+</div>
              <div className="landing-stat-label">Paseadores</div>
            </div>
            <div className="landing-stat-divider"></div>
            <div className="landing-stat">
              <div className="landing-stat-value">15K+</div>
              <div className="landing-stat-label">Paseos</div>
            </div>
            <div className="landing-stat-divider"></div>
            <div className="landing-stat">
              <div className="landing-stat-value">4.8</div>
              <div className="landing-stat-label">Calificación</div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <span>Desplázate</span>
          <Icon name="arrow-down" size={18} color="rgba(255,255,255,0.7)" />
        </div>
      </section>

      {/* How it works */}
      <section className="landing-how" id="features">
        <div className="landing-section-content">
          <div className="landing-section-header">
            <div className="landing-section-badge">Cómo funciona</div>
            <h2>3 pasos simples para comenzar</h2>
            <p>Encuentra al paseador perfecto en minutos, no en horas.</p>
          </div>
          <div className="steps-grid">
            {steps.map((step, index) => (
              <div key={step.title} className="step-card" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="step-number">{index + 1}</div>
                <div className="step-icon">
                  <Icon name={step.icon} size={32} />
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="landing-features">
        <div className="landing-section-content">
          <div className="landing-section-header">
            <div className="landing-section-badge">Características</div>
            <h2>Todo lo que necesitas</h2>
            <p>Herramientas diseñadas para la tranquilidad de los dueños y el éxito de los paseadores.</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={feature.title} className="feature-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`feature-icon feature-icon--${feature.color}`}>
                  <Icon name={feature.icon} size={24} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="landing-benefits" id="benefits">
        <div className="landing-section-content">
          <div className="benefits-layout">
            <div className="benefits-text">
              <div className="landing-section-badge">Para dueños</div>
              <h2>Tu mascota en buenas manos</h2>
              <p>Sabemos que tu mascota es familia. Por eso cada paseador pasa por un proceso de verificación riguroso.</p>
              <ul className="benefits-list">
                <li>
                  <Icon name="check-circle" size={20} color="#34c759" />
                  <span>Seguimiento GPS en tiempo real</span>
                </li>
                <li>
                  <Icon name="check-circle" size={20} color="#34c759" />
                  <span>Fotos durante el paseo</span>
                </li>
                <li>
                  <Icon name="check-circle" size={20} color="#34c759" />
                  <span>Pago seguro y protegido</span>
                </li>
                <li>
                  <Icon name="check-circle" size={20} color="#34c759" />
                  <span>Reseñas y calificaciones reales</span>
                </li>
              </ul>
              <Button size="lg" onClick={() => navigate('/login')}>
                Crear cuenta gratis
              </Button>
            </div>
            <div className="benefits-visual">
              <div className="benefits-phone">
                <div className="phone-screen">
                  <div className="phone-header">
                    <div className="phone-time">9:41</div>
                    <div className="phone-notch"></div>
                  </div>
                  <div className="phone-content">
                    <div className="phone-map">
                      <Icon name="map-pin" size={32} color="var(--accent)" />
                    </div>
                    <div className="phone-card">
                      <div className="phone-card-header">
                        <div className="phone-card-avatar">
                          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria" alt="María" />
                        </div>
                        <div>
                          <div className="phone-card-name">María García</div>
                          <div className="phone-card-status">En camino con Max</div>
                        </div>
                      </div>
                      <div className="phone-card-progress">
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: '65%' }}></div>
                        </div>
                        <div className="progress-text">65% completado</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="landing-testimonials" id="testimonials">
        <div className="landing-section-content">
          <div className="landing-section-header">
            <div className="landing-section-badge">Testimonios</div>
            <h2>Lo que dicen nuestros usuarios</h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className={`testimonial-card ${index === activeTestimonial ? 'testimonial-card--active' : ''}`}
              >
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="star" size={16} color="#ff9500" />
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <img src={testimonial.avatar} alt={testimonial.name} className="testimonial-avatar" />
                  <div>
                    <div className="testimonial-name">{testimonial.name}</div>
                    <div className="testimonial-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="testimonials-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`testimonial-dot ${index === activeTestimonial ? 'testimonial-dot--active' : ''}`}
                onClick={() => setActiveTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="landing-pricing" id="pricing">
        <div className="landing-section-content">
          <div className="landing-section-header">
            <div className="landing-section-badge">Precios</div>
            <h2>Simple y transparente</h2>
            <p>Sin costos ocultos. Paga solo por lo que uses.</p>
          </div>
          <div className="pricing-grid">
            {pricing.map((plan) => (
              <div key={plan.name} className={`pricing-card ${plan.featured ? 'pricing-card--featured' : ''}`}>
                {plan.featured && <div className="pricing-badge">Más popular</div>}
                <h3>{plan.name}</h3>
                <div className="pricing-price">
                  <span className="pricing-amount">{plan.price}</span>
                  <span className="pricing-period">/paseo</span>
                </div>
                <p className="pricing-description">{plan.description}</p>
                <ul className="pricing-features">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <Icon name="check" size={16} color="#34c759" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  fullWidth
                  variant={plan.featured ? 'primary' : 'secondary'}
                  onClick={() => navigate('/login')}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta">
        <div className="landing-section-content">
          <div className="cta-content">
            <h2>¿Listo para empezar?</h2>
            <p>Únete a miles de dueños que ya confían en Trustride para el paseo de su mascota.</p>
            <div className="cta-actions">
              <Button size="lg" icon={<Icon name="arrow-right" size={18} />} iconPosition="right">
                Crear cuenta gratis
              </Button>
              <Button size="lg" variant="secondary" className="cta-secondary-btn">
                Contactar soporte
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-section-content">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="landing-logo">
                <div className="landing-logo-icon">
                  <Icon name="paw-print" size={20} color="white" />
                </div>
                <span className="landing-logo-text">Trustride</span>
              </div>
              <p>Conectando mascotas con paseadores de confianza desde 2024.</p>
              <div className="footer-social">
                <a href="#"><Icon name="instagram" size={18} /></a>
                <a href="#"><Icon name="twitter" size={18} /></a>
                <a href="#"><Icon name="facebook" size={18} /></a>
              </div>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Producto</h4>
                <a href="#">Para dueños</a>
                <a href="#">Para paseadores</a>
                <a href="#">Precios</a>
              </div>
              <div className="footer-column">
                <h4>Empresa</h4>
                <a href="#">Sobre nosotros</a>
                <a href="#">Blog</a>
                <a href="#">Contacto</a>
              </div>
              <div className="footer-column">
                <h4>Legal</h4>
                <a href="#">Privacidad</a>
                <a href="#">Términos</a>
                <a href="#">Cookies</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Trustride. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

const steps = [
  {
    icon: 'user-plus',
    title: 'Crea tu cuenta',
    description: 'Regístrate gratis en segundos con tu email o redes sociales.',
  },
  {
    icon: 'map-pin',
    title: 'Publica tu paseo',
    description: 'Indica la hora, duración y ruta que prefieres para el paseo.',
  },
  {
    icon: 'paw-print',
    title: 'Elige tu paseador',
    description: 'Recibe ofertas de paseadores cercanos y elige el mejor.',
  },
];

const features = [
  {
    icon: 'shield-check',
    title: 'Paseadores verificados',
    description: 'Todos nuestros paseadores pasan por un proceso de verificación riguroso.',
    color: 'blue',
  },
  {
    icon: 'map-pin',
    title: 'Seguimiento en tiempo real',
    description: 'Sabe exactamente dónde está tu mascota durante todo el paseo.',
    color: 'green',
  },
  {
    icon: 'camera',
    title: 'Fotos durante el paseo',
    description: 'Recibe fotos de tu mascota disfrutando del paseo.',
    color: 'orange',
  },
  {
    icon: 'credit-card',
    title: 'Pagos seguros',
    description: 'Paga de forma segura con tarjeta, sin efectivo ni sorpresas.',
    color: 'purple',
  },
  {
    icon: 'star',
    title: 'Calificaciones reales',
    description: 'Lee reseñas de otros dueños antes de elegir paseador.',
    color: 'yellow',
  },
  {
    icon: 'clock',
    title: 'Flexible y conveniente',
    description: 'Agenda paseos cuando quieras, desde express hasta recurrentes.',
    color: 'teal',
  },
];

const testimonials = [
  {
    name: 'Carlos Ruiz',
    role: 'Dueño de Max',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    text: 'María es increíble. Max la espera todos los días con la cola moviéndose. El seguimiento GPS me da mucha tranquilidad.',
  },
  {
    name: 'Laura Díaz',
    role: 'Dueña de Coco y Luna',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura',
    text: 'Como trabajo todo el día, Trustride me salvó. Mis paseadoras son profesionales y mis perros están felices.',
  },
  {
    name: 'Pedro Sánchez',
    role: 'Paseador profesional',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro',
    text: 'Gracias a Trustride duplicué mis ingresos. La app es fácil de usar y los pagos son puntuales.',
  },
];

const pricing = [
  {
    name: 'Básico',
    price: '₡2,500',
    description: 'Perfecto para paseos ocasionales',
    features: [
      'Paseo de 30 minutos',
      'Seguimiento GPS',
      '1 mascota por paseo',
      'Pago después del paseo',
    ],
    cta: 'Comenzar',
    featured: false,
  },
  {
    name: 'Premium',
    price: '₡4,000',
    description: 'Para mascotas que necesitan más',
    features: [
      'Paseo de 60 minutos',
      'Seguimiento GPS en tiempo real',
      'Hasta 3 mascotas por paseo',
      'Fotos durante el paseo',
      'Paseador favorito recurrente',
    ],
    cta: 'Elegir Premium',
    featured: true,
  },
  {
    name: 'Comunidad',
    price: '₡6,000',
    description: 'Ideal para familias y grupos de vecinos',
    features: [
      'Paseos ilimitados por semana',
      'Hasta 5 mascotas por paseo',
      'Horarios flexibles',
      'Soporte prioritario',
      'Descuentos para comunidades',
    ],
    cta: 'Unirse a comunidad',
    featured: false,
  },
];
