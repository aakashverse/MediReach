import { useState } from "react";
import { useNavigate } from "react-router";

export default function AnalyzePrompt(){
    const navigate = useNavigate();
    const [result, setResult] = useState([]);
    const [prompt, setPrompt] = useState([]);
    const [loading, setLoading] = useState([]);













    return(
        <div className="container mx-auto p-4">
            <button 
                onClick={() => navigate('/')}
                className="mb-6 text-blue-500 hover:text-blue-700 flex items-center"
            >
                <span>←</span> Back to Home
            </button>








        </div>

    )
}