import { cn } from "../lib/utils";
import {
    Accordion,
    AccordionContent,
    AccordionHeader,
    AccordionItem,
} from "./Accordion";

/* ---------------- SCORE CONFIG ---------------- */

const SCORE_LEVELS = {
    good: { min: 70, bg: "bg-badge-green", text: "text-badge-green-text", icon: "/icons/check.svg" },
    average: { min: 40, bg: "bg-badge-yellow", text: "text-badge-yellow-text", icon: "/icons/warning.svg" },
    bad: { min: 0, bg: "bg-badge-red", text: "text-badge-red-text", icon: "/icons/warning.svg" },
};

const getScoreMeta = (score: number) => {
    if (score >= SCORE_LEVELS.good.min) return SCORE_LEVELS.good;
    if (score >= SCORE_LEVELS.average.min) return SCORE_LEVELS.average;
    return SCORE_LEVELS.bad;
};

/* ---------------- SCORE BADGE ---------------- */

const ScoreBadge = ({ score }: { score: number }) => {
    const meta = getScoreMeta(score);

    return (
        <div className={cn("flex items-center gap-1 px-2 py-0.5 rounded-full", meta.bg)}>
            <img src={meta.icon} alt="score" className="size-4" />
            <p className={cn("text-sm font-medium", meta.text)}>
                {score}/100
            </p>
        </div>
    );
};

/* ---------------- CATEGORY HEADER ---------------- */

const CategoryHeader = ({ title, categoryScore }: { title: string; categoryScore: number }) => (
    <div className="flex items-center gap-4 py-2">
        <p className="text-2xl font-semibold">{title}</p>
        <ScoreBadge score={categoryScore} />
    </div>
);

/* ---------------- CATEGORY CONTENT ---------------- */

type Tip = {
    id?: string;
    type: "good" | "improve";
    tip: string;
    explanation: string;
};

const TIP_META = {
    good: {
        icon: "/icons/check.svg",
        box: "bg-green-50 border-green-200 text-green-700",
    },
    improve: {
        icon: "/icons/warning.svg",
        box: "bg-yellow-50 border-yellow-200 text-yellow-700",
    },
};

const CategoryContent = ({ tips }: { tips: Tip[] }) => {
    return (
        <div className="flex flex-col gap-4 w-full">

            {/* Quick Overview */}
            <div className="bg-gray-50 rounded-lg px-5 py-4 grid grid-cols-2 gap-4 w-full">
                {tips.map((tip) => (
                    <div key={tip.id ?? tip.tip} className="flex items-center gap-2">
                        <img src={TIP_META[tip.type].icon} alt="tip" className="size-5" />
                        <p className="text-lg text-gray-500">{tip.tip}</p>
                    </div>
                ))}
            </div>

            {/* Detailed Explanation */}
            <div className="flex flex-col gap-4 w-full">
                {tips.map((tip) => (
                    <div
                        key={(tip.id ?? tip.tip) + "-detail"}
                        className={cn("flex flex-col gap-2 rounded-2xl p-4 border", TIP_META[tip.type].box)}
                    >
                        <div className="flex items-center gap-2">
                            <img src={TIP_META[tip.type].icon} alt="tip" className="size-5" />
                            <p className="text-xl font-semibold">{tip.tip}</p>
                        </div>
                        <p>{tip.explanation}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ---------------- DETAILS ---------------- */

type CategoryKey = "toneAndStyle" | "content" | "structure" | "skills";

const CATEGORY_LABELS: Record<CategoryKey, string> = {
    toneAndStyle: "Tone & Style",
    content: "Content",
    structure: "Structure",
    skills: "Skills",
};

const Details = ({ feedback }: { feedback: Feedback }) => {
    const categories = Object.keys(CATEGORY_LABELS) as CategoryKey[];

    return (
        <div className="flex flex-col gap-4 w-full">
            <Accordion>
                {categories.map((key) => (
                    <AccordionItem key={key} id={key}>
                        <AccordionHeader itemId={key}>
                            <CategoryHeader
                                title={CATEGORY_LABELS[key]}
                                categoryScore={feedback[key].score}
                            />
                        </AccordionHeader>

                        <AccordionContent itemId={key}>
                            <CategoryContent tips={feedback[key].tips} />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default Details;
