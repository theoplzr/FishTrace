import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { getAlternatives, getProduct, SCORES } from '../data/mockData'
import ScoreBadge from '../components/ScoreBadge'

const FILTERS = ['Tous', 'Poissons gras', 'Poissons blancs', 'Coquillages']

export default function Alternatives() {
  const { id } = useParams()
  const [subscribed] = useState(false)
  const [filter, setFilter] = useState('Tous')
  const product = getProduct(id)
  const alts = getAlternatives(id)

  if (!product) return (
    <div className="p-6 text-center mt-20">
      <p className="text-4xl mb-3">🤔</p>
      <p className="font-semibold">Produit introuvable</p>
      <Link to="/scan" className="btn-primary mt-4">Rescanner</Link>
    </div>
  )

  return (
    <div className="flex flex-col gap-4 px-4 pt-5">

      {/* Header */}
      <div>
        <Link to={`/resultat/${id}`} className="text-xs text-gray-400 flex items-center gap-1 mb-3">
          ← Retour au score
        </Link>
        <h1 className="text-xl font-bold text-gray-900">Alternatives durables</h1>
        <p className="text-sm text-gray-500 mt-1">
          Pour remplacer : <span className="font-semibold text-gray-700">{product.emoji} {product.name}</span>
          <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded font-bold text-white" style={{backgroundColor: SCORES[product.score]?.bg}}>
            {product.score}
          </span>
        </p>
      </div>

      {/* Filtres */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border transition-all"
            style={filter === f
              ? { backgroundColor:'#1D9E75', color:'white', borderColor:'#1D9E75' }
              : { backgroundColor:'white', color:'#5F5E5A', borderColor:'#E5E7EB' }
            }
          >
            {f}
          </button>
        ))}
      </div>

      {/* Alternatives list */}
      {alts.length === 0 ? (
        <div className="card text-center py-8">
          <p className="text-3xl mb-2">🔍</p>
          <p className="text-gray-500 text-sm">Aucune alternative trouvée pour ce produit.</p>
        </div>
      ) : (
        alts.map((alt, i) => {
          const isLocked = !subscribed && i > 0
          return (
            <div key={alt.product_id} className={`card relative ${isLocked ? 'overflow-hidden' : ''}`}>
              {isLocked && (
                <div className="absolute inset-0 rounded-2xl z-10 flex flex-col items-center justify-center gap-2" style={{backgroundColor:'rgba(255,255,255,0.92)', backdropFilter:'blur(3px)'}}>
                  <span className="text-2xl">🔒</span>
                  <p className="text-sm font-semibold text-gray-800">Alternative réservée</p>
                  <p className="text-xs text-gray-500 text-center px-4">Accédez aux 3 alternatives pour 4€/mois</p>
                  <Link to="/abonnement" className="text-xs font-semibold px-4 py-2 rounded-xl text-white mt-1" style={{backgroundColor:'#1D9E75'}}>
                    S'abonner →
                  </Link>
                </div>
              )}

              <div className={isLocked ? 'blur-sm select-none pointer-events-none' : ''}>
                {/* Score + name */}
                <div className="flex items-start gap-3">
                  <ScoreBadge score={alt.product?.score} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-900">{alt.product?.emoji} {alt.product?.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{alt.product?.label}</div>
                    <div className="flex gap-2 mt-1.5 flex-wrap">
                      <span className="text-xs px-2 py-0.5 rounded-full text-white font-medium" style={{backgroundColor:'#1D9E75'}}>
                        Score {alt.product?.score} — {SCORES[alt.product?.score]?.text}
                      </span>
                      {alt.available ? (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">✓ Disponible</span>
                      ) : (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">Bientôt disponible</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-bold" style={{color:'#1D9E75'}}>{alt.distance} km</div>
                    <div className="text-xs text-gray-400">de vous</div>
                  </div>
                </div>

                {/* Pêcheur */}
                {alt.fisherman && (
                  <Link to={`/pecheur/${alt.fisherman.id}`} className="flex items-center gap-2.5 mt-3 p-2.5 rounded-xl" style={{backgroundColor:'#E1F5EE'}}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-base" style={{backgroundColor:'#9FE1CB'}}>
                      {alt.fisherman.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold" style={{color:'#085041'}}>
                        Pêché par {alt.fisherman.name}
                      </div>
                      <div className="text-xs truncate" style={{color:'#1D9E75'}}>{alt.fisherman.location} · {alt.fisherman.method.split(' · ')[0]}</div>
                    </div>
                    <span className="text-xs" style={{color:'#1D9E75'}}>→</span>
                  </Link>
                )}

                {/* Infos rapides */}
                <div className="flex gap-2 mt-2">
                  <div className="flex-1 text-center p-2 rounded-xl bg-gray-50">
                    <div className="text-xs font-semibold text-gray-900">{alt.product?.intermediaries}</div>
                    <div className="text-xs text-gray-400">intermédiaire{alt.product?.intermediaries !== 1 ? 's' : ''}</div>
                  </div>
                  <div className="flex-1 text-center p-2 rounded-xl bg-gray-50">
                    <div className="text-xs font-semibold text-gray-900">{alt.product?.origin?.split(',')[0]}</div>
                    <div className="text-xs text-gray-400">origine</div>
                  </div>
                  <div className="flex-1 text-center p-2 rounded-xl bg-gray-50">
                    <div className="text-xs font-semibold" style={{color:'#1D9E75'}}>{alt.product?.label}</div>
                    <div className="text-xs text-gray-400">label</div>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      )}

      {/* Bandeau paywall global */}
      {!subscribed && (
        <div className="card" style={{backgroundColor:'#085041'}}>
          <div className="text-center">
            <div className="text-2xl mb-2">🔓</div>
            <h3 className="font-bold text-white text-sm mb-1">Débloquez toutes les alternatives</h3>
            <p className="text-xs mb-3" style={{color:'#9FE1CB'}}>4€/mois · Annulation à tout moment · Sans engagement</p>
            <Link to="/abonnement" className="inline-block bg-white font-semibold text-sm px-6 py-2.5 rounded-xl" style={{color:'#0F6E56'}}>
              S'abonner pour 4€/mois →
            </Link>
          </div>
        </div>
      )}

      <Link to="/scan" className="btn-secondary text-center">
        📷 Scanner un autre produit
      </Link>

    </div>
  )
}
