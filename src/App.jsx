import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Home, BookOpen, Wind, BarChart3, Calendar, Brain } from 'lucide-react'
import HomeScreen from './screens/HomeScreen'
import MoodCheckin from './screens/MoodCheckin'
import ThoughtRecord from './screens/ThoughtRecord'
import BreathingExercise from './screens/BreathingExercise'
import ProgressScreen from './screens/ProgressScreen'
import SessionPrep from './screens/SessionPrep'
import './index.css'

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'mood', label: 'Mood', icon: Brain },
  { id: 'thoughts', label: 'Journal', icon: BookOpen },
  { id: 'breathe', label: 'Breathe', icon: Wind },
  { id: 'progress', label: 'Progress', icon: BarChart3 },
  { id: 'session', label: 'Sessions', icon: Calendar },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [direction, setDirection] = useState(0)

  const handleTabChange = (tabId) => {
    const currentIndex = tabs.findIndex(t => t.id === activeTab)
    const newIndex = tabs.findIndex(t => t.id === tabId)
    setDirection(newIndex > currentIndex ? 1 : -1)
    setActiveTab(tabId)
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'home': return <HomeScreen onNavigate={handleTabChange} />
      case 'mood': return <MoodCheckin />
      case 'thoughts': return <ThoughtRecord />
      case 'breathe': return <BreathingExercise />
      case 'progress': return <ProgressScreen />
      case 'session': return <SessionPrep />
      default: return <HomeScreen onNavigate={handleTabChange} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-teal-50 flex items-center justify-center p-4">
      {/* Phone Frame */}
      <div className="w-[390px] h-[844px] bg-white rounded-[3rem] shadow-2xl overflow-hidden relative border-[8px] border-gray-900 flex flex-col">
        {/* Status Bar */}
        <div className="bg-white px-8 pt-3 pb-1 flex justify-between items-center text-xs font-semibold text-gray-900 z-50">
          <span>9:41</span>
          <div className="w-[120px] h-[28px] bg-black rounded-full mx-auto" />
          <div className="flex gap-1 items-center">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><rect x="0" y="4" width="3" height="8" rx="0.5"/><rect x="4.5" y="2.5" width="3" height="9.5" rx="0.5"/><rect x="9" y="1" width="3" height="11" rx="0.5"/><rect x="13.5" y="0" width="2.5" height="12" rx="0.5" opacity="0.3"/></svg>
            <svg width="24" height="12" viewBox="0 0 24 12" fill="currentColor"><rect x="0" y="0" width="22" height="12" rx="2" stroke="currentColor" strokeWidth="1" fill="none"/><rect x="1.5" y="1.5" width="14" height="9" rx="1" fill="currentColor"/><rect x="23" y="3.5" width="1.5" height="5" rx="0.5" fill="currentColor"/></svg>
          </div>
        </div>

        {/* Screen Content */}
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: direction * 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -30 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="absolute inset-0 overflow-y-auto scrollbar-hide"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Nav */}
        <div className="bg-white/95 backdrop-blur-lg border-t border-gray-100 px-2 pb-6 pt-2 z-50">
          <div className="flex justify-around">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all duration-200 relative ${
                    isActive ? 'text-primary-600' : 'text-gray-400'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
                  <span className={`text-[10px] ${isActive ? 'font-semibold' : 'font-medium'}`}>
                    {tab.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
