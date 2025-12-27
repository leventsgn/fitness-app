import React from 'react'

export default function InfoPanel({ exercise, started }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold leading-tight truncate">{exercise.title}</h1>
      <p className="text-sm text-gray-600 mt-2">{exercise.description}</p>

      {exercise.warnings && (
        <div className="mt-3 p-3 bg-red-50 text-red-700 rounded-md text-sm">{exercise.warnings}</div>
      )}

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <div>{exercise.duration}</div>
        <div>{exercise.reps}</div>
      </div>

      {started && (
        <div className="mt-3 text-sm text-green-700">Egzersiz başladı. Rahatça devam edin.</div>
      )}
    </div>
  )
}
