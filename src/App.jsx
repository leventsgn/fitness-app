import React, { useMemo, useState } from 'react'
import ExercisePlayer from './components/ExercisePlayer'
import ExerciseList from './components/ExerciseList'
import ReportsPage from './components/ReportsPage'
import { exercises } from './data/exercises'
import { formatDate, formatDurationMinutes } from './utils/formatters'

const patientProfile = {
  name: 'Ece Demir',
  program: 'ÖÇB Rekonstrüksiyon Rehabilitasyonu · Faz 2',
  therapist: 'Uzm. Fzt. Deniz Kaya',
  clinic: 'Klinik pilot hasta akışı'
}

const performance = {
  phase: 'Faz 2 — Kuvvet ve denge',
  todayFocus: 'Quadriceps aktivasyonu & tek ayak denge',
  lastSession: '2024-11-05T09:30:00',
  nextSession: '2024-11-07T10:00:00',
  painTrend: '3/10 → 2/10 (sabah sertliği azaldı)',
  energyTrend: '6/10 → 7/10 (uyku 7.5s)',
  romGoal: 'Fleksiyon 135° hedeflendi',
  balanceGoal: 'Tek ayak 35 sn hedeflendi',
  weeklyMinutes: 142,
  totalSessions: 12
}

const reports = [
  {
    id: 'rep-001',
    title: 'Ev programı değerlendirmesi',
    phase: 'Faz 2',
    sessionNumber: 12,
    date: '2024-11-05T09:30:00',
    durationMinutes: 38,
    rom: '135° fleks / 0-2° ekst',
    balanceTime: '32 sn (sol)',
    strength: 'Mini squat ağrısız · 3x10',
    gait: 'Merdiven iniş çıkış ağrısız',
    painScore: 2,
    energyScore: 7,
    notes: 'Soğuk uygulama sonrası ağrı az. Quad aktivasyonu daha iyi, 13. seans için tek ayak çömelme eklenecek.'
  },
  {
    id: 'rep-002',
    title: 'Fizyoterapi salon seansı',
    phase: 'Faz 2',
    sessionNumber: 11,
    date: '2024-11-02T10:15:00',
    durationMinutes: 42,
    rom: '132° fleks / 0-2° ekst',
    balanceTime: '28 sn (sol)',
    strength: 'Step down kontrollü · 3x8',
    gait: 'Yürüme paterninde aksama yok',
    painScore: 3,
    energyScore: 6,
    notes: 'Seans sonunda hafif yorgunluk, ağrı 10 dk buz ile kontrol edildi. Denge süresi arttı.'
  },
  {
    id: 'rep-003',
    title: 'Kontrol & ölçüm',
    phase: 'Faz 1-2 geçişi',
    sessionNumber: 9,
    date: '2024-10-28T09:00:00',
    durationMinutes: 34,
    rom: '128° fleks / 0-3° ekst',
    balanceTime: '22 sn (sol)',
    strength: 'Düz bacak kaldırma ağrısız',
    gait: 'Desteksiz yürüyüş 20 dk',
    painScore: 4,
    energyScore: 6,
    notes: 'Şişlik yok, sabah sertliği azaldı. Faz 2 başlangıcı onaylandı.'
  }
]

export default function App() {
  const [selected, setSelected] = useState(null)
  const [activeTab, setActiveTab] = useState('plan')

  const program = useMemo(
    () => ({
      profile: patientProfile,
      performance,
      reports
    }),
    []
  )

  const summaryCards = [
    {
      label: 'Son seans',
      value: formatDate(program.performance.lastSession, { withTime: true }),
      helper: formatDurationMinutes(program.performance.weeklyMinutes / 3) || 'Özet'
    },
    {
      label: 'Sıradaki görüşme',
      value: formatDate(program.performance.nextSession, { withTime: true }),
      helper: 'Klinik kontrol'
    },
    {
      label: 'Ağrı trendi',
      value: program.performance.painTrend,
      helper: program.performance.romGoal
    },
    {
      label: 'Enerji trendi',
      value: program.performance.energyTrend,
      helper: program.performance.balanceGoal
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="pt-6 pb-4 px-4 max-w-md mx-auto space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-0.5">
            <p className="text-xs text-gray-500">Hasta</p>
            <h1 className="text-xl font-semibold text-gray-900 leading-tight">{program.profile.name}</h1>
            <p className="text-sm text-gray-600">{program.profile.program}</p>
            <p className="text-xs text-gray-500">Fzt. {program.profile.therapist}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
              {program.performance.phase}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-100">
              {program.profile.clinic}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {summaryCards.map((card) => (
            <div key={card.label} className="p-3 rounded-xl bg-white border border-gray-100 shadow-sm space-y-0.5">
              <p className="text-xs text-gray-500">{card.label}</p>
              <p className="text-sm font-semibold text-gray-900 leading-snug">{card.value}</p>
              <p className="text-[11px] text-gray-500">{card.helper}</p>
            </div>
          ))}
        </div>

        {!selected && (
          <div className="flex gap-2" role="tablist" aria-label="Sayfa sekmeleri">
            <button
              onClick={() => setActiveTab('plan')}
              className={`px-4 py-2 rounded-full text-sm font-medium border ${
                activeTab === 'plan'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 border-gray-200'
              }`}
              role="tab"
              aria-selected={activeTab === 'plan'}
            >
              Günlük plan
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-4 py-2 rounded-full text-sm font-medium border ${
                activeTab === 'reports'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 border-gray-200'
              }`}
              role="tab"
              aria-selected={activeTab === 'reports'}
            >
              Raporlar
            </button>
          </div>
        )}
      </header>

      <main className="pb-16">
        {selected ? (
          <ExercisePlayer exercise={selected} onBack={() => setSelected(null)} />
        ) : activeTab === 'reports' ? (
          <ReportsPage reports={program.reports} profile={program.profile} />
        ) : (
          <ExerciseList exercises={exercises} onSelect={setSelected} profile={program.profile} performance={program.performance} />
        )}
      </main>

      <footer className="py-8 text-center text-xs text-gray-400">
        © 2024 FizyoApp · Klinik pilot sürüm
      </footer>
    </div>
  )
}
