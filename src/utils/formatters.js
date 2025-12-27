export function formatDate(dateString, { withTime = false } = {}) {
  if (!dateString) return ''
  const options = withTime
    ? { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }
    : { day: '2-digit', month: 'short' }
  return new Intl.DateTimeFormat('tr-TR', options).format(new Date(dateString))
}

export function formatDurationMinutes(minutes) {
  if (minutes === undefined || minutes === null || Number.isNaN(Number(minutes))) return ''
  const wholeMinutes = Math.round(minutes)
  if (wholeMinutes >= 60) {
    const hrs = Math.floor(wholeMinutes / 60)
    const mins = wholeMinutes % 60
    return mins > 0 ? `${hrs}sa ${mins}dk` : `${hrs}sa`
  }
  return `${wholeMinutes}dk`
}
