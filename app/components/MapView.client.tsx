"use client";
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

type LayersVisible = {
  osm: boolean;
  vector: boolean;
};

const MapView = () => {
  const mapElementRef = useRef(null);
  // Store map and layers in state to ensure they're initialized only once
  const [map, setMap] = useState<Map | null>(null);
  const [osmLayer, setOsmLayer] = useState<TileLayer<OSM> | null>(null);
  const [vectorLayer, setVectorLayer] =
    useState<VectorLayer<VectorSource> | null>(null);
  const [layersVisible, setLayersVisible] = useState({
    osm: true,
    vector: true,
  });

  useEffect(() => {
    if (!mapElementRef.current) return; // Ensure the ref is set

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
                  type: "Point",
                  coordinates: [0, 0], // Example coordinates
                },
                properties: {
                  name: "Null Island",
                },
              },
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [-10.0, 10.0], // Another example
                },
                properties: {
                  name: "Another Point",
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
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
    });

    setMap(initialMap);
    setOsmLayer(initialOsmLayer);
    setVectorLayer(initialVectorLayer);

    return () => initialMap.setTarget(undefined); // Cleanup
  }, []);

  // Effect for handling layer visibility changes
  useEffect(() => {
    if (osmLayer) osmLayer.setVisible(layersVisible.osm);
    if (vectorLayer) vectorLayer.setVisible(layersVisible.vector);
  }, [layersVisible, osmLayer, vectorLayer]); // Depend on layersVisible and layer instances

  const toggleLayerVisibility = (layer: keyof LayersVisible) => {
    setLayersVisible((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  return (
    <div className="flex h-screen">
      <div className="p-4 w-60 bg-white shadow">
        <div className="flex flex-col space-y-4">
          <label className="mr-2 text-sm font-medium text-gray-700">
            This is a client side rendered react component. The main goal of
            this website is to showcase complete workflow of auto deploy
            pipeline using:
            <br />
            <br />
            1. Github Action pipeline
            <br />
            2. Docker login and push to Azure Container Registry
            <br />
            3. Deploy image as web app on Azure Web App Service
          </label>
          <div className="flex items-center justify-between">
            <label
              htmlFor="osm-toggle"
              className="mr-2 text-sm font-medium text-gray-700"
            >
              OSM Layer
            </label>
            <input
              id="osm-toggle"
              type="checkbox"
              checked={layersVisible.osm}
              onChange={() => toggleLayerVisibility("osm")}
              className="toggle-checkbox"
            />
          </div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="vector-toggle"
              className="mr-2 text-sm font-medium text-gray-700"
            >
              Vector Layer
            </label>
            <input
              id="vector-toggle"
              type="checkbox"
              checked={layersVisible.vector}
              onChange={() => toggleLayerVisibility("vector")}
              className="toggle-checkbox"
            />
          </div>
        </div>
      </div>
      <div
        ref={mapElementRef}
        className="flex-grow"
        style={{ height: "100%" }}
      ></div>
    </div>
  );
};

export default MapView;
