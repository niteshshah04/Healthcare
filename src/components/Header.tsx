import React from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  '/': { title: 'Dashboard', subtitle: 'Welcome back! Here\'s your hospital overview.' },
  '/patients': { title: 'Patients', subtitle: 'Manage and view patient information.' },
  '/appointments': { title: 'Appointments', subtitle: 'Today\'s schedule and upcoming appointments.' },
  '/doctors': { title: 'Doctors', subtitle: 'Medical staff directory and availability.' },
  '/records': { title: 'Medical Records', subtitle: 'Patient medical history and documents.' },
};

const Header: React.FC = () => {
  const location = useLocation();
  const basePath = '/' + (location.pathname.split('/')[1] || '');
  const page = pageTitles[basePath] || pageTitles['/'];

  return (
    <header className="header">
      <div className="header-left">
        <h2>{page.title}</h2>
        <p>{page.subtitle}</p>
      </div>
      <div className="header-right">
        <div className="search-box">
          <Search size={16} color="#94a3b8" />
          <input type="text" placeholder="Search patients, doctors..." />
        </div>
        <button className="btn btn-secondary btn-sm" style={{ position: 'relative' }}>
          <Bell size={18} />
        </button>
        <div className="header-avatar">AD</div>
      </div>
    </header>
  );
};

export default Header;
