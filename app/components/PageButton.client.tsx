// PageButton.client.tsx
import React from "react";

interface PageButtonProps {
  userName: string;
  setShowLoginForm: (value: boolean) => void;
  setShowForm: (value: boolean) => void;
}

const PageButton: React.FC<PageButtonProps> = ({
  userName,
  setShowLoginForm,
  setShowForm,
}) => {
  return (
    <>
      {userName ? (
        <button className="absolute top-10 right-10 z-40 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          {userName}
        </button>
      ) : (
        <>
          <button
            className="absolute top-10 right-40 z-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowLoginForm(true)}
          >
            Login
          </button>
          <button
            className="absolute top-10 right-10 z-40 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowForm(true)}
          >
            Register
          </button>
        </>
      )}
    </>
  );
};

export default PageButton;
