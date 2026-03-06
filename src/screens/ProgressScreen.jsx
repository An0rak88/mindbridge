import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus, Calendar, Brain, Target, Award } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, Tooltip } from 'recharts'

const moodData = [
  { day: 'Mon', mood: 3, anxiety: 65 },
  { day: 'Tue', mood: 2, anxiety: 75 },
  { day: 'Wed', mood: 3, anxiety: 60 },
  { day: 'Thu', mood: 4, anxiety: 45 },
  { day: 'Fri', mood: 3, anxiety: 55 },
  { day: 'Sat', mood: 4, anxiety: 40 },
  { day: 'Sun', mood: 4, anxiety: 35 },
]

const weeklyMoodData = [
  { week: 'W1', avg: 2.3 },
  { week: 'W2', avg: 2.8 },
  { week: 'W3', avg: 3.1 },
  { week: 'W4', avg: 3.5 },
]

const distortionData = [
  { name: 'Fortune Telling', count: 8, color: '#f43f5e' },
  { name: 'Catastrophising', count: 5, color: '#f97316' },
  { name: 'Overgeneralisation', count: 4, color: '#a855f7' },
  { name: 'Mind Reading', count: 3, color: '#0ea5e9' },
  { name: 'All-or-Nothing', count: 2, color: '#14b8a6' },
]

export default function ProgressScreen() {
  const [tab, setTab] = useState('week')

  return (
    <div className="min-h-full bg-gradient-to-b from-primary-50 via-white to-white px-6 pt-4 pb-8">
      <h1 className="text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Playfair Display' }}>
        Progress & Insights
      </h1>
      <p className="text-sm text-gray-500 mb-5">Track your therapeutic journey</p>

      {/* Time Toggle */}
      <div className="flex bg-gray-100 rounded-xl p-1 mb-5">
        {['week', 'month'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
            }`}
          >
            {t === 'week' ? 'This Week' : 'This Month'}
          </button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-emerald-50 rounded-2xl p-3.5 border border-emerald-100">
          <div className="flex items-center gap-1.5 mb-2">
            <TrendingUp size={14} className="text-emerald-500" />
            <span className="text-xs font-medium text-emerald-600">Avg Mood</span>
          </div>
          <p className="text-2xl font-bold text-emerald-700">3.4<span className="text-sm font-normal text-emerald-400">/5</span></p>
          <p className="text-xs text-emerald-500 mt-0.5">↑ 0.6 from last week</p>
        </div>
        <div className="bg-primary-50 rounded-2xl p-3.5 border border-primary-100">
          <div className="flex items-center gap-1.5 mb-2">
            <TrendingDown size={14} className="text-primary-500" />
            <span className="text-xs font-medium text-primary-600">Avg Anxiety</span>
          </div>
          <p className="text-2xl font-bold text-primary-700">48<span className="text-sm font-normal text-primary-400">/100</span></p>
          <p className="text-xs text-primary-500 mt-0.5">↓ 12 from last week</p>
        </div>
        <div className="bg-lavender-50 rounded-2xl p-3.5 border border-lavender-100">
          <div className="flex items-center gap-1.5 mb-2">
            <Brain size={14} className="text-lavender-500" />
            <span className="text-xs font-medium text-lavender-500">Records</span>
          </div>
          <p className="text-2xl font-bold text-lavender-500">12</p>
          <p className="text-xs text-lavender-400 mt-0.5">Thought records total</p>
        </div>
        <div className="bg-warm-50 rounded-2xl p-3.5 border border-warm-100">
          <div className="flex items-center gap-1.5 mb-2">
            <Award size={14} className="text-warm-500" />
            <span className="text-xs font-medium text-warm-500">Streak</span>
          </div>
          <p className="text-2xl font-bold text-warm-500">7</p>
          <p className="text-xs text-warm-400 mt-0.5">Days in a row</p>
        </div>
      </div>

      {/* Mood Chart */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Mood & Anxiety Trend</h3>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={moodData}>
              <defs>
                <linearGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="anxGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
              <YAxis hide domain={[0, 100]} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: 12 }}
              />
              <Area type="monotone" dataKey="anxiety" stroke="#f43f5e" fill="url(#anxGrad)" strokeWidth={2} name="Anxiety" />
              <Area type="monotone" dataKey="mood" stroke="#14b8a6" fill="url(#moodGrad)" strokeWidth={2} name="Mood" yAxisId={0}
                // Scale mood to 0-100 for display
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-1.5 rounded-full bg-teal-500" />
            <span className="text-xs text-gray-500">Mood</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-1.5 rounded-full bg-rose-500" />
            <span className="text-xs text-gray-500">Anxiety</span>
          </div>
        </div>
      </div>

      {/* Monthly Progress */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Weekly Mood Average</h3>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyMoodData}>
              <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af' }} />
              <YAxis hide domain={[0, 5]} />
              <Bar dataKey="avg" fill="#0ea5e9" radius={[8, 8, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Common Distortions */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-5">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Top Cognitive Distortions</h3>
        <p className="text-xs text-gray-400 mb-3">Patterns identified from your thought records</p>
        <div className="space-y-2.5">
          {distortionData.map((d) => (
            <div key={d.name} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
              <span className="text-xs font-medium text-gray-700 flex-1">{d.name}</span>
              <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(d.count / 8) * 100}%` }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: d.color }}
                />
              </div>
              <span className="text-xs text-gray-400 w-4 text-right">{d.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Therapist Shared Insights */}
      <div className="bg-primary-50 rounded-2xl p-4 border border-primary-100">
        <h3 className="text-sm font-semibold text-primary-700 mb-2">Therapist Note</h3>
        <p className="text-xs text-primary-600 leading-relaxed">
          "Great progress with identifying fortune telling patterns, Sarah. Let's work on building evidence-based alternative thoughts in our next session. Keep up with the breathing exercises."
        </p>
        <p className="text-xs text-primary-400 mt-2">— Dr. Chen, Session 2 feedback</p>
      </div>
    </div>
  )
}
