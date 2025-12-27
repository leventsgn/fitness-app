import React from 'react'

export default function ReportsPage({ reports }) {
  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-4 space-y-1">
        <p className="text-sm font-semibold text-gray-900">Son seans özetleri</p>
        <p className="text-xs text-gray-500">Performans ve ağrı takibi</p>
      </div>

      <div className="rounded-2xl bg-white shadow-sm border border-gray-100 divide-y">
        {reports.map((item) => (
          <div key={item.date} className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500">{item.date}</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-primary/5 text-primary">{item.duration}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>Şiddet: {item.pain}/10</span>
              <span>Güç: {item.energy}/10</span>
              <span>Skor: {item.score}%</span>
            </div>
            <p className="text-sm text-gray-700">{item.notes}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-primary text-white p-4 space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-white/80">Rapor</p>
        <p className="text-sm leading-relaxed">
          Haftada 4 seansla hedefin üzerindesiniz. Bir sonraki kontrol için fizyoterapistinizle paylaşabilirsiniz.
        </p>
      </div>
    </div>
  )
}
