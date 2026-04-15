import { Link } from 'react-router-dom'
import ProQrGenerator from '../components/ProQrGenerator'
import { useSubscription } from '../hooks/useSubscription'

const profileSteps = [
  { label: 'Bateau', value: 'Le Saint-Gwenole' },
  { label: 'Zone', value: 'FAO 27 · Douarnenez' },
  { label: 'Méthode', value: 'Ligne de traîne · Filet droit' },
  { label: 'Espèces', value: 'Maquereau, sardine, bar' },
]

const orders = [
  { buyer: 'Client particulier', product: '2 kg maquereau', status: 'À confirmer', amount: '31€' },
  { buyer: 'Cantine partenaire', product: '12 kg sardine', status: 'Précommande', amount: '168€' },
  { buyer: 'Restaurant Le Phare', product: '8 kg bar de ligne', status: 'Validée', amount: '216€' },
]

const directBenefits = [
  'Créer un profil traçable en 10 minutes',
  'Prouver la zone FAO, la méthode et le bateau',
  'Recevoir des demandes directes après un scan consommateur',
  'Générer un QR "pêché par l’artisan" pour l’étal, le menu ou le rayon',
]

export default function EspaceArtisan() {
  const { isPro, activatePlan } = useSubscription()

  return (
    <div className="flex flex-col gap-5 px-4 pt-5 pb-6 sm:px-6 lg:px-8">
      <section className="rounded-[32px] overflow-hidden bg-white border border-gray-100">
        <div className="grid lg:grid-cols-[minmax(0,1.1fr)_380px]">
          <div className="p-5 sm:p-7" style={{ background: 'linear-gradient(135deg, #085041 0%, #0F6E56 58%, #1D9E75 100%)' }}>
            <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#9FE1CB' }}>
              Espace artisan · MaréeForce Pro
            </div>
            <h1 className="text-2xl lg:text-4xl font-bold text-white mt-3 leading-tight">
              Valoriser la pêche du jour sans passer par un grossiste.
            </h1>
            <p className="text-sm lg:text-base mt-3 leading-relaxed max-w-2xl" style={{ color: '#D5F4EA' }}>
              L’artisan renseigne sa pêche, génère une preuve QR et reçoit des demandes directes des consommateurs qui veulent acheter durable après un scan FishTrace.
            </p>
            <div className="grid grid-cols-3 gap-2 mt-5 max-w-xl">
              {[
                { n: '80 kg', l: 'maquereau du jour' },
                { n: '+34%', l: 'marge directe' },
                { n: '3', l: 'demandes directes' },
              ].map(stat => (
                <div key={stat.l} className="rounded-2xl p-3 bg-white/10">
                  <div className="text-xl font-bold text-white">{stat.n}</div>
                  <div className="text-[11px] leading-tight mt-1" style={{ color: '#9FE1CB' }}>{stat.l}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button onClick={() => activatePlan('pro')} className="btn-primary sm:w-auto">
                Passer au Pro Artisan
              </button>
              <Link to="/pecheur/marco-ferreira" className="btn-secondary bg-white/5 border-white/20 text-white hover:bg-white/10 sm:w-auto">
                Voir le profil public
              </Link>
            </div>
          </div>

          <div className="p-5 sm:p-7 bg-white">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ backgroundColor: '#E1F5EE' }}>
                🎣
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Marco Ferreira</h2>
                <p className="text-sm text-gray-500">Douarnenez · 1 bateau · Artisan</p>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-2">
              {profileSteps.map(step => (
                <div key={step.label} className="flex items-center justify-between gap-3 rounded-2xl bg-gray-50 p-3">
                  <div>
                    <div className="text-xs text-gray-400">{step.label}</div>
                    <div className="text-sm font-semibold text-gray-900">{step.value}</div>
                  </div>
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs" style={{ backgroundColor: '#1D9E75' }}>
                    ✓
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)] lg:items-start">
        <div className="flex flex-col gap-4">
          <div className="card">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#1D9E75' }}>
                  Commandes directes
                </div>
                <h2 className="font-bold text-gray-900 mt-1">Demandes reçues après scan</h2>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: '#E1F5EE', color: '#0F6E56' }}>
                0 intermédiaire
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {orders.map(order => (
                <div key={`${order.buyer}-${order.product}`} className="rounded-2xl border border-gray-100 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{order.buyer}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{order.product}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold" style={{ color: '#0F6E56' }}>{order.amount}</div>
                      <div className="text-[11px] text-gray-400">{order.status}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ borderLeft: '4px solid #1D9E75' }}>
            <h2 className="font-bold text-gray-900">Pourquoi rejoindre MaréeForce</h2>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              MaréeForce ajoute une couche de preuve et de décision au circuit court : le consommateur scanne un produit flou, puis découvre une alternative artisanale concrète.
            </p>
            <div className="grid gap-2 mt-4 sm:grid-cols-2">
              {directBenefits.map(benefit => (
                <div key={benefit} className="rounded-2xl p-3 bg-gray-50 text-sm text-gray-700">
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:sticky lg:top-28">
          <ProQrGenerator
            fishermanName="Marco Ferreira"
            productName="Maquereau de ligne · lot MF-0426"
            location="Douarnenez, Bretagne"
            locked={!isPro}
            onUnlock={() => activatePlan('pro')}
          />

          <div className="rounded-[28px] p-5" style={{ backgroundColor: '#E1F5EE' }}>
            <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#1D9E75' }}>
              Plan conseillé
            </div>
            <h2 className="font-bold text-gray-900 mt-1">Pro Artisan · 10€/mois</h2>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Un plan accessible pour le terrain : profil certifié, QR traçabilité, commandes directes et preuve d’impact, sans outil entreprise lourd.
            </p>
            <Link to="/abonnement" className="btn-secondary mt-4">
              Comparer les offres
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
