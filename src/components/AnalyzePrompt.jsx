import { useState } from "react";
import { useNavigate } from "react-router";

export default function AnalyzePrompt() {
    const navigate = useNavigate();
    const [result, setResult] = useState(null);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAnalyze = async () => {
        if (!inputText.trim()) return alert("Please enter a description of your symptoms.");

        setIsLoading(true);
        setResult(null);

        try {
            const response = await fetch("http://localhost:8080/analyze-text", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ text: inputText })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log("OpenAI response:", data);
            setResult(data);
        } catch (err) {
            console.log("Error analyzing symptoms:", err);
            setResult({ error: err.message });
        } finally {
            setIsLoading(false);
        }
    };

    const renderResults = () => {
        if (!result || result.error) {
            return (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 text-center">
                    <div className="text-red-600 text-4xl sm:text-5xl mb-3 sm:mb-4">⚠️</div>
                    <h3 className="text-red-800 font-semibold text-base sm:text-lg mb-2">Analysis Error</h3>
                    <p className="text-red-600 text-sm sm:text-base">{result?.error || "Unknown error occurred"}</p>
                </div>
            );
        }
    };

    return (
        <div className="container mx-auto p-3 sm:p-4 mt-4">
            <button 
                onClick={() => navigate("/")}
                className="mb-4 sm:mb-6 text-blue-500 hover:text-blue-700 flex items-center text-sm sm:text-base"
            >
                <span>🡰</span> Back to Home
            </button>
            
            {!result? (
            <div className="max-w-2xl mx-auto p-4 sm:p-6 flex justify-center">
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Symptom Checker</h1>
                    <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
                        Describe your symptoms in detail and get AI-powered insights about your condition.
                    </p>

                    <div className="mb-4 sm:mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Symptom Description</label>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            rows={5}
                            placeholder="e.g., I've had a persistent cough, slight fever, and fatigue for three days..."
                            className="w-full border border-gray-300 rounded-lg p-3 text-sm sm:text-base resize-none focus:outline-none focus:ring focus:border-blue-400"
                        />
                    </div>

                    <button 
                        onClick={handleAnalyze} 
                        disabled={isLoading || !inputText.trim()}
                        className={`w-full py-2 sm:py-3 px-4 rounded-lg font-medium text-white transition-colors text-sm sm:text-base ${
                            isLoading || !inputText.trim() 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Analyzing...
                            </div>
                        ) : (
                            'Analyze Symptoms'
                        )}
                    </button>

                    {result && (
                        <div className="mt-6 sm:mt-8">
                            {renderResults()}
                        </div>
                    )}
                </div>
            </div>
            ) : (  
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm">
                <div className="text-center mb-4 sm:mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full mb-3">
                        <span className="text-xl sm:text-2xl">🩺</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Health Analysis</h2>
                    <p className="text-gray-600 text-sm sm:text-base">AI-powered symptom insights</p>
                </div>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-100 shadow-xs">
                        <div className="flex items-center mb-2">
                            <span className="text-blue-600 text-lg sm:text-xl mr-2">🩺</span>
                            <h3 className="font-semibold text-gray-700 text-sm sm:text-base">Possible Conditions</h3>
                        </div>
                        <p className="text-gray-800 text-base sm:text-lg">{result.possibleConditions || "Not specified"}</p>
                    </div>

                    <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-100 shadow-xs">
                        <div className="flex items-center mb-2">
                            <span className="text-yellow-600 text-lg sm:text-xl mr-2">⏰</span>
                            <h3 className="font-semibold text-gray-700 text-sm sm:text-base">Urgency</h3>
                        </div>
                        <p className="text-gray-800 text-base sm:text-lg">{result.urgency || "Not specified"}</p>
                    </div>

                    <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-100 shadow-xs">
                        <div className="flex items-center mb-2">
                            <span className="text-green-600 text-lg sm:text-xl mr-2">📋</span>
                            <h3 className="font-semibold text-gray-700 text-sm sm:text-base">Recommended Actions</h3>
                        </div>
                        <p className="text-gray-800 text-base sm:text-lg">{result.recommendations || "Not specified"}</p>
                    </div>

                    <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-100 shadow-xs">
                        <div className="flex items-center mb-2">
                            <span className="text-green-600 text-lg sm:text-xl mr-2">💊</span>
                            <h3 className="font-semibold text-gray-700 text-sm sm:text-base">Prescription Advice</h3>
                        </div>
                        <p className="text-gray-800 text-base sm:text-lg">{result.prescription || "Not specified"}</p>
                    </div>

                    <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-100 shadow-xs">
                        <div className="flex items-center mb-2">
                            <span className="text-green-600 text-lg sm:text-xl mr-2">🧪</span>
                            <h3 className="font-semibold text-gray-700 text-sm sm:text-base">Recommended Tests & Checkups</h3>
                        </div>
                        <p className="text-gray-800 text-base sm:text-lg">{result.testsAndCheckups || "Not specified"}</p>
                    </div>
                </div>

                <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500">
                    <p>AI analysis provided by OpenAI • {new Date().toLocaleDateString()}</p>
                </div>
            </div>
            )}
        </div>
    );
}

