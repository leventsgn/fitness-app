import React, { useRef, useState, useEffect } from 'react'
import ControlBar from './ControlBar'
import InfoPanel from './InfoPanel'

export default function ExercisePlayer({ exercise, onBack }) {
  const videoRef = useRef(null)
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [musicOn, setMusicOn] = useState(false)
  const [started, setStarted] = useState(false)

  function handleBack() {
    // pause media and call parent
    videoRef.current?.pause()
    audioRef.current?.pause()
    setIsPlaying(false)
    setStarted(false)
    if (onBack) onBack()
  }

  useEffect(() => {
    // keep audio volume low by default
    if (audioRef.current) audioRef.current.volume = 0.25
  }, [])

  function handleStart() {
    setStarted(true)
    setIsPlaying(true)
    videoRef.current?.play()
    if (musicOn) audioRef.current?.play()
  }

  function handleFinish() {
    // fade out audio
    if (audioRef.current) {
      const audio = audioRef.current
      const fade = setInterval(() => {
        if (audio.volume > 0.05) audio.volume = Math.max(0, audio.volume - 0.05)
        else {
          audio.pause()
          audio.volume = 0.25
          clearInterval(fade)
        }
      }, 120)
    }
    videoRef.current?.pause()
    setIsPlaying(false)
    setStarted(false)
  }

  function toggleMusic() {
    setMusicOn((s) => {
      const next = !s
      if (audioRef.current) {
        if (next) audioRef.current.play().catch(() => {})
        else audioRef.current.pause()
      }
      return next
    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-4 max-w-md mx-auto">
      <div className="w-full player-card overflow-hidden">
        <div className="video-area bg-black flex items-center justify-center relative">
          <button
            onClick={handleBack}
            aria-label="Geri"
            className="absolute top-4 left-4 z-10 bg-white/60 backdrop-blur-sm rounded-full p-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <video
            ref={videoRef}
            src={exercise.video}
            poster={exercise.thumbnailSmall || exercise.thumbnail}
            preload="metadata"
            loop
            playsInline
            className="w-full h-full object-cover"
            muted={!musicOn}
            aria-label={`Video for ${exercise.title}`}
          />
        </div>
        <div className="p-5">
          <InfoPanel exercise={exercise} started={started} />
        </div>
      </div>

      <ControlBar
        isPlaying={isPlaying}
        started={started}
        onStart={handleStart}
        onFinish={handleFinish}
        musicOn={musicOn}
        toggleMusic={toggleMusic}
      />

      <audio ref={audioRef} src={exercise.audio} loop preload="none" />
    </div>
  )
}
