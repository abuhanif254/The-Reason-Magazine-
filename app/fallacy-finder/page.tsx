'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { 
  Brain, 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight, 
  Info,
  Lightbulb,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

interface Fallacy {
  id: string;
  name: string;
  latinName?: string;
  description: string;
  example: string;
  rebuttal: string;
  category: 'Relevance' | 'Ambiguity' | 'Presumption' | 'Causal';
}

const QUIZ_QUESTIONS = [
  {
    argument: '"My opponent wants to loosen gun laws. Clearly, he wants to see more violence in our streets!"',
    correctFallacyId: 'strawman',
    explanation: 'This misrepresents the opponent\'s position on laws as a desire for violence.'
  },
  {
    argument: '"If we let people marry their pets, next thing you know, people will be marrying their cars!"',
    correctFallacyId: 'slippery-slope',
    explanation: 'This assumes an extreme and unlikely chain of events from a single starting point.'
  },
  {
    argument: '"Why should I believe your study on lung cancer? You used to be a smoker yourself!"',
    correctFallacyId: 'ad-hominem',
    explanation: 'This attacks the person\'s past behavior rather than the data in the study.'
  }
];

export default function FallacyFinder() {
  const [fallacies, setFallacies] = useState<Fallacy[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'learn' | 'quiz'>('learn');
  const [selectedFallacy, setSelectedFallacy] = useState<Fallacy | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<{ isCorrect: boolean; show: boolean } | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const q = query(collection(db, 'fallacies'), orderBy('name', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Fallacy[];
      setFallacies(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'fallacies');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleQuizAnswer = (fallacyId: string) => {
    const isCorrect = fallacyId === QUIZ_QUESTIONS[quizIndex].correctFallacyId;
    if (isCorrect) setScore(s => s + 1);
    setQuizFeedback({ isCorrect, show: true });
  };

  const nextQuestion = () => {
    setQuizFeedback(null);
    if (quizIndex < QUIZ_QUESTIONS.length - 1) {
      setQuizIndex(quizIndex + 1);
    } else {
      // Quiz finished - could show a result screen
    }
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setScore(0);
    setQuizFeedback(null);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-outfit font-black uppercase tracking-[0.4em] text-red-600 mb-6 px-6 py-2 bg-red-50 dark:bg-red-900/10 rounded-full">
              <Brain className="w-3 h-3" />
              Critical Thinking Tool
            </span>
            <h1 className="text-7xl md:text-9xl font-space font-black tracking-tighter text-gray-900 dark:text-white uppercase leading-[0.8] mb-8">
              Fallacy <span className="text-transparent border-text dark:border-white/20" style={{ WebkitTextStroke: '1px currentColor' }}>Finder</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-zinc-400 font-medium leading-relaxed max-w-2xl mx-auto">
              Master the art of logic. Learn to identify, deconstruct, and rebut the most common flaws in human reasoning.
            </p>
          </motion.div>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mb-16">
          <div className="bg-gray-50 dark:bg-zinc-900 p-1.5 rounded-2xl flex gap-1 border border-gray-100 dark:border-zinc-800">
            <button
              onClick={() => setView('learn')}
              className={`px-8 py-3 rounded-xl text-[10px] font-outfit font-black uppercase tracking-widest transition-all ${
                view === 'learn' ? 'bg-white dark:bg-zinc-800 text-red-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Learn Fallacies
            </button>
            <button
              onClick={() => setView('quiz')}
              className={`px-8 py-3 rounded-xl text-[10px] font-outfit font-black uppercase tracking-widest transition-all ${
                view === 'quiz' ? 'bg-white dark:bg-zinc-800 text-red-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Practice Mode
            </button>
          </div>
        </div>

        {/* Learn View */}
        {view === 'learn' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-4">
              {fallacies.map((fallacy) => (
                <motion.div
                  key={fallacy.id}
                  layoutId={fallacy.id}
                  onClick={() => setSelectedFallacy(fallacy)}
                  className={`p-6 rounded-3xl border cursor-pointer transition-all ${
                    selectedFallacy?.id === fallacy.id
                      ? 'bg-red-600 border-red-600 text-white shadow-xl shadow-red-600/20'
                      : 'bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 text-gray-900 dark:text-white hover:border-red-600/50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-space font-black uppercase tracking-tight">{fallacy.name}</h3>
                    <ChevronRight className={`w-4 h-4 transition-transform ${selectedFallacy?.id === fallacy.id ? 'rotate-90' : ''}`} />
                  </div>
                  <p className={`text-[10px] font-outfit font-bold uppercase tracking-widest ${
                    selectedFallacy?.id === fallacy.id ? 'text-white/60' : 'text-gray-400'
                  }`}>
                    {fallacy.category}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {selectedFallacy ? (
                  <motion.div
                    key={selectedFallacy.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-gray-50 dark:bg-zinc-900 rounded-[3rem] p-8 md:p-12 border border-gray-100 dark:border-zinc-800 h-full"
                  >
                    <div className="mb-12">
                      <span className="text-[10px] font-outfit font-black uppercase tracking-[0.3em] text-red-600 mb-4 block">
                        {selectedFallacy.latinName || 'Logical Fallacy'}
                      </span>
                      <h2 className="text-5xl md:text-7xl font-space font-black uppercase tracking-tighter text-gray-900 dark:text-white leading-none mb-8">
                        {selectedFallacy.name}
                      </h2>
                      <p className="text-xl text-gray-600 dark:text-zinc-400 font-medium leading-relaxed">
                        {selectedFallacy.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="p-8 bg-white dark:bg-zinc-950 rounded-[2rem] border border-gray-100 dark:border-zinc-800">
                        <div className="flex items-center gap-2 text-red-600 mb-6">
                          <AlertCircle className="w-5 h-5" />
                          <span className="text-[10px] font-outfit font-black uppercase tracking-widest">The Example</span>
                        </div>
                        <p className="text-lg text-gray-900 dark:text-white font-serif italic leading-relaxed">
                          {selectedFallacy.example}
                        </p>
                      </div>

                      <div className="p-8 bg-white dark:bg-zinc-950 rounded-[2rem] border border-gray-100 dark:border-zinc-800">
                        <div className="flex items-center gap-2 text-green-600 mb-6">
                          <CheckCircle2 className="w-5 h-5" />
                          <span className="text-[10px] font-outfit font-black uppercase tracking-widest">The Rebuttal</span>
                        </div>
                        <p className="text-lg text-gray-900 dark:text-white leading-relaxed">
                          {selectedFallacy.rebuttal}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center bg-gray-50 dark:bg-zinc-900/50 rounded-[3rem] border border-dashed border-gray-200 dark:border-zinc-800 p-12 text-center">
                    <Lightbulb className="w-12 h-12 text-gray-300 mb-6" />
                    <h3 className="text-2xl font-space font-black uppercase text-gray-400">Select a fallacy</h3>
                    <p className="text-gray-500 dark:text-zinc-500 max-w-xs mx-auto mt-2">Choose from the list on the left to explore its definition, examples, and how to counter it.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Quiz View */}
        {view === 'quiz' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-zinc-900 rounded-[3rem] p-8 md:p-16 border border-gray-100 dark:border-zinc-800 shadow-2xl shadow-black/5">
              <div className="flex justify-between items-center mb-12">
                <span className="text-[10px] font-outfit font-black uppercase tracking-widest text-gray-400">
                  Question {quizIndex + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <span className="text-[10px] font-outfit font-black uppercase tracking-widest text-red-600">
                  Score: {score}
                </span>
              </div>

              <div className="mb-12">
                <h3 className="text-xs font-outfit font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Identify the Fallacy:</h3>
                <p className="text-3xl md:text-4xl font-serif italic text-gray-900 dark:text-white leading-tight">
                  {QUIZ_QUESTIONS[quizIndex].argument}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {fallacies.map((fallacy) => (
                  <button
                    key={fallacy.id}
                    disabled={!!quizFeedback}
                    onClick={() => handleQuizAnswer(fallacy.id)}
                    className={`p-6 rounded-2xl border text-left transition-all ${
                      quizFeedback?.show && fallacy.id === QUIZ_QUESTIONS[quizIndex].correctFallacyId
                        ? 'bg-green-50 border-green-500 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                        : quizFeedback?.show && !quizFeedback.isCorrect && fallacy.id !== QUIZ_QUESTIONS[quizIndex].correctFallacyId
                        ? 'opacity-50 grayscale'
                        : 'bg-gray-50 dark:bg-zinc-950 border-gray-100 dark:border-zinc-800 text-gray-900 dark:text-white hover:border-red-600'
                    }`}
                  >
                    <span className="text-sm font-space font-bold uppercase">{fallacy.name}</span>
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {quizFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-8 rounded-[2rem] mb-8 ${
                      quizFeedback.isCorrect ? 'bg-green-50 dark:bg-green-900/10' : 'bg-red-50 dark:bg-red-900/10'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {quizFeedback.isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                      )}
                      <div>
                        <h4 className={`text-lg font-space font-black uppercase mb-2 ${
                          quizFeedback.isCorrect ? 'text-green-800 dark:text-green-400' : 'text-red-800 dark:text-red-400'
                        }`}>
                          {quizFeedback.isCorrect ? 'Correct!' : 'Not quite...'}
                        </h4>
                        <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">
                          {QUIZ_QUESTIONS[quizIndex].explanation}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-end">
                {quizFeedback ? (
                  <button
                    onClick={quizIndex < QUIZ_QUESTIONS.length - 1 ? nextQuestion : resetQuiz}
                    className="flex items-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-black px-10 py-4 rounded-full font-outfit font-black uppercase tracking-widest text-[10px] transition-all hover:scale-105 active:scale-95"
                  >
                    {quizIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'Restart Quiz'}
                    {quizIndex < QUIZ_QUESTIONS.length - 1 ? <ArrowRight className="w-4 h-4" /> : <RotateCcw className="w-4 h-4" />}
                  </button>
                ) : (
                  <div className="text-[10px] font-outfit font-black uppercase tracking-widest text-gray-400">
                    Select an answer to proceed
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
