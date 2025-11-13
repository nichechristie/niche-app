"use client";

import { useState, useEffect } from "react";
import { MythologyLesson, MythQuestion } from "@/types/mythology";
import { mythologyLessons } from "@/lib/mythologyLessons";
import { useAccount } from "wagmi";

export function MythologyStudy() {
  const { address } = useAccount();
  const [selectedLesson, setSelectedLesson] = useState<MythologyLesson | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [totalRewards, setTotalRewards] = useState("0");
  const [claiming, setClaiming] = useState(false);

  useEffect(() => {
    loadProgress();
  }, [address]);

  const loadProgress = async () => {
    if (!address) return;

    try {
      const response = await fetch(`/api/mythology/progress?address=${address}`);
      if (response.ok) {
        const data = await response.json();
        setCompletedLessons(data.completedLessons || []);
        setTotalRewards(data.totalRewardsEarned || "0");
      }
    } catch (error) {
      console.error("Error loading progress:", error);
    }
  };

  const startLesson = (lesson: MythologyLesson) => {
    setSelectedLesson(lesson);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < selectedLesson!.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    setShowResults(true);
  };

  const getScore = () => {
    if (!selectedLesson) return 0;
    let correct = 0;
    selectedLesson.questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) correct++;
    });
    return (correct / selectedLesson.questions.length) * 100;
  };

  const completeLesson = async () => {
    if (!selectedLesson || !address) return;

    const score = getScore();
    if (score < 70) {
      alert("You need at least 70% to complete the lesson. Try again!");
      setSelectedLesson(null);
      return;
    }

    setClaiming(true);
    try {
      const response = await fetch("/api/mythology/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          lessonId: selectedLesson.id,
          score,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setCompletedLessons([...completedLessons, selectedLesson.id]);
        setTotalRewards(data.totalRewards);
        alert(`Congratulations! You earned ${selectedLesson.reward} NICHE tokens!`);
        setSelectedLesson(null);
      }
    } catch (error) {
      console.error("Error completing lesson:", error);
      alert("Failed to claim reward. Please try again.");
    } finally {
      setClaiming(false);
    }
  };

  const isLessonCompleted = (lessonId: string) => {
    return completedLessons.includes(lessonId);
  };

  if (!address) {
    return (
      <div className="glass rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Mythology Study</h2>
        <p className="text-gray-400">Please connect your wallet to access mythology lessons and earn NICHE tokens.</p>
      </div>
    );
  }

  if (selectedLesson) {
    if (showResults) {
      const score = getScore();
      const passed = score >= 70;

      return (
        <div className="glass rounded-xl p-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Lesson Results</h2>

          <div className={`p-6 rounded-xl mb-6 ${passed ? 'bg-green-500/20 border-2 border-green-500' : 'bg-red-500/20 border-2 border-red-500'}`}>
            <p className="text-2xl font-bold text-white mb-2">Your Score: {score.toFixed(0)}%</p>
            <p className="text-gray-300">
              {passed
                ? `Excellent! You passed the lesson and earned ${selectedLesson.reward} NICHE tokens!`
                : 'You need at least 70% to pass. Review the lesson and try again.'
              }
            </p>
          </div>

          <div className="space-y-4 mb-6">
            {selectedLesson.questions.map((q, i) => {
              const userAnswer = answers[i];
              const isCorrect = userAnswer === q.correctAnswer;

              return (
                <div key={q.id} className={`p-4 rounded-lg ${isCorrect ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                  <p className="font-semibold text-white mb-2">
                    {i + 1}. {q.question}
                  </p>
                  <p className="text-sm text-gray-400 mb-2">
                    Your answer: {q.options[userAnswer]} {isCorrect ? '✓' : '✗'}
                  </p>
                  {!isCorrect && (
                    <p className="text-sm text-green-400 mb-2">
                      Correct answer: {q.options[q.correctAnswer]}
                    </p>
                  )}
                  <p className="text-sm text-gray-300">{q.explanation}</p>
                </div>
              );
            })}
          </div>

          <div className="flex gap-4">
            {passed && !isLessonCompleted(selectedLesson.id) && (
              <button
                onClick={completeLesson}
                disabled={claiming}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all disabled:opacity-50"
              >
                {claiming ? 'Claiming...' : `Claim ${selectedLesson.reward} NICHE Tokens`}
              </button>
            )}
            <button
              onClick={() => setSelectedLesson(null)}
              className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-all"
            >
              Back to Lessons
            </button>
          </div>
        </div>
      );
    }

    const question = selectedLesson.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / selectedLesson.questions.length) * 100;

    return (
      <div className="glass rounded-xl p-8 max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-white">{selectedLesson.title}</h2>
            <span className="text-sm text-gray-400">
              Question {currentQuestion + 1} of {selectedLesson.questions.length}
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {currentQuestion === 0 && answers.length === 0 && (
          <div className="mb-6 p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
            <p className="text-sm text-purple-300 mb-2">Culture: {selectedLesson.culture}</p>
            <p className="text-white whitespace-pre-line">{selectedLesson.content}</p>
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">{question.question}</h3>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => selectAnswer(index)}
                className={`w-full p-4 rounded-lg text-left transition-all ${
                  answers[currentQuestion] === index
                    ? 'bg-purple-500 text-white border-2 border-purple-400'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600 border-2 border-transparent'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setSelectedLesson(null)}
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-all"
          >
            Exit
          </button>
          <button
            onClick={nextQuestion}
            disabled={answers[currentQuestion] === undefined}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion === selectedLesson.questions.length - 1 ? 'Finish' : 'Next Question'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Mythology Study</h1>
            <p className="text-gray-400">Explore ancient myths and earn NICHE tokens</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Total Earned</p>
            <p className="text-2xl font-bold text-purple-400">{totalRewards} NICHE</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="glass-inner rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-white">{completedLessons.length}</p>
            <p className="text-sm text-gray-400">Completed</p>
          </div>
          <div className="glass-inner rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-white">{mythologyLessons.length - completedLessons.length}</p>
            <p className="text-sm text-gray-400">Remaining</p>
          </div>
          <div className="glass-inner rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-white">{mythologyLessons.length}</p>
            <p className="text-sm text-gray-400">Total Lessons</p>
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mythologyLessons.map((lesson) => {
          const completed = isLessonCompleted(lesson.id);

          return (
            <div
              key={lesson.id}
              className={`glass rounded-xl p-6 transition-all ${
                completed
                  ? 'border-2 border-green-500/50 bg-green-500/5'
                  : 'hover:border-purple-500/50 cursor-pointer'
              }`}
              onClick={() => !completed && startLesson(lesson)}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold text-white">{lesson.title}</h3>
                {completed && (
                  <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                    ✓ Completed
                  </span>
                )}
              </div>

              <p className="text-gray-400 text-sm mb-4">{lesson.description}</p>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {lesson.estimatedTime}
                </span>
                <span className={`px-2 py-1 rounded text-xs ${
                  lesson.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                  lesson.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {lesson.difficulty}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-purple-400">⚔️ {lesson.culture} Mythology</p>
                <p className="text-lg font-bold text-purple-400">+{lesson.reward} NICHE</p>
              </div>

              {!completed && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startLesson(lesson);
                  }}
                  className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all shadow-lg active:scale-95"
                >
                  Start Lesson
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
