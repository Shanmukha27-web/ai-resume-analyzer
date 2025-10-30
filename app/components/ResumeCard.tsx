import { Link } from "react-router";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";
import ScoreCircle from "~/components/ScoreCircle";

const ResumeCard = ({
  resume: { id, companyName, jobTitle, feedback, imagePath },
}: {
  resume: Resume;
}) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(imagePath);
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };
    loadResume();
  }, [fs, imagePath]);

  return (
    <Link
      to={`/resume/${id}`}
      className="group transition-all duration-500 ease-out transform hover:scale-[1.02] hover:shadow-[0_0_30px_#8e98ff40]"
    >
      {/* Outer gradient border */}
      <div className="p-[2px] rounded-2xl bg-gradient-to-r from-[#8e98ff] to-[#606beb]">
        {/* Inner card */}
        <div className="resume-card bg-white/80 backdrop-blur-md rounded-2xl p-6 flex flex-col gap-6 transition-all duration-500 group-hover:bg-white/90">
          {/* Header */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              {companyName ? (
                <h2 className="text-xl font-bold text-gradient leading-snug">
                  {companyName}
                </h2>
              ) : (
                <h2 className="text-xl font-bold text-gradient">Resume</h2>
              )}
              {jobTitle && (
                <h3 className="text-gray-500 text-base tracking-tight">
                  {jobTitle}
                </h3>
              )}
            </div>
            <div className="flex-shrink-0">
              <ScoreCircle score={feedback.overallScore} />
            </div>
          </div>

          {/* Resume image */}
          {resumeUrl && (
            <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-inner">
              <img
                src={resumeUrl}
                alt="resume"
                className="w-full h-[360px] max-sm:h-[200px] object-cover object-top transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ResumeCard;
