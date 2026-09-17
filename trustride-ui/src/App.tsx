import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Landing } from './pages/Landing/Landing';
import { Login } from './pages/Login/Login';
import { OwnerDashboard } from './pages/Owner/OwnerDashboard';
import { OwnerPets } from './pages/Owner/OwnerPets';
import { OwnerWalks } from './pages/Owner/OwnerWalks';
import { OwnerRatings } from './pages/Owner/OwnerRatings';
import { OwnerSettings } from './pages/Owner/OwnerSettings';
import { WalkerDashboard } from './pages/Walker/WalkerDashboard';
import { WalkerAvailable } from './pages/Walker/WalkerAvailable';
import { WalkerHistory } from './pages/Walker/WalkerHistory';
import { WalkerRatings } from './pages/Walker/WalkerRatings';
import { WalkerSettings } from './pages/Walker/WalkerSettings';
import { AdminDashboard } from './pages/Admin/AdminDashboard';
import { AdminUsers } from './pages/Admin/AdminUsers';
import { AdminWalks } from './pages/Admin/AdminWalks';
import { AdminReports } from './pages/Admin/AdminReports';
import { AdminSettings } from './pages/Admin/AdminSettings';
import './styles/global.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          <Route path="/owner" element={<OwnerDashboard />} />
          <Route path="/owner/pets" element={<OwnerPets />} />
          <Route path="/owner/walks" element={<OwnerWalks />} />
          <Route path="/owner/ratings" element={<OwnerRatings />} />
          <Route path="/owner/settings" element={<OwnerSettings />} />

          <Route path="/walker" element={<WalkerDashboard />} />
          <Route path="/walker/available" element={<WalkerAvailable />} />
          <Route path="/walker/history" element={<WalkerHistory />} />
          <Route path="/walker/ratings" element={<WalkerRatings />} />
          <Route path="/walker/settings" element={<WalkerSettings />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/walks" element={<AdminWalks />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/settings" element={<AdminSettings />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
