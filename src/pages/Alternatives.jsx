import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getAlternatives, getProduct, SCORES } from '../data/mockData'
import ScoreBadge from '../components/ScoreBadge'
import { useSubscription } from '../hooks/useSubscription'
import { DEMO_STEPS, useDemoMode } from '../hooks/useDemoMode'

const FILTERS = ['Tous', 'Poissons gras', 'Poissons blancs', 'Coquillages']

export default function Alternatives() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isSubscribed, activatePlan } = useSubscription()
  const { isDemoActive, demoStep, storyProductId, goToStep, stopDemo } = useDemoMode()
  const [filter, setFilter] = useState('Tous')
  const [showFilterUpsell, setShowFilterUpsell] = useState(false)
  const product = getProduct(id)
  const alternatives = getAlternatives(id)
  const demoStepData = DEMO_STEPS.find(step => step.step === 5)

  const filteredAlternatives = useMemo(
    () => alternatives.filter(alternative => filter === 'Tous' || alternative.product?.family === filter),
    [alternatives, filter]
  )

  useEffect(() => {
    if (!isDemoActive || demoStep !== 5 || id !== storyProductId) return undefined

    const timer = window.setTimeout(() => {
      activatePlan('freemium')
      goToStep(6)
      navigate('/abonnement/consommateur')
    }, 5200)

    return () => window.clearTimeout(timer)
  }, [activatePlan, demoStep, goToStep, id, isDemoActive, navigate, storyProductId])

  function handleFilterClick(nextFilter) {
    if (nextFilter === 'Tous') {
      setFilter(nextFilter)
      setShowFilterUpsell(false)
      return
    }

    if (!isSubscribed) {
      setShowFilterUpsell(true)
      return
    }

    setFilter(nextFilter)
    setShowFilterUpsell(false)
  }

  if (!product) {
    return (
      <div className="p-6 text-center mt-20">
        <p className="text-4xl mb-3">🤔</p>
        <p className="font-semibold">Produit introuvable</p>
        <Link to="/scan" className="btn-primary mt-4">Rescanner</Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 lg:px-8">
      {isDemoActive && demoStep === 5 && id === storyProductId && demoStepData && (
        <div className="rounded-[28px] p-4" style={{ backgroundColor: '#E1F5EE' }}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#1D9E75' }}>
                Exemple guidé · Étape 5/6
              </div>
              <div className="font-bold text-gray-900 mt-1">{demoStepData.shortTitle}</div>
            </div>
            <button onClick={stopDemo} className="text-xs font-semibold text-gray-500">
              Quitter
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-3 leading-relaxed">{demoStepData.description}</p>
          <div className="rounded-2xl bg-white px-4 py-3 mt-3 text-sm italic" style={{ color: '#085041' }}>
            "{demoStepData.quote}"
          </div>
        </div>
      )}

      <div>
        <Link to={`/resultat/${id}`} className="text-xs text-gray-400 flex items-center gap-1 mb-3">
          ← Retour au score
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Alternatives durables</h1>
        <p className="text-sm text-gray-500 mt-1">
          Pour remplacer : <span className="font-semibold text-gray-700">{product.emoji} {product.name}</span>
          <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded font-bold text-white" style={{ backgroundColor: SCORES[product.score]?.bg }}>
            {product.score}
          </span>
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {FILTERS.map(currentFilter => {
          const isLockedFilter = currentFilter !== 'Tous' && !isSubscribed
          return (
            <button
              key={currentFilter}
              onClick={() => handleFilterClick(currentFilter)}
              className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border transition-all"
              style={filter === currentFilter
                ? { backgroundColor: '#1D9E75', color: 'white', borderColor: '#1D9E75' }
                : { backgroundColor: 'white', color: '#5F5E5A', borderColor: '#E5E7EB' }
              }
            >
              {currentFilter}{isLockedFilter ? ' 🔒' : ''}
            </button>
          )
        })}
      </div>

      {showFilterUpsell && (
        <div className="rounded-2xl px-4 py-3 text-sm" style={{ backgroundColor: '#FAEEDA', color: '#633806' }}>
          Le filtre par espèce est maintenant branché, mais réservé au plan Premium.
        </div>
      )}

      {filteredAlternatives.length === 0 ? (
        <div className="card text-center py-8">
          <p className="text-3xl mb-2">🔍</p>
          <p className="text-gray-500 text-sm">Aucune alternative trouvée pour le filtre "{filter}".</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {filteredAlternatives.map((alternative, index) => {
            const isLocked = !isSubscribed && index > 0
            const isDemoChoice = isDemoActive && demoStep === 5 && alternative.product_id === 'maquereau-marco'

            return (
              <div key={alternative.product_id} className={`card relative ${isLocked ? 'overflow-hidden' : ''}`} style={isDemoChoice ? { border: '2px solid #1D9E75' } : {}}>
                {isDemoChoice && (
                  <span className="absolute -top-3 left-4 text-[11px] font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: '#1D9E75' }}>
                    Alternative recommandée
                  </span>
                )}

                {isLocked && (
                  <div className="absolute inset-0 rounded-2xl z-10 flex flex-col items-center justify-center gap-2" style={{ backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(3px)' }}>
                    <span className="text-2xl">🔒</span>
                    <p className="text-sm font-semibold text-gray-800">Alternative réservée</p>
                    <p className="text-xs text-gray-500 text-center px-4">Accédez aux 3 alternatives et aux filtres pour 4€/mois</p>
                    <Link to="/abonnement/consommateur" className="text-xs font-semibold px-4 py-2 rounded-xl text-white mt-1" style={{ backgroundColor: '#1D9E75' }}>
                      S'abonner →
                    </Link>
                  </div>
                )}

                <div className={isLocked ? 'blur-sm select-none pointer-events-none' : ''}>
                  <div className="flex items-start gap-3">
                    <ScoreBadge score={alternative.product?.score} size="md" />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-900">{alternative.product?.emoji} {alternative.product?.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{alternative.product?.label}</div>
                      <div className="flex gap-2 mt-1.5 flex-wrap">
                        <span className="text-xs px-2 py-0.5 rounded-full text-white font-medium" style={{ backgroundColor: '#1D9E75' }}>
                          Score {alternative.product?.score} — {SCORES[alternative.product?.score]?.text}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                          {alternative.product?.family}
                        </span>
                        {alternative.available ? (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">✓ Disponible</span>
                        ) : (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">Bientôt disponible</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-bold" style={{ color: '#1D9E75' }}>{alternative.distance} km</div>
                      <div className="text-xs text-gray-400">de vous</div>
                    </div>
                  </div>

                  {alternative.fisherman && (
                    <Link to={`/pecheur/${alternative.fisherman.id}`} className="flex items-center gap-2.5 mt-3 p-2.5 rounded-xl" style={{ backgroundColor: '#E1F5EE' }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-base" style={{ backgroundColor: '#9FE1CB' }}>
                        {alternative.fisherman.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold" style={{ color: '#085041' }}>
                          Pêché par {alternative.fisherman.name}
                        </div>
                        <div className="text-xs truncate" style={{ color: '#1D9E75' }}>{alternative.fisherman.location} · {alternative.fisherman.method.split(' · ')[0]}</div>
                      </div>
                      <span className="text-xs" style={{ color: '#1D9E75' }}>→</span>
                    </Link>
                  )}

                  <div className="flex gap-2 mt-2">
                    <div className="flex-1 text-center p-2 rounded-xl bg-gray-50">
                      <div className="text-xs font-semibold text-gray-900">{alternative.product?.intermediaries}</div>
                      <div className="text-xs text-gray-400">intermédiaire{alternative.product?.intermediaries !== 1 ? 's' : ''}</div>
                    </div>
                    <div className="flex-1 text-center p-2 rounded-xl bg-gray-50">
                      <div className="text-xs font-semibold text-gray-900">{alternative.product?.origin?.split(',')[0]}</div>
                      <div className="text-xs text-gray-400">origine</div>
                    </div>
                    <div className="flex-1 text-center p-2 rounded-xl bg-gray-50">
                      <div className="text-xs font-semibold" style={{ color: '#1D9E75' }}>{alternative.product?.label}</div>
                      <div className="text-xs text-gray-400">label</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {!isSubscribed && (
        <div className="card" style={{ backgroundColor: '#085041' }}>
          <div className="text-center">
            <div className="text-2xl mb-2">🔓</div>
            <h3 className="font-bold text-white text-sm mb-1">Débloquez toutes les alternatives</h3>
            <p className="text-xs mb-3" style={{ color: '#9FE1CB' }}>3 alternatives complètes · filtres espèce · historique local</p>
            <Link to="/abonnement/consommateur" className="inline-block bg-white font-semibold text-sm px-6 py-2.5 rounded-xl" style={{ color: '#0F6E56' }}>
              S'abonner pour 4€/mois →
            </Link>
          </div>
        </div>
      )}

      <Link to="/scan" className="btn-secondary text-center md:w-auto">
        📷 Scanner un autre produit
      </Link>
    </div>
  )
}
