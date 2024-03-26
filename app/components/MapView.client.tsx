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

import Sidebar from "./Sidebar";

type LayersVisible = {
  osm: boolean;
  vector: boolean;
};

const MapView = () => {
  const mapElementRef = useRef(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [map, setMap] = useState<Map | null>(null);
  const [osmLayer, setOsmLayer] = useState<TileLayer<OSM> | null>(null);
  const [vectorLayer, setVectorLayer] =
    useState<VectorLayer<VectorSource> | null>(null);
  const [layersVisible, setLayersVisible] = useState<LayersVisible>({
    osm: true,
    vector: true,
  });

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
                    [116.0724, 5.9749], // Sabah, Malaysia
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

    const initialMap = new Map({
      target: mapElementRef.current,
      layers: [initialOsmLayer, initialVectorLayer],
      view: new View({
        center: fromLonLat([107, 3.5]),
        zoom: 6,
      }),
      controls: defaultControls({ zoom: false }),
    });

    setMap(initialMap);
    setOsmLayer(initialOsmLayer);
    setVectorLayer(initialVectorLayer);

    return () => initialMap.setTarget(undefined);
  }, []);

  useEffect(() => {
    if (osmLayer) osmLayer.setVisible(layersVisible.osm);
    if (vectorLayer) vectorLayer.setVisible(layersVisible.vector);
  }, [layersVisible, osmLayer, vectorLayer]);

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
