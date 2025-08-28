import { useState } from "react";
import {useNavigate } from "react-router";

const PatientSignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    phone: '',
    bloodType: '',
    knownAllergies: '',
    medicalConditions: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:8080/signup", { 
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: formData?.fullName,     
        email: formData?.email,
        password: formData?.password,
        dateOfBirth: formData?.dateOfBirth,
        phone: formData?.phone,
        bloodType: formData?.bloodType,
        knownAllergies: formData?.knownAllergies,
        medicalConditions: formData?.medicalConditions
      })
    });

    const data = await response.json();
    console.log(response)

    if (response.ok) {
      alert("Signup successful!");
      if(typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
      }
      navigate("/");  
    } else {
      alert(data.message || "Signup failed");
    }
  } catch (error) {
    console.error("Signup error:", error);
    alert("An error occurred. Please try again.");
  }
 };


  return (
    <div className="max-w-2xl mx-auto px-4 py-8 mt-20">
      <h2 className="text-2xl font-bold text-center mb-6">Patient Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-md shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            type="date"
            name="dateOfBirth"
            placeholder="Date of Birth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="input"
            required
          />
          <input
            type="text"
            name="bloodType"
            placeholder="Blood Type (e.g. A+, B-, O+)"
            value={formData.bloodType}
            onChange={handleChange}
            className="input"
          />
        </div>
        <textarea
          name="knownAllergies"
          placeholder="Known Allergies"
          value={formData.knownAllergies}
          onChange={handleChange}
          className="input w-full"
        />
        <textarea
          name="medicalConditions"
          placeholder="Medical Conditions"
          value={formData.medicalConditions}
          onChange={handleChange}
          className="input w-full"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        >
          Sign Up
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline"
          >
            Login
          </a>
        </p>
      </form>
      
    </div>
  );
};

export default PatientSignupForm;
