import React, { useState, useMemo, useCallback } from 'react'
import ExerciseCard from './ExerciseCard'

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9ğüşıöç ]/gi, '').trim().replace(/\s+/g, '-')
}

function groupByCategory(list) {
  const buckets = {}
  list.forEach((item) => {
    const key = item.category || 'Diğer'
    if (!buckets[key]) buckets[key] = []
    buckets[key].push(item)
  })
  return buckets
}

const DEFAULT_ORDER = ['Aktivasyon', 'Mobilite', 'Esneme', 'Güç', 'Denge', 'Kardiyo', 'Diğer']

const heroByCategory = {
  Aktivasyon: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=80',
  Mobilite: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
  Esneme: 'https://images.unsplash.com/photo-1554306274-f23873d9a26c?auto=format&fit=crop&w=1200&q=80',
  Güç: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=1200&q=80',
  Denge: 'https://images.unsplash.com/photo-1546484959-f9a9d68f2c1c?auto=format&fit=crop&w=1200&q=80',
  Kardiyo: 'https://images.unsplash.com/photo-1526401485004-2aa7c769f0b7?auto=format&fit=crop&w=1200&q=80',
  Diğer: 'https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?auto=format&fit=crop&w=1200&q=80'
}

export default function ExerciseList({ exercises, onSelect }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return exercises
    return exercises.filter((e) => (e.title + ' ' + e.description).toLowerCase().includes(q))
  }, [exercises, query])

  const grouped = useMemo(() => groupByCategory(filtered), [filtered])
  const categoryOrder = useMemo(() => {
    const keys = Object.keys(grouped)
    return DEFAULT_ORDER.filter((k) => keys.includes(k)).concat(keys.filter((k) => !DEFAULT_ORDER.includes(k)))
  }, [grouped])

  const scrollToCategory = useCallback((cat) => {
    const el = document.getElementById(`cat-${slugify(cat)}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <div className="min-h-screen p-4 max-w-md mx-auto space-y-5">
      <header className="space-y-3">
        <div className="rounded-xl overflow-hidden player-card relative h-40">
          <img
            loading="lazy"
            decoding="async"
            src="https://images.unsplash.com/photo-1518611012118-5bc8c7c4dc1c?auto=format&fit=crop&w=1200&q=80"
            alt="Egzersiz rehberi"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute left-4 bottom-4 text-white space-y-1 drop-shadow">
            <p className="text-xs uppercase tracking-wide text-white/80">Günlük plan</p>
            <h1 className="text-2xl font-semibold leading-tight">Egzersizlerim</h1>
            <p className="text-sm text-white/80">Seç, başlat ve ilerlemeyi takip et.</p>
          </div>
        </div>

        <div className="rounded-xl bg-white shadow-sm p-4 space-y-2 border border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-semibold">i</div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Kısa intro</p>
              <p className="text-xs text-gray-500">3 adımda egzersiz akışını başlatın.</p>
            </div>
          </div>
          <ul className="text-sm text-gray-700 space-y-1 pl-1">
            <li>• Kategoriden hareketi seçin ve detayları inceleyin.</li>
            <li>• Başlat’a dokunarak süre ve ipuçlarını takip edin.</li>
            <li>• Bitir ile seansı kaydedip sıradaki harekete geçin.</li>
          </ul>
        </div>

        <div className="space-y-2">
          <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Sayfa alt kırılımları">
            {categoryOrder.map((cat) => (
              <button
                key={cat}
                onClick={() => scrollToCategory(cat)}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-full text-sm whitespace-nowrap hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                {cat}
                <span className="ml-1 text-gray-400">({grouped[cat]?.length || 0})</span>
              </button>
            ))}
          </div>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ara egzersiz veya açıklama"
            className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-primary"
            aria-label="Egzersiz arama"
          />
        </div>
      </header>

      <section className="space-y-6">
        {categoryOrder.map((cat) => (
          <div key={cat} id={`cat-${slugify(cat)}`} className="space-y-3">
            <div className="rounded-xl overflow-hidden relative h-28">
              <img
                src={heroByCategory[cat] || heroByCategory.Diğer}
                alt={`${cat} kapak görseli`}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.src = heroByCategory.Diğer
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute left-4 bottom-4 text-white flex items-center gap-2">
                <h2 className="text-lg font-semibold text-white line-clamp-1">{cat}</h2>
                <span className="px-2 py-1 rounded-full bg-white/20 text-xs">{grouped[cat]?.length || 0} egzersiz</span>
              </div>
            </div>

            <div className="space-y-3">
              {(grouped[cat] || []).map((ex) => (
                <ExerciseCard key={ex.id} item={ex} onSelect={onSelect} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <div className="pb-6 pt-2 text-center text-xs text-gray-400">Minimal demo prototip — dikkat dağıtıcı yok</div>
    </div>
  )
}
