import React, { useMemo } from 'react'
import { parseDurationToSeconds } from '../utils/time'

function formatClock(totalSeconds = 0) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export default function InfoPanel({ exercise, started, elapsed = 0 }) {
  const targetSeconds = useMemo(() => parseDurationToSeconds(exercise.duration), [exercise.duration])
  const progress = targetSeconds > 0 ? Math.min(100, Math.round((elapsed / targetSeconds) * 100)) : 0

  return (
    <div>
      <h1 className="text-2xl font-semibold leading-tight line-clamp-2">{exercise.title}</h1>
      <p className="text-sm text-gray-600 mt-2 leading-relaxed line-clamp-3">{exercise.description}</p>

      {exercise.tags?.length ? (
        <div className="flex flex-wrap gap-2 mt-3">
          {exercise.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      {exercise.warnings && (
        <div className="mt-3 p-3 bg-red-50 text-red-700 rounded-md text-sm">{exercise.warnings}</div>
      )}

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <div>{exercise.duration}</div>
        <div>{exercise.reps}</div>
      </div>

      {targetSeconds > 0 && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>İlerleme</span>
            <span className="font-medium text-gray-700">
              {formatClock(elapsed)} / {exercise.duration}
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {exercise.cues?.length ? (
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-gray-900">İpuçları</span>
            <span className="text-[11px] px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-100">
              Odaklan
            </span>
          </div>
          <ul className="space-y-2">
            {exercise.cues.map((cue) => (
              <li key={cue} className="flex items-start text-sm text-gray-700">
                <span className="mt-0.5 mr-2 text-green-600" aria-hidden="true">✓</span>
                <span>{cue}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {started && (
        <div className="mt-3 text-sm text-green-700">Egzersiz başladı. Rahatça devam edin.</div>
      )}
    </div>
  )
}
