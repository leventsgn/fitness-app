import React from 'react'

const bars = [
  { label: 'Pzt', value: 70 },
  { label: 'Sal', value: 55 },
  { label: 'Çar', value: 80 },
  { label: 'Per', value: 65 },
  { label: 'Cum', value: 90 },
  { label: 'Cmt', value: 50 },
  { label: 'Paz', value: 40 }
]

export default function PerformancePage({ stats }) {
  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-900">Haftalık performans</p>
          <span className="text-xs text-emerald-600">+{stats.weeklyChange}%</span>
        </div>
        <div className="flex items-end justify-between gap-2 mt-4 h-32">
          {bars.map((bar) => (
            <div key={bar.label} className="flex flex-col items-center gap-2 w-full">
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${bar.value}%` }} />
              </div>
              <span className="text-xs text-gray-600">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.cards.map((card) => (
          <div key={card.title} className="rounded-xl bg-white shadow-sm border border-gray-100 p-3 space-y-1">
            <p className="text-xs text-gray-500 uppercase tracking-wide">{card.title}</p>
            <p className="text-lg font-semibold text-gray-900">{card.value}</p>
            <p className="text-xs text-emerald-600">{card.trend}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-4 space-y-3">
        <p className="text-sm font-semibold text-gray-900">Öne çıkanlar</p>
        <ul className="text-sm text-gray-700 space-y-2">
          {stats.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 w-2 h-2 rounded-full bg-emerald-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
