import { Button, Input } from '@nextui-org/react'
import { useState } from 'react'

interface FillFormProps {
  onClose: () => void
}

export default function FillForm(props: FillFormProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const onClose = props.onClose

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Here, you might want to hash the password before sending it.
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        name,
        password: password // Note: Ensure your backend appropriately hashes this password before storing it
      })
    })

    if (response.ok) {
      alert('User created successfully!')
      setEmail('')
      setName('')
      setPassword('')
      onClose() // Optionally close the form upon successful submission
    } else {
      alert('Failed to create user.')
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add New User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              fullWidth
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              fullWidth
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              fullWidth
            />
          </div>
          <div className="flex items-center justify-between">
            <Button color="default" onPress={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add User</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
