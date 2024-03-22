"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const Map = dynamic(() => import("./components/MapView.client"), {
  ssr: false,
});

const FillForm = dynamic(() => import("./components/FillForm.client"), {
  ssr: false,
});

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <button
        className="absolute top-10 right-10 z-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Registering..." : "Register"}
      </button>

      {showForm && <FillForm onClose={() => setShowForm(false)} />}
      <Map />
    </div>
  );
}
