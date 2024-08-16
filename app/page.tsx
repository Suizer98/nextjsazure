'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'

import UserInteractionPanel from './components/UserInteractionPanel'

// Dynamically import MapView.client, disabling SSR
const MapView = dynamic(() => import('./components/MapView.client'), {
  ssr: false
})

export default function Home() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false)
  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded)
  }

  return (
    <div>
      {/* User Interaction Panel */}
      <UserInteractionPanel sidebarExpanded={sidebarExpanded} />

      {/* MapView component with sidebar state passed as props */}
      <MapView sidebarExpanded={sidebarExpanded} toggleSidebar={toggleSidebar} />
    </div>
  )
}
