import { Button, Input } from '@nextui-org/react'
import { useEffect, useState } from 'react'

interface LoginFormProps {
  onClose: () => void
  onLoginSuccess: (name: string) => void
}

export default function LoginForm({ onClose, onLoginSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (isLoggedIn === 'true') {
      const userName = localStorage.getItem('userName')
      if (userName) {
        onLoginSuccess(userName)
      }
    }
  }, [onLoginSuccess])

  async function handleSubmit(event: any) {
    event.preventDefault()
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (response.ok) {
      const userData = await response.json()
      alert('Login successful!')
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userName', userData.name)
      onLoginSuccess(userData.name) // Pass the logged-in user's name up to the parent component.
      onClose() // Close the form upon successful login.
    } else {
      alert('Failed to login.')
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
          </div>
          <div className="flex items-center justify-between">
            <Button color="default" onPress={onClose}>
              Cancel
            </Button>
            <Button type="submit">Login</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
