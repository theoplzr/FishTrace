import { SCORES } from '../data/mockData'

export default function ScoreBadge({ score, size = 'md' }) {
  const s = SCORES[score] || SCORES['C']
  const sizes = { sm: 'w-9 h-9 text-base rounded-xl', md: 'w-14 h-14 text-2xl rounded-2xl', lg: 'w-20 h-20 text-4xl rounded-3xl' }
  return (
    <div
      className={`${sizes[size]} flex items-center justify-center font-bold text-white flex-shrink-0`}
      style={{ backgroundColor: s.bg }}
    >
      {s.label}
    </div>
  )
}
