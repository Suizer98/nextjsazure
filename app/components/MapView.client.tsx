import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorTileLayer from "ol/layer/VectorTile";
import VectorTileSource from "ol/source/VectorTile";
import MVT from "ol/format/MVT";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { defaults as defaultControls } from "ol/control";
import { WindLayer } from "ol-wind";

import Sidebar from "./Sidebar";

type LayersVisible = {
  osm: boolean;
  vector: boolean;
  wind: boolean;
};

const MapView = () => {
  const mapElementRef = useRef(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [map, setMap] = useState<Map | null>(null);
  const [osmLayer, setOsmLayer] = useState<TileLayer<OSM> | null>(null);
  const [vectorTileLayer, setVectorTileLayer] =
    useState<VectorTileLayer | null>(null);
  const [windLayer, setWindLayer] = useState<any>(null);
  const [layersVisible, setLayersVisible] = useState<LayersVisible>({
    osm: true,
    vector: true,
    wind: true,
  });
  const [windData, setWindData] = useState<any>(null);

  useEffect(() => {
    if (!mapElementRef.current) return;

    const initialOsmLayer = new TileLayer({
      source: new OSM(),
    });

    const initialVectorTileLayer = new VectorTileLayer({
      source: new VectorTileSource({
        format: new MVT(),
        url: "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.pbf",
      }),
    });

    const initialWindLayer = new WindLayer(windData, {
      forceRender: false,
      windOptions: {
        velocityScale: 1 / 100,
        paths: 5000,
        colorScale: (velocity: number) => "#FF4500",
        width: 3,
        generateParticleOption: false,
      },
    });

    const initialMap = new Map({
      target: mapElementRef.current,
      layers: [initialOsmLayer, initialVectorTileLayer, initialWindLayer],
      view: new View({
        center: fromLonLat([103.5, 1.5]),
        zoom: 8,
      }),
      controls: defaultControls({ zoom: false }),
    });

    setMap(initialMap);
    setOsmLayer(initialOsmLayer);
    setVectorTileLayer(initialVectorTileLayer);
    setWindLayer(initialWindLayer);

    return () => initialMap.setTarget(undefined);
  }, [windData]);

  useEffect(() => {
    if (osmLayer) osmLayer.setVisible(layersVisible.osm);
    if (vectorTileLayer) vectorTileLayer.setVisible(layersVisible.vector);
    if (windLayer) windLayer.setVisible(layersVisible.wind);
  }, [layersVisible, osmLayer, vectorTileLayer, windLayer]);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div className="relative flex h-screen">
      <Sidebar
        toggleSidebar={toggleSidebar}
        sidebarExpanded={sidebarExpanded}
        layersVisible={layersVisible}
        setLayersVisible={setLayersVisible}
        windData={windData}
        setWindData={setWindData}
      />
      <div
        ref={mapElementRef}
        className="flex-grow"
        style={{ height: "100%" }}
      ></div>
    </div>
  );
};

export default MapView;
