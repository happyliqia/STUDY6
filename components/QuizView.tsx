
import React, { useState, useEffect } from 'react';
import { UnitContent, PracticeQuestion } from '../types';
import { geminiService } from '../services/geminiService';

interface QuizViewProps {
  unit: UnitContent;
  onClose: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ unit, onClose }) => {
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const data = await geminiService.generatePracticeQuestions(unit);
      setQuestions(data);
      setLoading(false);
    };
    fetchQuestions();
  }, [unit]);

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (answer === questions[currentIdx].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(i => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xl font-medium text-gray-600">Magically creating your quiz...</p>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="text-center p-12 bg-white rounded-3xl shadow-xl">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold mb-2">Well Done!</h2>
        <p className="text-xl text-gray-600 mb-6">
          You got <span className="text-green-500 font-bold">{score}</span> out of {questions.length} correct!
        </p>
        <button
          onClick={onClose}
          className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition-colors"
        >
          Back to Unit
        </button>
      </div>
    );
  }

  const q = questions[currentIdx];

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl p-8 shadow-xl border-4 border-dashed border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <span className="bg-gray-100 px-4 py-1 rounded-full text-sm font-bold text-gray-500">
          Question {currentIdx + 1} of {questions.length}
        </span>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-8">{q.question}</h2>

      <div className="space-y-4 mb-8">
        {q.options.map((opt, i) => {
          let bgColor = 'bg-gray-50 hover:bg-gray-100';
          let border = 'border-2 border-transparent';
          
          if (isAnswered) {
            if (opt === q.correctAnswer) {
              bgColor = 'bg-green-100';
              border = 'border-2 border-green-500';
            } else if (opt === selectedAnswer) {
              bgColor = 'bg-red-100';
              border = 'border-2 border-red-500';
            }
          }

          return (
            <button
              key={i}
              disabled={isAnswered}
              onClick={() => handleAnswer(opt)}
              className={`w-full text-left p-4 rounded-2xl font-medium transition-all ${bgColor} ${border} flex items-center justify-between group`}
            >
              <span>{opt}</span>
              {isAnswered && opt === q.correctAnswer && (
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="animate-fade-in mb-8">
          <div className="bg-blue-50 p-4 rounded-2xl text-blue-800 text-sm italic">
            <strong>Tip:</strong> {q.explanation}
          </div>
        </div>
      )}

      <button
        onClick={nextQuestion}
        disabled={!isAnswered}
        className={`w-full py-4 rounded-2xl font-bold text-white transition-all ${
          isAnswered ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        {currentIdx + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
      </button>
    </div>
  );
};
