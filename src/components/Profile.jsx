import React from 'react'

const requirementList = [
  'Güncel ilerleme görünürlüğü: hafta ve yüzde tamamlanma',
  'Seans yoğunluğu takibi: toplam seans, toplam süre, ardışık gün',
  'Risk ve uyarılar: ağrı seviyesi ve notlar',
  'Hedef takibi: klinik hedefler ve kişisel mini hedefler',
  'Planlanmış takip: fizyoterapist ve sonraki kontrol tarihi',
  'Hızlı erişim: önerilen egzersizleri tek dokunuşla başlatma'
]

export default function Profile({ user, exercises = [], requirementAnalysis = [], onBack, onStartExercise }) {
  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <header className="max-w-md mx-auto px-4 pt-6 pb-4 space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="rounded-full p-2 bg-white shadow-sm border border-gray-200 hover:bg-gray-50 focus:outline-none"
            aria-label="Egzersiz listesine dön"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="text-xs font-semibold text-gray-500">Profil & İhtiyaçlar</span>
          <div className="h-10 w-10 rounded-full bg-indigo-600 text-white font-semibold flex items-center justify-center">
            {user.initials}
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden relative h-36 player-card">
          <img
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80"
            alt="Profil kapak görseli"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white space-y-1 drop-shadow">
            <p className="text-xs uppercase tracking-wide text-white/80">Program</p>
            <h1 className="text-xl font-semibold leading-tight">{user.program}</h1>
            <p className="text-sm text-white/80">
              Hafta {user.progressWeek} · %{user.progressPercent} tamamlandı
            </p>
          </div>
        </div>

        <section className="grid grid-cols-3 gap-3">
          <StatCard label="Seans" value={user.totalSessions} hint="toplam" />
          <StatCard label="Süre" value={`${user.totalMinutes}dk`} hint="birikim" />
          <StatCard label="Seri" value={`${user.streak}g`} hint="ardışık gün" />
        </section>
      </header>

      <main className="max-w-md mx-auto px-4 space-y-4">
        <Section title="Kişisel gereksinimler" subtitle="Planı neye göre şekillendiriyoruz">
          <ul className="space-y-2 text-sm text-gray-700">
            {requirementList.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Genel gereksinim analizi" subtitle="Ürün seviyesinde eksik ve güçlü yanlar">
          <div className="space-y-3">
            {requirementAnalysis.map((req) => (
              <div
                key={req.title}
                className="p-4 rounded-xl bg-white shadow-sm border border-gray-100 space-y-1"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-gray-900">{req.title}</p>
                  <StatusPill status={req.status} />
                </div>
                <p className="text-xs text-gray-600 leading-snug">{req.description}</p>
                <p className="text-xs text-indigo-700 font-semibold leading-snug">Öneri: {req.action}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Hedefler & riskler" subtitle="Klinik odak alanları">
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase">Hedefler</p>
              <ul className="mt-2 space-y-2 text-sm text-gray-800">
                {user.goals?.map((goal) => (
                  <li key={goal} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-gray-500 uppercase">Risk izlemi</p>
                <span className="px-2 py-1 text-xs rounded-full bg-indigo-50 text-indigo-700">{user.painLevel}</span>
              </div>
              <p className="mt-2 text-sm text-gray-700">
                Ağrı seviyesini her seans sonunda güncelleyerek yük yönetimini dengeleyin. Gerekirse hareket aralığını
                küçültün ve destek alın.
              </p>
            </div>
          </div>
        </Section>

        <Section title="Önerilen egzersizler" subtitle="Bugün için hızlı başlat">
          <div className="space-y-2">
            {exercises.map((ex) => (
              <button
                key={ex.id}
                onClick={() => onStartExercise?.(ex)}
                className="w-full flex items-center justify-between rounded-xl bg-white border border-gray-100 p-3 shadow-sm hover:shadow-md transition"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 line-clamp-1">{ex.title}</p>
                  <p className="text-xs text-gray-500 line-clamp-1">{ex.duration} • {ex.category}</p>
                </div>
                <span className="ml-3 text-indigo-600 text-sm font-semibold">Başlat</span>
              </button>
            ))}
          </div>
        </Section>

        <Section title="Uzman & takip" subtitle="Bir sonraki kontrol ve notlar">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-indigo-50 border border-indigo-100">
            <div className="h-10 w-10 rounded-full bg-indigo-600 text-white font-semibold flex items-center justify-center">
              {user.initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900">{user.therapist}</p>
              <p className="text-xs text-gray-600">Sonraki kontrol: {user.nextCheckin}</p>
              <p className="text-xs text-gray-500">Seans sonrası notlarınızı buraya ekleyin.</p>
            </div>
          </div>
        </Section>
      </main>
    </div>
  )
}

function Section({ title, subtitle, children }) {
  return (
    <section className="space-y-2">
      <div>
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        {subtitle ? <p className="text-xs text-gray-500">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  )
}

function StatCard({ label, value, hint }) {
  return (
    <div className="p-3 rounded-xl bg-white shadow-sm border border-gray-100">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
      <p className="text-[11px] text-gray-400">{hint}</p>
    </div>
  )
}

function StatusPill({ status }) {
  const map = {
    İyi: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
    Eksik: { bg: 'bg-rose-50', text: 'text-rose-700', dot: 'bg-rose-500' },
    Geliştir: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' }
  }
  const styles = map[status] || map.İyi
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${styles.bg} ${styles.text}`}>
      <span className={`h-2 w-2 rounded-full ${styles.dot}`} />
      {status}
    </span>
  )
}
