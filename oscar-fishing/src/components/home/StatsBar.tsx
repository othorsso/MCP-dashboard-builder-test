import { trips, getTotalImages, getTotalVideos } from "@/data/trips";
import { Camera, Fish, Video } from "lucide-react";

export default function StatsBar() {
  const totalTrips = trips.length;
  const totalImages = getTotalImages();
  const totalVideos = getTotalVideos();

  const stats = [
    { icon: Fish,   label: "Turer ute", value: String(totalTrips),  color: "#3a9b5e", bg: "#f0faf3" },
    { icon: Camera, label: "Bilder",    value: String(totalImages), color: "#2e7ca8", bg: "#f0f7ff" },
    { icon: Video,  label: "Klipp",     value: String(totalVideos), color: "#7c4eb8", bg: "#f7f0ff" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
      <div className="grid grid-cols-3 gap-4">
        {stats.map(({ icon: Icon, label, value, color, bg }) => (
          <div
            key={label}
            className="rounded-2xl shadow-md p-5 flex items-center gap-4 border"
            style={{
              background: bg,
              borderColor: `${color}28`,
              borderTopWidth: "2px",
              borderTopColor: color,
            }}
          >
            <span
              className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: `${color}15` }}
            >
              <Icon size={20} style={{ color }} />
            </span>
            <div className="min-w-0">
              <p
                className="text-[10px] leading-none mb-1.5 uppercase tracking-wider font-semibold"
                style={{ color: `${color}cc` }}
              >
                {label}
              </p>
              <p className="font-bold text-stone-800 text-xl sm:text-2xl leading-none tabular-nums">
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
