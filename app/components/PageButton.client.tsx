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
        <button className="absolute top-4 right-4 z-40 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded sm:top-10 sm:right-10 sm:py-2 sm:px-4">
          {userName}
        </button>
      ) : (
        <>
          <button
            className="absolute top-4 right-28 z-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded sm:top-10 sm:right-40 sm:py-2 sm:px-4"
            onClick={() => setShowLoginForm(true)}
          >
            Login
          </button>
          <button
            className="absolute top-4 right-4 z-40 bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-3 rounded sm:top-10 sm:right-10 sm:py-2 sm:px-4"
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
