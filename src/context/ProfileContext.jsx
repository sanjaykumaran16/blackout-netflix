import { createContext, useContext, useState, useEffect } from 'react';

const ProfileContext = createContext();

const DEFAULT_PROFILES = [
  { id: '1', name: 'Demo', avatar: 'D', isKids: false },
  { id: '2', name: 'Kids', avatar: 'K', isKids: true },
];

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return context;
};

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState(DEFAULT_PROFILES);
  const [currentProfileId, setCurrentProfileId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('netflix_profiles');
    const savedCurrent = localStorage.getItem('netflix_current_profile');
    if (saved) {
      try {
        setProfiles(JSON.parse(saved));
      } catch (_) {}
    }
    if (savedCurrent) setCurrentProfileId(savedCurrent);
    else if (profiles.length) setCurrentProfileId(profiles[0].id);
  }, []);

  useEffect(() => {
    if (profiles.length) localStorage.setItem('netflix_profiles', JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    if (currentProfileId) localStorage.setItem('netflix_current_profile', currentProfileId);
  }, [currentProfileId]);

  const currentProfile = profiles.find((p) => p.id === currentProfileId) || profiles[0];
  const setCurrentProfile = (id) => setCurrentProfileId(id);

  const value = {
    profiles,
    currentProfile,
    currentProfileId,
    setCurrentProfile,
    setProfiles,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};
