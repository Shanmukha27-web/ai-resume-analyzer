import React from "react";

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  // Determine background gradient based on score
  const gradientClass =
    score > 69
      ? "from-green-900/50 via-green-800/40 to-slate-900/60 border-green-700/40"
      : score > 49
      ? "from-yellow-900/40 via-yellow-800/30 to-slate-900/60 border-yellow-700/40"
      : "from-red-900/40 via-red-800/30 to-slate-900/60 border-red-700/40";

  // Determine icon based on score
  const iconSrc =
    score > 69
      ? "/icons/ats-good.svg"
      : score > 49
      ? "/icons/ats-warning.svg"
      : "/icons/ats-bad.svg";

  // Determine subtitle based on score
  const subtitle =
    score > 69 ? "Excellent Match" : score > 49 ? "Good Start" : "Needs Work";

  // Determine accent color
  const accentColor =
    score > 69
      ? "text-green-400"
      : score > 49
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div
      className={`bg-gradient-to-br ${gradientClass} backdrop-blur-lg border rounded-2xl shadow-xl w-full p-8 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]`}
    >
      {/* Top section with icon and headline */}
      <div className="flex items-center gap-4 mb-6">
        <img src={iconSrc} alt="ATS Score Icon" className="w-12 h-12" />
        <div>
          <h2 className="text-3xl font-bold text-white">
            ATS Score{" "}
            <span className={`${accentColor}`}>{score}/100</span>
          </h2>
          <p className={`text-sm font-medium ${accentColor}`}>{subtitle}</p>
        </div>
      </div>

      {/* Description section */}
      <div className="mb-6">
        <p className="text-gray-300 mb-6 leading-relaxed">
          This score estimates how effectively your resume passes through{" "}
          <span className="font-semibold text-white">
            Applicant Tracking Systems
          </span>{" "}
          — automated tools used by recruiters to screen resumes.
        </p>

        {/* Suggestions list */}
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start gap-3">
              <img
                src={
                  suggestion.type === "good"
                    ? "/icons/check.svg"
                    : "/icons/warning.svg"
                }
                alt={suggestion.type === "good" ? "Check" : "Warning"}
                className="w-5 h-5 mt-1 opacity-90"
              />
              <p
                className={`${
                  suggestion.type === "good"
                    ? "text-green-300"
                    : "text-yellow-300"
                } text-base`}
              >
                {suggestion.tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Closing encouragement */}
      <p className="text-gray-400 italic text-sm border-t border-slate-700 mt-6 pt-4">
        Keep refining your resume — small tweaks can make a big difference in
        passing ATS filters and impressing recruiters.
      </p>
    </div>
  );
};

export default ATS;
