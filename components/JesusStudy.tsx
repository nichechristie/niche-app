"use client";

import { useState, useEffect } from "react";
import { JesusLesson } from "@/types/jesus";
import { jesusLessons } from "@/lib/jesusLessons";
import { useAccount } from "wagmi";

export function JesusStudy() {
  const { address } = useAccount();
  const [selectedLesson, setSelectedLesson] = useState<JesusLesson | null>(null);
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
      const response = await fetch(`/api/jesus/progress?userId=${address}`);
      if (response.ok) {
        const data = await response.json();
        setCompletedLessons(data.progress?.completedLessons || []);
        setTotalRewards(data.progress?.totalRewardsEarned || "0");
      }
    } catch (error) {
      console.error("Error loading progress:", error);
    }
  };

  const startLesson = (lesson: JesusLesson) => {
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
    return correct;
  };

  const getPercentage = () => {
    if (!selectedLesson) return 0;
    return (getScore() / selectedLesson.questions.length) * 100;
  };

  const completeLesson = async () => {
    if (!selectedLesson || !address) return;

    const score = getScore();
    const percentage = getPercentage();

    if (percentage < 70) {
      alert("You need at least 70% to complete the lesson. Try again!");
      setSelectedLesson(null);
      return;
    }

    setClaiming(true);
    try {
      const response = await fetch("/api/jesus/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: address,
          lessonId: selectedLesson.id,
          score,
          answers,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setCompletedLessons([...completedLessons, selectedLesson.id]);
        setTotalRewards(data.progress?.totalRewardsEarned || totalRewards);
        alert(`Congratulations! You earned ${selectedLesson.reward} NICHE tokens!`);
        setSelectedLesson(null);
        await loadProgress();
      } else if (data.alreadyClaimed) {
        alert("You've already earned rewards for this lesson!");
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
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-2">
          <span className="text-3xl">✝️</span>
          The Life & Teachings of Jesus
        </h2>
        <p className="text-gray-400">Please connect your wallet to access Jesus study lessons and earn NICHE tokens.</p>
      </div>
    );
  }

  if (selectedLesson) {
    if (showResults) {
      const score = getScore();
      const percentage = getPercentage();
      const passed = percentage >= 70;

      return (
        <div className="glass rounded-xl p-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Lesson Results</h2>

          <div className={`p-6 rounded-xl mb-6 ${passed ? 'bg-green-500/20 border-2 border-green-500' : 'bg-red-500/20 border-2 border-red-500'}`}>
            <p className="text-2xl font-bold text-white mb-2">Your Score: {percentage.toFixed(0)}%</p>
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
                    Your answer: <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>
                      {q.options[userAnswer]}
                    </span>
                  </p>
                  {!isCorrect && (
                    <p className="text-sm text-gray-400 mb-2">
                      Correct answer: <span className="text-green-400">{q.options[q.correctAnswer]}</span>
                    </p>
                  )}
                  <p className="text-sm text-gray-300 italic">{q.explanation}</p>
                </div>
              );
            })}
          </div>

          <div className="flex gap-4">
            {passed && !isLessonCompleted(selectedLesson.id) && (
              <button
                onClick={completeLesson}
                disabled={claiming}
                className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 disabled:opacity-50"
              >
                {claiming ? "Claiming..." : `Claim ${selectedLesson.reward} NICHE Tokens`}
              </button>
            )}
            <button
              onClick={() => setSelectedLesson(null)}
              className="flex-1 py-3 glass border border-slate-700 text-white rounded-lg font-semibold hover:bg-slate-800"
            >
              Back to Lessons
            </button>
          </div>
        </div>
      );
    }

    const question = selectedLesson.questions[currentQuestion];

    return (
      <div className="glass rounded-xl p-8 max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">{selectedLesson.title}</h2>
          <button
            onClick={() => setSelectedLesson(null)}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {currentQuestion === 0 && answers.length === 0 && (
          <div className="mb-8">
            <div className="bg-indigo-500/20 border border-indigo-500 rounded-lg p-6 mb-6">
              <p className="text-indigo-300 font-semibold mb-2">{selectedLesson.topic}</p>
              <p className="text-gray-300 whitespace-pre-line">{selectedLesson.content}</p>
            </div>
          </div>
        )}

        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-400 mb-4">
            <span>Question {currentQuestion + 1} of {selectedLesson.questions.length}</span>
            <span>Reward: {selectedLesson.reward} NICHE</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2 mb-6">
            <div
              className="bg-indigo-500 h-2 rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / selectedLesson.questions.length) * 100}%` }}
            />
          </div>

          <h3 className="text-xl font-semibold text-white mb-6">{question.question}</h3>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => selectAnswer(index)}
                className={`w-full p-4 rounded-lg text-left transition-all ${
                  answers[currentQuestion] === index
                    ? 'bg-indigo-500 text-white border-2 border-indigo-400'
                    : 'glass border border-slate-700 text-gray-300 hover:border-indigo-500'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={nextQuestion}
          disabled={answers[currentQuestion] === undefined}
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentQuestion < selectedLesson.questions.length - 1 ? 'Next Question' : 'See Results'}
        </button>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-4xl">✝️</span>
          The Life & Teachings of Jesus
        </h2>
        <p className="text-gray-400">
          Learn about Jesus Christ - His birth, ministry, teachings, miracles, death, and resurrection.
          Complete lessons to earn NICHE tokens!
        </p>

        {totalRewards !== "0" && (
          <div className="mt-4 bg-green-500/20 border border-green-500 rounded-lg p-4">
            <p className="text-green-400 font-semibold">
              Total Rewards Earned: {totalRewards} NICHE 💰
            </p>
            <p className="text-sm text-gray-300">
              Completed: {completedLessons.length} of {jesusLessons.length} lessons
            </p>
          </div>
        )}
      </div>

      <div className="grid gap-4">
        {jesusLessons.map((lesson) => {
          const completed = isLessonCompleted(lesson.id);
          return (
            <div
              key={lesson.id}
              className={`p-6 rounded-xl border-2 transition-all ${
                completed
                  ? 'bg-green-500/10 border-green-500'
                  : 'glass border-slate-700 hover:border-indigo-500'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{lesson.title}</h3>
                  <p className="text-sm text-indigo-400 mb-2">{lesson.topic}</p>
                  <p className="text-gray-400 mb-3">{lesson.description}</p>
                  <div className="flex gap-4 text-sm text-gray-400">
                    <span>⏱️ {lesson.estimatedTime}</span>
                    <span>📊 {lesson.difficulty}</span>
                    <span>💰 {lesson.reward} NICHE</span>
                  </div>
                </div>
                {completed && (
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ✓ Completed
                  </div>
                )}
              </div>
              <button
                onClick={() => startLesson(lesson)}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  completed
                    ? 'glass border border-slate-700 text-gray-300 hover:bg-slate-800'
                    : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600'
                }`}
              >
                {completed ? 'Review Lesson' : 'Start Lesson'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
