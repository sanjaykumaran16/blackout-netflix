import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile-select");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        navigate("/profile-select");
      } else {
        setError(result.error);
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1574267432644-f989e36bf404?w=1920&h=1080&fit=crop"
          alt="Background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md animate-fade-in">
        {/* Netflix Logo */}
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-netflix-red text-5xl md:text-6xl font-netflix font-bold tracking-wider">
            NETFLIX
          </h1>
        </div>

        {/* Login Form */}
        <div className="bg-black/75 backdrop-blur-sm rounded-lg p-8 md:p-12 shadow-2xl animate-scale-in">
          <h2 className="text-white text-3xl font-bold mb-6">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-netflix-black-light border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-netflix-black-light border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-netflix-red/20 border border-netflix-red text-netflix-red px-4 py-3 rounded animate-fade-in">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-netflix-red hover:bg-netflix-red-dark text-white font-semibold py-3 rounded transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Demo Credentials Info */}
            <div className="pt-4 border-t border-gray-700">
              <p className="text-gray-400 text-sm mb-2">Demo Credentials:</p>
              <div className="bg-netflix-black-light/50 rounded p-3 space-y-1">
                <p className="text-gray-300 text-xs font-mono">
                  Email: demo@netflix.com
                </p>
                <p className="text-gray-300 text-xs font-mono">
                  Password: ABCD@123
                </p>
              </div>
            </div>

            {/* Additional Options */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-netflix-red" />
                Remember me
              </label>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Need help?
              </a>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-gray-400 text-sm">
            New to Netflix?{" "}
            <a
              href="#"
              className="text-white hover:underline transition-all duration-300"
            >
              Sign up now
            </a>
            .
          </div>

          {/* Terms */}
          <p className="mt-4 text-xs text-gray-500">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Learn more
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
