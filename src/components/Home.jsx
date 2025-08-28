// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Login from "./Login";
// import PatientSignupForm from "./Signup";
// import Report from "./Report";
// import SymptomCheckAlert from "./SymptomCheckAlert";
// import AnalyzeImage from "./AnalyzeImage";
// import AnalyzePrompt from "./AnalyzePrompt";

// export default function Home() {
//   const navigate = useNavigate();
//   const [showAuthForm, setShowAuthForm] = useState(false);
//   const [authMode, setAuthMode] = useState("signup");
//   const [showAlert, setShowAlert] = useState(false);
//   const [activeComponent, setActiveComponent] = useState(null);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [user,setUser] = useState(null);

//   const handleTextSelect = () => {
//     console.log("Text analysis selected");
//     setShowAlert(false);
//     navigate("/analyze-text");
//     setActiveComponent('text');
//   };
  
//   const handleImageSelect = () => {
//     console.log("Image analysis selected");
//     setShowAlert(false);
//     navigate("/analyze-image");
//     setActiveComponent('image');
//   };

//   const openAuthModal = (mode) => {
//     setAuthMode(mode);
//     setShowAuthForm(true);
//     setMobileMenuOpen(false); 
//   };

//   return (
//     <>
//       <header className="w-full bg-black text-white font-medium px-4 py-3 md:px-8 md:py-4">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
        
//           <div className="flex items-center">
//             <img 
//               src="https://t3.ftcdn.net/jpg/03/24/58/44/360_F_324584485_qtdluDzmBNkJvmntEPlNeG1htwPktgCa.jpg" 
//               alt="MediReach Logo" 
//               className="h-8 md:h-10 w-auto invert"
//             />
//             <h2 className="text-lg md:text-xl font-bold ml-2">MediReach</h2>
//           </div>

          
//           <nav className="hidden md:flex items-center gap-5">
//             <a href="#" className="hover:text-red-500 transition-colors duration-200">Features</a>
//             <a href="#" className="hover:text-red-500 transition-colors duration-200">How it works</a>
//             <a href="#" className="hover:text-red-500 transition-colors duration-200">About</a>
//             <a href="#" className="hover:text-red-500 transition-colors duration-200">Contact</a>
            
//             <button 
//               onClick={() => openAuthModal("signup")}
//               className="hover:bg-indigo-600 px-3 py-1.5 rounded-md transition-colors duration-200 text-sm"
//             >
//               SignUp
//             </button>

//             <button 
//               onClick={() => openAuthModal("login")}
//               className="hover:bg-indigo-600 px-3 py-1.5 rounded-md transition-colors duration-200 text-sm"
//             >
//               Login
//             </button>
//             <a href="/profile" className="hover:text-green-500 transition-colors duration-200 text-sm">
//               (response? (response.name):(My Report))
//             </a>
//           </nav>

//           {/* Mobile menu button */}
//           <button 
//             className="md:hidden text-white"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//         </div>

//         {/* Mobile Navigation Menu */}
//         {mobileMenuOpen && (
//           <div className="md:hidden mt-4 bg-gray-900 rounded-lg p-4">
//             <div className="flex flex-col space-y-3">
//               <a href="#" className="hover:text-red-500 transition-colors duration-200 py-2">Features</a>
//               <a href="#" className="hover:text-red-500 transition-colors duration-200 py-2">How it works</a>
//               <a href="#" className="hover:text-red-500 transition-colors duration-200 py-2">About</a>
//               <a href="#" className="hover:text-red-500 transition-colors duration-200 py-2">Contact</a>
              
//     {user ? (
//     <div className="max-w-7xl mx-auto flex items-center justify-between">
//     <a href="/profile" className="hover:text-green-500 transition-colors duration-200 text-sm">
//     {user.name}
//     </a>
//       <button
//       onClick={() => {
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//       setUser(null);
//     }}
//     className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
//   >
//     Logout
//   </button>
//   </div>
//   ) : (
//   <>
//     <button 
//       onClick={() => openAuthModal("signup")}
//       className="hover:bg-indigo-600 px-3 py-1.5 rounded-md transition-colors duration-200 text-sm"
//     >
//       SignUp
//     </button>

//     <button 
//       onClick={() => openAuthModal("login")}
//       className="hover:bg-indigo-600 px-3 py-1.5 rounded-md transition-colors duration-200 text-sm"
//     >
//       Login
//     </button>

//     <a href="/profile" className="hover:text-green-500 transition-colors duration-200 text-sm">
//       My Report
//     </a> 
//   </>
//   )}

//   </div>
//   </div>
//   )}
// </header>

//       {/* Hero section */}
//       <div className="min-h-screen flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 px-4 py-8 md:px-8 md:py-12 bg-violet-200">
//         <div className="text-center md:text-left max-w-2xl md:flex-1">
//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
//             AI-Powered Medical Diagnosis & Prescription Assistance
//           </h1>
//           <p className="text-lg md:text-xl text-gray-600 mb-8">
//             Get preliminary diagnosis and prescription suggestions based on your symptoms 
//           </p>
//         </div>
        
//         <div className="flex flex-col gap-4 items-center w-full max-w-md mx-auto">
//           {!activeComponent && (
//             <button 
//               onClick={() => setShowAlert(true)}
//               className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg text-lg w-full"
//             >
//               Check Symptoms
//             </button>
//           )}

//           {activeComponent === 'text' && <AnalyzePrompt />}
//           {activeComponent === 'image' && <AnalyzeImage />}

//           <SymptomCheckAlert 
//             isOpen={showAlert}
//             onClose={() => setShowAlert(false)}
//             onTextSelect={handleTextSelect}
//             onImageSelect={handleImageSelect}
//           />
           
//           <button 
//             onClick={() => openAuthModal("signup")}
//             className="text-indigo-600 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
//           >
//             Create an account
//           </button>
//         </div>
//       </div>

   
//       {showAuthForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative mx-4">
//             <button
//               className="absolute top-4 right-4 text-gray-500 hover:text-red-500 z-10"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//             {authMode === "login" ? (
//               navigate("/login")
//             ) : (
//               navigate("/signup")
//             )}
//           </div>
//         </div>
//       )}
//     </>    
//   );
// }

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
            <a href="#" className="hover:text-red-500">Contact</a>

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
                <a href="/profile" className="hover:text-green-500 text-sm">My Profile</a>
              </>
            )}
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
              <a href="#" className="hover:text-red-500">Contact</a>

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

      {/* Hero Section */}
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
