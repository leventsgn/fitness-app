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
  const [selectedCategory, setSelectedCategory] = useState(null)
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

  const openExercises = () => {
    setSelected(null)
    setSelectedCategory(null)
    setView('list')
  }

  const openCategory = (category) => {
    setSelected(null)
    setSelectedCategory(category)
    setView('list')
  }

  const openProfile = () => {
    setSelected(null)
    setSelectedCategory(null)
    setView('profile')
  }

  const goHome = () => {
    setSelected(null)
    setSelectedCategory(null)
    setView('home')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="pt-6 pb-4 px-4 max-w-md mx-auto space-y-3">
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
          <div className="text-right space-y-1">
            <p className="text-xs text-gray-500">Programınız</p>
            <div className="flex items-center gap-2 justify-end flex-wrap">
              <InfoPill label={`Hafta ${user.progressWeek}`} value={`%${user.progressPercent}`} onClick={openProfile} />
              <InfoPill label="Kontrol" value={user.nextCheckin} onClick={openProfile} tone="indigo" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <ProfileButton label="Profil" value="Bilgiler" onClick={openProfile} />
          <ProfileButton label="Program" value="Liste" onClick={openExercises} tone="indigo" />
          <ProfileButton label="Destek" value="Terapist" onClick={openProfile} tone="slate" />
        </div>
      </header>

      <main>
        {view === 'profile' ? (
          <Profile
            user={user}
            exercises={highlightedExercises}
            requirementAnalysis={requirementAnalysis}
            onBack={goHome}
            onStartExercise={(ex) => {
              setSelected(ex)
              setView('player')
            }}
          />
        ) : view === 'list' ? (
          <ExerciseList
            exercises={exercises}
            selectedCategory={selectedCategory}
            onSelect={(ex) => {
              setSelected(ex)
              setView('player')
            }}
            onBack={goHome}
          />
        ) : view === 'player' && selected ? (
          <ExercisePlayer
            exercise={selected}
            onBack={() => {
              setSelected(null)
              setView('list')
            }}
          />
        ) : (
          <HomeWidgets
            user={user}
            onOpenExercises={openExercises}
            onOpenCategory={openCategory}
            onOpenProfile={openProfile}
          />
        )}
      </main>

      <footer className="py-8 text-center text-xs text-gray-400">
        © Demo – FizyoApp Prototype
      </footer>
    </div>
  )
}

const CATEGORY_ORDER = ['Aktivasyon', 'Mobilite', 'Esneme', 'Güç', 'Denge', 'Kardiyo']

function HomeWidgets({ user, onOpenExercises, onOpenCategory, onOpenProfile }) {
  const categories = useMemo(() => {
    const counts = exercises.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = 0
      acc[item.category] += 1
      return acc
    }, {})
    return CATEGORY_ORDER.filter((c) => counts[c]).map((c) => ({ name: c, count: counts[c] }))
  }, [])

  return (
    <div className="max-w-md mx-auto px-4 pb-10 space-y-4">
      <button
        onClick={onOpenExercises}
        className="w-full text-left rounded-2xl p-4 bg-gradient-to-br from-indigo-600 to-blue-500 text-white shadow-lg player-card hover:shadow-xl transition focus:outline-none focus:ring-2 focus:ring-white/60"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-white/80">Ana başlık</p>
            <h1 className="text-xl font-semibold leading-tight flex items-center gap-2">
              {user.program}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-white/80">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </h1>
            <p className="text-sm text-indigo-100 mt-1">Hafta {user.progressWeek} · %{user.progressPercent} tamamlandı</p>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-white/15 flex items-center justify-center font-semibold">
            {user.initials}
          </div>
        </div>
      </button>

      <div className="grid grid-cols-1 gap-3">
        <WidgetCard
          title="Egzersiz Programı"
          description="Bugünkü akış ve kategorilere tek dokunuşla ulaşın."
          badge={`${user.totalSessions} seans · ${user.totalMinutes} dk`}
          actionLabel="Listeyi aç"
          onClick={onOpenExercises}
          tone="indigo"
        />
        <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-900">Kategoriler</p>
            <span className="text-xs text-gray-500">Ana başlık</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <CategoryCard key={cat.name} name={cat.name} count={cat.count} onClick={() => onOpenCategory(cat.name)} />
            ))}
          </div>
        </div>
        <WidgetCard
          title="Profil & gereksinimler"
          description="Hedefler, riskler ve öneriler profil sayfasında listelensin."
          badge="Hedefler ve ağrı takibi"
          actionLabel="Profil sayfası"
          onClick={onOpenProfile}
          tone="purple"
        />
        <WidgetCard
          title="Takip ve kontrol"
          description={`Terapistiniz: ${user.therapist}. Sonraki kontrol: ${user.nextCheckin}.`}
          badge="Destek"
          actionLabel="Detayları aç"
          onClick={onOpenProfile}
          tone="emerald"
        />
      </div>
    </div>
  )
}

function WidgetCard({ title, description, badge, actionLabel, onClick, tone = 'indigo' }) {
  const toneMap = {
    indigo: 'from-indigo-50 via-white to-blue-50 border-indigo-100 text-indigo-900',
    purple: 'from-fuchsia-50 via-white to-indigo-50 border-fuchsia-100 text-fuchsia-900',
    emerald: 'from-emerald-50 via-white to-cyan-50 border-emerald-100 text-emerald-900',
    slate: 'from-slate-50 via-white to-slate-100 border-slate-100 text-slate-900'
  }

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-2xl shadow-sm bg-gradient-to-br ${toneMap[tone] || toneMap.indigo} border flex items-start justify-between gap-3 hover:shadow-md transition focus:outline-none`}
    >
      <div className="space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">{badge}</p>
        <h2 className="text-lg font-semibold leading-tight">{title}</h2>
        <p className="text-sm text-gray-700 leading-snug">{description}</p>
        <span className="inline-flex items-center gap-1 text-indigo-700 text-sm font-semibold">
          {actionLabel}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <div className="p-2 rounded-full bg-white/60 text-gray-500 border border-white/80">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </button>
  )
}

function InfoPill({ label, value, tone = 'slate', onClick }) {
  const tones = {
    slate: 'bg-gray-100 text-gray-800',
    indigo: 'bg-indigo-50 text-indigo-700'
  }
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-[11px] font-semibold inline-flex items-center gap-2 border ${tone === 'indigo' ? 'border-indigo-100' : 'border-gray-200'} ${tones[tone]}`}
    >
      <span>{label}</span>
      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/70 border border-white/80">{value}</span>
    </button>
  )
}

function ProfileButton({ label, value, tone = 'slate', onClick }) {
  const styles = {
    slate: 'bg-white text-gray-800 border-gray-100',
    indigo: 'bg-indigo-50 text-indigo-800 border-indigo-100'
  }
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-xl border shadow-sm text-left hover:shadow-md transition flex flex-col gap-1 focus:outline-none ${styles[tone] || styles.slate}`}
    >
      <span className="text-[11px] uppercase tracking-wide text-gray-500">{label}</span>
      <span className="text-sm font-semibold leading-tight">{value}</span>
    </button>
  )
}

function CategoryCard({ name, count, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100 transition shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 flex items-center justify-between"
    >
      <div>
        <p className="text-sm font-semibold text-gray-900">{name}</p>
        <p className="text-xs text-gray-500">{count} hareket</p>
      </div>
      <div className="text-gray-400">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </button>
  )
}
