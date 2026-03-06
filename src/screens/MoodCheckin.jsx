import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown, ChevronRight } from 'lucide-react'

const moodLevels = [
  { value: 1, emoji: '😣', label: 'Very Low', color: 'from-rose-400 to-rose-500', bg: 'bg-rose-50', ring: 'ring-rose-200' },
  { value: 2, emoji: '😞', label: 'Low', color: 'from-orange-400 to-orange-500', bg: 'bg-orange-50', ring: 'ring-orange-200' },
  { value: 3, emoji: '😐', label: 'Neutral', color: 'from-amber-400 to-amber-500', bg: 'bg-amber-50', ring: 'ring-amber-200' },
  { value: 4, emoji: '🙂', label: 'Good', color: 'from-emerald-400 to-emerald-500', bg: 'bg-emerald-50', ring: 'ring-emerald-200' },
  { value: 5, emoji: '😊', label: 'Great', color: 'from-teal-400 to-teal-500', bg: 'bg-teal-50', ring: 'ring-teal-200' },
]

const anxietyLevels = [
  { value: 0, label: 'None' },
  { value: 1, label: 'Mild' },
  { value: 2, label: 'Moderate' },
  { value: 3, label: 'High' },
  { value: 4, label: 'Severe' },
]

const triggers = [
  'Work/Study', 'Social', 'Health', 'Family', 'Finance', 'Sleep', 'News', 'Relationship', 'Self-image', 'Other'
]

const physicalSymptoms = [
  'Racing heart', 'Tight chest', 'Sweating', 'Nausea', 'Headache', 'Trembling', 'Fatigue', 'Muscle tension'
]

export default function MoodCheckin() {
  const [step, setStep] = useState(0)
  const [mood, setMood] = useState(null)
  const [anxiety, setAnxiety] = useState(null)
  const [selectedTriggers, setSelectedTriggers] = useState([])
  const [selectedSymptoms, setSelectedSymptoms] = useState([])
  const [note, setNote] = useState('')
  const [saved, setSaved] = useState(false)

  const toggleTrigger = (t) => {
    setSelectedTriggers(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  }
  const toggleSymptom = (s) => {
    setSelectedSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const steps = ['Mood', 'Anxiety', 'Triggers', 'Notes']

  return (
    <div className="min-h-full bg-gradient-to-b from-primary-50 via-white to-white px-6 pt-4 pb-8">
      <h1 className="text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Playfair Display' }}>
        Mood Check-in
      </h1>
      <p className="text-sm text-gray-500 mb-5">Track how you're feeling right now</p>

      {/* Progress Steps */}
      <div className="flex items-center gap-1 mb-6">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i <= step ? 'bg-primary-400' : 'bg-gray-200'
            }`} />
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="mood"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-base font-semibold text-gray-800 mb-4">How is your overall mood?</h2>
            <div className="space-y-3">
              {moodLevels.map((m) => (
                <motion.button
                  key={m.value}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setMood(m.value)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                    mood === m.value
                      ? `${m.bg} border-current ${m.ring} ring-2 shadow-sm`
                      : 'bg-white border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <span className="text-3xl">{m.emoji}</span>
                  <div className="text-left flex-1">
                    <p className="font-semibold text-gray-800">{m.label}</p>
                    <p className="text-xs text-gray-400">{m.value}/5</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    mood === m.value ? 'bg-primary-500 border-primary-500' : 'border-gray-300'
                  }`}>
                    {mood === m.value && <Check size={14} className="text-white" />}
                  </div>
                </motion.button>
              ))}
            </div>
            <button
              onClick={() => mood !== null && setStep(1)}
              disabled={mood === null}
              className="w-full mt-6 py-3.5 bg-primary-500 text-white rounded-2xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary-600 transition-colors"
            >
              Continue
            </button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="anxiety"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-base font-semibold text-gray-800 mb-2">Anxiety level right now?</h2>
            <p className="text-xs text-gray-400 mb-5">Rate your current anxiety using the SUDS scale</p>

            <div className="space-y-3 mb-6">
              {anxietyLevels.map((a) => (
                <button
                  key={a.value}
                  onClick={() => setAnxiety(a.value)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                    anxiety === a.value
                      ? 'bg-primary-50 border-primary-300 ring-2 ring-primary-100'
                      : 'bg-white border-gray-100'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                    anxiety === a.value ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {a.value * 25}
                  </div>
                  <span className="font-medium text-gray-700">{a.label}</span>
                </button>
              ))}
            </div>

            <h3 className="text-sm font-semibold text-gray-700 mb-3">Physical symptoms</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {physicalSymptoms.map((s) => (
                <button
                  key={s}
                  onClick={() => toggleSymptom(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedSymptoms.includes(s)
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(0)}
                className="flex-1 py-3.5 border-2 border-gray-200 text-gray-600 rounded-2xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep(2)}
                className="flex-[2] py-3.5 bg-primary-500 text-white rounded-2xl font-semibold hover:bg-primary-600 transition-colors"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="triggers"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-base font-semibold text-gray-800 mb-2">What triggered these feelings?</h2>
            <p className="text-xs text-gray-400 mb-5">Select all that apply</p>

            <div className="flex flex-wrap gap-2.5 mb-8">
              {triggers.map((t) => (
                <motion.button
                  key={t}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleTrigger(t)}
                  className={`px-4 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                    selectedTriggers.includes(t)
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {t}
                </motion.button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3.5 border-2 border-gray-200 text-gray-600 rounded-2xl font-semibold hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-[2] py-3.5 bg-primary-500 text-white rounded-2xl font-semibold hover:bg-primary-600"
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="notes"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h2 className="text-base font-semibold text-gray-800 mb-2">Anything else to note?</h2>
            <p className="text-xs text-gray-400 mb-4">Optional: add context for your therapist</p>

            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="What was happening when you noticed these feelings? What thoughts came up?"
              className="w-full h-40 p-4 rounded-2xl border-2 border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm text-gray-700 placeholder:text-gray-400 resize-none bg-gray-50"
            />

            {/* Summary */}
            <div className="mt-4 bg-primary-50 rounded-2xl p-4 space-y-2">
              <h3 className="text-sm font-semibold text-primary-800">Check-in Summary</h3>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Mood</span>
                <span className="font-medium text-gray-700">{moodLevels.find(m => m.value === mood)?.label || '—'} ({mood}/5)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Anxiety</span>
                <span className="font-medium text-gray-700">{anxietyLevels.find(a => a.value === anxiety)?.label || '—'}</span>
              </div>
              {selectedTriggers.length > 0 && (
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Triggers</span>
                  <span className="font-medium text-gray-700">{selectedTriggers.join(', ')}</span>
                </div>
              )}
              {selectedSymptoms.length > 0 && (
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Symptoms</span>
                  <span className="font-medium text-gray-700">{selectedSymptoms.join(', ')}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3.5 border-2 border-gray-200 text-gray-600 rounded-2xl font-semibold hover:bg-gray-50"
              >
                Back
              </button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSave}
                className="flex-[2] py-3.5 bg-gradient-to-r from-primary-500 to-calm-500 text-white rounded-2xl font-semibold hover:opacity-90 transition-opacity"
              >
                {saved ? '✓ Saved!' : 'Save Check-in'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
