import { useEffect, useState, useRef } from "react";
import html2pdf from "html2pdf.js";

export default function Report() {
  const [user, setUser] = useState(null);
  const reportRef = useRef();

  // Mock medical history data
  const medicalHistory = [
    {
      date: "2023-08-12",
      diagnosis: "Flu",
      treatment: "Rest, hydration, and paracetamol",
      doctor: "Dr. A. Sharma"
    },
    {
      date: "2022-11-05",
      diagnosis: "High Blood Pressure",
      treatment: "Amlodipine 5mg daily",
      doctor: "Dr. R. Kumar"
    },
    {
      date: "2021-06-20",
      diagnosis: "Allergic Rhinitis",
      treatment: "Antihistamines and nasal spray",
      doctor: "Dr. S. Verma"
    }
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const downloadPDF = () => {
    const element = reportRef.current;
    const opt = {
      margin:       0.5,
      filename:     `${user?.name.replace(" ", "_")}_Medical_Report.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h2 className="text-xl text-gray-700">Loading patient report...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 font-serif">
      {/* Download Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={downloadPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Download PDF
        </button>
      </div>

      {/* Report Content */}
      <div ref={reportRef} className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg border border-gray-300 p-6">
        {/* Header */}
        <div className="border-b-4 text-center py-4 text-2xl font-semibold rounded mb-6">
          Patient Medical Report
        </div>

        {/* Patient Info */}
        <h2 className="text-xl font-bold text-blue-900 mb-4 border-b pb-2">
          Patient Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 text-md mb-6">
          <p><span className="font-semibold">Name:</span> {user.name}</p>
          <p><span className="font-semibold">Gender:</span> {user.gender}</p>
          <p><span className="font-semibold">Height:</span> {user.height}</p>
          <p><span className="font-semibold">Weight:</span> {user.weight}</p>
          <p><span className="font-semibold">Age:</span> {user.Age}</p>
          <p><span className="font-semibold">Blood Group:</span> {user.bloodGroup}</p>
          <p className="sm:col-span-2"><span className="font-semibold">Allergies:</span> {user.allergies || "None"}</p>
        </div>

        {/* Medical History */}
        <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">Medical History</h2>
        <div className="space-y-4">
          {medicalHistory.map((entry, index) => (
            <div key={index} className="border rounded-md p-4 bg-gray-50">
              <p><span className="font-semibold">Date:</span> {entry.date}</p>
              <p><span className="font-semibold">Diagnosis:</span> {entry.diagnosis}</p>
              <p><span className="font-semibold">Treatment:</span> {entry.treatment}</p>
              <p><span className="font-semibold">Doctor:</span> {entry.doctor}</p>
            </div>
          ))}
        </div>
      <div className="mt-2 flex justify-end items-center text-sm font-sans">
        <span className="text-gray-600">Generated on {new Date().toLocaleString()}</span>
      </div>
      </div>
    </div>
  );
}
