import React, { useState } from 'react'
import ExercisePlayer from './components/ExercisePlayer'
import ExerciseList from './components/ExerciseList'
import IntroSplash from './components/IntroSplash'
import ProfilePage from './components/ProfilePage'
import PerformancePage from './components/PerformancePage'
import ReportsPage from './components/ReportsPage'
import { exercises } from './data/exercises'

export default function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [section, setSection] = useState('program')
  const [selected, setSelected] = useState(null)

  const user = {
    name: 'Ece Demir',
    initials: 'ED',
    program: 'Diz rehabilitasyonu · 8. hafta',
    goals: ['Haftada 4 seans', 'Ağrı 3/10 altına çekmek', 'Tek ayak dengesi 30 sn'],
    metrics: [
      { label: 'İlerleme', value: '%72', trend: '+%5 bu hafta' },
      { label: 'Günlük seri', value: '12 gün', trend: 'Yeni rekor' },
      { label: 'Mobilite', value: '%68', trend: '+%3' },
      { label: 'Güç', value: '%74', trend: '+%6' }
    ]
  }

  const performance = {
    weeklyChange: 8,
    cards: [
      { title: 'Süre', value: '4h 20m', trend: '+35 dk' },
      { title: 'Tekrar', value: '368', trend: '+42' },
      { title: 'Tempo', value: 'Dengeli', trend: 'Optimal aralık' },
      { title: 'Nabız', value: '128 ort.', trend: 'Hedefte' }
    ],
    highlights: [
      'Denge egzersizlerinde %12 artış',
      'Mobilite süresi hedefi aşıldı',
      'Ağrı seviyesi 2/10 altına indi'
    ]
  }

  const reports = [
    {
      title: 'Denge + Core',
      date: '26 Aralık · Akşam',
      duration: '22 dk',
      pain: 2,
      energy: 7,
      score: 88,
      notes: 'Tek ayak duruşunda stabilite arttı, ağrı yok.'
    },
    {
      title: 'Mobilite',
      date: '25 Aralık · Öğle',
      duration: '18 dk',
      pain: 3,
      energy: 6,
      score: 82,
      notes: 'Kalça mobilitesi açıldı, hafif gerginlik kaldı.'
    },
    {
      title: 'Güç Serisi',
      date: '24 Aralık · Sabah',
      duration: '26 dk',
      pain: 3,
      energy: 8,
      score: 90,
      notes: 'Yük altında diz toleransı iyi, tempo korundu.'
    }
  ]

  if (showIntro) {
    return <IntroSplash onFinish={() => setShowIntro(false)} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="pt-6 pb-3 px-4 max-w-md mx-auto space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-500">FizyoApp</h2>
          <span className="text-xs text-gray-500">V1 prototype</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { key: 'program', label: 'Program' },
            { key: 'profile', label: 'Profil' },
            { key: 'performance', label: 'Performans' },
            { key: 'reports', label: 'Raporlar' }
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setSelected(null)
                setSection(item.key)
              }}
              className={`text-sm rounded-lg py-2 border ${
                section === item.key
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-white text-gray-700 border-gray-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      <main>
        {section === 'program' && (
          <>
            {!selected ? (
              <ExerciseList exercises={exercises} onSelect={setSelected} />
            ) : (
              <ExercisePlayer exercise={selected} onBack={() => setSelected(null)} />
            )}
          </>
        )}

        {section === 'profile' && <ProfilePage user={user} />}
        {section === 'performance' && <PerformancePage stats={performance} />}
        {section === 'reports' && <ReportsPage reports={reports} />}
      </main>

      <footer className="py-8 text-center text-xs text-gray-400">
        © Demo – FizyoApp Prototype
      </footer>
    </div>
  )
}
