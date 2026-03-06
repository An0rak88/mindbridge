import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, MapPin, CheckCircle2, Circle, Plus, ChevronDown, ChevronRight, Video, MessageSquare, FileText } from 'lucide-react'

const sessions = [
  {
    id: 1,
    number: 1,
    date: 'Mon 3 Mar 2026',
    status: 'completed',
    focus: 'Assessment & Rapport Building',
    approach: 'CBT',
    notes: 'Completed initial assessment. Identified generalised anxiety with social components. Established therapeutic goals.',
    homework: ['Download MindBridge app', 'Complete 3 mood check-ins', 'Practice 4-7-8 breathing daily'],
    homeworkDone: [true, true, true],
  },
  {
    id: 2,
    number: 2,
    date: 'Mon 10 Mar 2026',
    status: 'completed',
    focus: 'Psychoeducation & Cognitive Model',
    approach: 'CBT',
    notes: 'Introduced CBT model (thoughts → feelings → behaviours). Began thought record practice.',
    homework: ['Complete 5 thought records', 'Identify top 3 anxiety triggers', 'Daily mood tracking'],
    homeworkDone: [true, true, true],
  },
  {
    id: 3,
    number: 3,
    date: 'Thu 13 Mar 2026',
    status: 'upcoming',
    focus: 'Cognitive Restructuring',
    approach: 'CBT',
    notes: null,
    homework: [],
    homeworkDone: [],
    prepQuestions: [
      'What distortions have come up most this week?',
      'What situation was hardest to reframe?',
      'Any new triggers or patterns noticed?',
    ],
  },
  {
    id: 4,
    number: 4,
    date: 'Thu 20 Mar 2026',
    status: 'scheduled',
    focus: 'Behavioural Experiments',
    approach: 'CBT',
  },
  {
    id: 5,
    number: 5,
    date: 'Thu 27 Mar 2026',
    status: 'scheduled',
    focus: 'Relapse Prevention & Review',
    approach: 'CBT',
  },
]

export default function SessionPrep() {
  const [expandedSession, setExpandedSession] = useState(3)
  const [prepNotes, setPrepNotes] = useState('')
  const [checkedQuestions, setCheckedQuestions] = useState([])

  const toggleQuestion = (q) => {
    setCheckedQuestions(prev => prev.includes(q) ? prev.filter(x => x !== q) : [...prev, q])
  }

  const getStatusStyle = (status) => {
    switch(status) {
      case 'completed': return { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' }
      case 'upcoming': return { bg: 'bg-primary-100', text: 'text-primary-700', dot: 'bg-primary-500' }
      case 'scheduled': return { bg: 'bg-gray-100', text: 'text-gray-500', dot: 'bg-gray-400' }
      default: return { bg: 'bg-gray-100', text: 'text-gray-500', dot: 'bg-gray-400' }
    }
  }

  return (
    <div className="min-h-full bg-gradient-to-b from-warm-50 via-white to-white px-6 pt-4 pb-8">
      <h1 className="text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Playfair Display' }}>
        Therapy Sessions
      </h1>
      <p className="text-sm text-gray-500 mb-5">5-session CBT treatment plan</p>

      {/* Next Session Card */}
      <div className="bg-gradient-to-r from-primary-500 to-calm-500 rounded-2xl p-4 mb-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-6 translate-x-6" />
        <p className="text-xs opacity-80 font-medium mb-1">NEXT SESSION</p>
        <h2 className="text-lg font-bold mb-2">Session 3: Cognitive Restructuring</h2>
        <div className="flex items-center gap-4 text-sm opacity-90">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            <span>Thu 13 Mar</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={14} />
            <span>2:00 PM</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 mt-2 text-sm opacity-90">
          <Video size={14} />
          <span>Telehealth (Zoom)</span>
        </div>
      </div>

      {/* Session Timeline */}
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Treatment Plan</h2>
      <div className="space-y-2">
        {sessions.map((session) => {
          const style = getStatusStyle(session.status)
          const isExpanded = expandedSession === session.id

          return (
            <motion.div
              key={session.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setExpandedSession(isExpanded ? null : session.id)}
                className="w-full p-3.5 text-left flex items-center gap-3"
              >
                {/* Timeline dot */}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    session.status === 'completed' ? 'bg-emerald-100 text-emerald-600' :
                    session.status === 'upcoming' ? 'bg-primary-100 text-primary-600' :
                    'bg-gray-100 text-gray-400'
                  }`}>
                    {session.status === 'completed' ? '✓' : session.number}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-gray-800 truncate">Session {session.number}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${style.bg} ${style.text}`}>
                      {session.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{session.focus}</p>
                  <p className="text-[10px] text-gray-400">{session.date}</p>
                </div>

                <motion.div animate={{ rotate: isExpanded ? 90 : 0 }}>
                  <ChevronRight size={16} className="text-gray-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-gray-100"
                  >
                    <div className="p-4 space-y-3">
                      {session.status === 'completed' && (
                        <>
                          {session.notes && (
                            <div>
                              <p className="text-xs font-semibold text-gray-500 mb-1">Session Notes</p>
                              <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-xl">{session.notes}</p>
                            </div>
                          )}
                          {session.homework && session.homework.length > 0 && (
                            <div>
                              <p className="text-xs font-semibold text-gray-500 mb-2">Homework</p>
                              <div className="space-y-1.5">
                                {session.homework.map((hw, i) => (
                                  <div key={i} className="flex items-center gap-2">
                                    {session.homeworkDone?.[i] ? (
                                      <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                                    ) : (
                                      <Circle size={16} className="text-gray-300 flex-shrink-0" />
                                    )}
                                    <span className={`text-xs ${session.homeworkDone?.[i] ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                                      {hw}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}

                      {session.status === 'upcoming' && (
                        <>
                          <div className="bg-primary-50 rounded-xl p-3 border border-primary-100">
                            <p className="text-xs font-semibold text-primary-700 mb-2">Prepare for Session</p>
                            <div className="space-y-2">
                              {session.prepQuestions?.map((q, i) => (
                                <button
                                  key={i}
                                  onClick={() => toggleQuestion(q)}
                                  className="flex items-start gap-2 w-full text-left"
                                >
                                  {checkedQuestions.includes(q) ? (
                                    <CheckCircle2 size={16} className="text-primary-500 flex-shrink-0 mt-0.5" />
                                  ) : (
                                    <Circle size={16} className="text-primary-300 flex-shrink-0 mt-0.5" />
                                  )}
                                  <span className="text-xs text-primary-600">{q}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-semibold text-gray-500 mb-2">Your notes for this session</p>
                            <textarea
                              value={prepNotes}
                              onChange={e => setPrepNotes(e.target.value)}
                              placeholder="What would you like to discuss? Any concerns or achievements to share?"
                              className="w-full h-24 p-3 rounded-xl border border-gray-200 focus:border-primary-400 outline-none text-xs text-gray-700 placeholder:text-gray-400 resize-none"
                            />
                          </div>

                          <div className="flex gap-2">
                            <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-primary-500 text-white rounded-xl text-xs font-semibold">
                              <FileText size={14} />
                              View Thought Records
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-calm-500 text-white rounded-xl text-xs font-semibold">
                              <MessageSquare size={14} />
                              Message Therapist
                            </button>
                          </div>
                        </>
                      )}

                      {session.status === 'scheduled' && (
                        <p className="text-xs text-gray-400 italic">Session details will be available closer to the date.</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Treatment Goals */}
      <div className="mt-6 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Treatment Goals</h3>
        <div className="space-y-3">
          {[
            { goal: 'Reduce anxiety SUDS score from 75 to below 40', progress: 55 },
            { goal: 'Identify & challenge cognitive distortions independently', progress: 40 },
            { goal: 'Develop coping toolkit for anxiety management', progress: 60 },
          ].map((g, i) => (
            <div key={i}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600">{g.goal}</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${g.progress}%` }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-primary-400 to-calm-400 rounded-full"
                />
              </div>
              <p className="text-[10px] text-gray-400 mt-0.5 text-right">{g.progress}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
