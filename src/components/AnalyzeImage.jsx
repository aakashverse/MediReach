import { useState } from "react";
import { useNavigate } from "react-router";

export default function AnalyzeImage() {
    const navigate = useNavigate();
    const [result, setResult] = useState(null);
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [fileName, setFileName] = useState('');

    const handleAnalyze = async () => {
        if (!file) return alert("Please select a file first.");

        setIsLoading(true);
        setResult(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            console.log("Sending file to backend:", file);

            const response = await fetch("http://localhost:8080/analyze-image", {
                method: "POST",
                body: formData,
            });

            console.log("Raw response:", response);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log("OpenAI response:", data);
            setResult(data);
        } catch (err) {
            console.log("Error analyzing wound:", err);
            setResult({ error: err.message });
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFileName(selectedFile ? selectedFile.name : '');
    };

    // Function to render analysis results in a visually appealing way
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
    }
 
    //     return (
            
    // };
    
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
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Wound Analysis</h1>
                    <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">Upload an image of a wound for AI-powered analysis</p>
                    
                    <div className="mb-4 sm:mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Wound Image</label>
                        <div className="flex items-center space-x-4">
                            <label className="flex-1 cursor-pointer">
                                <input 
                                    type="file" 
                                    onChange={handleFileChange} 
                                    className="hidden" 
                                    accept="image/*"
                                />
                                <div className="border-2 border-dashed border-gray-300 rounded-lg py-3 sm:py-4 px-4 sm:px-6 text-center hover:border-blue-400 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 sm:h-10 w-8 sm:w-10 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                    <p className="text-xs sm:text-sm text-gray-600">Click to upload or drag and drop</p>
                                    <p className="text-xs text-gray-500 mt-1">JPG, PNG</p>
                                </div>
                            </label>
                        </div>
                        {fileName && (
                            <p className="text-xs sm:text-sm text-green-600 mt-2 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Selected: {fileName}
                            </p>
                        )}
                    </div>

                    <button 
                        onClick={handleAnalyze} 
                        disabled={isLoading || !file}
                        className={`w-full py-2 sm:py-3 px-4 rounded-lg font-medium text-white transition-colors text-sm sm:text-base ${
                            isLoading || !file 
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
                            'Analyze Wound'
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
                        <span className="text-xl sm:text-2xl">🔍</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Analysis Results</h2>
                    <p className="text-gray-600 text-sm sm:text-base">AI-powered wound assessment</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-100 shadow-xs">
                        <div className="flex items-center mb-2">
                            <span className="text-blue-600 text-lg sm:text-xl mr-2">📏</span>
                            <h3 className="font-semibold text-gray-700 text-sm sm:text-base">Size</h3>
                        </div>
                        <p className="text-gray-800 text-base sm:text-lg">{result.size || "Not specified"}</p>
                    </div>

                    <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-100 shadow-xs">
                        <div className="flex items-center mb-2">
                            <span className="text-red-600 text-lg sm:text-xl mr-2">🎨</span>
                            <h3 className="font-semibold text-gray-700 text-sm sm:text-base">Color</h3>
                        </div>
                        <p className="text-gray-800 text-base sm:text-lg">{result.color || "Not specified"}</p>
                    </div>

                    <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-100 shadow-xs">
                        <div className="flex items-center mb-2">
                            <span className="text-yellow-600 text-lg sm:text-xl mr-2">⚠️</span>
                            <h3 className="font-semibold text-gray-700 text-sm sm:text-base">Infection Risk</h3>
                        </div>
                        <p className="text-gray-800 text-base sm:text-lg">{result.infectionRisk || "Not specified"}</p>
                    </div>

                    <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-100 shadow-xs">
                        <div className="flex items-center mb-2">
                            <span className="text-purple-600 text-lg sm:text-xl mr-2">⚕️</span>
                            <h3 className="font-semibold text-gray-700 text-sm sm:text-base">Severity</h3>
                        </div>
                        <div className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium bg-purple-100 text-purple-800">
                            {result.severity || "Not specified"}
                        </div>
                    </div>
                </div>

                {result.careRecommendations && (
                    <div className="bg-white rounded-lg p-4 sm:p-5 border border-gray-100 shadow-xs">
                        <div className="flex items-center mb-3">
                            <span className="text-green-600 text-lg sm:text-xl mr-2">💡</span>
                            <h3 className="font-semibold text-gray-700 text-sm sm:text-base">Care Recommendations</h3>
                        </div>
                        <p className="text-gray-800 text-sm sm:text-base">{result.careRecommendations}</p>
                    </div>
                )}

                <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500">
                    <p>AI analysis provided by OpenAI • {new Date().toLocaleDateString()}</p>
                </div>
            </div>
            )}
        </div>
    );
}
    