export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  email: string;
  phone: string;
  address: string;
  bloodType: string;
  insuranceProvider: string;
  insuranceId: string;
  conditions: string[];
  allergies: string[];
  avatar: string;
  status: 'Active' | 'Inactive' | 'Critical';
  lastVisit: string;
  nextAppointment: string | null;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  type: 'Check-up' | 'Follow-up' | 'Emergency' | 'Consultation' | 'Surgery' | 'Lab Test';
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'In Progress';
  notes: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  date: string;
  diagnosis: string;
  treatment: string;
  doctor: string;
  prescription: string[];
  vitals: {
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    weight: number;
    oxygenSaturation: number;
  };
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  avatar: string;
  email: string;
  phone: string;
  patientsCount: number;
  rating: number;
  availability: 'Available' | 'Busy' | 'Off Duty';
}

export interface DashboardStats {
  totalPatients: number;
  todayAppointments: number;
  activeDoctors: number;
  revenue: number;
  bedOccupancy: number;
  emergencyCases: number;
}

export interface MonthlyData {
  month: string;
  patients: number;
  appointments: number;
  revenue: number;
}

export interface DepartmentData {
  name: string;
  patients: number;
  doctors: number;
  color: string;
}
