import React, { useState, useMemo } from 'react'
import ExerciseCard from './ExerciseCard'

export default function ExerciseList({ exercises, onSelect }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return exercises
    return exercises.filter(e => (e.title + ' ' + e.description).toLowerCase().includes(q))
  }, [exercises, query])

  return (
    <div className="min-h-screen p-4 max-w-md mx-auto">
      <header className="mb-4">
        <div className="rounded-xl overflow-hidden player-card mb-3">
          <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1558611848-73f7eb4001d2?auto=format&fit=crop&w=1200&q=80" alt="Egzersiz rehberi" className="w-full h-36 object-cover hero-img" />
        </div>

        <div className="mb-3">
          <h1 className="text-2xl font-semibold">Egzersizlerim</h1>
          <p className="text-sm text-gray-500 mt-1">Atanan egzersizleriniz arasından birini seçin.</p>
        </div>

        <div>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Ara egzersiz veya açıklama"
            className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </header>

      <section>
        {filtered.map((ex) => (
          <ExerciseCard key={ex.id} item={ex} onSelect={onSelect} />
        ))}
      </section>

      <div className="mt-8 text-center text-xs text-gray-400">Minimal demo prototip — dikkat dağıtıcı yok</div>
    </div>
  )
}
