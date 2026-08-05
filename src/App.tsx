import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import ProjectDetailPage from './components/ProjectDetailPage';
import ConsultationForm from './components/ConsultationForm';
import Footer from './components/Footer';
import ActionBarHorizontal from './components/ActionBarHorizontal';
import AIChatbot from './components/AIChatbot';
import EnquiryPopupModal from './components/EnquiryPopupModal';
import { Project, ProjectCategory } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [prefilledProjectName, setPrefilledProjectName] = useState<string | undefined>(undefined);
  const [prefilledCategory, setPrefilledCategory] = useState<ProjectCategory | 'General'>('General');

  // AI Chatbot State
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Enquiry Popup State
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  // Auto Scroll-Trigger Popup Logic ("when we scroll down in projects the popup of enquire should be come only popup")
  useEffect(() => {
    let triggered = false;

    const handleScroll = () => {
      if (triggered) return;
      const dismissed = sessionStorage.getItem('nj_enquiry_popup_dismissed');
      if (dismissed === 'true') return;

      const portfolioSection = document.getElementById('portfolio');
      if (portfolioSection) {
        const rect = portfolioSection.getBoundingClientRect();
        // Trigger when portfolio section enters viewport
        if (rect.top <= window.innerHeight * 0.6) {
          triggered = true;
          setIsEnquiryOpen(true);
        }
      } else if (window.scrollY > 400) {
        triggered = true;
        setIsEnquiryOpen(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseDetails = () => {
    setSelectedProject(null);
  };

  const handleInquireFromModal = (projectName: string, category: string) => {
    setPrefilledProjectName(projectName);
    setPrefilledCategory(category as ProjectCategory);
    setSelectedProject(null);
    setIsEnquiryOpen(true);
  };

  const handleClearPrefill = () => {
    setPrefilledProjectName(undefined);
    setPrefilledCategory('General');
  };

  return (
    <div className="relative min-h-screen bg-stone-950 font-sans text-stone-100 overflow-x-hidden" id="app-root">
      {/* Premium Sticky Navigation - only on main landing view */}
      {!selectedProject && <Header onNavigateHome={() => setSelectedProject(null)} />}

      {/* Main landing sections starting directly from Hero to Signature Projects */}
      {selectedProject ? (
        <ProjectDetailPage
          project={selectedProject}
          onBack={handleCloseDetails}
          onInquire={handleInquireFromModal}
        />
      ) : (
        <main>
          {/* Widescreen visual hero with counter stats */}
          <Hero />

          {/* Signature Projects Gallery (Filterable & Searchable) */}
          <ProjectGrid onSelectProject={handleSelectProject} />

          {/* Dynamic inquiry form synced to Google Sheets */}
          <ConsultationForm
            prefilledProjectName={prefilledProjectName}
            prefilledCategory={prefilledCategory}
            onClearPrefill={handleClearPrefill}
          />
        </main>
      )}

      {/* Left-Hand Side Horizontal Floating Action Bar */}
      <ActionBarHorizontal
        onOpenChat={() => setIsChatOpen(true)}
        onOpenEnquiry={() => setIsEnquiryOpen(true)}
      />

      {/* AI Assistant Chatbot */}
      <AIChatbot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpenEnquiry={() => {
          setIsChatOpen(false);
          setIsEnquiryOpen(true);
        }}
      />

      {/* Scroll-Triggered Google Sheet Enquiry Popup Modal */}
      <EnquiryPopupModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        prefilledProjectName={prefilledProjectName}
      />

      {/* Shared global footer */}
      <Footer onNavigateHome={() => setSelectedProject(null)} />
    </div>
  );
}

