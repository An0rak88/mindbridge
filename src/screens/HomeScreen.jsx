import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Sun, Cloud, CloudRain, Zap, Brain, Wind, BookOpen,
  TrendingUp, ChevronRight, Sparkles, Heart, Calendar
} from 'lucide-react'

const quickMoods = [
  { emoji: '😊', label: 'Good', color: 'bg-emerald-100 text-emerald-700' },
  { emoji: '😐', label: 'Okay', color: 'bg-amber-100 text-amber-700' },
  { emoji: '😟', label: 'Low', color: 'bg-orange-100 text-orange-700' },
  { emoji: '😰', label: 'Anxious', color: 'bg-rose-100 text-rose-700' },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } }
}
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 }
}

export default function HomeScreen({ onNavigate }) {
  const [selectedMood, setSelectedMood] = useState(null)
  const hour = 9

  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <motion.div
      className="min-h-full bg-gradient-to-b from-primary-50 via-white to-white"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div variants={item} className="px-6 pt-4 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-primary-600 font-medium">{greeting}</p>
            <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display' }}>
              Sarah
            </h1>
          </div>
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary-400 to-calm-400 flex items-center justify-center text-white text-lg font-semibold shadow-lg shadow-primary-200">
            S
          </div>
        </div>
      </motion.div>

      {/* Daily Quote */}
      <motion.div variants={item} className="px-6 pb-4">
        <div className="bg-gradient-to-r from-primary-500 via-primary-600 to-calm-600 rounded-2xl p-4 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-6 -translate-x-6" />
          <Sparkles size={16} className="mb-2 opacity-80" />
          <p className="text-sm font-medium leading-relaxed relative z-10">
            "You don't have to control your thoughts. You just have to stop letting them control you."
          </p>
          <p className="text-xs opacity-70 mt-2 relative z-10">— Dan Millman</p>
        </div>
      </motion.div>

      {/* Quick Mood Check */}
      <motion.div variants={item} className="px-6 pb-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">How are you feeling?</h2>
        <div className="flex gap-3">
          {quickMoods.map((mood) => (
            <motion.button
              key={mood.label}
              whileTap={{ scale: 0.92 }}
              onClick={() => setSelectedMood(mood.label)}
              className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-2xl border-2 transition-all duration-200 ${
                selectedMood === mood.label
                  ? `${mood.color} border-current shadow-sm`
                  : 'bg-gray-50 border-transparent text-gray-600'
              }`}
            >
              <span className="text-2xl">{mood.emoji}</span>
              <span className="text-xs font-medium">{mood.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Today's Plan */}
      <motion.div variants={item} className="px-6 pb-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Today's Plan</h2>
        <div className="space-y-2.5">
          <button
            onClick={() => onNavigate('thoughts')}
            className="w-full flex items-center gap-3 bg-lavender-50 p-3.5 rounded-2xl border border-lavender-100 hover:bg-lavender-100 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-lavender-200 flex items-center justify-center">
              <BookOpen size={18} className="text-lavender-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">Thought Journal</p>
              <p className="text-xs text-gray-500">Record & reframe anxious thoughts</p>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>

          <button
            onClick={() => onNavigate('breathe')}
            className="w-full flex items-center gap-3 bg-calm-50 p-3.5 rounded-2xl border border-calm-100 hover:bg-calm-100 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-calm-200 flex items-center justify-center">
              <Wind size={18} className="text-calm-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">Breathing Exercise</p>
              <p className="text-xs text-gray-500">4-7-8 calming technique</p>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>

          <button
            onClick={() => onNavigate('session')}
            className="w-full flex items-center gap-3 bg-warm-50 p-3.5 rounded-2xl border border-warm-100 hover:bg-warm-100 transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-warm-200 flex items-center justify-center">
              <Calendar size={18} className="text-warm-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">Session 3 Prep</p>
              <p className="text-xs text-gray-500">Next session: Thursday 2pm</p>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        </div>
      </motion.div>

      {/* Weekly Stats */}
      <motion.div variants={item} className="px-6 pb-4">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">This Week</h2>
        <div className="flex gap-3">
          <div className="flex-1 bg-emerald-50 rounded-2xl p-3.5 border border-emerald-100">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={14} className="text-emerald-500" />
              <span className="text-xs font-medium text-emerald-600">Mood Trend</span>
            </div>
            <p className="text-xl font-bold text-emerald-700">+12%</p>
            <p className="text-xs text-emerald-500">Improving</p>
          </div>
          <div className="flex-1 bg-primary-50 rounded-2xl p-3.5 border border-primary-100">
            <div className="flex items-center gap-2 mb-1">
              <Brain size={14} className="text-primary-500" />
              <span className="text-xs font-medium text-primary-600">Entries</span>
            </div>
            <p className="text-xl font-bold text-primary-700">5</p>
            <p className="text-xs text-primary-500">Thought records</p>
          </div>
          <div className="flex-1 bg-lavender-50 rounded-2xl p-3.5 border border-lavender-100">
            <div className="flex items-center gap-2 mb-1">
              <Heart size={14} className="text-lavender-500" />
              <span className="text-xs font-medium text-lavender-500">Streak</span>
            </div>
            <p className="text-xl font-bold text-lavender-500">7</p>
            <p className="text-xs text-lavender-400">Days active</p>
          </div>
        </div>
      </motion.div>

      {/* Safety Note */}
      <motion.div variants={item} className="px-6 pb-8">
        <div className="bg-rose-50 rounded-2xl p-4 border border-rose-100">
          <p className="text-xs text-rose-600 font-medium mb-1">Need immediate support?</p>
          <p className="text-xs text-rose-500">If you're in crisis, please contact Lifeline: 13 11 14 or emergency services: 000</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
