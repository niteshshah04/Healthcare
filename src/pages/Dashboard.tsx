import React from 'react';
import {
  Users,
  CalendarDays,
  Stethoscope,
  DollarSign,
  BedDouble,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Header from '../components/Header';
import {
  dashboardStats,
  monthlyData,
  departmentData,
  appointments,
} from '../data/dummyData';

const Dashboard: React.FC = () => {
  const todayAppointments = appointments.filter(
    (a) => a.date === '2026-02-24'
  );

  const recentActivity = [
    { text: 'James Williams admitted to Cardiology — Emergency', color: '#ef4444', time: '30 min ago' },
    { text: 'Sarah Johnson lab results received — HbA1c: 7.2%', color: '#3b82f6', time: '1 hour ago' },
    { text: 'Dr. Amanda Foster started emergency consultation', color: '#f59e0b', time: '1.5 hours ago' },
    { text: 'Michael Thompson vitals updated — O₂ Sat: 91%', color: '#ef4444', time: '2 hours ago' },
    { text: 'Maria Garcia check-up scheduled for today', color: '#22c55e', time: '3 hours ago' },
  ];

  return (
    <>
      <Header />

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue"><Users size={24} /></div>
          <div className="stat-info">
            <h4>Total Patients</h4>
            <div className="stat-value">{dashboardStats.totalPatients.toLocaleString()}</div>
            <div className="stat-change up"><TrendingUp size={12} /> +12% this month</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><CalendarDays size={24} /></div>
          <div className="stat-info">
            <h4>Today's Appointments</h4>
            <div className="stat-value">{dashboardStats.todayAppointments}</div>
            <div className="stat-change up"><TrendingUp size={12} /> +5 from yesterday</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple"><Stethoscope size={24} /></div>
          <div className="stat-info">
            <h4>Active Doctors</h4>
            <div className="stat-value">{dashboardStats.activeDoctors}</div>
            <div className="stat-change up"><TrendingUp size={12} /> Full staff today</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon amber"><DollarSign size={24} /></div>
          <div className="stat-info">
            <h4>Monthly Revenue</h4>
            <div className="stat-value">${(dashboardStats.revenue / 1000).toFixed(0)}K</div>
            <div className="stat-change up"><TrendingUp size={12} /> +8% vs last month</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon cyan"><BedDouble size={24} /></div>
          <div className="stat-info">
            <h4>Bed Occupancy</h4>
            <div className="stat-value">{dashboardStats.bedOccupancy}%</div>
            <div className="stat-change down">↓ 3% from peak</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red"><AlertTriangle size={24} /></div>
          <div className="stat-info">
            <h4>Emergency Cases</h4>
            <div className="stat-value">{dashboardStats.emergencyCases}</div>
            <div className="stat-change down">↓ 2 from yesterday</div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="charts-grid">
        {/* Patient & Appointment Trends */}
        <div className="card">
          <div className="card-header">
            <h3>Patient & Appointment Trends</h3>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0f766e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0f766e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="patients"
                stroke="#0f766e"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPatients)"
              />
              <Area
                type="monotone"
                dataKey="appointments"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorAppointments)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Department Distribution */}
        <div className="card">
          <div className="card-header">
            <h3>Departments</h3>
          </div>
          <div className="dept-bar-list">
            {departmentData.map((dept) => (
              <div className="dept-bar-item" key={dept.name}>
                <div className="dept-bar-label">
                  <span>{dept.name}</span>
                  <span>{dept.patients} patients</span>
                </div>
                <div className="dept-bar-track">
                  <div
                    className="dept-bar-fill"
                    style={{
                      width: `${(dept.patients / 300) * 100}%`,
                      backgroundColor: dept.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="charts-grid">
        {/* Today's Appointments */}
        <div className="card">
          <div className="card-header">
            <h3>Today's Appointments</h3>
            <span style={{ fontSize: 13, color: '#64748b' }}>
              {todayAppointments.length} appointments
            </span>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Time</th>
                  <th>Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {todayAppointments.map((apt) => (
                  <tr key={apt.id}>
                    <td>
                      <div className="patient-info">
                        <div className="patient-avatar">
                          {apt.patientName.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <span className="patient-name">{apt.patientName}</span>
                      </div>
                    </td>
                    <td>{apt.doctorName}</td>
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

        {/* Recent Activity */}
        <div className="card">
          <div className="card-header">
            <h3>Recent Activity</h3>
          </div>
          <div className="activity-list">
            {recentActivity.map((item, i) => (
              <div className="activity-item" key={i}>
                <div className="activity-dot" style={{ backgroundColor: item.color }} />
                <div>
                  <div className="activity-text">{item.text}</div>
                  <div className="activity-time">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
