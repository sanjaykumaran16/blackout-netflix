import { useNavigate } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';

const ProfileSelect = () => {
  const { profiles, setCurrentProfile } = useProfile();
  const navigate = useNavigate();

  const handleSelect = (id) => {
    setCurrentProfile(id);
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-netflix-black flex flex-col items-center justify-center px-4">
      <h1 className="text-white text-4xl md:text-6xl font-bold mb-12 text-center">
        Who&apos;s watching?
      </h1>
      <div className="flex flex-wrap justify-center gap-8 max-w-4xl">
        {profiles.map((profile) => (
          <button
            key={profile.id}
            onClick={() => handleSelect(profile.id)}
            className="flex flex-col items-center gap-3 group"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden border-2 border-transparent group-hover:border-white transition-all duration-300 flex items-center justify-center bg-netflix-black-light group-hover:scale-105">
              <span className="text-4xl md:text-5xl font-bold text-gray-400 group-hover:text-white transition-colors">
                {profile.avatar}
              </span>
            </div>
            <span className="text-gray-400 group-hover:text-white text-lg transition-colors">
              {profile.name}
            </span>
          </button>
        ))}
        <button
          onClick={() => handleSelect(profiles[0]?.id)}
          className="flex flex-col items-center gap-3 group"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-lg border-2 border-gray-600 flex items-center justify-center group-hover:border-gray-500 transition-all">
            <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="text-gray-500 text-lg">Add Profile</span>
        </button>
      </div>
      <button
        onClick={() => navigate('/home')}
        className="mt-12 px-6 py-2 border border-gray-600 text-gray-400 hover:text-white hover:border-white transition-all"
      >
        Manage Profiles
      </button>
    </div>
  );
};

export default ProfileSelect;
