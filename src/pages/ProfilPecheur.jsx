import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getFisherman, PRODUCTS } from '../data/mockData'
import ProQrGenerator from '../components/ProQrGenerator'
import { useSubscription } from '../hooks/useSubscription'

export default function ProfilPecheur() {
  const { id } = useParams()
  const navigate = useNavigate()
  const fisherman = getFisherman(id)
  const { isPro } = useSubscription()
  const products = fisherman ? PRODUCTS.filter(product => product.fisherman_id === fisherman.id) : []
  const [selectedProductId, setSelectedProductId] = useState(null)

  if (!fisherman) {
    return (
      <div className="p-6 text-center mt-20">
        <p className="text-4xl mb-3">🎣</p>
        <p className="font-semibold">Pêcheur introuvable</p>
        <Link to="/" className="btn-primary mt-4">Retour à l'accueil</Link>
      </div>
    )
  }

  const selectedProduct = products.find(product => product.id === selectedProductId) || products[0] || null
  const years = new Date().getFullYear() - fisherman.since

  return (
    <div className="flex flex-col gap-4 pb-6">
      <div className="relative px-4 pt-6 pb-5 sm:px-6 lg:px-8" style={{ backgroundColor: '#0F6E56' }}>
        <Link to="/" className="text-xs mb-4 block" style={{ color: '#9FE1CB' }}>← Retour</Link>
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0" style={{ backgroundColor: '#1D9E75' }}>
            {fisherman.emoji}
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{fisherman.name}</h1>
            <p className="text-sm mt-0.5" style={{ color: '#9FE1CB' }}>📍 {fisherman.location}</p>
            {fisherman.certified && (
              <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full mt-2 font-semibold" style={{ backgroundColor: '#1D9E75', color: 'white' }}>
                ✓ Certifié MaréeForce
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] xl:items-start">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-2">
            {[
              { n: `${years} ans`, l: "d'expérience" },
              { n: fisherman.revenue_increase, l: 'de revenus' },
              { n: fisherman.species.length, l: 'espèces' },
            ].map(stat => (
              <div key={stat.l} className="card text-center py-3">
                <div className="text-lg font-bold" style={{ color: '#1D9E75' }}>{stat.n}</div>
                <div className="text-xs text-gray-400 mt-0.5">{stat.l}</div>
              </div>
            ))}
          </div>

          <div className="card" style={{ borderLeft: '4px solid #1D9E75' }}>
            <p className="text-sm italic leading-relaxed text-gray-700">"{fisherman.quote}"</p>
            <p className="text-xs mt-2 font-semibold" style={{ color: '#1D9E75' }}>— {fisherman.name}</p>
          </div>

          <div className="card">
            <h2 className="font-semibold text-sm text-gray-900 mb-2">À propos</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{fisherman.bio}</p>
          </div>

          <div className="card">
            <h2 className="font-semibold text-sm text-gray-900 mb-3">Méthode & traçabilité</h2>
            {[
              { label: 'Technique', value: fisherman.method },
              { label: 'Actif depuis', value: `${fisherman.since} (${years} ans d'expérience)` },
              { label: 'Espèces', value: fisherman.species.join(', ') },
            ].map(row => (
              <div key={row.label} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                <span className="text-xs text-gray-400">{row.label}</span>
                <span className="text-xs font-medium text-gray-900 text-right max-w-[60%]">{row.value}</span>
              </div>
            ))}
          </div>

          {products.length > 0 && (
            <div className="card">
              <h2 className="font-semibold text-sm text-gray-900 mb-3">Ses produits sur FishTrace</h2>
              <div className="flex flex-col gap-2">
                {products.map(product => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProductId(product.id)}
                    className="flex items-center gap-3 p-2.5 rounded-xl border text-left transition-colors"
                    style={selectedProductId === product.id ? { borderColor: '#1D9E75', backgroundColor: '#E1F5EE' } : { borderColor: '#F3F4F6' }}
                  >
                    <span className="text-xl">{product.emoji}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-xs text-gray-400">{product.method}</div>
                    </div>
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: '#1D9E75' }}>
                      {product.score}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 xl:sticky xl:top-24">
          {selectedProduct && (
            <ProQrGenerator
              fishermanName={fisherman.name}
              productName={selectedProduct.name}
              location={fisherman.location}
              locked={!isPro}
              onUnlock={() => navigate('/abonnement')}
            />
          )}

          <div className="card" style={{ backgroundColor: '#E1F5EE', border: '1.5px solid #9FE1CB' }}>
            <h3 className="font-semibold text-sm mb-1" style={{ color: '#085041' }}>Commander directement</h3>
            <p className="text-xs mb-3 leading-relaxed" style={{ color: '#1D9E75' }}>
              Achetez le poisson de {fisherman.name.split(' ')[0]} sans intermédiaire. Circuit court certifié MaréeForce.
            </p>
            <a
              href={`mailto:contact@mareeforce.fr?subject=Commande ${fisherman.name}&body=Bonjour, je souhaite commander directement auprès de ${fisherman.name}.`}
              className="btn-primary text-center"
            >
              📩 Contacter {fisherman.name.split(' ')[0]}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
