import React from 'react'

interface PageButtonProps {
  userName: string
  setUserName: (userName: string) => void
  setShowLoginForm: (value: boolean) => void
  setShowForm: (value: boolean) => void
}

const PageButton: React.FC<PageButtonProps> = ({
  userName,
  setUserName,
  setShowLoginForm,
  setShowForm
}) => {
  const handleSignOut = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userName')
    setUserName('')
    alert('Signed out!')
  }

  return (
    <>
      {userName ? (
        <div className="absolute top-4 right-4 z-40">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded sm:py-2 sm:px-4">
            {userName}
          </button>
          <button
            onClick={handleSignOut}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded ml-2 sm:ml-4 sm:py-2 sm:px-4"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="absolute top-4 right-4 z-40">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded sm:py-2 sm:px-4"
            onClick={() => setShowLoginForm(true)}
          >
            Login
          </button>
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-3 rounded ml-2 sm:ml-4 sm:py-2 sm:px-4"
            onClick={() => setShowForm(true)}
          >
            Register
          </button>
        </div>
      )}
    </>
  )
}

export default PageButton
