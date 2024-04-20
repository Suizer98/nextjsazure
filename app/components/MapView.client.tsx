import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
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
  const [vectorLayer, setVectorLayer] =
    useState<VectorLayer<VectorSource> | null>(null);
  const [windLayer, setWindLayer] = useState<any>();
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

    const initialVectorLayer = new VectorLayer({
      source: new VectorSource({
        features: new GeoJSON().readFeatures(
          {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: [
                    [103.8198, 1.3521], // Singapore
                    [102, 5.9749],
                  ],
                },
                properties: {
                  name: "Singapore to Sabah",
                },
              },
            ],
          },
          {
            dataProjection: "EPSG:4326",
            featureProjection: "EPSG:3857",
          },
        ),
      }),
    });

    const initialWindLayer = new WindLayer(windData, {
      forceRender: false,
      windOptions: {
        velocityScale: 1 / 100,
        paths: 5000,
        colorScale: (velocity: number) => {
          // if (velocity <= 1) return '#FFFFFF';  // White
          // else if (velocity > 1 && velocity <= 2) return '#ADD8E6'  // Light Blue
          // else if (velocity > 2 && velocity <= 3) return '#32CD32'  // Lime Green
          // else if (velocity > 3 && velocity <= 4) return '#FFD700'  // Gold
          // else if (velocity > 4 && velocity <= 5) return '#FF8C00'  // Dark Orange
          // else if (velocity > 5 && velocity <= 6) return '#FF4500' // Orange Red
          // else if (velocity > 6 && velocity <= 7) return '#DC143C'  // Crimson
          // else if (velocity > 7 && velocity <= 8) return '#C71585'  // Medium Violet Red
          // else if (velocity > 8 && velocity <= 9) return '#8B0000'  // Dark Red
          // else return '#B22222'  // Firebrick
          return "#FF4500";
        },
        width: 3,
        generateParticleOption: false,
      },
    });

    const initialMap = new Map({
      target: mapElementRef.current,
      layers: [initialOsmLayer, initialVectorLayer, initialWindLayer],
      view: new View({
        center: fromLonLat([103.5, 1.5]),
        zoom: 8,
      }),
      controls: defaultControls({ zoom: false }),
    });

    setMap(initialMap);
    setOsmLayer(initialOsmLayer);
    setVectorLayer(initialVectorLayer);
    setWindLayer(initialWindLayer);

    return () => initialMap.setTarget(undefined);
  }, [windData]);

  useEffect(() => {
    if (osmLayer) osmLayer.setVisible(layersVisible.osm);
    if (vectorLayer) vectorLayer.setVisible(layersVisible.vector);
    if (windLayer) windLayer.setVisible(layersVisible.wind);
  }, [layersVisible, osmLayer, vectorLayer, windLayer]);

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
