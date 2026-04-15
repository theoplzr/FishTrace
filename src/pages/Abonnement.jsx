import { Link } from 'react-router-dom'
import { PLANS } from '../data/mockData'
import { useSubscription } from '../hooks/useSubscription'

const model = [
  { title: 'Consommateur', value: 'Scan gratuit', desc: 'Premium 4€/mois pour débloquer les détails.' },
  { title: 'Artisan', value: '4€/mois', desc: 'Premium requis + commission 5-8% sur ventes générées.' },
  { title: 'Restaurateur', value: '10€/mois', desc: 'Pro avec label éco-responsable et QR menu.' },
]

export default function Abonnement() {
  const { tier, activatePlan, resetPlan } = useSubscription()

  return (
    <div className="px-4 pt-5 pb-6 sm:px-6 lg:px-8">
      <section className="rounded-[32px] p-5 sm:p-8" style={{ background: 'linear-gradient(135deg, #E1F5EE 0%, #ffffff 82%)' }}>
        <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#1D9E75' }}>
          Abonnements
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mt-2">Modèle économique MaréeForce</h1>
        <p className="text-sm text-gray-600 mt-3 leading-relaxed max-w-2xl">
          Un modèle simple : scan gratuit pour découvrir, Premium à 4€/mois pour consommateurs et artisans, Pro à 10€/mois pour les restaurateurs.
        </p>
        <div className="inline-flex mt-4 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ backgroundColor: '#0F6E56', color: 'white' }}>
          Accès actif : {tier === 'free' ? 'Gratuit' : tier === 'freemium' ? 'Premium' : 'Pro restaurateur'}
        </div>
      </section>

      <section className="grid gap-3 mt-4 lg:grid-cols-3">
        {model.map(item => (
          <div key={item.title} className="card">
            <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#1D9E75' }}>
              {item.title}
            </div>
            <div className="text-2xl font-bold text-gray-900 mt-2">{item.value}</div>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 mt-4 lg:grid-cols-3">
        {PLANS.map(plan => {
          const isActive = tier === plan.id
          return (
            <div key={plan.id} className="card relative" style={plan.recommended ? { border: '2px solid #1D9E75' } : {}}>
              {isActive && (
                <span className="absolute -top-3 right-4 text-xs font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: '#0F6E56' }}>
                  Actif
                </span>
              )}
              <h2 className="font-bold text-gray-900 text-lg">{plan.name}</h2>
              <div className="text-3xl font-bold mt-2" style={{ color: '#0F6E56' }}>
                {plan.price === 0 ? '0€' : `${plan.price}€`}
                {plan.billing && <span className="text-sm text-gray-400 font-semibold">{plan.billing}</span>}
              </div>
              <div className="grid gap-2 mt-4">
                {plan.features.filter(feature => feature.ok).slice(0, 5).map(feature => (
                  <div key={feature.text} className="text-sm text-gray-700 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs" style={{ backgroundColor: '#1D9E75' }}>✓</span>
                    {feature.text}
                  </div>
                ))}
              </div>
              {plan.id === 'free' && (
                <button onClick={resetPlan} className="btn-secondary mt-5">
                  Rester gratuit
                </button>
              )}
              {plan.id === 'freemium' && (
                <button onClick={() => activatePlan('freemium')} className="btn-primary mt-5">
                  Activer Premium
                </button>
              )}
              {plan.id === 'pro' && (
                <button onClick={() => activatePlan('pro')} className="btn-primary mt-5">
                  Activer Pro restaurateur
                </button>
              )}
            </div>
          )
        })}
      </section>

      <div className="grid gap-3 mt-4 sm:grid-cols-3">
        <Link to="/scan" className="btn-secondary">Consommateurs</Link>
        <Link to="/artisan" className="btn-secondary">Artisans</Link>
        <Link to="/restaurateur" className="btn-secondary">Restaurateurs</Link>
      </div>
    </div>
  )
}
