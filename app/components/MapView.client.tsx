import { WindLayer } from 'ol-wind'
import Map from 'ol/Map'
import View from 'ol/View'
import { defaults as defaultControls } from 'ol/control'
import GeoJSON from 'ol/format/GeoJSON'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import 'ol/ol.css'
import { fromLonLat } from 'ol/proj'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'
import React, { useEffect, useRef, useState } from 'react'

import Sidebar from './Sidebar'

type LayersVisible = {
  osm: boolean
  vector: boolean
  wind: boolean
}

type MapViewProps = {
  sidebarExpanded: boolean
  toggleSidebar: () => void
}

const MapView: React.FC<MapViewProps> = ({ sidebarExpanded, toggleSidebar }) => {
  const mapElementRef = useRef(null)
  const [map, setMap] = useState<Map | null>(null)
  const [osmLayer, setOsmLayer] = useState<TileLayer<OSM> | null>(null)
  const [vectorLayer, setVectorLayer] = useState<VectorLayer<VectorSource> | null>(null)
  const [windLayer, setWindLayer] = useState<any>(null)
  const [layersVisible, setLayersVisible] = useState<LayersVisible>({
    osm: true,
    vector: true,
    wind: true
  })
  const [windData, setWindData] = useState<any>(null)

  useEffect(() => {
    if (!mapElementRef.current) return

    const initialOsmLayer = new TileLayer({
      source: new OSM()
    })

    const initialVectorLayer = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: 'https://gist.githubusercontent.com/cheeaun/78bb5c3bd27759a14b3cf8e6b6568080/raw/b0ec58fb26f7aec153a1010eab88d31651721358/singapore-boundary.geojson'
      })
    })

    const initialWindLayer = new WindLayer(windData, {
      forceRender: false,
      windOptions: {
        velocityScale: 1 / 150,
        paths: 5000,
        colorScale: (velocity: number) => '#0D8ED8',
        width: 3,
        generateParticleOption: false
      }
    })

    const initialMap = new Map({
      target: mapElementRef.current,
      layers: [initialOsmLayer, initialVectorLayer, initialWindLayer],
      view: new View({
        center: fromLonLat([103.5, 1.5]),
        zoom: 8
      }),
      controls: defaultControls({ zoom: false })
    })

    setMap(initialMap)
    setOsmLayer(initialOsmLayer)
    setVectorLayer(initialVectorLayer)
    setWindLayer(initialWindLayer)

    return () => initialMap.setTarget(undefined)
  }, [windData])

  useEffect(() => {
    if (osmLayer) osmLayer.setVisible(layersVisible.osm)
    if (vectorLayer) vectorLayer.setVisible(layersVisible.vector)
    if (windLayer) windLayer.setVisible(layersVisible.wind)
  }, [layersVisible, osmLayer, vectorLayer, windLayer])

  return (
    <div className="relative flex h-screen">
      {/* Sidebar */}
      <Sidebar
        toggleSidebar={toggleSidebar}
        sidebarExpanded={sidebarExpanded}
        layersVisible={layersVisible}
        setLayersVisible={setLayersVisible}
        windData={windData}
        setWindData={setWindData}
      />
      <div ref={mapElementRef} className="flex-grow" style={{ height: '100%' }}></div>
    </div>
  )
}

export default MapView
