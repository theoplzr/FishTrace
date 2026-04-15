import { Link } from 'react-router-dom'
import ProQrGenerator from '../components/ProQrGenerator'
import { useSubscription } from '../hooks/useSubscription'

const sales = [
  { client: 'Client particulier', product: '2 kg maquereau', amount: '31€' },
  { client: 'Cantine partenaire', product: '12 kg sardine', amount: '168€' },
  { client: 'Restaurant partenaire', product: '8 kg bar de ligne', amount: '216€' },
]

export default function EspaceArtisan() {
  const { isSubscribed, activatePlan } = useSubscription()

  return (
    <div className="px-4 pt-5 pb-6 sm:px-6 lg:px-8">
      <section className="rounded-[32px] p-5 sm:p-8" style={{ background: 'linear-gradient(135deg, #E1F5EE 0%, #ffffff 82%)' }}>
        <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#1D9E75' }}>
          Vue artisans
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mt-2">Vendre plus justement</h1>
        <p className="text-sm text-gray-600 mt-3 leading-relaxed max-w-2xl">
          L’artisan accède à une plateforme de vente qui l’expose à plus de clients. MaréeForce prend une commission uniquement sur les ventes directes générées.
        </p>
      </section>

      {!isSubscribed && (
        <section className="rounded-[28px] p-5 mt-4" style={{ backgroundColor: '#085041' }}>
          <h2 className="font-bold text-white">Abonnement requis : Premium 4€/mois</h2>
          <p className="text-sm mt-2 leading-relaxed" style={{ color: '#9FE1CB' }}>
            Débloquez l’espace pro, le QR de traçabilité, l’historique de ventes et la visibilité commerciale.
          </p>
          <button onClick={() => activatePlan('freemium')} className="inline-block mt-4 bg-white font-semibold text-sm px-5 py-2.5 rounded-xl" style={{ color: '#0F6E56' }}>
            Activer Premium
          </button>
        </section>
      )}

      <section className="grid gap-4 mt-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-4">
          <div className="card">
            <h2 className="font-bold text-gray-900">Ce que l’artisan gagne</h2>
            <div className="grid gap-2 mt-3 sm:grid-cols-3">
              {[
                { value: '5-8%', label: 'commission MaréeForce' },
                { value: '+34%', label: 'marge directe estimée' },
                { value: '0', label: 'grossiste imposé' },
              ].map(stat => (
                <div key={stat.label} className="rounded-2xl bg-gray-50 p-3">
                  <div className="text-xl font-bold" style={{ color: '#0F6E56' }}>{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="font-bold text-gray-900">Historique de ventes</h2>
            <div className="grid gap-2 mt-3">
              {sales.map(sale => (
                <div key={`${sale.client}-${sale.product}`} className="rounded-2xl bg-gray-50 p-3 flex justify-between gap-3">
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{sale.client}</div>
                    <div className="text-xs text-gray-500 mt-1">{sale.product}</div>
                  </div>
                  <div className="font-bold" style={{ color: '#0F6E56' }}>{sale.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ProQrGenerator
          fishermanName="Marco Ferreira"
          productName="Maquereau de ligne"
          location="Douarnenez, Bretagne"
          locked={!isSubscribed}
          onUnlock={() => activatePlan('freemium')}
        />
      </section>

      <div className="grid gap-3 mt-4 sm:grid-cols-2">
        <Link to="/abonnement/artisan" className="btn-secondary">Voir l’abonnement artisan</Link>
        <Link to="/trace/marco-ferreira?product=maquereau-marco" className="btn-primary">Voir une fiche QR</Link>
      </div>
    </div>
  )
}
