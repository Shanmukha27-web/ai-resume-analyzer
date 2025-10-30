import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";

const ScoreBadge = ({ score }: { score: number }) => {
  return (
    <div
      className={cn(
        "flex flex-row gap-1 items-center px-3 py-1 rounded-full border backdrop-blur-md shadow-sm",
        score > 69
          ? "bg-green-500/10 border-green-400/40 text-green-400"
          : score > 39
          ? "bg-yellow-500/10 border-yellow-400/40 text-yellow-400"
          : "bg-red-500/10 border-red-400/40 text-red-400"
      )}
    >
      <img
        src={score > 69 ? "/icons/check.svg" : "/icons/warning.svg"}
        alt="score"
        className="size-4 opacity-90"
      />
      <p className="text-sm font-medium">{score}/100</p>
    </div>
  );
};

const CategoryHeader = ({
  title,
  categoryScore,
}: {
  title: string;
  categoryScore: number;
}) => {
  return (
    <div className="flex flex-row gap-4 items-center py-2 text-white">
      <p className="text-xl font-semibold tracking-wide">{title}</p>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

const CategoryContent = ({
  tips,
}: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Tip summary grid */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-lg px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4 backdrop-blur-md">
        {tips.map((tip, index) => (
          <div className="flex flex-row gap-2 items-center" key={index}>
            <img
              src={
                tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"
              }
              alt="tip-type"
              className="size-5"
            />
            <p
              className={cn(
                "text-base font-medium",
                tip.type === "good" ? "text-green-300" : "text-yellow-300"
              )}
            >
              {tip.tip}
            </p>
          </div>
        ))}
      </div>

      {/* Detailed feedback cards */}
      <div className="flex flex-col gap-4">
        {tips.map((tip, index) => (
          <div
            key={index + tip.tip}
            className={cn(
              "flex flex-col gap-2 rounded-xl p-5 border transition-all duration-200 hover:scale-[1.01]",
              tip.type === "good"
                ? "bg-gradient-to-br from-green-900/30 to-green-800/10 border-green-700/40 text-green-200"
                : "bg-gradient-to-br from-yellow-900/30 to-yellow-800/10 border-yellow-700/40 text-yellow-200"
            )}
          >
            <div className="flex flex-row gap-2 items-center">
              <img
                src={
                  tip.type === "good"
                    ? "/icons/check.svg"
                    : "/icons/warning.svg"
                }
                alt="tip-icon"
                className="size-5"
              />
              <p className="text-lg font-semibold">{tip.tip}</p>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">
              {tip.explanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="flex flex-col gap-6 w-full bg-slate-900/60 border border-slate-800 rounded-2xl shadow-lg backdrop-blur-md p-6">
      <Accordion>
        <AccordionItem id="tone-style">
          <AccordionHeader itemId="tone-style">
            <CategoryHeader
              title="Tone & Style"
              categoryScore={feedback.toneAndStyle.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="tone-style">
            <CategoryContent tips={feedback.toneAndStyle.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="content">
          <AccordionHeader itemId="content">
            <CategoryHeader
              title="Content"
              categoryScore={feedback.content.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="content">
            <CategoryContent tips={feedback.content.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="structure">
          <AccordionHeader itemId="structure">
            <CategoryHeader
              title="Structure"
              categoryScore={feedback.structure.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="structure">
            <CategoryContent tips={feedback.structure.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="skills">
          <AccordionHeader itemId="skills">
            <CategoryHeader
              title="Skills"
              categoryScore={feedback.skills.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="skills">
            <CategoryContent tips={feedback.skills.tips} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;
