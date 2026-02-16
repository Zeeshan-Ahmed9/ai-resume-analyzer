import React from 'react';

interface Suggestion {
    type: "good" | "improve";
    tip: string;
}

interface ATSProps {
    score: number;
    suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
    let gradientClass = 'from-red-100';
    let iconSrc = '/icons/ats-bad.svg';

    if (score > 69) {
        gradientClass = 'from-green-100';
        iconSrc = '/icons/ats-good.svg';
    } else if (score > 49) {
        gradientClass = 'from-yellow-100';
        iconSrc = '/icons/ats-warning.svg';
    }

    return (
        <div className={`w-full rounded-2xl shadow-md bg-gradient-to-b ${gradientClass} via-white to-white p-6`}>
            {/* Top Section */}
            <div className="flex flex-col items-center gap-4 mb-6">
                <img src={iconSrc} alt="ATS Status" className="w-[120px]" />
                <h2 className="text-2xl font-bold">ATS Score – {score}/100</h2>
            </div>

            {/* Description Section */}
            <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Detailed Analysis</h3>
                <p className="text-gray-600 font-medium text-sm">
                    Here is a breakdown of your ATS score. Follow these suggestions to improve your resume's visibility to recruiters.
                </p>
            </div>

            {/* Suggestions List */}
            <div className="flex flex-col gap-3">
                {suggestions.map((suggestion, index) => (
                    <div key={index} className="flex flex-row items-start gap-3 p-3 bg-white/60 rounded-xl border border-gray-100 shadow-sm">
                        <img
                            src={suggestion.type === 'good' ? '/icons/check.svg' : '/icons/warning.svg'}
                            alt={suggestion.type}
                            className="w-5 h-5 mt-0.5"
                        />
                        <p className="text-sm text-gray-700">{suggestion.tip}</p>
                    </div>
                ))}
            </div>

            {/* Closing Line */}
            <div className="mt-8 text-center pt-4 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-500">
                    Optimizing your resume for ATS increases your chances of being seen by a human recruiter.
                </p>
            </div>
        </div>
    );
};

export default ATS;