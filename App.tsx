
import React, { useState, useEffect } from 'react';
import { ViewMode } from './types';
import { supabase } from './services/supabaseService';
import { Landing } from './components/Landing';
import { Dashboard } from './components/Dashboard';
import { MentorWorkspace } from './components/MentorWorkspace';
import { PracticeArena } from './components/PracticeArena';
import { Profile } from './components/Profile';
import { Auth } from './components/Auth';

const App = () => {
  const [view, setView] = useState<ViewMode>('LANDING');
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      // Auto-redirect logic
      if (session && (view === 'AUTH' || view === 'LANDING')) {
        setView('DASHBOARD');
      } else if (!session && view !== 'LANDING') {
        setView('AUTH');
      }
    });

    return () => subscription.unsubscribe();
  }, [view]);

  // Handle flow from Landing
  const handleStart = () => {
    if (session) {
      setView('DASHBOARD');
    } else {
      setView('AUTH');
    }
  };

  if (loading) return null;

  return (
    <>
      {view === 'LANDING' && <Landing onStart={handleStart} />}
      {view === 'AUTH' && <Auth onLogin={() => setView('DASHBOARD')} />}
      {view === 'DASHBOARD' && <Dashboard setView={setView} />}
      {view === 'MENTOR' && <MentorWorkspace onBack={() => setView('DASHBOARD')} />}
      {view === 'PRACTICE' && <PracticeArena onBack={() => setView('DASHBOARD')} />}
      {view === 'PROFILE' && <Profile onBack={() => setView('DASHBOARD')} />}
    </>
  );
};

export default App;
