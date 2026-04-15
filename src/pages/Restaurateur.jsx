import { Link } from 'react-router-dom'
import ProQrGenerator from '../components/ProQrGenerator'
import { useSubscription } from '../hooks/useSubscription'

export default function Restaurateur() {
  const { isPro, activatePlan } = useSubscription()

  return (
    <div className="px-4 pt-5 pb-6 sm:px-6 lg:px-8">
      <section className="rounded-[32px] p-5 sm:p-8" style={{ background: 'linear-gradient(135deg, #FAF7EF 0%, #ffffff 82%)' }}>
        <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#2F4F3E' }}>
          Vue restaurateurs
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mt-2">Label éco-responsable</h1>
        <p className="text-sm text-gray-600 mt-3 leading-relaxed max-w-2xl">
          Le restaurateur paie 10€/mois pour afficher le label MaréeForce, relier sa carte aux artisans et prouver l’origine du poisson à ses clients.
        </p>
      </section>

      {!isPro && (
        <section className="rounded-[28px] p-5 mt-4" style={{ backgroundColor: '#2F4F3E' }}>
          <h2 className="font-bold text-white">Abonnement requis : Pro 10€/mois</h2>
          <p className="text-sm mt-2 leading-relaxed" style={{ color: '#EDE7D2' }}>
            Débloquez le QR menu, le badge restaurant éco-responsable et la preuve d’origine pour vos clients.
          </p>
          <button onClick={() => activatePlan('pro')} className="inline-block mt-4 bg-white font-semibold text-sm px-5 py-2.5 rounded-xl" style={{ color: '#2F4F3E' }}>
            Activer Pro
          </button>
        </section>
      )}

      <section className="grid gap-4 mt-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="card">
          <h2 className="font-bold text-gray-900">Ce que le restaurant obtient</h2>
          <div className="grid gap-2 mt-3">
            {[
              'Label restaurant éco-responsable',
              'QR menu relié aux artisans',
              'Fiche origine consultable par les clients',
              'Badge salle et communication MaréeForce',
            ].map(item => (
              <div key={item} className="rounded-2xl bg-gray-50 p-3 flex items-center gap-3">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs" style={{ backgroundColor: '#1D9E75' }}>
                  ✓
                </span>
                <span className="text-sm font-semibold text-gray-800">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <ProQrGenerator
          fishermanName="Marco Ferreira"
          productName="Maquereau de ligne · menu du jour"
          location="Douarnenez → Restaurant partenaire"
          locked={!isPro}
          onUnlock={() => activatePlan('pro')}
        />
      </section>

      <div className="grid gap-3 mt-4 sm:grid-cols-2">
        <Link to="/abonnement" className="btn-secondary">Voir l’offre Pro</Link>
        <Link to="/trace/marco-ferreira?product=maquereau-marco" className="btn-primary">Voir une preuve client</Link>
      </div>
    </div>
  )
}
