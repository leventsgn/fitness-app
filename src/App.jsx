import React, { useEffect, useMemo, useState } from 'react'
import ExercisePlayer from './components/ExercisePlayer'
import ExerciseList from './components/ExerciseList'
import Profile from './components/Profile'
import TopicHub from './components/TopicHub'
import TopicDetail from './components/TopicDetail'
import { exercises } from './data/exercises'
import logo from './assets/fitness-logo.svg'

export default function App() {
  const [selected, setSelected] = useState(null)
  const [showSplash, setShowSplash] = useState(true)
  const [view, setView] = useState('hub')
  const [startCategory, setStartCategory] = useState(null)
  const [selectedTopic, setSelectedTopic] = useState(null)
  const user = {
    name: 'Melike',
    initials: 'ME',
    program: 'Omuz Rehabilitasyon',
    progressWeek: 8,
    progressPercent: 72,
    profileUrl: '/profile',
    totalSessions: 42,
    totalMinutes: 980,
    streak: 7,
    therapist: 'Uzm. Fzt. Melike A.',
    nextCheckin: '12 Mart • 14:00',
    painLevel: 'Düşük',
    goals: ['Omuz hareket açıklığını 160° üstünde tutmak', 'Haftada 4 seans tamamlama', 'Skapular stabilizasyonu güçlendirmek']
  }
  const highlightedExercises = useMemo(() => exercises.slice(0, 4), [])
  const topics = useMemo(
    () => [
      {
        id: 'exercises',
        title: 'Egzersiz Programı',
        description: 'Kategori bazlı hareketler, süre ve ipuçları',
        badge: 'Günlük',
        subtopics: [
          { title: 'Aktivasyon & Mobilite', description: 'Isınma, omuz ve torakal açılma', category: 'Aktivasyon' },
          { title: 'Güç & Denge', description: 'Alt vücut, core ve denge rutinleri', category: 'Güç' },
          { title: 'Esneme & Kardiyo', description: 'Düşük impact kardiyo ve yumuşak esneme', category: 'Esneme' }
        ]
      },
      {
        id: 'profile',
        title: 'Profil & Gereksinimler',
        description: 'Hedefler, risk izlemi ve önerilen egzersizler',
        badge: 'Kişisel',
        subtopics: [
          { title: 'Hedefler', description: 'Klinik hedefler ve mini amaçlar', action: 'profile' },
          { title: 'Risk izlemi', description: 'Ağrı ve güvenlik bildirimi', action: 'profile' }
        ]
      },
      {
        id: 'analysis',
        title: 'Analiz & Rapor',
        description: 'İlerleme yüzdesi, seans toplamı ve seri',
        badge: 'Takip',
        subtopics: [
          { title: 'İlerleme özeti', description: 'Hafta / yüzde takibi', action: 'profile' },
          { title: 'Seans yoğunluğu', description: 'Toplam süre ve ardışık gün', action: 'profile' }
        ]
      }
    ],
    []
  )
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
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white flex items-center justify-center px-6 text-center">
        <div className="space-y-8 max-w-sm w-full">
          <div className="h-28 w-28 mx-auto rounded-3xl bg-white shadow-lg shadow-indigo-100 border border-indigo-50 flex items-center justify-center">
            <img src={logo} alt="FizyoApp" className="h-16 w-16" />
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-indigo-600">FizyoApp</p>
            <h1 className="text-2xl font-bold text-gray-900">Kişiselleştirilmiş egzersizlerinize hazırlanıyoruz</h1>
            <p className="text-sm text-gray-500">Güvenle ilerlemeniz için programınız yükleniyor…</p>
          </div>
          <div className="space-y-3">
            <div className="w-full h-2 bg-indigo-100 rounded-full overflow-hidden">
              <div className="h-full w-3/5 bg-indigo-500 animate-pulse" />
            </div>
            <button
              type="button"
              onClick={handleSkipSplash}
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1"
            >
              Başla
            </button>
          </div>
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
              onClick={() => {
                setSelectedTopic(null)
                setView('profile')
              }}
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
        ) : view === 'topicDetail' ? (
          <TopicDetail
            topic={selectedTopic}
            onBack={() => setView('hub')}
            onSelectSubtopic={(sub) => {
              if (sub?.category) {
                setStartCategory(sub.category)
                setView('home')
                return
              }
              if (sub?.action === 'profile') {
                setView('profile')
              }
            }}
          />
        ) : view === 'hub' ? (
          <TopicHub
            topics={topics}
            onSelect={(topic) => {
              setSelectedTopic(topic)
              setView('topicDetail')
            }}
            onQuickStart={() => setView('home')}
          />
        ) : selected ? (
          <ExercisePlayer exercise={selected} onBack={() => setSelected(null)} />
        ) : (
          <ExerciseList exercises={exercises} onSelect={setSelected} initialCategory={startCategory} />
        )}
      </main>

      <footer className="py-8 text-center text-xs text-gray-400">
        © Demo – FizyoApp Prototype
      </footer>
    </div>
  )
}
