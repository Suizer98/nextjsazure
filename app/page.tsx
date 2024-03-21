import dynamic from "next/dynamic";

const Map = dynamic(() => import("./components/MapView.client"), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <Map />
    </div>
  );
}
