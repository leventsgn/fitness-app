import React, { useState } from 'react'

export default function ExerciseCard({ item, onSelect }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const fallbackImage =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160" fill="none"><rect width="160" height="160" rx="16" fill="%23f8fafc"/><path d="M46 102l20-26 18 20 12-14 18 24" stroke="%23718096" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="62" cy="58" r="12" fill="%2394a3b8"/></svg>`
    )

  return (
    <button
      onClick={() => onSelect(item)}
      className="w-full text-left p-4 bg-white rounded-xl mb-3 flex items-center shadow-sm hover:shadow-md transition"
    >
      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-4 flex-shrink-0 relative">
        {item.thumbnail && !failed ? (
          <img
            src={item.thumbnailSmall || item.thumbnail}
            data-full={item.thumbnail}
            alt={`${item.title} thumbnail`}
            loading="lazy"
            decoding="async"
            className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <img src={fallbackImage} alt="Yedek görsel" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      <div className="flex-1">
        <div className="font-medium text-base text-gray-900 line-clamp-1">{item.title}</div>
        <div className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</div>
        <div className="text-xs text-gray-400 mt-2">{item.duration} · {item.reps}</div>
        {item.tags?.length ? (
          <div className="flex flex-wrap gap-1 mt-2">
            {item.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-gray-100 text-[11px] rounded-full text-gray-700">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="ml-4 text-gray-300">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </button>
  )
}
