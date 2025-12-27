import React from 'react'

export default function ControlBar({ isPlaying, started, onStart, onFinish, musicOn, toggleMusic }) {
  return (
    <div className="fixed bottom-4 left-0 right-0 px-4">
      <div className="max-w-md mx-auto flex items-center justify-between bg-white p-3 rounded-2xl shadow-md">
        <button
          aria-label="Toggle music"
          onClick={toggleMusic}
          className="control-button w-12 flex items-center justify-center bg-gray-100"
        >
          {musicOn ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-800">
              <path d="M9 9v6l5 3V6l-5 3z" fill="currentColor" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-500">
              <path d="M3 9v6h4l5 4V5L7 9H3z" fill="currentColor" />
            </svg>
          )}
        </button>

        <div className="flex-1 px-3">
          {!started ? (
            <button
              onClick={onStart}
              className="w-full bg-primary text-white py-3 rounded-xl font-medium"
            >
              Başlat
            </button>
          ) : (
            <button
              onClick={onFinish}
              className="w-full bg-red-500 text-white py-3 rounded-xl font-medium"
            >
              Bitir
            </button>
          )}
        </div>

        <div style={{width:48}} />
      </div>
    </div>
  )
}
