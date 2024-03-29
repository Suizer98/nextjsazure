import React, { useState } from "react";
import LoginForm from "./Form/LoginForm.client";
import FillForm from "./Form/FillForm.client";
import PageButton from "./PageButton.client";

const UserInteractionPanel: React.FC = ({}) => {
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
    </div>
  );
};

export default UserInteractionPanel;
