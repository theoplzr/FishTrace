import { Link, useParams, useSearchParams } from 'react-router-dom'
import ScoreBadge from '../components/ScoreBadge'
import { getFisherman, getProduct, SCORES } from '../data/mockData'

export default function Trace() {
  const { fishermanId } = useParams()
  const [searchParams] = useSearchParams()
  const product = getProduct(searchParams.get('product')) || getProduct('maquereau-marco')
  const fisherman = getFisherman(fishermanId) || getFisherman(product?.fisherman_id)
  const score = product ? SCORES[product.score] : null

  if (!product || !fisherman) {
    return (
      <div className="px-4 pt-6 sm:px-6 lg:px-8">
        <div className="card text-center py-10">
          <div className="text-4xl mb-3">🔎</div>
          <h1 className="font-bold text-gray-900 text-lg">QR non reconnu</h1>
          <p className="text-sm text-gray-500 mt-2">Cette preuve MaréeForce n’existe pas encore dans la base.</p>
          <Link to="/scan" className="btn-primary mt-4">Scanner un autre QR</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 pt-5 pb-6 sm:px-6 lg:px-8">
      <section className="rounded-[32px] overflow-hidden bg-white border border-gray-100">
        <div className="p-5 sm:p-8" style={{ background: 'linear-gradient(135deg, #E1F5EE 0%, #ffffff 80%)' }}>
          <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#1D9E75' }}>
            Preuve MaréeForce
          </div>
          <div className="flex items-start gap-4 mt-4">
            <ScoreBadge score={product.score} size="lg" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-sm text-gray-600 mt-1">Pêché par {fisherman.name} · {fisherman.location}</p>
              <span className="inline-flex mt-3 text-xs font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: score.bg }}>
                Score {product.score} · {score.text}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="grid gap-3">
            {[
              { label: 'Méthode', value: product.method },
              { label: 'Zone', value: product.zone },
              { label: 'Origine', value: product.origin },
              { label: 'Intermédiaires', value: `${product.intermediaries} intermédiaire${product.intermediaries > 1 ? 's' : ''}` },
            ].map(row => (
              <div key={row.label} className="rounded-2xl bg-gray-50 p-4">
                <div className="text-xs text-gray-400">{row.label}</div>
                <div className="font-semibold text-gray-900 mt-1">{row.value}</div>
              </div>
            ))}
          </div>

          <div className="rounded-[28px] p-5" style={{ backgroundColor: '#085041' }}>
            <div className="text-3xl">{fisherman.emoji}</div>
            <h2 className="font-bold text-white mt-3">{fisherman.name}</h2>
            <p className="text-sm mt-2 leading-relaxed" style={{ color: '#9FE1CB' }}>
              {fisherman.method}. Profil certifié MaréeForce pour rendre la pêche visible et vérifiable.
            </p>
            <Link to={`/pecheur/${fisherman.id}`} className="inline-block mt-4 bg-white font-semibold text-sm px-5 py-2.5 rounded-xl" style={{ color: '#0F6E56' }}>
              Voir le profil artisan
            </Link>
          </div>
        </div>
      </section>

      <div className="grid gap-3 mt-4 sm:grid-cols-2">
        <Link to="/scan" className="btn-secondary">Scanner un autre QR</Link>
        <Link to="/artisan" className="btn-primary">Retour espace artisan</Link>
      </div>
    </div>
  )
}
