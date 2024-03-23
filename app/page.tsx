"use client";
// Home.tsx
import dynamic from "next/dynamic";
import React, { useState } from "react";
import PageButton from "./components/PageButton.client";

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

  const handleLoginSuccess = (name: string) => {
    setUserName(name);
    setShowLoginForm(false);
    setShowForm(false);
  };

  return (
    <div>
      <PageButton
        userName={userName}
        setShowLoginForm={setShowLoginForm}
        setShowForm={setShowForm}
      />
      {showForm && <FillForm onClose={() => setShowForm(false)} />}
      {showLoginForm && (
        <LoginForm
          onClose={() => setShowLoginForm(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      <Map />
    </div>
  );
}
