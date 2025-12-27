import React, { useState } from 'react'
import ExercisePlayer from './components/ExercisePlayer'
import ExerciseList from './components/ExerciseList'
import { exercises } from './data/exercises'

export default function App() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="pt-6 pb-2 px-4 max-w-md mx-auto">
        <h2 className="text-sm text-gray-500">Programınız</h2>
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
