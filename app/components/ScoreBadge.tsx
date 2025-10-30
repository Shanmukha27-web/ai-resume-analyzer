import React from "react";
import { cn } from "~/lib/utils";

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  // Determine badge text
  let badgeText = "";
  if (score > 70) badgeText = "Strong";
  else if (score > 49) badgeText = "Good Start";
  else badgeText = "Needs Work";

  // Determine gradient color intensity
  const gradientClass =
    score > 70
      ? "from-[#7C3AED] to-[#A855F7]" // vibrant purple
      : score > 49
      ? "from-[#8B5CF6] to-[#C084FC]" // medium lavender
      : "from-[#A78BFA] to-[#DDD6FE]"; // pale purple

  return (
    <div
      className={cn(
        "px-4 py-1 rounded-full text-white text-sm font-semibold",
        "bg-gradient-to-r",
        gradientClass,
        "shadow-md transition-transform transform hover:scale-105"
      )}
    >
      {badgeText} • {score}/100
    </div>
  );
};

export default ScoreBadge;
