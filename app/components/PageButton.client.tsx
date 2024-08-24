import { Button } from '@nextui-org/react'
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
        <div className="absolute top-4 right-4 z-40 flex space-x-4">
          <Button color="success">{userName}</Button>
          <Button color="error" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      ) : (
        <div className="absolute top-4 right-4 z-40 flex space-x-4">
          <Button color="primary" onClick={() => setShowLoginForm(true)}>
            Login
          </Button>
          <Button color="secondary" onClick={() => setShowForm(true)}>
            Register
          </Button>
        </div>
      )}
    </>
  )
}

export default PageButton
