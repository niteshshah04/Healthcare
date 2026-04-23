import React from 'react';
import { Star, Users, Phone, Mail } from 'lucide-react';
import Header from '../components/Header';
import { doctors } from '../data/dummyData';

const Doctors: React.FC = () => {
  return (
    <>
      <Header />

      <div className="stats-grid" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-icon green">
            <Users size={24} />
          </div>
          <div className="stat-info">
            <h4>Total Doctors</h4>
            <div className="stat-value">{doctors.length}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">
            <span style={{ fontSize: 18, fontWeight: 700 }}>
              {doctors.filter((d) => d.availability === 'Available').length}
            </span>
          </div>
          <div className="stat-info">
            <h4>Available Now</h4>
            <div className="stat-value">
              {doctors.filter((d) => d.availability === 'Available').length}
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon amber">
            <Star size={24} />
          </div>
          <div className="stat-info">
            <h4>Avg Rating</h4>
            <div className="stat-value">
              {(doctors.reduce((sum, d) => sum + d.rating, 0) / doctors.length).toFixed(1)}
            </div>
          </div>
        </div>
      </div>

      <div className="doctors-grid">
        {doctors.map((doctor) => (
          <div className="card" key={doctor.id}>
            <div className="doctor-card">
              <div className="doctor-avatar">
                {doctor.name
                  .replace('Dr. ', '')
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <div className="doctor-info">
                <h4>{doctor.name}</h4>
                <p>{doctor.specialty}</p>
                <div className="doctor-meta">
                  <span>
                    <Star size={12} fill="#f59e0b" color="#f59e0b" /> {doctor.rating}
                  </span>
                  <span>
                    <Users size={12} /> {doctor.patientsCount} patients
                  </span>
                  <span
                    className={`badge ${doctor.availability.toLowerCase().replace(' ', '-')}`}
                    style={{ padding: '2px 8px', fontSize: 11 }}
                  >
                    {doctor.availability}
                  </span>
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                gap: 12,
                marginTop: 16,
                paddingTop: 16,
                borderTop: '1px solid #e2e8f0',
              }}
            >
              <div style={{ flex: 1, fontSize: 13, color: '#64748b' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <Mail size={13} /> {doctor.email}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Phone size={13} /> {doctor.phone}
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: 12,
                padding: '8px 12px',
                background: '#f0fdf4',
                borderRadius: 8,
                fontSize: 13,
                color: '#64748b',
              }}
            >
              Department: <strong style={{ color: '#1e293b' }}>{doctor.department}</strong>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Doctors;
