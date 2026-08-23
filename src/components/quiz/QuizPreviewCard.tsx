import React, { useState } from 'react';
import { QUIZ_QUESTIONS, QUIZ_RESULTS, QUIZ_METADATA } from '../../data/quizData';
import { useAudio } from '../../context/AudioContext';
import { SELF_SABOTAGE_TRACKS } from '../../data/selfSabotageEra';
import { Play } from 'lucide-react';

export const QuizPreviewCard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'question' | 'result'>('intro');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [activePattern, setActivePattern] = useState<string>('DISAPPEARING');
  const { playTrack } = useAudio();

  const handleStart = () => {
    setCurrentStep('question');
    setQuestionIndex(0);
    setSelectedAnswers([]);
  };

  const handleSelectOption = (patternKey: string) => {
    const updated = [...selectedAnswers, patternKey];
    setSelectedAnswers(updated);

    if (questionIndex < QUIZ_QUESTIONS.length - 1) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      // Determine dominant pattern (or last selected for V0)
      setActivePattern(patternKey);
      setCurrentStep('result');
    }
  };

  const handleReset = () => {
    setCurrentStep('intro');
    setQuestionIndex(0);
    setSelectedAnswers([]);
  };

  const result = QUIZ_RESULTS[activePattern] || QUIZ_RESULTS['DISAPPEARING'];
  const currentQ = QUIZ_QUESTIONS[questionIndex];

  return (
    <div className="w-full max-w-2xl mx-auto bg-petrol-900/80 border border-petrol-700/80 p-6 sm:p-10 shadow-2xl petrol-glow text-center">
      {currentStep === 'intro' && (
        <div className="flex flex-col items-center">
          <span className="font-mono text-xs text-flesh-400 tracking-widest-artist uppercase mb-3">
            [ INTROSPECTION GATE ]
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-text-primary mb-3 tracking-editorial">
            {QUIZ_METADATA.title}
          </h3>
          <p className="text-sm text-text-muted mb-2 max-w-md">
            {QUIZ_METADATA.subtitle}
          </p>
          <p className="text-xs text-text-dim mb-8 font-mono">
            {QUIZ_METADATA.disclaimer}
          </p>
          <button
            onClick={handleStart}
            className="px-8 py-3.5 bg-flesh-900/70 border border-flesh-500 text-xs font-mono tracking-widest-artist uppercase text-flesh-200 hover:bg-flesh-800 hover:text-white transition-all flesh-glow"
          >
            {QUIZ_METADATA.startCta}
          </button>
        </div>
      )}

      {currentStep === 'question' && currentQ && (
        <div className="text-left animate-fade-in">
          <div className="flex justify-between items-center mb-4 border-b border-petrol-800 pb-3">
            <span className="font-mono text-xs text-flesh-400 tracking-wider uppercase">
              QUESTION 0{currentQ.id} / 0{QUIZ_QUESTIONS.length}
            </span>
            {currentQ.note && (
              <span className="font-mono text-[10px] text-text-dim italic">
                {currentQ.note}
              </span>
            )}
          </div>

          <h4 className="font-serif text-lg sm:text-xl text-text-primary mb-6 leading-snug">
            {currentQ.question}
          </h4>

          <div className="space-y-3">
            {currentQ.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.patternKey)}
                className="w-full text-left p-4 bg-petrol-950/70 border border-petrol-800/80 hover:border-flesh-500/60 hover:bg-petrol-900/90 transition-all group focus:outline-none focus:ring-1 focus:ring-flesh-400"
              >
                <p className="text-sm text-text-primary group-hover:text-flesh-300 font-medium transition-colors">
                  {option.label}
                </p>
                {option.subtext && (
                  <p className="text-xs text-text-dim group-hover:text-text-muted mt-1 transition-colors">
                    {option.subtext}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === 'result' && (
        <div className="text-left animate-fade-in">
          <div className="border-b border-petrol-800 pb-3 mb-6 flex justify-between items-center">
            <span className="font-mono text-xs text-flesh-400 tracking-widest-artist uppercase">
              [ ARTISTIC REFLECTION ]
            </span>
            <button
              onClick={handleReset}
              className="text-[10px] font-mono text-text-dim hover:text-text-muted uppercase tracking-wider"
            >
              RETAKE
            </button>
          </div>

          <div className="mb-6">
            <p className="font-mono text-xs text-text-muted uppercase tracking-wider mb-1">
              YOU SABOTAGE YOURSELF BY:
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl text-flesh-300 font-bold tracking-editorial mb-3">
              {result.patternTitle}.
            </h3>
            <p className="text-sm text-text-primary leading-relaxed mb-4 italic">
              "{result.tagline}"
            </p>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-6">
              {result.observation}
            </p>
          </div>

          <div className="p-4 bg-petrol-950 border border-petrol-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] text-flesh-400 uppercase tracking-widest block mb-0.5">
                YOUR RECORD MATCH:
              </span>
              <p className="font-serif text-base text-text-primary font-medium">
                {result.songTitle}
              </p>
            </div>

            <button
              onClick={() => {
                const matched = SELF_SABOTAGE_TRACKS.find((t) => t.id === result.songId) || SELF_SABOTAGE_TRACKS[0];
                playTrack(matched);
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-petrol-800 border border-petrol-500 text-xs font-mono tracking-widest uppercase text-petrol-200 hover:bg-petrol-700 flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              {result.actionText}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
