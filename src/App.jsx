import React, { useEffect, useState } from 'react'
import ExercisePlayer from './components/ExercisePlayer'
import ExerciseList from './components/ExerciseList'
import { exercises } from './data/exercises'
import logo from './assets/fitness-logo.svg'

export default function App() {
  const [selected, setSelected] = useState(null)
  const [showSplash, setShowSplash] = useState(true)
  const user = {
    name: 'Demo Kullanıcı',
    initials: 'DK',
    program: 'Omuz Rehabilitasyon',
    progressWeek: 8,
    progressPercent: 72,
    profileUrl: '/profile',
  }

  useEffect(() => {
    if (!showSplash) return

    const timer = setTimeout(() => setShowSplash(false), 2400)

    return () => clearTimeout(timer)
  }, [showSplash])

  const handleSkipSplash = () => {
    setShowSplash(false)
  }

  if (showSplash) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white flex items-center justify-center px-6 text-center">
        <div className="space-y-8 max-w-sm w-full">
          <div className="h-28 w-28 mx-auto rounded-3xl bg-white shadow-lg shadow-indigo-100 border border-indigo-50 flex items-center justify-center">
            <img src={logo} alt="FizyoApp" className="h-16 w-16" />
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-indigo-600">FizyoApp</p>
            <h1 className="text-2xl font-bold text-gray-900">Kişiselleştirilmiş egzersizlerinize hazırlanıyoruz</h1>
            <p className="text-sm text-gray-500">Güvenle ilerlemeniz için programınız yükleniyor…</p>
          </div>
          <div className="space-y-3">
            <div className="w-full h-2 bg-indigo-100 rounded-full overflow-hidden">
              <div className="h-full w-3/5 bg-indigo-500 animate-pulse" />
            </div>
            <button
              type="button"
              onClick={handleSkipSplash}
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1"
            >
              Başla
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="pt-6 pb-2 px-4 max-w-md mx-auto">
        <div className="flex items-center justify-between gap-3 bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-10 w-10 rounded-full bg-indigo-600 text-white font-semibold flex items-center justify-center shrink-0">
              {user.initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.program}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Programınız</p>
            <a
              href={user.profileUrl}
              className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Profil · Hafta {user.progressWeek} / %{user.progressPercent}
            </a>
          </div>
        </div>
      </header>

      <main>
        {!selected ? (
          <ExerciseList exercises={exercises} onSelect={setSelected} />
        ) : (
          <ExercisePlayer exercise={selected} onBack={() => setSelected(null)} />
        )}
      </main>

      <footer className="py-8 text-center text-xs text-gray-400">
        © Demo – FizyoApp Prototype
      </footer>
    </div>
  )
}
