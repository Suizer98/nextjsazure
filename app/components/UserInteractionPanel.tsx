import React, { useState, useEffect } from "react";
import LoginForm from "./Form/LoginForm.client";
import FillForm from "./Form/FillForm.client";
import PageButton from "./PageButton.client";

const UserInteractionPanel: React.FC = ({}) => {
  const [showForm, setShowForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const storedUserName = localStorage.getItem("userName");
    if (isLoggedIn === "true" && storedUserName) {
      setUserName(storedUserName);
      setShowForm(false);
      setShowLoginForm(false);
    } else {
      // If not logged in or no stored user name, show the login form
      setShowLoginForm(true);
    }
  }, []);

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
    </div>
  );
};

export default UserInteractionPanel;
