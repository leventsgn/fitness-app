import React, { useState } from 'react'
import ExercisePlayer from './components/ExercisePlayer'
import ExerciseList from './components/ExerciseList'
import { exercises } from './data/exercises'

export default function App() {
  const [selected, setSelected] = useState(null)
  const user = {
    name: 'Demo Kullanıcı',
    initials: 'DK',
    program: 'Omuz Rehabilitasyon',
    progressWeek: 8,
    progressPercent: 72,
    profileUrl: '/profile',
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
