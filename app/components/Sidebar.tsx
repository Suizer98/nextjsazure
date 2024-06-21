import React, { useEffect, useState } from 'react'

type SidebarProps = {
  toggleSidebar: () => void
  sidebarExpanded: boolean
  layersVisible: { osm: boolean; vector: boolean; wind: boolean }
  setLayersVisible: React.Dispatch<
    React.SetStateAction<{ osm: boolean; vector: boolean; wind: boolean }>
  >
  windData: any
  setWindData: React.Dispatch<React.SetStateAction<any>>
}

const Sidebar: React.FC<SidebarProps> = ({
  toggleSidebar,
  sidebarExpanded,
  layersVisible,
  setLayersVisible,
  windData,
  setWindData
}) => {
  useEffect(() => {
    if (layersVisible.wind && !windData) {
      fetchWindData()
    }
  }, [layersVisible.wind])

  const fetchWindData = async () => {
    try {
      const response = await fetch(`api/windy`)
      const data = await response.json()
      setWindData(data)
    } catch (error) {
      console.error('Error fetching wind data:', error)
    }
  }

  const handleWindLayerToggle = () => {
    setLayersVisible((prev) => ({ ...prev, wind: !prev.wind }))
    if (!layersVisible.wind && !windData) {
      fetchWindData()
    }
  }

  return (
    <div>
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-4 z-50 bg-white border border-gray-300 rounded-md p-2 flex items-center justify-center"
        aria-label="Toggle Sidebar"
      >
        {sidebarExpanded ? '▶' : '◀'}
      </button>
      <div
        className={`transition-all duration-500 overflow-y-auto shadow-md bg-white ${
          sidebarExpanded ? 'w-60' : 'w-0'
        } h-full z-40`}
      >
        {sidebarExpanded && (
          <div className="p-4 pt-16">
            <div className="flex flex-col space-y-4">
              <label className="text-sm font-medium text-gray-700">
                This is a client side rendered react component. The main goal of this website is to
                showcase complete workflow of auto deploy pipeline using:
              </label>
              <label className="text-sm text-gray-700">1. Github Action pipeline</label>
              <label className="text-sm text-gray-700">
                2. Docker login and push to Azure Container Registry
              </label>
              <label className="text-sm text-gray-700">
                3. Deploy image as web app on Azure Web App Service
              </label>
              <div className="flex items-center justify-between">
                <label htmlFor="osm-toggle" className="text-sm font-medium text-gray-700">
                  OSM Layer
                </label>
                <input
                  id="osm-toggle"
                  type="checkbox"
                  checked={layersVisible.osm}
                  onChange={() => setLayersVisible((prev) => ({ ...prev, osm: !prev.osm }))}
                  className="toggle-checkbox"
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="vector-toggle" className="text-sm font-medium text-gray-700">
                  Vector Layer
                </label>
                <input
                  id="vector-toggle"
                  type="checkbox"
                  checked={layersVisible.vector}
                  onChange={() =>
                    setLayersVisible((prev) => ({
                      ...prev,
                      vector: !prev.vector
                    }))
                  }
                  className="toggle-checkbox"
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="wind-toggle" className="text-sm font-medium text-gray-700">
                  Wind Layer
                </label>
                <input
                  id="wind-toggle"
                  type="checkbox"
                  checked={layersVisible.wind}
                  onChange={handleWindLayerToggle}
                  className="toggle-checkbox"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
