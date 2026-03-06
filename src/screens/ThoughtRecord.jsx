import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, ChevronRight, AlertCircle, Lightbulb, ArrowRight, X, RefreshCw } from 'lucide-react'

const pastEntries = [
  {
    id: 1,
    date: 'Today, 8:30 AM',
    situation: 'Thinking about upcoming presentation at work',
    autoThought: 'I\'m going to embarrass myself in front of everyone',
    emotion: 'Anxious (85%)',
    distortion: 'Fortune Telling',
    reframe: 'I\'ve presented before and it went okay. I can prepare well and manage my anxiety.',
    newEmotion: 'Anxious (40%)',
  },
  {
    id: 2,
    date: 'Yesterday, 6:15 PM',
    situation: 'Friend cancelled dinner plans last minute',
    autoThought: 'Nobody actually wants to spend time with me',
    emotion: 'Sad (70%)',
    distortion: 'Overgeneralisation',
    reframe: 'She said she was sick. One cancellation doesn\'t mean nobody wants to see me.',
    newEmotion: 'Sad (25%)',
  },
]

const distortions = [
  { name: 'All-or-Nothing', desc: 'Seeing things in black and white' },
  { name: 'Catastrophising', desc: 'Expecting the worst outcome' },
  { name: 'Fortune Telling', desc: 'Predicting negative outcomes' },
  { name: 'Mind Reading', desc: 'Assuming what others think' },
  { name: 'Overgeneralisation', desc: 'One event = pattern' },
  { name: 'Personalisation', desc: 'Blaming yourself for everything' },
  { name: 'Should Statements', desc: '"I should/must" pressure' },
  { name: 'Emotional Reasoning', desc: 'Feelings as facts' },
]

export default function ThoughtRecord() {
  const [showNew, setShowNew] = useState(false)
  const [newStep, setNewStep] = useState(0)
  const [situation, setSituation] = useState('')
  const [thought, setThought] = useState('')
  const [emotion, setEmotion] = useState('')
  const [emotionIntensity, setEmotionIntensity] = useState(50)
  const [selectedDistortion, setSelectedDistortion] = useState(null)
  const [reframe, setReframe] = useState('')
  const [expandedEntry, setExpandedEntry] = useState(null)

  const newSteps = ['Situation', 'Thought', 'Emotion', 'Distortion', 'Reframe']

  if (showNew) {
    return (
      <div className="min-h-full bg-gradient-to-b from-lavender-50 via-white to-white px-6 pt-4 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display' }}>
            New Thought Record
          </h1>
          <button onClick={() => { setShowNew(false); setNewStep(0) }} className="p-2 rounded-full hover:bg-gray-100">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-1 mb-2">
          {newSteps.map((s, i) => (
            <div key={s} className="flex-1 h-1.5 rounded-full transition-all duration-300"
              style={{ backgroundColor: i <= newStep ? '#a855f7' : '#e5e7eb' }} />
          ))}
        </div>
        <p className="text-xs text-gray-400 mb-5">Step {newStep + 1} of {newSteps.length}: {newSteps[newStep]}</p>

        <AnimatePresence mode="wait">
          {newStep === 0 && (
            <motion.div key="sit" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-base font-semibold text-gray-800 mb-2">What was happening?</h2>
              <p className="text-xs text-gray-400 mb-4">Describe the situation that triggered the thought</p>
              <textarea
                value={situation}
                onChange={e => setSituation(e.target.value)}
                placeholder="e.g., I was sitting in the waiting room before my appointment..."
                className="w-full h-36 p-4 rounded-2xl border-2 border-gray-200 focus:border-lavender-400 focus:ring-2 focus:ring-lavender-100 outline-none text-sm text-gray-700 placeholder:text-gray-400 resize-none bg-white"
              />
              <button
                onClick={() => setNewStep(1)}
                disabled={!situation.trim()}
                className="w-full mt-4 py-3.5 bg-lavender-500 text-white rounded-2xl font-semibold disabled:opacity-40 hover:bg-lavender-600 transition-colors"
              >
                Next
              </button>
            </motion.div>
          )}

          {newStep === 1 && (
            <motion.div key="thought" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-base font-semibold text-gray-800 mb-2">What thought went through your mind?</h2>
              <p className="text-xs text-gray-400 mb-4">Write the automatic thought exactly as it occurred</p>
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3 mb-3 flex gap-2">
                <AlertCircle size={16} className="text-rose-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-rose-600">Try to capture the exact words your inner critic used</p>
              </div>
              <textarea
                value={thought}
                onChange={e => setThought(e.target.value)}
                placeholder="e.g., I'm going to mess this up and everyone will think I'm incompetent..."
                className="w-full h-32 p-4 rounded-2xl border-2 border-gray-200 focus:border-lavender-400 focus:ring-2 focus:ring-lavender-100 outline-none text-sm text-gray-700 placeholder:text-gray-400 resize-none bg-white"
              />
              <div className="flex gap-3 mt-4">
                <button onClick={() => setNewStep(0)} className="flex-1 py-3.5 border-2 border-gray-200 text-gray-600 rounded-2xl font-semibold">Back</button>
                <button onClick={() => setNewStep(2)} disabled={!thought.trim()} className="flex-[2] py-3.5 bg-lavender-500 text-white rounded-2xl font-semibold disabled:opacity-40">Next</button>
              </div>
            </motion.div>
          )}

          {newStep === 2 && (
            <motion.div key="emotion" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-base font-semibold text-gray-800 mb-2">What emotion did you feel?</h2>
              <p className="text-xs text-gray-400 mb-4">Name the primary emotion and rate its intensity</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {['Anxious', 'Sad', 'Angry', 'Guilty', 'Ashamed', 'Frustrated', 'Hopeless', 'Scared'].map(e => (
                  <button
                    key={e}
                    onClick={() => setEmotion(e)}
                    className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all ${
                      emotion === e ? 'bg-lavender-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {e}
                  </button>
                ))}
              </div>
              {emotion && (
                <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Intensity</span>
                    <span className="font-bold text-lavender-500">{emotionIntensity}%</span>
                  </div>
                  <input
                    type="range"
                    min="0" max="100"
                    value={emotionIntensity}
                    onChange={e => setEmotionIntensity(Number(e.target.value))}
                    className="w-full accent-lavender-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Mild</span><span>Moderate</span><span>Severe</span>
                  </div>
                </div>
              )}
              <div className="flex gap-3 mt-4">
                <button onClick={() => setNewStep(1)} className="flex-1 py-3.5 border-2 border-gray-200 text-gray-600 rounded-2xl font-semibold">Back</button>
                <button onClick={() => setNewStep(3)} disabled={!emotion} className="flex-[2] py-3.5 bg-lavender-500 text-white rounded-2xl font-semibold disabled:opacity-40">Next</button>
              </div>
            </motion.div>
          )}

          {newStep === 3 && (
            <motion.div key="distortion" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-base font-semibold text-gray-800 mb-2">Identify the thinking pattern</h2>
              <p className="text-xs text-gray-400 mb-4">Which cognitive distortion applies?</p>
              <div className="space-y-2 mb-4 max-h-64 overflow-y-auto scrollbar-hide">
                {distortions.map(d => (
                  <button
                    key={d.name}
                    onClick={() => setSelectedDistortion(d.name)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${
                      selectedDistortion === d.name
                        ? 'bg-lavender-50 border-lavender-300'
                        : 'bg-white border-gray-100'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${
                      selectedDistortion === d.name ? 'bg-lavender-500 border-lavender-500' : 'border-gray-300'
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{d.name}</p>
                      <p className="text-xs text-gray-400">{d.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setNewStep(2)} className="flex-1 py-3.5 border-2 border-gray-200 text-gray-600 rounded-2xl font-semibold">Back</button>
                <button onClick={() => setNewStep(4)} disabled={!selectedDistortion} className="flex-[2] py-3.5 bg-lavender-500 text-white rounded-2xl font-semibold disabled:opacity-40">Next</button>
              </div>
            </motion.div>
          )}

          {newStep === 4 && (
            <motion.div key="reframe" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-base font-semibold text-gray-800 mb-2">Reframe the thought</h2>
              <div className="bg-lavender-50 border border-lavender-200 rounded-2xl p-3 mb-3 flex gap-2">
                <Lightbulb size={16} className="text-lavender-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-lavender-600">What would you tell a friend thinking this way? What's a more balanced perspective?</p>
              </div>

              <div className="bg-rose-50 rounded-xl p-3 mb-2">
                <p className="text-xs text-rose-400 font-medium mb-1">Original thought:</p>
                <p className="text-sm text-rose-700 italic">"{thought}"</p>
              </div>
              <div className="flex justify-center my-2">
                <RefreshCw size={18} className="text-lavender-400" />
              </div>
              <textarea
                value={reframe}
                onChange={e => setReframe(e.target.value)}
                placeholder="Write a more balanced, realistic thought..."
                className="w-full h-28 p-4 rounded-2xl border-2 border-lavender-200 focus:border-lavender-400 focus:ring-2 focus:ring-lavender-100 outline-none text-sm text-gray-700 placeholder:text-gray-400 resize-none bg-white"
              />
              <div className="flex gap-3 mt-4">
                <button onClick={() => setNewStep(3)} className="flex-1 py-3.5 border-2 border-gray-200 text-gray-600 rounded-2xl font-semibold">Back</button>
                <button
                  onClick={() => setShowNew(false)}
                  disabled={!reframe.trim()}
                  className="flex-[2] py-3.5 bg-gradient-to-r from-lavender-500 to-primary-500 text-white rounded-2xl font-semibold disabled:opacity-40"
                >
                  Save Record
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="min-h-full bg-gradient-to-b from-lavender-50 via-white to-white px-6 pt-4 pb-8">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display' }}>
          Thought Journal
        </h1>
      </div>
      <p className="text-sm text-gray-500 mb-5">CBT thought records</p>

      {/* New Entry Button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setShowNew(true)}
        className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-lavender-500 to-primary-500 text-white rounded-2xl font-semibold shadow-lg shadow-lavender-200 mb-6"
      >
        <Plus size={20} />
        New Thought Record
      </motion.button>

      {/* How it works */}
      <div className="bg-lavender-50 rounded-2xl p-4 mb-6 border border-lavender-100">
        <h3 className="text-sm font-semibold text-lavender-700 mb-2">How CBT Thought Records Work</h3>
        <div className="flex items-center gap-2 text-xs text-lavender-600">
          <span className="bg-lavender-200 px-2 py-0.5 rounded-full">Situation</span>
          <ArrowRight size={12} />
          <span className="bg-lavender-200 px-2 py-0.5 rounded-full">Thought</span>
          <ArrowRight size={12} />
          <span className="bg-lavender-200 px-2 py-0.5 rounded-full">Emotion</span>
          <ArrowRight size={12} />
          <span className="bg-lavender-200 px-2 py-0.5 rounded-full">Reframe</span>
        </div>
      </div>

      {/* Past Entries */}
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Recent Records</h2>
      <div className="space-y-3">
        {pastEntries.map((entry) => (
          <motion.div
            key={entry.id}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
          >
            <button
              onClick={() => setExpandedEntry(expandedEntry === entry.id ? null : entry.id)}
              className="w-full p-4 text-left"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400">{entry.date}</span>
                <span className="text-xs bg-lavender-100 text-lavender-600 px-2 py-0.5 rounded-full font-medium">{entry.distortion}</span>
              </div>
              <p className="text-sm font-medium text-gray-800 mb-1 line-clamp-1">"{entry.autoThought}"</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="text-rose-500">{entry.emotion}</span>
                <ArrowRight size={10} />
                <span className="text-emerald-500">{entry.newEmotion}</span>
              </div>
            </button>
            <AnimatePresence>
              {expandedEntry === entry.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-gray-100"
                >
                  <div className="p-4 space-y-3 text-xs">
                    <div>
                      <p className="font-semibold text-gray-500 mb-1">Situation</p>
                      <p className="text-gray-700">{entry.situation}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-500 mb-1">Reframed Thought</p>
                      <p className="text-emerald-700 bg-emerald-50 p-2 rounded-xl">{entry.reframe}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
