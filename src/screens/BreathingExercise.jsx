import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, Check } from 'lucide-react'

const exercises = [
  {
    id: '478', name: '4-7-8 Breathing',
    desc: 'Calming technique for anxiety',
    phases: [
      { label: 'Breathe In', duration: 4, color: '#38bdf8' },
      { label: 'Hold', duration: 7, color: '#a855f7' },
      { label: 'Breathe Out', duration: 8, color: '#14b8a6' },
    ],
    rounds: 4
  },
  {
    id: 'box', name: 'Box Breathing',
    desc: 'Used by Navy SEALs for focus',
    phases: [
      { label: 'Breathe In', duration: 4, color: '#38bdf8' },
      { label: 'Hold', duration: 4, color: '#a855f7' },
      { label: 'Breathe Out', duration: 4, color: '#14b8a6' },
      { label: 'Hold', duration: 4, color: '#f97316' },
    ],
    rounds: 4
  },
  {
    id: 'grounding', name: '5-4-3-2-1 Grounding',
    desc: 'Sensory grounding for panic',
    phases: [
      { label: '5 things you SEE', duration: 10, color: '#38bdf8' },
      { label: '4 things you TOUCH', duration: 8, color: '#a855f7' },
      { label: '3 things you HEAR', duration: 6, color: '#14b8a6' },
      { label: '2 things you SMELL', duration: 4, color: '#f97316' },
      { label: '1 thing you TASTE', duration: 3, color: '#f43f5e' },
    ],
    rounds: 1
  },
]

export default function BreathingExercise() {
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [currentRound, setCurrentRound] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const intervalRef = useRef(null)

  const exercise = exercises.find(e => e.id === selectedExercise)

  useEffect(() => {
    if (isPlaying && exercise) {
      const phase = exercise.phases[currentPhase]
      if (timeLeft <= 0) {
        const nextPhase = currentPhase + 1
        if (nextPhase >= exercise.phases.length) {
          const nextRound = currentRound + 1
          if (nextRound >= exercise.rounds) {
            setIsPlaying(false)
            setIsComplete(true)
            return
          }
          setCurrentRound(nextRound)
          setCurrentPhase(0)
          setTimeLeft(exercise.phases[0].duration)
        } else {
          setCurrentPhase(nextPhase)
          setTimeLeft(exercise.phases[nextPhase].duration)
        }
      } else {
        intervalRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000)
      }
    }
    return () => clearTimeout(intervalRef.current)
  }, [isPlaying, timeLeft, currentPhase, currentRound, exercise])

  const startExercise = () => {
    setIsPlaying(true)
    setCurrentPhase(0)
    setCurrentRound(0)
    setIsComplete(false)
    setTimeLeft(exercise.phases[0].duration)
  }

  const reset = () => {
    setIsPlaying(false)
    setCurrentPhase(0)
    setCurrentRound(0)
    setTimeLeft(0)
    setIsComplete(false)
  }

  if (selectedExercise && exercise) {
    const phase = exercise.phases[currentPhase]
    const maxDuration = phase?.duration || 1
    const progress = phase ? (maxDuration - timeLeft) / maxDuration : 0

    return (
      <div className="min-h-full bg-gradient-to-b from-calm-50 via-white to-white flex flex-col">
        <div className="px-6 pt-4 pb-2">
          <button onClick={() => { reset(); setSelectedExercise(null) }} className="text-sm text-primary-500 font-medium mb-2">
            ← Back to exercises
          </button>
          <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Playfair Display' }}>
            {exercise.name}
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Round {currentRound + 1} of {exercise.rounds}
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6">
          {isComplete ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <div className="w-28 h-28 rounded-full bg-calm-100 flex items-center justify-center mx-auto mb-6">
                <Check size={48} className="text-calm-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display' }}>
                Well Done
              </h2>
              <p className="text-sm text-gray-500 mb-8">You completed {exercise.rounds} rounds of {exercise.name}</p>
              <div className="bg-calm-50 rounded-2xl p-4 mb-6 border border-calm-100">
                <p className="text-xs text-calm-700">How do you feel now compared to before? Notice any changes in your body or breathing.</p>
              </div>
              <button
                onClick={reset}
                className="px-6 py-3 bg-calm-500 text-white rounded-2xl font-semibold"
              >
                Do Again
              </button>
            </motion.div>
          ) : (
            <>
              {/* Breathing Circle */}
              <div className="relative w-56 h-56 flex items-center justify-center mb-8">
                {/* Background ring */}
                <div className="absolute inset-0 rounded-full border-4 border-gray-100" />

                {/* Progress ring */}
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 224 224">
                  <circle
                    cx="112" cy="112" r="108"
                    fill="none"
                    stroke={phase?.color || '#ccc'}
                    strokeWidth="4"
                    strokeDasharray={`${2 * Math.PI * 108}`}
                    strokeDashoffset={`${2 * Math.PI * 108 * (1 - progress)}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-linear"
                  />
                </svg>

                {/* Animated circle */}
                <motion.div
                  animate={
                    isPlaying && phase?.label === 'Breathe In'
                      ? { scale: [1, 1.3] }
                      : isPlaying && phase?.label === 'Breathe Out'
                      ? { scale: [1.3, 1] }
                      : { scale: isPlaying ? 1.15 : 1 }
                  }
                  transition={{ duration: phase?.duration || 1, ease: 'easeInOut' }}
                  key={`${currentPhase}-${currentRound}`}
                  className="w-40 h-40 rounded-full flex flex-col items-center justify-center"
                  style={{ backgroundColor: phase?.color + '20', borderColor: phase?.color, borderWidth: 3 }}
                >
                  <motion.span
                    className="text-4xl font-bold"
                    style={{ color: phase?.color }}
                  >
                    {timeLeft}
                  </motion.span>
                  <span className="text-sm font-medium text-gray-600 mt-1 text-center px-4">
                    {phase?.label}
                  </span>
                </motion.div>

                {/* Pulse rings when playing */}
                {isPlaying && phase?.label === 'Breathe In' && (
                  <div className="absolute inset-0 rounded-full animate-pulse-ring" style={{ borderColor: phase?.color, borderWidth: 2 }} />
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-6">
                <button
                  onClick={reset}
                  className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  <RotateCcw size={20} />
                </button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => isPlaying ? setIsPlaying(false) : (timeLeft > 0 ? setIsPlaying(true) : startExercise())}
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${phase?.color || '#0ea5e9'}, ${phase?.color || '#0ea5e9'}dd)` }}
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
                </motion.button>
                <div className="w-12 h-12" /> {/* Spacer */}
              </div>

              {/* Phase indicators */}
              <div className="flex items-center gap-2 mt-8">
                {exercise.phases.map((p, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        i === currentPhase ? 'scale-125' : 'opacity-40'
                      }`}
                      style={{ backgroundColor: p.color }}
                    />
                    {i < exercise.phases.length - 1 && (
                      <div className="w-4 h-px bg-gray-200" />
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-full bg-gradient-to-b from-calm-50 via-white to-white px-6 pt-4 pb-8">
      <h1 className="text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Playfair Display' }}>
        Breathing & Grounding
      </h1>
      <p className="text-sm text-gray-500 mb-6">Evidence-based calming techniques</p>

      {/* Info Card */}
      <div className="bg-calm-50 rounded-2xl p-4 mb-6 border border-calm-100">
        <p className="text-xs text-calm-700 leading-relaxed">
          Deep breathing activates your parasympathetic nervous system, reducing anxiety and the fight-or-flight response. Regular practice strengthens this calming response over time.
        </p>
      </div>

      <div className="space-y-3">
        {exercises.map((ex) => (
          <motion.button
            key={ex.id}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelectedExercise(ex.id)}
            className="w-full bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-left hover:border-calm-200 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-calm-400 to-primary-400 flex items-center justify-center flex-shrink-0">
                <div className="w-6 h-6 rounded-full border-2 border-white/80" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-0.5">{ex.name}</h3>
                <p className="text-xs text-gray-500">{ex.desc}</p>
                <div className="flex items-center gap-2 mt-2">
                  {ex.phases.map((p, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: p.color + '20', color: p.color }}>
                      {p.label.split(' ').pop()} {p.duration}s
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Grounding Tips */}
      <div className="mt-6 bg-white rounded-2xl p-4 border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Anxiety Tips</h3>
        <div className="space-y-2">
          {[
            'Place both feet flat on the ground',
            'Hold something cold (ice cube, cold water)',
            'Name 5 things you can see around you',
            'Slowly count backwards from 10',
          ].map((tip, i) => (
            <div key={i} className="flex gap-2 items-start">
              <div className="w-5 h-5 rounded-full bg-calm-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-calm-600">{i + 1}</span>
              </div>
              <p className="text-xs text-gray-600">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
