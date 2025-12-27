export function parseDurationToSeconds(durationLabel) {
  if (!durationLabel) return 0
  const match = durationLabel.match(/(\d+)\s*(s|sn|sn\.?|sec|dk|min)?/i)
  if (!match) return 0

  const value = Number(match[1])
  const unit = match[2]?.toLowerCase()

  if (unit?.includes('dk') || unit?.includes('min')) return value * 60
  return value
}
