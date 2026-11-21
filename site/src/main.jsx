import React, { useCallback, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './styles.css';
import './ui.css';
import { PlanProvider, planMessage, planProgress, usePlan } from './lib/plan';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { EnquiryDialog } from './components/EnquiryDialog';
import { ChatButton, Toast } from './components/ui';
import {
  About, ClassDetail, Contact, Exams, Features, Fees, Home, Learn, NotFound,
  PlanPage, Privacy, Reviews, Syllabus, Teachers,
} from './pages';
import { ClassesSection } from './components/Classes';

const GENERAL = 'Assalamu alaikum Zaaf, I would like to know more about learning with you.';

function Route_Classes() {
  return <ClassesSection standalone />;
}

function ScrollAndTitle() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const target = document.querySelector(hash);
      if (target) { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  useEffect(() => {
    const title = pathname === '/'
      ? 'Your syllabus, your pace, your mentor'
      : pathname.split('/').filter(Boolean).map(s => s.replaceAll('-', ' ')).join(' · ');
    document.title = `${title.charAt(0).toUpperCase() + title.slice(1)} | Zaaf Academy`;
  }, [pathname]);
  return null;
}

// The fixed bar on a phone is the most-tapped thing on the site, so it reflects
// how much of the plan is already answered.
function MobileAction() {
  const { plan } = usePlan();
  const { done, total } = planProgress(plan);
  return <div className="mobile-action">
    <ChatButton
      context={done ? 'mobile-bar-plan' : 'mobile-bar'}
      message={done ? planMessage(plan) : undefined}
    >{done ? `Send my plan · ${done}/${total}` : 'Let’s talk about learning'}</ChatButton>
  </div>;
}

function App() {
  const [enquiry, setEnquiry] = useState(null);
  const [toast, setToast] = useState(null);

  const onEnquire = useCallback((message, context = 'general') => {
    setEnquiry({ message: message || GENERAL, context });
  }, []);

  return <PlanProvider onEnquire={onEnquire}>
    <BrowserRouter>
      <ScrollAndTitle />
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/classes" element={<Route_Classes />} />
          <Route path="/classes/:slug" element={<ClassDetail />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/fees" element={<Fees />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/teach" element={<Contact teaching />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/syllabus/:board" element={<Syllabus />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <MobileAction />
      {enquiry && <EnquiryDialog
        message={enquiry.message}
        context={enquiry.context}
        close={() => setEnquiry(null)}
        onCopied={setToast}
      />}
      <Toast message={toast} onDone={() => setToast(null)} />
    </BrowserRouter>
  </PlanProvider>;
}

createRoot(document.getElementById('root')).render(<App />);
