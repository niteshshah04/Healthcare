import React from 'react';
import { FileText } from 'lucide-react';
import Header from '../components/Header';
import { medicalRecords, patients } from '../data/dummyData';

const Records: React.FC = () => {
  const enrichedRecords = medicalRecords.map((rec) => {
    const patient = patients.find((p) => p.id === rec.patientId);
    return { ...rec, patientName: patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown' };
  });

  return (
    <>
      <Header />

      <div className="stats-grid" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <div className="stat-icon purple">
            <FileText size={24} />
          </div>
          <div className="stat-info">
            <h4>Total Records</h4>
            <div className="stat-value">{medicalRecords.length}</div>
          </div>
        </div>
      </div>

      {enrichedRecords.map((rec) => (
        <div className="card" key={rec.id} style={{ marginBottom: 20 }}>
          <div className="card-header">
            <div>
              <h3 style={{ fontSize: 15 }}>{rec.diagnosis}</h3>
              <p style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>
                {rec.patientName} · {new Date(rec.date).toLocaleDateString()} · {rec.doctor}
              </p>
            </div>
            <span
              style={{
                fontSize: 12,
                fontFamily: 'monospace',
                color: '#94a3b8',
              }}
            >
              {rec.id}
            </span>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                color: '#64748b',
                fontWeight: 600,
              }}
            >
              Treatment
            </label>
            <p style={{ fontSize: 14, marginTop: 4 }}>{rec.treatment}</p>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                color: '#64748b',
                fontWeight: 600,
              }}
            >
              Prescriptions
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
              {rec.prescription.map((p, i) => (
                <span className="condition-tag" key={i}>
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div className="vitals-grid">
            <div className="vital-item">
              <div className="vital-label">Blood Pressure</div>
              <div className="vital-value" style={{ fontSize: 18 }}>
                {rec.vitals.bloodPressure}
              </div>
              <div className="vital-unit">mmHg</div>
            </div>
            <div className="vital-item">
              <div className="vital-label">Heart Rate</div>
              <div className="vital-value" style={{ fontSize: 18 }}>
                {rec.vitals.heartRate}
              </div>
              <div className="vital-unit">bpm</div>
            </div>
            <div className="vital-item">
              <div className="vital-label">Temperature</div>
              <div className="vital-value" style={{ fontSize: 18 }}>
                {rec.vitals.temperature}
              </div>
              <div className="vital-unit">°F</div>
            </div>
            <div className="vital-item">
              <div className="vital-label">Weight</div>
              <div className="vital-value" style={{ fontSize: 18 }}>
                {rec.vitals.weight}
              </div>
              <div className="vital-unit">lbs</div>
            </div>
            <div className="vital-item">
              <div className="vital-label">O₂ Saturation</div>
              <div className="vital-value" style={{ fontSize: 18 }}>
                {rec.vitals.oxygenSaturation}
              </div>
              <div className="vital-unit">%</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Records;
