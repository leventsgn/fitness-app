import React, { useState } from 'react'

export default function ExerciseCard({ item, onSelect }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <button
      onClick={() => onSelect(item)}
      className="w-full text-left p-4 bg-white rounded-xl mb-3 flex items-center shadow-sm hover:shadow-md transition"
    >
      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-4 flex-shrink-0 relative">
        {item.thumbnail ? (
          <img
            src={item.thumbnailSmall || item.thumbnail}
            data-full={item.thumbnail}
            alt={`${item.title} thumbnail`}
            loading="lazy"
            decoding="async"
            className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setLoaded(true)}
          />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-300">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <path d="M12 2v20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
      </div>

      <div className="flex-1">
        <div className="font-medium text-base text-gray-900 truncate">{item.title}</div>
        <div className="text-sm text-gray-500 mt-1 truncate">{item.description}</div>
        <div className="text-xs text-gray-400 mt-2">{item.duration} · {item.reps}</div>
      </div>

      <div className="ml-4 text-gray-300">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </button>
  )
}
