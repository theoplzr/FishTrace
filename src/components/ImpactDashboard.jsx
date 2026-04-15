import { useEffect, useRef, useState } from 'react'
import { IMPACT_STATS } from '../data/mockData'

const DEFAULT_STATS = [
  { key: 'scans', value: IMPACT_STATS.scans, label: 'scans analysés', icon: '📷' },
  { key: 'artisans', value: IMPACT_STATS.artisans, label: 'artisans soutenus', icon: '🎣' },
  { key: 'kg_saved', value: IMPACT_STATS.kg_saved, label: 'kg de surpêche évitée', icon: '🌊' },
  { key: 'users', value: IMPACT_STATS.users, label: 'consommateurs engagés', icon: '👥' },
]

function formatValue(value, suffix) {
  return `${new Intl.NumberFormat('fr-FR').format(value)}${suffix || ''}`
}

function AnimatedMetric({ value, label, icon, suffix = '' }) {
  const [displayValue, setDisplayValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return undefined

    let frameId = 0
    const duration = 1200
    const startTime = performance.now()

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1)
      const easedProgress = 1 - (1 - progress) ** 3
      setDisplayValue(Math.round(value * easedProgress))

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick)
      }
    }

    frameId = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frameId)
  }, [isVisible, value])

  return (
    <div ref={elementRef} className="rounded-2xl p-4" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
      <div className="text-lg">{icon}</div>
      <div className="text-2xl font-bold text-white mt-2">{formatValue(displayValue, suffix)}</div>
      <div className="text-xs mt-1 leading-snug" style={{ color: '#9FE1CB' }}>{label}</div>
    </div>
  )
}

export default function ImpactDashboard({
  title = 'Impact collectif',
  subtitle = 'Des indicateurs clairs pour suivre l’effet du circuit court',
  stats = DEFAULT_STATS,
}) {
  return (
    <section className="rounded-[28px] p-5" style={{ backgroundColor: '#085041' }}>
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <p className="text-xs mt-1" style={{ color: '#9FE1CB' }}>{subtitle}</p>
        </div>
        <div className="text-2xl">📈</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map(stat => (
          <AnimatedMetric
            key={stat.key}
            value={stat.value}
            label={stat.label}
            icon={stat.icon}
            suffix={stat.suffix}
          />
        ))}
      </div>
    </section>
  )
}
