import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import LatestTripHighlight from "@/components/home/LatestTripHighlight";
import RecentTrips from "@/components/home/RecentTrips";
import RecentMedia from "@/components/home/RecentMedia";
import GearSection from "@/components/home/GearSection";
import AdPlaceholder from "@/components/ads/AdPlaceholder";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <LatestTripHighlight />
      <RecentTrips />
      <RecentMedia />
      <AdPlaceholder variant="banner" className="max-w-6xl mx-auto px-4 sm:px-6 mt-8" />
      <GearSection />
      <div className="h-16" />
    </>
  );
}
