import React, { useEffect, useMemo, useState } from 'react'
import ExercisePlayer from './components/ExercisePlayer'
import ExerciseList from './components/ExerciseList'
import Profile from './components/Profile'
import { exercises } from './data/exercises'
import logo from './assets/fitness-logo.svg'

export default function App() {
  const [selected, setSelected] = useState(null)
  const [showSplash, setShowSplash] = useState(true)
  const [view, setView] = useState('home')
  const user = {
    name: 'Demo Kullanıcı',
    initials: 'DK',
    program: 'Omuz Rehabilitasyon',
    progressWeek: 8,
    progressPercent: 72,
    profileUrl: '/profile',
    totalSessions: 42,
    totalMinutes: 980,
    streak: 7,
    therapist: 'Uzm. Fzt. Selin A.',
    nextCheckin: '12 Mart • 14:00',
    painLevel: 'Düşük',
    goals: ['Omuz hareket açıklığını 160° üstünde tutmak', 'Haftada 4 seans tamamlama', 'Skapular stabilizasyonu güçlendirmek']
  }
  const highlightedExercises = useMemo(() => exercises.slice(0, 4), [])
  const requirementAnalysis = useMemo(
    () => [
      {
        title: 'Kişiselleştirme',
        status: 'İyi',
        description: 'Profil ve hedeflere göre egzersiz önerileri sağlanıyor.',
        action: 'Önerileri ağrı seviyesi bildirimlerine göre otomatik ayarla.'
      },
      {
        title: 'İlerleme & bağlılık',
        status: 'Eksik',
        description: 'Streak ve toplam süre gösteriliyor fakat motivasyon uyarıları yok.',
        action: 'Bildirim veya mini rozetlerle haftalık seans hedefine hatırlatıcı ekle.'
      },
      {
        title: 'Güvenlik',
        status: 'İyi',
        description: 'Ağrı seviyesi takibi ve uyarılar belirtilmiş.',
        action: 'Seans sonunda “ağrı raporla” mini formu ekleyerek güvenliği güçlendir.'
      },
      {
        title: 'Erişilebilirlik',
        status: 'Geliştir',
        description: 'Büyük butonlar mevcut ancak yüksek kontrast modu yok.',
        action: 'Kontrast/düşük ışık teması ve sesli yönergeler için toggle ekle.'
      },
      {
        title: 'Takip & iletişim',
        status: 'İyi',
        description: 'Terapist ve kontrol tarihi kullanıcıya gösteriliyor.',
        action: 'Kontrol tarihine hatırlatıcı planla ve not bırakma alanı ekle.'
      }
    ],
    []
  )

  useEffect(() => {
    if (!showSplash) return

    const timer = setTimeout(() => setShowSplash(false), 2400)

    return () => clearTimeout(timer)
  }, [showSplash])

  const handleSkipSplash = () => {
    setShowSplash(false)
  }

  if (showSplash) {
    return (
      <div
        className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-900 flex items-center justify-center"
        onClick={handleSkipSplash}
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-indigo-500/15 blur-3xl" aria-hidden="true" />
          <div className="relative flex flex-col items-center gap-4">
            <img src={logo} alt="FizyoApp" className="h-20 w-20 drop-shadow-[0_0_22px_rgba(99,102,241,0.45)]" />
            <p className="text-indigo-100 font-semibold tracking-wide text-sm uppercase">FizyoApp</p>
          </div>
          <span className="sr-only">FizyoApp açılış ekranı</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="pt-6 pb-2 px-4 max-w-md mx-auto">
        <div className="flex items-center justify-between gap-3 bg-white border border-gray-100 rounded-xl p-3 shadow-sm">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-10 w-10 rounded-full bg-indigo-600 text-white font-semibold flex items-center justify-center shrink-0">
              {user.initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.program}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Programınız</p>
            <button
              type="button"
              onClick={() => setView('profile')}
              className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-700 focus:outline-none"
            >
              Profil · Hafta {user.progressWeek} / %{user.progressPercent}
            </button>
          </div>
        </div>
      </header>

      <main>
        {view === 'profile' ? (
          <Profile
            user={user}
            exercises={highlightedExercises}
            requirementAnalysis={requirementAnalysis}
            onBack={() => setView('home')}
            onStartExercise={(ex) => {
              setSelected(ex)
              setView('home')
            }}
          />
        ) : selected ? (
          <ExercisePlayer exercise={selected} onBack={() => setSelected(null)} />
        ) : (
          <ExerciseList exercises={exercises} onSelect={setSelected} />
        )}
      </main>

      <footer className="py-8 text-center text-xs text-gray-400">
        © Demo – FizyoApp Prototype
      </footer>
    </div>
  )
}
