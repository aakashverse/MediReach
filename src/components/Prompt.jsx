import { useState } from "react";

export default function TextAnalyze() {
    const [result, setResult] = useState(null);
    const [prompt, setPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState([]);

    const handleAnalyze = async () => {
        if (!prompt.trim()) return alert("Please enter a question or description first.");

        setIsLoading(true);
        setResult(null);

        try {
            console.log("Sending prompt to backend:", prompt);

            const response = await fetch("http://localhost:8080/analyze-text", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ prompt }),
            });

            console.log("Raw response:", response);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log("Analysis response:", data);
            
            setResult(data);
            // Add to history
            setHistory(prev => [...prev, { prompt, result: data, timestamp: new Date() }]);
        } catch (err) {
            console.log("Error analyzing text:", err);
            setResult({ error: err.message });
        } finally {
            setIsLoading(false);
        }
    };

    const clearHistory = () => {
        setHistory([]);
    };

    const predefinedPrompts = [
        "What are the signs of an infected wound?",
        "How should I care for a burn wound?",
        "What's the difference between a laceration and an abrasion?",
        "When should I seek medical attention for a wound?",
        "How to clean a wound properly?"
    ];

    const handlePredefinedPrompt = (prePrompt) => {
        setPrompt(prePrompt);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Text-Based Wound Analysis</h1>
                <p className="text-gray-600 mb-6">Ask questions or describe wound symptoms for AI-powered analysis</p>
                
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Question or Description</label>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe the wound or ask a question about wound care..."
                        className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        disabled={isLoading}
                    />
                </div>

                <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Quick Questions</h3>
                    <div className="flex flex-wrap gap-2">
                        {predefinedPrompts.map((prePrompt, index) => (
                            <button
                                key={index}
                                onClick={() => handlePredefinedPrompt(prePrompt)}
                                className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm px-3 py-1.5 rounded-full transition-colors"
                                disabled={isLoading}
                            >
                                {prePrompt}
                            </button>
                        ))}
                    </div>
                </div>

                <button 
                    onClick={handleAnalyze} 
                    disabled={isLoading || !prompt.trim()}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                        isLoading || !prompt.trim() 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Analyzing...
                        </div>
                    ) : (
                        'Analyze Text'
                    )}
                </button>

                {result && (
                    <div className="mt-8">
                        <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-gray-200 rounded-xl p-6 shadow-sm">
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-3">
                                    <span className="text-2xl">💬</span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Analysis Results</h2>
                                <p className="text-gray-600">AI-powered wound care guidance</p>
                            </div>

                            {result.error ? (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                                    <div className="text-red-600 text-5xl mb-4">⚠️</div>
                                    <h3 className="text-red-800 font-semibold text-lg mb-2">Analysis Error</h3>
                                    <p className="text-red-600">{result.error}</p>
                                </div>
                            ) : (
                                <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-xs">
                                    <div className="prose max-w-none">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Question:</h3>
                                        <p className="text-gray-700 bg-blue-50 p-3 rounded-md mb-6">{prompt}</p>
                                        
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3">AI Response:</h3>
                                        <div className="text-gray-800 leading-relaxed">
                                            {typeof result === 'string' ? (
                                                <p>{result}</p>
                                            ) : result.response ? (
                                                <p>{result.response}</p>
                                            ) : (
                                                <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 text-center text-sm text-gray-500">
                                <p>AI analysis provided by OpenAI • {new Date().toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {history.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-800">Analysis History</h2>
                        <button 
                            onClick={clearHistory}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                            Clear History
                        </button>
                    </div>
                    
                    <div className="space-y-4">
                        {history.slice().reverse().map((item, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                <p className="text-gray-700 font-medium mb-2">{item.prompt}</p>
                                <p className="text-gray-600 text-sm">
                                    {typeof item.result === 'object' && !item.result.error 
                                        ? (item.result.response || "Analysis completed") 
                                        : "Error in analysis"}
                                </p>
                                <p className="text-gray-400 text-xs mt-2">
                                    {new Date(item.timestamp).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}