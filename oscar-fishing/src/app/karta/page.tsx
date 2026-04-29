import TripMap from "@/components/map/TripMap";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Karta – Oscar gillar natur och fiske",
  description: "Se var Oscar har fiskat och vandrat – ungefärliga platser visas för att skydda hemliga fiskevatten.",
};

export default function KartaPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <TripMap />
    </div>
  );
}
