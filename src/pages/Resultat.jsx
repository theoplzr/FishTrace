import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProduct, SCORES } from '../data/mockData'
import ScoreBadge from '../components/ScoreBadge'
import { useScanHistory } from '../hooks/useScanHistory'
import { DEMO_STEPS, useDemoMode } from '../hooks/useDemoMode'

export default function Resultat() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProduct(id)
  const { addScan } = useScanHistory()
  const { isDemoActive, demoStep, storyProductId, goToStep, stopDemo } = useDemoMode()

  useEffect(() => {
    if (!product) return
    addScan(product)
  }, [addScan, product])

  useEffect(() => {
    if (!product || !isDemoActive || demoStep !== 4 || product.id !== storyProductId) return undefined

    const timer = window.setTimeout(() => {
      goToStep(5)
      navigate(`/alternatives/${product.id}`)
    }, 4200)

    return () => window.clearTimeout(timer)
  }, [demoStep, goToStep, isDemoActive, navigate, product, storyProductId])

  if (!product) {
    return (
      <div className="p-6 text-center mt-20">
        <p className="text-4xl mb-3">🤔</p>
        <p className="font-semibold text-gray-700">Produit non trouvé</p>
        <Link to="/scan" className="btn-primary mt-4">Rescanner</Link>
      </div>
    )
  }

  const score = SCORES[product.score]
  const totalScore = product.critiques.reduce((total, critique) => total + critique.value, 0)
  const maxScore = product.critiques.reduce((total, critique) => total + critique.max, 0)
  const pct = Math.round((totalScore / maxScore) * 100)
  const isBad = ['D', 'E', 'F'].includes(product.score)
  const demoStepData = DEMO_STEPS.find(step => step.step === 4)

  return (
    <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 lg:px-8">
      {isDemoActive && demoStep === 4 && product.id === storyProductId && demoStepData && (
        <div className="rounded-[28px] p-4" style={{ backgroundColor: '#E1F5EE' }}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#1D9E75' }}>
                Exemple guidé · Étape 4/6
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
          <button
            onClick={() => {
              goToStep(5)
              navigate(`/alternatives/${product.id}`)
            }}
            className="btn-primary mt-4"
          >
            Continuer vers les alternatives
          </button>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.85fr)] lg:items-start">
        <div className="flex flex-col gap-4">
          <div className="card">
            <div className="flex items-start gap-4">
              <ScoreBadge score={product.score} size="lg" />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-900 text-lg leading-tight">{product.name}</div>
                <div className="text-sm text-gray-500 mt-0.5">{product.brand}</div>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded-full border" style={{ color: score.bg, borderColor: score.bg }}>
                    {score.text}
                  </span>
                  <span className="text-xs text-gray-400">🌍 {product.origin}</span>
                  <span className="text-xs text-gray-400">📦 {product.intermediaries} intermédiaire{product.intermediaries > 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Score global</span>
                <span className="font-semibold">{totalScore}/{maxScore} points</span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: score.bg }} />
              </div>
            </div>
          </div>

          {isBad && product.warning && (
            <div className="flex gap-3 p-4 rounded-2xl" style={{ backgroundColor: '#FCEBEB', border: '1.5px solid #F09595' }}>
              <span className="text-lg flex-shrink-0">⚠️</span>
              <div>
                <div className="font-semibold text-sm" style={{ color: '#791F1F' }}>Alerte greenwashing</div>
                <p className="text-xs mt-0.5 leading-relaxed" style={{ color: '#A32D2D' }}>{product.warning}</p>
              </div>
            </div>
          )}

          <div className="card">
            <h3 className="font-semibold text-gray-900 text-sm mb-3">Détail de l'analyse</h3>
            <div className="grid gap-3 md:grid-cols-2">
              {product.critiques.map(critique => (
                <div key={critique.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600 font-medium">{critique.label}</span>
                    <span className="font-semibold text-gray-900">{critique.value}/{critique.max}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-1">
                    <div className="h-full rounded-full" style={{ width: `${(critique.value / critique.max) * 100}%`, backgroundColor: critique.value >= 4 ? '#1D9E75' : critique.value >= 3 ? '#BA7517' : '#D85A30' }} />
                  </div>
                  <p className="text-xs text-gray-400">{critique.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:sticky lg:top-24">
          <div className="card">
            <h3 className="font-semibold text-gray-900 text-sm mb-3">Fiche produit</h3>
            {[
              { label: 'Méthode de pêche', value: product.method },
              { label: 'Zone de pêche', value: product.zone },
              { label: 'Origine', value: product.origin },
              { label: 'Label', value: product.label },
              { label: 'Famille', value: product.family },
              { label: 'Intermédiaires', value: `${product.intermediaries} entre le pêcheur et vous` },
            ].map(row => (
              <div key={row.label} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                <span className="text-xs text-gray-400">{row.label}</span>
                <span className="text-xs font-medium text-gray-900 text-right max-w-[55%]">{row.value}</span>
              </div>
            ))}
          </div>

          <div className="card" style={{ backgroundColor: '#E1F5EE', border: '1.5px solid #9FE1CB' }}>
            <div className="text-2xl mb-2">🎣</div>
            <h3 className="font-semibold text-sm mb-1" style={{ color: '#085041' }}>
              {isBad ? 'Des alternatives durables existent !' : 'Ce produit est déjà excellent !'}
            </h3>
            <p className="text-xs mb-3 leading-relaxed" style={{ color: '#1D9E75' }}>
              {isBad
                ? 'FishTrace a trouvé des poissons pêchés par des artisans locaux, disponibles à moins de 5 km de vous.'
                : "Découvrez d'autres pêcheurs artisanaux certifiés MaréeForce près de chez vous."
              }
            </p>
            <Link to={`/alternatives/${product.id}`} className="btn-primary text-center">
              Voir les alternatives durables →
            </Link>
          </div>

          <div className="card flex items-center gap-3">
            <span className="text-2xl">📣</span>
            <div className="flex-1">
              <div className="font-semibold text-sm text-gray-900">Sensibiliser vos proches</div>
              <p className="text-xs text-gray-400">Ce {product.name} a obtenu un score {product.score} — partagez ce résultat.</p>
            </div>
            <button
              onClick={() => navigator.share?.({ title: 'FishTrace', text: `J'ai scanné ${product.name} : score ${product.score} !`, url: window.location.href }).catch(() => {})}
              className="text-xs font-semibold px-3 py-2 rounded-xl border-2 flex-shrink-0"
              style={{ borderColor: '#1D9E75', color: '#0F6E56' }}
            >
              Partager
            </button>
          </div>
        </div>
      </div>

      <Link to="/scan" className="btn-secondary text-center md:w-auto mx-4 sm:mx-6 lg:mx-8">
        📷 Scanner un autre produit
      </Link>
    </div>
  )
}
