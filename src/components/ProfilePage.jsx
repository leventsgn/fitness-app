import React from 'react'

export default function ProfilePage({ user }) {
  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-4 flex items-center gap-3">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-gray-900 text-white flex items-center justify-center text-xl font-semibold">
          {user.initials}
        </div>
        <div>
          <p className="text-xs uppercase text-gray-500 tracking-wide">Profil</p>
          <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
          <p className="text-sm text-gray-600">{user.program}</p>
        </div>
      </div>

      <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-4 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-900">Hedefler</p>
          <span className="text-xs px-2 py-1 bg-primary/5 text-primary rounded-full">Güncel</span>
        </div>
        <ul className="text-sm text-gray-700 space-y-1">
          {user.goals.map((g) => (
            <li key={g}>• {g}</li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {user.metrics.map((metric) => (
          <div key={metric.label} className="rounded-xl bg-white shadow-sm border border-gray-100 p-3 space-y-1">
            <p className="text-xs text-gray-500 uppercase tracking-wide">{metric.label}</p>
            <p className="text-lg font-semibold text-gray-900">{metric.value}</p>
            <p className="text-xs text-emerald-600">{metric.trend}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-primary text-white p-4 space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-white/80">Öneri</p>
        <p className="text-sm leading-relaxed">
          Bugün mobilite ve core güç serisini tamamlayarak haftalık hedefi yakalayabilirsiniz.
        </p>
      </div>
    </div>
  )
}
