import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { getFisherman, getProduct, PRODUCTS } from '../data/mockData'
import { useScanHistory } from '../hooks/useScanHistory'
import { useSubscription } from '../hooks/useSubscription'

export default function Trace() {
  const { fishermanId } = useParams()
  const [searchParams] = useSearchParams()
  const product = getProduct(searchParams.get('product')) || getProduct('maquereau-marco')
  const fisherman = getFisherman(fishermanId) || getFisherman(product?.fisherman_id)
  const { addScan } = useScanHistory()
  const { isSubscribed, activatePlan } = useSubscription()
  const [review, setReview] = useState('')
  const alternatives = PRODUCTS.filter(item => item.id !== product?.id && item.score === 'A').slice(0, 2)

  useEffect(() => {
    if (product) addScan(product)
  }, [addScan, product])

  if (!product || !fisherman) {
    return (
      <div className="px-4 pt-6 sm:px-6 lg:px-8">
        <div className="card text-center py-10">
          <h1 className="font-bold text-gray-900 text-lg">QR non reconnu</h1>
          <p className="text-sm text-gray-500 mt-2">Cette preuve MaréeForce n’existe pas encore.</p>
          <Link to="/scan" className="btn-primary mt-4">Retour au scan</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 pt-5 pb-6 sm:px-6 lg:px-8">
      <section className="rounded-[32px] overflow-hidden bg-white border border-gray-100">
        <div className="p-5 sm:p-8" style={{ background: 'linear-gradient(135deg, #E1F5EE 0%, #ffffff 82%)' }}>
          <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#1D9E75' }}>
            QR MaréeForce
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mt-2">{product.name}</h1>
          <p className="text-sm text-gray-600 mt-2">
            Provenance : {product.origin} · Pêcheur : {fisherman.name}
          </p>
        </div>

        <div className="grid gap-3 p-5 sm:p-8 lg:grid-cols-3">
          <div className="rounded-2xl bg-gray-50 p-4">
            <div className="text-xs text-gray-400">Produit</div>
            <div className="font-bold text-gray-900 mt-1">{product.name}</div>
          </div>
          <div className="rounded-2xl bg-gray-50 p-4">
            <div className="text-xs text-gray-400">Provenance</div>
            <div className="font-bold text-gray-900 mt-1">{product.origin}</div>
          </div>
          <div className="rounded-2xl bg-gray-50 p-4">
            <div className="text-xs text-gray-400">Pêcheur</div>
            <div className="font-bold text-gray-900 mt-1">{fisherman.name}</div>
          </div>
        </div>
      </section>

      {!isSubscribed && (
        <section className="rounded-[28px] p-5 mt-4" style={{ backgroundColor: '#085041' }}>
          <h2 className="font-bold text-white">Débloquer les détails Premium</h2>
          <p className="text-sm mt-2 leading-relaxed" style={{ color: '#9FE1CB' }}>
            Pour 4€/mois : traçabilité complète, importation, historique, avis, goodies, newsletter et alternatives.
          </p>
          <button onClick={() => activatePlan('freemium')} className="inline-block mt-4 bg-white font-semibold text-sm px-5 py-2.5 rounded-xl" style={{ color: '#0F6E56' }}>
            Activer Premium 4€/mois
          </button>
        </section>
      )}

      {isSubscribed && (
        <section className="grid gap-4 mt-4 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="grid gap-4">
            <div className="card">
              <h2 className="font-bold text-gray-900">Traçabilité complète</h2>
              <div className="grid gap-2 mt-3 sm:grid-cols-2">
                {[
                  { label: 'Méthode', value: product.method },
                  { label: 'Zone', value: product.zone },
                  { label: 'Importation', value: product.origin.includes('Bretagne') || product.origin.includes('Saint-Malo') || product.origin.includes('Douarnenez') ? 'Circuit local, pas d’importation' : product.origin },
                  { label: 'Intermédiaires', value: `${product.intermediaries} intermédiaire${product.intermediaries > 1 ? 's' : ''}` },
                ].map(row => (
                  <div key={row.label} className="rounded-2xl bg-gray-50 p-3">
                    <div className="text-xs text-gray-400">{row.label}</div>
                    <div className="font-semibold text-gray-900 mt-1">{row.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h2 className="font-bold text-gray-900">Avis consommateur</h2>
              <textarea
                value={review}
                onChange={event => setReview(event.target.value)}
                placeholder="Donnez votre avis sur le produit ou le pêcheur..."
                className="w-full min-h-24 mt-3 rounded-2xl border border-gray-200 p-3 text-sm outline-none focus:border-teal-400"
              />
              <button className="btn-primary mt-3">Publier l’avis</button>
            </div>

            <div className="card">
              <h2 className="font-bold text-gray-900">Alternatives possibles</h2>
              <div className="grid gap-2 mt-3 sm:grid-cols-2">
                {alternatives.map(item => (
                  <Link key={item.id} to={`/trace/${item.fisherman_id}?product=${item.id}`} className="rounded-2xl bg-gray-50 p-3">
                    <div className="font-semibold text-gray-900">{item.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{item.origin}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="card">
              <h2 className="font-bold text-gray-900">Espace personnel</h2>
              <p className="text-sm text-gray-600 mt-2">Ce QR est enregistré dans votre historique avec ses détails.</p>
              <Link to="/historique" className="btn-secondary mt-4">Voir l’historique</Link>
            </div>

            <div className="card">
              <h2 className="font-bold text-gray-900">Goodies & newsletter</h2>
              <p className="text-sm text-gray-600 mt-2">Recevez des actualités MaréeForce et des goodies liés à la consommation responsable.</p>
              <button className="btn-primary mt-4">S’abonner à la newsletter</button>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
