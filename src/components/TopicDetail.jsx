import React from 'react'

export default function TopicDetail({ topic, onBack, onSelectSubtopic }) {
  if (!topic) return null

  return (
    <div className="min-h-screen p-4 max-w-md mx-auto space-y-5">
      <header className="space-y-3">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="rounded-full p-2 bg-white shadow-sm border border-gray-200 hover:bg-gray-50 focus:outline-none"
            aria-label="Geri"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="text-xs font-semibold text-gray-500">Alt konular</span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">{topic.badge}</span>
        </div>

        <div className="rounded-xl bg-white shadow-sm border border-gray-100 p-4 space-y-1">
          <p className="text-sm font-semibold text-gray-900">{topic.title}</p>
          <p className="text-xs text-gray-600 leading-snug">{topic.description}</p>
        </div>
      </header>

      <section className="space-y-3">
        {topic.subtopics.map((sub) => (
          <button
            key={sub.title}
            onClick={() => onSelectSubtopic(sub)}
            className="w-full text-left p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition flex items-start gap-3"
          >
            <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-700 font-semibold flex items-center justify-center shrink-0">
              {sub.category ? 'K' : 'İ'}
            </div>
            <div className="space-y-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">{sub.title}</p>
              <p className="text-xs text-gray-600 leading-snug line-clamp-2">{sub.description}</p>
              {sub.category ? (
                <p className="text-[11px] text-indigo-600 font-semibold">Kategori: {sub.category}</p>
              ) : null}
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
