import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Header from '../components/Header';
import { appointments } from '../data/dummyData';

const Appointments: React.FC = () => {
  const [dateFilter, setDateFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  const uniqueDates = Array.from(new Set(appointments.map((a) => a.date))).sort();

  const filtered = appointments.filter((a) => {
    const matchesSearch =
      a.patientName.toLowerCase().includes(search.toLowerCase()) ||
      a.doctorName.toLowerCase().includes(search.toLowerCase());
    const matchesDate = dateFilter === 'All' || a.date === dateFilter;
    const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
    return matchesSearch && matchesDate && matchesStatus;
  });

  const statusCounts = {
    Scheduled: appointments.filter((a) => a.status === 'Scheduled').length,
    'In Progress': appointments.filter((a) => a.status === 'In Progress').length,
    Completed: appointments.filter((a) => a.status === 'Completed').length,
    Cancelled: appointments.filter((a) => a.status === 'Cancelled').length,
  };

  return (
    <>
      <Header />

      {/* Status Summary */}
      <div className="stats-grid" style={{ marginBottom: 20 }}>
        {Object.entries(statusCounts).map(([status, count]) => (
          <div
            className="stat-card"
            key={status}
            style={{ cursor: 'pointer' }}
            onClick={() => setStatusFilter(statusFilter === status ? 'All' : status)}
          >
            <div
              className={`stat-icon ${
                status === 'Scheduled'
                  ? 'blue'
                  : status === 'In Progress'
                  ? 'amber'
                  : status === 'Completed'
                  ? 'green'
                  : 'red'
              }`}
            >
              <span style={{ fontSize: 18, fontWeight: 700 }}>{count}</span>
            </div>
            <div className="stat-info">
              <h4>{status}</h4>
              <div className="stat-value" style={{ fontSize: 20 }}>
                {count}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <div className="search-box">
          <Search size={16} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search by patient or doctor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
          <option value="All">All Dates</option>
          {uniqueDates.map((d) => (
            <option key={d} value={d}>
              {new Date(d).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              })}
            </option>
          ))}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Scheduled">Scheduled</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <div style={{ marginLeft: 'auto', fontSize: 14, color: '#64748b' }}>
          {filtered.length} appointment{filtered.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Appointments Table */}
      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Date</th>
                <th>Time</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((apt) => (
                <tr key={apt.id}>
                  <td style={{ fontFamily: 'monospace', fontSize: 13, color: '#64748b' }}>
                    {apt.id}
                  </td>
                  <td>
                    <div className="patient-info">
                      <div className="patient-avatar">
                        {apt.patientName.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <span className="patient-name">{apt.patientName}</span>
                    </div>
                  </td>
                  <td>{apt.doctorName}</td>
                  <td>{apt.department}</td>
                  <td>
                    {new Date(apt.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td>{apt.time}</td>
                  <td>
                    <span className={`badge ${apt.type.toLowerCase().replace(' ', '-')}`}>
                      {apt.type}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${apt.status.toLowerCase().replace(' ', '-')}`}>
                      {apt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notes for today */}
      {filtered.some((a) => a.date === '2026-02-24' && a.notes) && (
        <div className="card" style={{ marginTop: 20 }}>
          <div className="card-header">
            <h3>Appointment Notes — Today</h3>
          </div>
          <div className="activity-list">
            {filtered
              .filter((a) => a.date === '2026-02-24' && a.notes)
              .map((a) => (
                <div className="activity-item" key={a.id}>
                  <div
                    className="activity-dot"
                    style={{
                      backgroundColor:
                        a.status === 'In Progress'
                          ? '#f59e0b'
                          : a.status === 'Scheduled'
                          ? '#3b82f6'
                          : '#22c55e',
                    }}
                  />
                  <div>
                    <div className="activity-text">
                      <strong>{a.patientName}</strong> — {a.notes}
                    </div>
                    <div className="activity-time">
                      {a.time} · {a.doctorName}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Appointments;
