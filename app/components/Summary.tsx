import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

const Category = ({ title, score }: { title: string; score: number }) => {
  const textColor =
    score > 70
      ? "text-green-400"
      : score > 49
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="flex items-center justify-between px-8 py-4 border-t border-slate-800/70">
      <div className="flex flex-row gap-3 items-center">
        <p className="text-lg text-slate-200 font-medium">{title}</p>
        <ScoreBadge score={score} />
      </div>
      <p className="text-xl font-semibold">
        <span className={textColor}>{score}</span>
        <span className="text-slate-400">/100</span>
      </p>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
      <div className="flex flex-row items-center p-6 gap-6 border-b border-slate-800">
        <ScoreGauge score={feedback.overallScore} />

        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold text-white">
            Your Resume Score
          </h2>
          <p className="text-sm text-slate-400">
            Calculated based on multiple quality metrics below.
          </p>
        </div>
      </div>

      <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
      <Category title="Content" score={feedback.content.score} />
      <Category title="Structure" score={feedback.structure.score} />
      <Category title="Skills" score={feedback.skills.score} />
    </div>
  );
};

export default Summary;
