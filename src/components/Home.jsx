import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SymptomCheckAlert from "./SymptomCheckAlert";

export default function Home() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  // Load user from localStorage
    useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleTextSelect = () => {
    setShowAlert(false);
    navigate("/analyze-text");
    setActiveComponent("text");
  };

  const handleImageSelect = () => {
    setShowAlert(false);
    navigate("/analyze-image");
    setActiveComponent("image");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const handleAuthRedirect = (mode) => {
    navigate(`/${mode}`);
  };

  return (
    <>
      <header className="w-full bg-black text-white font-medium px-4 py-3 md:px-8 md:py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://t3.ftcdn.net/jpg/03/24/58/44/360_F_324584485_qtdluDzmBNkJvmntEPlNeG1htwPktgCa.jpg"
              alt="MediReach Logo"
              className="h-8 md:h-10 w-auto invert"
            />
            <h2 className="text-lg md:text-xl font-bold ml-2">MediReach</h2>
          </div>

          <nav className="hidden md:flex items-center gap-5">
            <a href="#" className="hover:text-red-500">Features</a>
            <a href="#" className="hover:text-red-500">How it works</a>
            <a href="#" className="hover:text-red-500">About</a>

            {user ? (
              <>
                <button onClick={handleLogout} className="ml-2 md:flex bg-red-500 px-2 py-1 rounded text-sm">Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => handleAuthRedirect("signup")} className="hover:bg-indigo-600 px-3 py-1.5 rounded-md text-sm">
                  SignUp
                </button>
                <button onClick={() => handleAuthRedirect("login")} className="hover:bg-indigo-600 px-3 py-1.5 rounded-md text-sm">
                  Login
                </button>
              </>
            )}
            <a href="/profile" className="hover:text-green-500 text-sm">My Profile</a>
          </nav>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 bg-gray-900 rounded-lg p-4">
            <div className="flex flex-col space-y-3">
              <a href="#" className="hover:text-red-500">Features</a>
              <a href="#" className="hover:text-red-500">How it works</a>
              <a href="#" className="hover:text-red-500">About</a>

              {user ? (
                <>
                  <a href="/profile" className="hover:text-green-500 text-sm">My Profile</a>
                  <button onClick={handleLogout} className="ml-2 bg-red-500 px-2 py-1 rounded text-sm">Logout</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleAuthRedirect("signup")} className="hover:bg-indigo-600 px-3 py-1.5 rounded-md text-sm">
                    SignUp
                  </button>
                  <button onClick={() => handleAuthRedirect("login")} className="hover:bg-indigo-600 px-3 py-1.5 rounded-md text-sm">
                    Login
                  </button>
                  <a href="/profile" className="hover:text-green-500 text-sm">My Report</a>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      <div className="min-h-screen flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 px-4 py-8 md:px-8 md:py-12 bg-violet-200">
        <div className="text-center md:text-left max-w-2xl md:flex-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
            AI-Powered Medical Diagnosis & Prescription Assistance
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Get preliminary diagnosis and prescription suggestions based on your symptoms 
          </p>
        </div>

        <div className="flex flex-col gap-4 items-center w-full max-w-md mx-auto">
          {!activeComponent && (
            <button 
              onClick={() => setShowAlert(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg text-lg w-full"
            >
              Check Symptoms
            </button>
          )}

          {activeComponent === 'text' && <AnalyzePrompt />}
          {activeComponent === 'image' && <AnalyzeImage />}

          <SymptomCheckAlert 
            isOpen={showAlert}
            onClose={() => setShowAlert(false)}
            onTextSelect={handleTextSelect}
            onImageSelect={handleImageSelect}
          />

          {!user && (
            <button 
              onClick={() => handleAuthRedirect("signup")}
              className="text-indigo-600 font-medium py-2 px-4 rounded-lg"
            >
              Create an account
            </button>
          )}
        </div>
      </div>
    </>
  );
}
