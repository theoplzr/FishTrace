import { Link, Navigate, useParams } from 'react-router-dom'
import { useSubscription } from '../hooks/useSubscription'

const pages = {
  consommateur: {
    eyebrow: 'Abonnement consommateurs',
    title: 'Premium consommateur',
    price: '4€',
    billing: '/mois',
    tier: 'freemium',
    description: 'Pour débloquer toutes les informations après le scan QR MaréeForce.',
    cta: 'Activer Premium consommateur',
    backTo: '/scan',
    backLabel: 'Retour consommateurs',
    features: [
      'Plus de traçabilité',
      'Description totale du produit et de l’importation',
      'Espace personnel avec historique des QR scannés',
      'Avis sur le produit ou le pêcheur',
      'Accès à des goodies',
      'Alternatives pour choisir un meilleur produit',
      'Abonnement newsletter',
    ],
  },
  artisan: {
    eyebrow: 'Abonnement artisans',
    title: 'Premium artisan',
    price: '4€',
    billing: '/mois',
    tier: 'freemium',
    description: 'Pour accéder à la plateforme de vente et gagner en visibilité sur un marché plus rémunérateur.',
    cta: 'Activer Premium artisan',
    backTo: '/artisan',
    backLabel: 'Retour artisans',
    features: [
      'Accès à la plateforme de vente',
      'Exposition commerciale auprès des clients',
      'Espace pro avec historique de ventes',
      'QR de traçabilité pour les produits',
      'Meilleure visibilité sur le marché',
      'Paiement plus juste grâce à une meilleure répartition de la valeur',
      'Commission MaréeForce uniquement sur les ventes générées',
    ],
  },
  restaurateur: {
    eyebrow: 'Abonnement restaurateurs',
    title: 'Pro restaurant',
    price: '10€',
    billing: '/mois',
    tier: 'pro',
    description: 'Pour les restaurants qui veulent afficher un label éco-responsable et prouver l’origine de leur carte.',
    cta: 'Activer Pro restaurateur',
    backTo: '/restaurateur',
    backLabel: 'Retour restaurateurs',
    features: [
      'Label restaurant éco-responsable',
      'QR menu relié aux artisans',
      'Preuve d’origine consultable par les clients',
      'Badge salle et communication MaréeForce',
      'Mise en avant des artisans partenaires',
      'Rapport d’impact mensuel',
      'Support prioritaire',
    ],
  },
}

export default function Abonnement() {
  const { type } = useParams()
  const page = pages[type]
  const { tier, activatePlan } = useSubscription()

  if (!page) {
    return <Navigate to="/" replace />
  }

  const isActive = tier === page.tier

  return (
    <div className="px-4 pt-5 pb-6 sm:px-6 lg:px-8">
      <section className="rounded-[32px] overflow-hidden bg-white border border-gray-100">
        <div className="p-5 sm:p-8" style={{ background: 'linear-gradient(135deg, #E1F5EE 0%, #ffffff 82%)' }}>
          <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#1D9E75' }}>
            {page.eyebrow}
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mt-2">{page.title}</h1>
          <p className="text-sm text-gray-600 mt-3 leading-relaxed max-w-2xl">{page.description}</p>
        </div>

        <div className="grid gap-5 p-5 sm:p-8 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="rounded-[28px] p-5" style={{ backgroundColor: '#085041' }}>
            <div className="text-sm" style={{ color: '#9FE1CB' }}>Prix</div>
            <div className="text-5xl font-bold text-white mt-2">
              {page.price}<span className="text-base font-semibold" style={{ color: '#9FE1CB' }}>{page.billing}</span>
            </div>
            <button onClick={() => activatePlan(page.tier)} className="w-full bg-white font-semibold text-sm px-5 py-3 rounded-2xl mt-5" style={{ color: '#0F6E56' }}>
              {isActive ? 'Abonnement actif' : page.cta}
            </button>
            <Link to={page.backTo} className="block text-center text-sm font-semibold mt-3" style={{ color: '#9FE1CB' }}>
              {page.backLabel}
            </Link>
          </div>

          <div className="card">
            <h2 className="font-bold text-gray-900 text-lg">Inclus</h2>
            <div className="grid gap-2 mt-4 sm:grid-cols-2">
              {page.features.map(feature => (
                <div key={feature} className="rounded-2xl bg-gray-50 p-3 flex gap-3">
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0" style={{ backgroundColor: '#1D9E75' }}>
                    ✓
                  </span>
                  <span className="text-sm font-medium text-gray-800">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
