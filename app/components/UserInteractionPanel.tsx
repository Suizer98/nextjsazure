import React, { useEffect, useState } from 'react'

import FillForm from './Form/FillForm.client'
import LoginForm from './Form/LoginForm.client'
import PageButton from './PageButton.client'

type UserInteractionPanelProps = {
  sidebarExpanded: boolean
}

const UserInteractionPanel: React.FC<UserInteractionPanelProps> = ({ sidebarExpanded }) => {
  const [showForm, setShowForm] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [userName, setUserName] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const storedUserName = localStorage.getItem('userName')
    if (isLoggedIn === 'true' && storedUserName) {
      setUserName(storedUserName)
      setShowForm(false)
      setShowLoginForm(false)
    } else {
      setUserName('')
    }

    // Check if the screen is in mobile view
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize() // Call it once on mount
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleLoginSuccess = (name: string) => {
    setUserName(name)
    setShowLoginForm(false)
    setShowForm(false)
  }

  return (
    <div>
      {!(isMobile && sidebarExpanded) && (
        <PageButton
          userName={userName}
          setUserName={setUserName}
          setShowLoginForm={setShowLoginForm}
          setShowForm={setShowForm}
        />
      )}
      {showForm && <FillForm onClose={() => setShowForm(false)} />}
      {showLoginForm && (
        <LoginForm onClose={() => setShowLoginForm(false)} onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  )
}

export default UserInteractionPanel
