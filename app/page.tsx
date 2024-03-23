"use client";
// Home.tsx
import dynamic from "next/dynamic";
import UserInteractionPanel from "./components/UserInteractionPanel";

const Map = dynamic(() => import("./components/MapView.client"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <UserInteractionPanel />
      <Map />
    </div>
  );
}
