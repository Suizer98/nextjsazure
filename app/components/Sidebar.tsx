import { Checkbox } from '@nextui-org/checkbox'
import { Button } from '@nextui-org/react'
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
      <Button
        onClick={toggleSidebar}
        className="absolute top-4 left-4 z-50 bg-white border border-gray-300 rounded-md p-2 flex items-center justify-center"
        aria-label="Toggle Sidebar"
      >
        {sidebarExpanded ? '▶' : '◀'}
      </Button>
      <div
        className={`transition-all duration-500 overflow-y-auto shadow-md bg-white ${
          sidebarExpanded ? 'w-60' : 'w-0'
        } h-full z-40`}
      >
        {sidebarExpanded && (
          <div className="p-4 pt-16">
            <div className="flex flex-col space-y-4">
              <p className="text-sm font-medium text-gray-700">
                This is a client-side rendered React component. The main goal of this website is to
                showcase the complete workflow of auto deploy pipeline using:
              </p>
              <p className="text-sm text-gray-700">1. GitHub Action pipeline</p>
              <p className="text-sm text-gray-700">
                2. Docker login and push to Azure Container Registry
              </p>
              <p className="text-sm text-gray-700">
                3. Deploy image as a web app on Azure Web App Service
              </p>
              <div className="flex items-center justify-between">
                <label htmlFor="osm-toggle" className="text-sm font-medium text-gray-700">
                  OSM Layer
                </label>
                <Checkbox
                  isSelected={layersVisible.osm}
                  onChange={() => setLayersVisible((prev) => ({ ...prev, osm: !prev.osm }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="vector-toggle" className="text-sm font-medium text-gray-700">
                  Vector Layer
                </label>
                <Checkbox
                  isSelected={layersVisible.vector}
                  onChange={() =>
                    setLayersVisible((prev) => ({
                      ...prev,
                      vector: !prev.vector
                    }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <label htmlFor="wind-toggle" className="text-sm font-medium text-gray-700">
                  Wind Layer
                </label>
                <Checkbox isSelected={layersVisible.wind} onChange={handleWindLayerToggle} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
