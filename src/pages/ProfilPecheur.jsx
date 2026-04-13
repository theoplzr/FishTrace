import { useParams, Link } from 'react-router-dom'
import { getFisherman, PRODUCTS } from '../data/mockData'

export default function ProfilPecheur() {
  const { id } = useParams()
  const fisherman = getFisherman(id)

  if (!fisherman) return (
    <div className="p-6 text-center mt-20">
      <p className="text-4xl mb-3">🎣</p>
      <p className="font-semibold">Pêcheur introuvable</p>
      <Link to="/" className="btn-primary mt-4">Retour à l'accueil</Link>
    </div>
  )

  const products = PRODUCTS.filter(p => p.fisherman_id === fisherman.id)
  const years = new Date().getFullYear() - fisherman.since

  return (
    <div className="flex flex-col gap-4 pb-6">

      {/* Hero */}
      <div className="relative px-4 pt-6 pb-5" style={{backgroundColor:'#0F6E56'}}>
        <Link to="/" className="text-xs mb-4 block" style={{color:'#9FE1CB'}}>← Retour</Link>
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0" style={{backgroundColor:'#1D9E75'}}>
            {fisherman.emoji}
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">{fisherman.name}</h1>
            <p className="text-sm mt-0.5" style={{color:'#9FE1CB'}}>📍 {fisherman.location}</p>
            {fisherman.certified && (
              <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full mt-2 font-semibold" style={{backgroundColor:'#1D9E75', color:'white'}}>
                ✓ Certifié MaréeForce
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 flex flex-col gap-4">

        {/* Stats rapides */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { n: `${years} ans`,           l:'d\'expérience' },
            { n: fisherman.revenue_increase, l:'de revenus' },
            { n: fisherman.species.length,   l:'espèces' },
          ].map(s => (
            <div key={s.l} className="card text-center py-3">
              <div className="text-lg font-bold" style={{color:'#1D9E75'}}>{s.n}</div>
              <div className="text-xs text-gray-400 mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>

        {/* Citation */}
        <div className="card" style={{borderLeft:'4px solid #1D9E75'}}>
          <p className="text-sm italic leading-relaxed text-gray-700">"{fisherman.quote}"</p>
          <p className="text-xs mt-2 font-semibold" style={{color:'#1D9E75'}}>— {fisherman.name}</p>
        </div>

        {/* Bio */}
        <div className="card">
          <h2 className="font-semibold text-sm text-gray-900 mb-2">À propos</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{fisherman.bio}</p>
        </div>

        {/* Méthode */}
        <div className="card">
          <h2 className="font-semibold text-sm text-gray-900 mb-3">Méthode & traçabilité</h2>
          {[
            { label:'Technique',  value: fisherman.method },
            { label:'Actif depuis', value: `${fisherman.since} (${years} ans d'expérience)` },
            { label:'Espèces',    value: fisherman.species.join(', ') },
          ].map(row => (
            <div key={row.label} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
              <span className="text-xs text-gray-400">{row.label}</span>
              <span className="text-xs font-medium text-gray-900 text-right max-w-[60%]">{row.value}</span>
            </div>
          ))}
        </div>

        {/* Produits */}
        {products.length > 0 && (
          <div className="card">
            <h2 className="font-semibold text-sm text-gray-900 mb-3">Ses produits sur FishTrace</h2>
            <div className="flex flex-col gap-2">
              {products.map(p => (
                <Link key={p.id} to={`/resultat/${p.id}`} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                  <span className="text-xl">{p.emoji}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{p.name}</div>
                    <div className="text-xs text-gray-400">{p.method}</div>
                  </div>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{backgroundColor:'#1D9E75'}}>
                    {p.score}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA commander */}
        <div className="card" style={{backgroundColor:'#E1F5EE', border:'1.5px solid #9FE1CB'}}>
          <h3 className="font-semibold text-sm mb-1" style={{color:'#085041'}}>Commander directement</h3>
          <p className="text-xs mb-3 leading-relaxed" style={{color:'#1D9E75'}}>
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
  )
}
