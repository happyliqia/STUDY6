
import React, { useState } from 'react';
import { KIDS_BOX_UNITS } from './constants';
import { UnitContent } from './types';
import { UnitCard } from './components/UnitCard';
import { QuizView } from './components/QuizView';
import { AITeacher } from './components/AITeacher';

const App: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState<UnitContent>(KIDS_BOX_UNITS[0]);
  const [mode, setMode] = useState<'overview' | 'quiz'>('overview');

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-indigo-200">
              KB
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">Explorer</h1>
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Units 1-10</p>
            </div>
          </div>
          
          <div className="hidden md:flex space-x-2">
            <button 
              onClick={() => setMode('overview')}
              className={`px-5 py-2 rounded-full font-bold transition-all ${
                mode === 'overview' ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              Overview
            </button>
            <button 
              onClick={() => setMode('quiz')}
              className={`px-5 py-2 rounded-full font-bold transition-all ${
                mode === 'quiz' ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              Practice
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-8 lg:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar: Unit List */}
          <aside className="lg:col-span-3 space-y-4">
            <h2 className="text-lg font-black text-gray-400 uppercase tracking-widest px-2">The Map</h2>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {KIDS_BOX_UNITS.map(unit => (
                <UnitCard 
                  key={unit.id} 
                  unit={unit} 
                  isActive={selectedUnit.id === unit.id}
                  onClick={(u) => {
                    setSelectedUnit(u);
                    setMode('overview');
                  }}
                />
              ))}
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            {mode === 'overview' ? (
              <div className="space-y-8 animate-in fade-in duration-500">
                {/* Hero Card */}
                <div className={`p-8 lg:p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden ${selectedUnit.color}`}>
                  <div className="relative z-10">
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="text-6xl">{selectedUnit.icon}</span>
                      <div>
                        <span className="text-sm font-black text-white/70 uppercase tracking-widest">Unit {selectedUnit.id}</span>
                        <h2 className="text-4xl lg:text-6xl font-black">{selectedUnit.title}</h2>
                      </div>
                    </div>
                    <p className="text-xl lg:text-2xl text-white/90 max-w-2xl font-medium leading-relaxed mb-8">
                      {selectedUnit.description}
                    </p>
                    <button 
                      onClick={() => setMode('quiz')}
                      className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-black text-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                    >
                      Start Practice! 🚀
                    </button>
                  </div>
                  {/* Decorative backgrounds */}
                  <div className="absolute top-0 right-0 p-12 opacity-10">
                    <span className="text-[12rem] leading-none select-none">{selectedUnit.icon}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Vocabulary Section */}
                  <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center text-xl">🅰️</div>
                      <h3 className="text-2xl font-black text-gray-800">Words to Learn</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedUnit.vocabulary.map((word, i) => (
                        <span key={i} className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-gray-700 font-bold hover:bg-yellow-50 hover:border-yellow-200 transition-colors cursor-default">
                          {word}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Grammar Section */}
                  <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-xl">📝</div>
                      <h3 className="text-2xl font-black text-gray-800">Sentence Magic</h3>
                    </div>
                    <ul className="space-y-3">
                      {selectedUnit.grammar.map((rule, i) => (
                        <li key={i} className="flex items-start space-x-3 p-3 bg-blue-50/50 rounded-2xl">
                          <span className="text-blue-500 mt-1">✨</span>
                          <span className="text-gray-700 font-medium">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* AI Assistant Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 h-full">
                      <h3 className="text-2xl font-black text-gray-800 mb-4">Study Tips</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-2xl">
                          <span className="text-3xl">🔊</span>
                          <p className="text-gray-700 font-medium">Read the vocabulary words out loud to practice your pronunciation!</p>
                        </div>
                        <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-2xl">
                          <span className="text-3xl">🖍️</span>
                          <p className="text-gray-700 font-medium">Draw pictures for each word. It helps your brain remember better!</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-1">
                    <AITeacher unit={selectedUnit} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="animate-in zoom-in-95 duration-300">
                <QuizView unit={selectedUnit} onClose={() => setMode('overview')} />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer / Mobile Nav */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 md:hidden flex justify-around p-4 z-50">
        <button onClick={() => setMode('overview')} className={`flex flex-col items-center ${mode === 'overview' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[10px] font-bold">Learn</span>
        </button>
        <button onClick={() => setMode('quiz')} className={`flex flex-col items-center ${mode === 'quiz' ? 'text-indigo-600' : 'text-gray-400'}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <span className="text-[10px] font-bold">Quiz</span>
        </button>
      </footer>
    </div>
  );
};

export default App;
