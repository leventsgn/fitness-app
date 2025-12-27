import React from 'react'
import { formatDate, formatDurationMinutes } from '../utils/formatters'

function MetricPill({ label, value }) {
  return (
    <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-semibold text-gray-900 mt-1 leading-snug">{value}</p>
    </div>
  )
}

export default function ReportsPage({ reports = [], profile }) {
  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">Raporlar</p>
          <h2 className="text-lg font-semibold text-gray-900 leading-snug">{profile?.program}</h2>
          <p className="text-sm text-gray-600">Hasta: {profile?.name}</p>
        </div>
        <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
          Günlük takip
        </span>
      </div>

      {reports.map((report) => (
        <article key={report.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-gray-500">{report.phase}</p>
              <h3 className="text-base font-semibold text-gray-900 leading-snug">{report.title}</h3>
              <p className="text-xs text-gray-500 mt-1">Seans #{report.sessionNumber}</p>
            </div>
            <div className="text-right text-sm text-gray-600">
              <div>{formatDate(report.date, { withTime: true })}</div>
              <div className="text-xs text-gray-500">{formatDurationMinutes(report.durationMinutes)}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <MetricPill label="ROM" value={report.rom} />
            <MetricPill label="Denge süresi" value={report.balanceTime} />
            <MetricPill label="Kuvvet / fonksiyon" value={report.strength} />
            <MetricPill label="Yürüme / dayanıklılık" value={report.gait} />
            <MetricPill label="Ağrı" value={`${report.painScore}/10`} />
            <MetricPill label="Enerji" value={`${report.energyScore}/10`} />
          </div>

          {report.notes ? (
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700 leading-relaxed">
              {report.notes}
            </div>
          ) : null}
        </article>
      ))}
    </div>
  )
}
