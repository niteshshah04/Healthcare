import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import Header from '../components/Header';
import { patients } from '../data/dummyData';

const Patients: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = patients.filter((p) => {
    const matchesSearch =
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <Header />

      <div className="filter-bar">
        <div className="search-box">
          <Search size={16} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search patients by name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Critical">Critical</option>
          <option value="Inactive">Inactive</option>
        </select>
        <div style={{ marginLeft: 'auto', fontSize: 14, color: '#64748b' }}>
          {filtered.length} patient{filtered.length !== 1 ? 's' : ''} found
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date of Birth</th>
                <th>Gender</th>
                <th>Blood Type</th>
                <th>Conditions</th>
                <th>Status</th>
                <th>Last Visit</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((patient) => (
                <tr key={patient.id}>
                  <td>
                    <div className="patient-info">
                      <div className="patient-avatar">
                        {patient.firstName[0]}
                        {patient.lastName[0]}
                      </div>
                      <div>
                        <div className="patient-name">
                          {patient.firstName} {patient.lastName}
                        </div>
                        <div className="patient-id">{patient.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>{new Date(patient.dateOfBirth).toLocaleDateString()}</td>
                  <td>{patient.gender}</td>
                  <td>
                    <strong>{patient.bloodType}</strong>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {patient.conditions.slice(0, 2).map((c) => (
                        <span className="condition-tag" key={c}>
                          {c}
                        </span>
                      ))}
                      {patient.conditions.length > 2 && (
                        <span className="condition-tag">
                          +{patient.conditions.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${patient.status.toLowerCase()}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td>{new Date(patient.lastVisit).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-link btn-sm"
                      onClick={() => navigate(`/patients/${patient.id}`)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Patients;
