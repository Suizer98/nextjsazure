"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const Map = dynamic(() => import("./components/MapView.client"), {
  ssr: false,
});
const FillForm = dynamic(() => import("./components/FillForm.client"), {
  ssr: false,
});
const LoginForm = dynamic(() => import("./components/LoginForm.client"), {
  ssr: false,
});

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [userName, setUserName] = useState("");

  const handleLoginSuccess = (name) => {
    setUserName(name);
    setShowLoginForm(false); // Close login form upon successful login
    setShowForm(false); // Ensure the register form is also not shown
  };

  return (
    <div>
      {/* Login/Register Button */}
      {userName ? (
        <button className="absolute top-10 right-10 z-40 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          {userName}
        </button>
      ) : (
        <>
          {/* Show Login Button only if userName is not set */}
          <button
            className="absolute top-10 right-40 z-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowLoginForm(!showLoginForm)}
          >
            Login
          </button>

          {/* Show Register Button only if userName is not set */}
          <button
            className="absolute top-10 right-10 z-40 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowForm(!showForm)}
          >
            Register
          </button>
        </>
      )}

      {showForm && <FillForm onClose={() => setShowForm(false)} />}
      {showLoginForm && (
        <LoginForm
          onClose={() => {
            setShowLoginForm(false);
          }}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      <Map />
    </div>
  );
}
