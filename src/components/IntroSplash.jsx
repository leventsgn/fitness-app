import React, { useEffect } from 'react'

export default function IntroSplash({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => onFinish?.(), 1800)
    return () => clearTimeout(timer)
  }, [onFinish])

  return (
    <div className="relative min-h-screen bg-splash text-white flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 splash-gradient" aria-hidden />
      <div className="absolute inset-0 splash-noise" aria-hidden />
      <div className="absolute inset-0 bg-black/60" aria-hidden />

      <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6">
        <div className="w-16 h-16 rounded-3xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center justify-center logo-beat shadow-2xl">
          <span className="text-2xl font-bold tracking-tight">FA</span>
        </div>

        <p className="uppercase text-sm tracking-[0.35em] text-white/80">FizyoApp</p>
      </div>
    </div>
  )
}
