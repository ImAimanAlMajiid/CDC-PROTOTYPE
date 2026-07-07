import React, { useState } from 'react';
import ViewportWrapper from './components/ViewportWrapper';
import Header from './components/Header';
import Footer from './components/Footer';

// Subpages
import LandingPage from './components/LandingPage';
import LoginRegister from './components/LoginRegister';
import StudentDashboard from './components/StudentDashboard';
import JobListings from './components/JobListings';
import JobDetail from './components/JobDetail';
import CdcPrograms from './components/CdcPrograms';
import StudentProfile from './components/StudentProfile';
import AdminDashboard from './components/AdminDashboard';

// Types & Mock Data
import { Job, CareerEvent, Testimonial, CVReviewSession, UserProfile } from './types';
import { initialJobs, initialEvents, testimonials } from './mockData';

export default function App() {
  // Device & View States
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile' | 'fluid'>('fluid');
  const [activeView, setActiveView] = useState<'landing' | 'login' | 'register' | 'dashboard-student' | 'lowongan-list' | 'lowongan-detail' | 'program-cdc' | 'profil-mahasiswa' | 'dashboard-admin'>('landing');
  const [selectedJobId, setSelectedJobId] = useState<string>('job-1');

  // Search filter sharing between Landing Page quick search & Job listings directory
  const [searchFilters, setSearchFilters] = useState({
    query: '',
    location: '',
    category: ''
  });

  // User Authentication States
  const [userRole, setUserRole] = useState<'guest' | 'mahasiswa' | 'admin'>('guest');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Andi Wijaya',
    nim: '22010199042',
    email: 'andi.wijaya@mahasiswa.ac.id',
    phone: '+62 812-3456-7890',
    education: 'Teknik Informatika',
    gpa: '3.82',
    experience: [
      { 
        role: 'Koordinator Web Himpunan', 
        company: 'Himpunan Mahasiswa Informatika', 
        duration: '2024 - Sekarang', 
        description: 'Memandu tim pengembang dalam membangun sistem pendaftaran acara internal kampus.' 
      }
    ],
    skills: ['React.js', 'Figma UI Design', 'SQL', 'Git', 'HTML/CSS'],
    certificates: [
      'Juara 1 Hackathon Mahasiswa Nasional 2025',
      'Google UX Design Professional Certificate'
    ],
    portfolioUrl: 'https://behance.net/andi_wijaya'
  });

  // Dynamic Content States
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [events, setEvents] = useState<CareerEvent[]>(initialEvents);
  
  // Dynamic Program Submissions
  const [cvReviews, setCvReviews] = useState<CVReviewSession[]>([
    {
      id: 'rev-pre-1',
      fileName: 'CV_Andi_Wijaya_Lama.pdf',
      uploadedAt: '2026-07-04 14:22',
      status: 'Reviewed',
      feedback: 'Konten CV secara struktural sangat baik, namun disarankan menggunakan format urutan kronologis terbalik untuk pengalaman kerja.',
      mentor: 'Saraswati Putri, MBA'
    }
  ]);
  const [coachingBookings, setCoachingBookings] = useState<string[]>([]);

  // Notifications Log
  const [notifications, setNotifications] = useState<string[]>([
    'Selamat datang di Portal Career Development Center (CDC) Universitas!',
    'Grand Campus Hiring 2026 sedang berlangsung. Daftarkan diri Anda segera.'
  ]);

  // Floating Toast State for live UX interactions
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Helper: Trigger floating toast and append notification
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setNotifications(prev => [msg, ...prev]);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // 1. Toggle Bookmark
  const toggleBookmark = (id: string) => {
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === id ? { ...job, isBookmarked: !job.isBookmarked } : job
      )
    );
    const targetJob = jobs.find(j => j.id === id);
    if (targetJob) {
      triggerToast(
        !targetJob.isBookmarked
          ? `Lowongan "${targetJob.position}" berhasil disimpan ke favorit.`
          : `Lowongan "${targetJob.position}" dihapus dari favorit.`
      );
    }
  };

  // 2. Apply for a Job
  const handleApplyJob = (jobId: string, coverLetter: string) => {
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.id === jobId
          ? {
              ...job,
              isApplied: true,
              appliedDate: new Date().toISOString().split('T')[0],
              appliedStatus: 'Pending'
            }
          : job
      )
    );
    const targetJob = jobs.find(j => j.id === jobId);
    if (targetJob) {
      triggerToast(`Lamaran Anda untuk posisi "${targetJob.position}" di ${targetJob.companyName} sukses dikirim!`);
    }
  };

  // 3. Register for Career Event
  const registerForEvent = (id: string) => {
    if (userRole === 'guest') {
      triggerToast('Silakan masuk/daftar akun terlebih dahulu untuk mendaftar event.');
      setActiveView('login');
      return;
    }

    setEvents(prevEvents =>
      prevEvents.map(ev =>
        ev.id === id ? { ...ev, isRegistered: !ev.isRegistered } : ev
      )
    );

    const targetEvent = events.find(e => e.id === id);
    if (targetEvent) {
      triggerToast(
        !targetEvent.isRegistered
          ? `Anda berhasil mendaftar untuk "${targetEvent.title}".`
          : `Pendaftaran Anda untuk "${targetEvent.title}" dibatalkan.`
      );
    }
  };

  const isRegisteredEvent = (id: string) => {
    return events.find(e => e.id === id)?.isRegistered || false;
  };

  // 4. Booking Career Coaching Session
  const handleBookCoaching = (mentorId: string, dateTime: string) => {
    setCoachingBookings(prev => [...prev, mentorId]);
    triggerToast(`Sesi konseling karir Anda berhasil dijadwalkan.`);
  };

  // 5. Uploading a PDF CV for ATS review
  const handleUploadCV = (fileName: string) => {
    const newSession: CVReviewSession = {
      id: `rev-${Date.now()}`,
      fileName,
      uploadedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Pending'
    };
    setCvReviews(prev => [newSession, ...prev]);
    triggerToast(`Dokumen "${fileName}" berhasil diunggah untuk direview oleh konselor.`);
  };

  // 6. Admin: Add New Job
  const handleAddJob = (newJob: Job) => {
    setJobs(prevJobs => [newJob, ...prevJobs]);
    triggerToast(`Lowongan baru "${newJob.position}" di ${newJob.companyName} sukses diterbitkan.`);
  };

  // 7. Admin: Delete Job
  const handleDeleteJob = (id: string) => {
    setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
    triggerToast('Lowongan pekerjaan berhasil dihapus dari portal aktif.');
  };

  // Render current view
  const renderViewContent = () => {
    switch (activeView) {
      case 'landing':
        return (
          <LandingPage
            jobs={jobs}
            events={events}
            testimonials={testimonials}
            setActiveView={setActiveView}
            setSelectedJobId={setSelectedJobId}
            setSearchFilters={setSearchFilters}
            registerForEvent={registerForEvent}
            isRegisteredEvent={isRegisteredEvent}
          />
        );
      case 'login':
        return (
          <LoginRegister
            type="login"
            setActiveView={setActiveView}
            setUserRole={setUserRole}
            setUserProfile={(p) => setUserProfile(prev => ({ ...prev, name: p.name, email: p.email, nim: p.nim }))}
            addNotification={triggerToast}
          />
        );
      case 'register':
        return (
          <LoginRegister
            type="register"
            setActiveView={setActiveView}
            setUserRole={setUserRole}
            setUserProfile={(p) => setUserProfile(prev => ({ ...prev, name: p.name, email: p.email, nim: p.nim }))}
            addNotification={triggerToast}
          />
        );
      case 'dashboard-student':
        return (
          <StudentDashboard
            jobs={jobs}
            events={events}
            userProfile={userProfile}
            setActiveView={setActiveView}
            setSelectedJobId={setSelectedJobId}
          />
        );
      case 'lowongan-list':
        return (
          <JobListings
            jobs={jobs}
            toggleBookmark={toggleBookmark}
            setActiveView={setActiveView}
            setSelectedJobId={setSelectedJobId}
            searchFilters={searchFilters}
            setSearchFilters={setSearchFilters}
          />
        );
      case 'lowongan-detail':
        const selectedJob = jobs.find(job => job.id === selectedJobId);
        return (
          <JobDetail
            job={selectedJob}
            userRole={userRole}
            onBack={() => setActiveView('lowongan-list')}
            onApply={handleApplyJob}
            setActiveView={setActiveView}
          />
        );
      case 'program-cdc':
        return (
          <CdcPrograms
            cvReviews={cvReviews}
            onUploadCV={handleUploadCV}
            coachingBookings={coachingBookings}
            onBookCoaching={handleBookCoaching}
            addNotification={triggerToast}
            userRole={userRole}
            setActiveView={setActiveView}
          />
        );
      case 'profil-mahasiswa':
        return (
          <StudentProfile
            profile={userProfile}
            setProfile={setUserProfile}
            jobs={jobs}
            addNotification={triggerToast}
            setActiveView={setActiveView}
          />
        );
      case 'dashboard-admin':
        return (
          <AdminDashboard
            jobs={jobs}
            onAddJob={handleAddJob}
            onDeleteJob={handleDeleteJob}
            addNotification={triggerToast}
          />
        );
      default:
        return (
          <LandingPage
            jobs={jobs}
            events={events}
            testimonials={testimonials}
            setActiveView={setActiveView}
            setSelectedJobId={setSelectedJobId}
            setSearchFilters={setSearchFilters}
            registerForEvent={registerForEvent}
            isRegisteredEvent={isRegisteredEvent}
          />
        );
    }
  };

  return (
    <ViewportWrapper
      deviceMode={deviceMode}
      setDeviceMode={setDeviceMode}
      activeView={activeView}
      setActiveView={setActiveView}
      userRole={userRole}
      setUserRole={setUserRole}
    >
      <div className="flex-grow flex flex-col justify-between">
        {/* Portal Header */}
        <Header
          activeView={activeView}
          setActiveView={setActiveView}
          userRole={userRole}
          setUserRole={setUserRole}
          userProfile={{ name: userProfile.name, email: userProfile.email }}
          notifications={notifications}
          clearNotifications={() => setNotifications([])}
        />

        {/* Dynamic Page Component Content */}
        <main className="flex-grow flex flex-col">
          {renderViewContent()}
        </main>

        {/* Portal Footer */}
        <Footer setActiveView={setActiveView} />

        {/* Floating Interactive Toast notifications popup */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 bg-slate-900 border border-slate-800 text-white p-4.5 rounded-2xl shadow-2xl flex items-center gap-3 max-w-sm z-[100] animate-bounce">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0"></div>
            <p className="text-xs font-semibold leading-relaxed text-slate-100">{toastMessage}</p>
          </div>
        )}
      </div>
    </ViewportWrapper>
  );
}
