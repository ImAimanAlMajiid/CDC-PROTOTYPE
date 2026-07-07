export interface Job {
  id: string;
  logo: string;
  companyName: string;
  position: string;
  location: string;
  salary: string;
  jobType: 'Full-time' | 'Part-time' | 'Magang' | 'Kontrak';
  category: 'IT & Software' | 'Marketing' | 'Finance' | 'Design' | 'Human Resources' | 'Engineering';
  experience: 'Fresh Graduate' | '1-3 Tahun' | '3-5 Tahun' | 'Senior';
  deadline: string;
  description: string;
  requirements: string[];
  benefits: string[];
  skills: string[];
  isBookmarked?: boolean;
  isApplied?: boolean;
  appliedDate?: string;
  appliedStatus?: 'Pending' | 'Review' | 'Interview' | 'Accepted' | 'Rejected';
}

export interface CareerEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'Webinar' | 'Workshop' | 'Campus Hiring' | 'Seminar';
  banner: string;
  speaker?: string;
  company?: string;
  isRegistered?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  company: string;
  role: string;
  text: string;
}

export interface CareerCoaching {
  id: string;
  mentorName: string;
  mentorTitle: string;
  mentorAvatar: string;
  specialties: string[];
  schedule: string;
}

export interface CVReviewSession {
  id: string;
  fileName: string;
  uploadedAt: string;
  status: 'Pending' | 'Reviewed';
  feedback?: string;
  mentor?: string;
}

export interface CampusHiringSession {
  id: string;
  companyName: string;
  logo: string;
  date: string;
  time: string;
  location: string;
  status: 'Akan Datang' | 'Selesai';
}

export interface UserProfile {
  name: string;
  nim: string;
  email: string;
  phone: string;
  education: string;
  gpa: string;
  experience: {
    role: string;
    company: string;
    duration: string;
    description: string;
  }[];
  skills: string[];
  certificates: string[];
  cvUrl?: string;
  cvName?: string;
  portfolioUrl?: string;
}
