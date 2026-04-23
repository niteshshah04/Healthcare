import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, MapPin, Shield } from 'lucide-react';
import Header from '../components/Header';
import { patients, medicalRecords, appointments } from '../data/dummyData';

const PatientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const patient = patients.find((p) => p.id === id);
  const records = medicalRecords.filter((r) => r.patientId === id);
  const patientAppointments = appointments.filter((a) => a.patientId === id);

  if (!patient) {
    return (
      <>
        <Header />
        <div className="card" style={{ textAlign: 'center', padding: 40 }}>
          <h3>Patient not found</h3>
          <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate('/patients')}>
            Back to Patients
          </button>
        </div>
      </>
    );
  }

  const latestRecord = records[0];

  return (
    <>
      <Header />

      <div className="back-link" onClick={() => navigate('/patients')}>
        <ArrowLeft size={16} /> Back to Patients
      </div>

      <div className="patient-detail-grid">
        {/* Profile Card */}
        <div>
          <div className="card patient-profile-card">
            <div className="avatar-large">
              {patient.firstName[0]}
              {patient.lastName[0]}
            </div>
            <h3>
              {patient.firstName} {patient.lastName}
            </h3>
            <p className="patient-meta">
              {patient.id} · {patient.gender} · {patient.bloodType}
            </p>
            <span
              className={`badge ${patient.status.toLowerCase()}`}
              style={{ marginTop: 8 }}
            >
              {patient.status}
            </span>

            <div className="info-grid">
              <div className="info-item">
                <label>Date of Birth</label>
                <span>{new Date(patient.dateOfBirth).toLocaleDateString()}</span>
              </div>
              <div className="info-item">
                <label>Age</label>
                <span>
                  {new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear()} years
                </span>
              </div>
              <div className="info-item">
                <label><Phone size={12} /> Phone</label>
                <span>{patient.phone}</span>
              </div>
              <div className="info-item">
                <label><Mail size={12} /> Email</label>
                <span style={{ fontSize: 12, wordBreak: 'break-all' }}>{patient.email}</span>
              </div>
              <div className="info-item" style={{ gridColumn: '1 / -1' }}>
                <label><MapPin size={12} /> Address</label>
                <span>{patient.address}</span>
              </div>
              <div className="info-item" style={{ gridColumn: '1 / -1' }}>
                <label><Shield size={12} /> Insurance</label>
                <span>{patient.insuranceProvider} ({patient.insuranceId})</span>
              </div>
            </div>

            {patient.conditions.length > 0 && (
              <div style={{ marginTop: 20, textAlign: 'left' }}>
                <label style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, color: '#64748b', fontWeight: 600 }}>
                  Conditions
                </label>
                <div className="conditions-list">
                  {patient.conditions.map((c) => (
                    <span className="condition-tag" key={c}>{c}</span>
                  ))}
                </div>
              </div>
            )}

            {patient.allergies.length > 0 && (
              <div style={{ marginTop: 16, textAlign: 'left' }}>
                <label style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, color: '#64748b', fontWeight: 600 }}>
                  Allergies
                </label>
                <div className="allergies-list">
                  {patient.allergies.map((a) => (
                    <span className="allergy-tag" key={a}>{a}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Latest Vitals */}
          {latestRecord && (
            <div className="card">
              <div className="card-header">
                <h3>Latest Vitals</h3>
                <span style={{ fontSize: 12, color: '#64748b' }}>
                  {new Date(latestRecord.date).toLocaleDateString()}
                </span>
              </div>
              <div className="vitals-grid">
                <div className="vital-item">
                  <div className="vital-label">Blood Pressure</div>
                  <div className="vital-value">{latestRecord.vitals.bloodPressure}</div>
                  <div className="vital-unit">mmHg</div>
                </div>
                <div className="vital-item">
                  <div className="vital-label">Heart Rate</div>
                  <div className="vital-value">{latestRecord.vitals.heartRate}</div>
                  <div className="vital-unit">bpm</div>
                </div>
                <div className="vital-item">
                  <div className="vital-label">Temperature</div>
                  <div className="vital-value">{latestRecord.vitals.temperature}</div>
                  <div className="vital-unit">°F</div>
                </div>
                <div className="vital-item">
                  <div className="vital-label">Weight</div>
                  <div className="vital-value">{latestRecord.vitals.weight}</div>
                  <div className="vital-unit">lbs</div>
                </div>
                <div className="vital-item">
                  <div className="vital-label">O₂ Saturation</div>
                  <div className="vital-value">{latestRecord.vitals.oxygenSaturation}</div>
                  <div className="vital-unit">%</div>
                </div>
              </div>
            </div>
          )}

          {/* Medical Records */}
          <div className="card">
            <div className="card-header">
              <h3>Medical Records</h3>
            </div>
            {records.length === 0 ? (
              <p style={{ color: '#64748b', fontSize: 14 }}>No medical records available.</p>
            ) : (
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Diagnosis</th>
                      <th>Doctor</th>
                      <th>Prescriptions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((rec) => (
                      <tr key={rec.id}>
                        <td>{new Date(rec.date).toLocaleDateString()}</td>
                        <td style={{ fontWeight: 500 }}>{rec.diagnosis}</td>
                        <td>{rec.doctor}</td>
                        <td>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {rec.prescription.map((p, i) => (
                              <span key={i} style={{ fontSize: 13 }}>• {p}</span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Appointment History */}
          <div className="card">
            <div className="card-header">
              <h3>Appointment History</h3>
            </div>
            {patientAppointments.length === 0 ? (
              <p style={{ color: '#64748b', fontSize: 14 }}>No appointments found.</p>
            ) : (
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Doctor</th>
                      <th>Type</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientAppointments.map((apt) => (
                      <tr key={apt.id}>
                        <td>{new Date(apt.date).toLocaleDateString()}</td>
                        <td>{apt.time}</td>
                        <td>{apt.doctorName}</td>
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientDetail;
