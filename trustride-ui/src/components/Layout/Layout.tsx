import { useState, createContext, useContext, useEffect } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';
import { MobileNav } from '../MobileNav/MobileNav';
import './Layout.css';

const SidebarContext = createContext({ collapsed: false });

export function useSidebar() {
  return useContext(SidebarContext);
}

interface LayoutProps {
  role: 'owner' | 'walker' | 'admin';
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function Layout({ role, title, subtitle, children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', sidebarCollapsed.toString());
  }, [sidebarCollapsed]);

  return (
    <SidebarContext.Provider value={{ collapsed: sidebarCollapsed }}>
      <div className="app-layout">
        <Sidebar role={role} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} collapsed={sidebarCollapsed} />

        <div className={`app-main ${sidebarCollapsed ? 'app-main--collapsed' : ''}`}>
          <Header
            title={title}
            subtitle={subtitle}
            onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          />

          <main className="app-content">
            {children}
          </main>
        </div>

        <MobileNav role={role} />

        {mobileMenuOpen && (
          <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)} />
        )}
      </div>
    </SidebarContext.Provider>
  );
}
