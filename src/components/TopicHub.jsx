import React from 'react'

export default function TopicHub({ topics, onSelect, onQuickStart }) {
  return (
    <div className="min-h-screen p-4 max-w-md mx-auto space-y-5">
      <header className="space-y-3">
        <div className="rounded-xl overflow-hidden player-card relative h-40">
          <img
            loading="lazy"
            decoding="async"
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
            alt="Ana konular"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute left-4 bottom-4 text-white space-y-1 drop-shadow">
            <p className="text-xs uppercase tracking-wide text-white/80">Ana sayfa</p>
            <h1 className="text-2xl font-semibold leading-tight">Ana konular</h1>
            <p className="text-sm text-white/80">Alt konuları keşfetmek için kartlara dokunun.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onQuickStart}
          className="w-full py-3 px-4 rounded-xl bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1"
        >
          Egzersizlere hızlı geçiş
        </button>
      </header>

      <section className="grid grid-cols-1 gap-3">
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onSelect(topic)}
            className="w-full text-left p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition flex items-start gap-3"
          >
            <div className="h-12 w-12 rounded-xl bg-indigo-50 text-indigo-700 font-semibold flex items-center justify-center shrink-0">
              {topic.badge}
            </div>
            <div className="space-y-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">{topic.title}</p>
              <p className="text-xs text-gray-600 line-clamp-2">{topic.description}</p>
              <p className="text-[11px] text-indigo-600 font-semibold">{topic.subtopics.length} alt konu</p>
            </div>
            <svg className="ml-auto text-gray-300" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ))}
      </section>
    </div>
  )
}
