import { Link, useNavigate } from 'react-router-dom'
import ImpactDashboard from '../components/ImpactDashboard'
import ProQrGenerator from '../components/ProQrGenerator'
import { useDemoMode } from '../hooks/useDemoMode'
import { useSubscription } from '../hooks/useSubscription'

const theoFlow = [
  { step: '1', title: 'Scan rayon', desc: 'Théo scanne un saumon MSC en supermarché.' },
  { step: '2', title: 'Score lisible', desc: 'FishTrace affiche un score D et explique le problème.' },
  { step: '3', title: 'Alternative', desc: 'L’app propose le maquereau de ligne de Marco.' },
  { step: '4', title: 'Conversion', desc: 'Théo passe au Premium à 4€/mois pour les filtres et l’historique.' },
]

const marcoFlow = [
  { step: '1', title: 'Profil certifié', desc: 'Marco prouve son bateau, sa zone FAO et sa méthode.' },
  { step: '2', title: 'Lot du jour', desc: '80 kg de maquereau de ligne sont disponibles.' },
  { step: '3', title: 'Commandes directes', desc: 'Trois demandes arrivent sans passer par un grossiste.' },
  { step: '4', title: 'Commission', desc: 'MaréeForce prend 5-8% uniquement sur les ventes générées.' },
]

const featureLinks = [
  { to: '/scan', label: 'Scanner', desc: 'Caméra, exemple guidé, animation d’analyse.' },
  { to: '/resultat/saumon-msc-chili', label: 'Résultat', desc: 'Score A-F, origine, méthode, intermédiaires.' },
  { to: '/alternatives/saumon-msc-chili', label: 'Alternatives', desc: 'Filtres par espèce et alternatives artisanales.' },
  { to: '/historique', label: 'Historique', desc: 'Scans sauvegardés en local.' },
  { to: '/artisan', label: 'Espace Marco', desc: 'Profil, commandes, marge directe, QR Premium.' },
  { to: '/restaurateur', label: 'Restaurateur', desc: 'Label éco-responsable et QR menu.' },
  { to: '/abonnement', label: 'Vente', desc: 'Premium 4€, commission 5-8%, Pro restaurant 10€.' },
]

export default function Demo() {
  const navigate = useNavigate()
  const { startDemo, stopDemo } = useDemoMode()
  const { tier, isSubscribed, activatePlan, resetPlan } = useSubscription()

  function launchTheoDemo() {
    resetPlan()
    startDemo()
    navigate('/scan')
  }

  function launchMarcoDemo() {
    stopDemo()
    activatePlan('freemium')
    navigate('/artisan')
  }

  function launchRestaurantDemo() {
    stopDemo()
    activatePlan('pro')
    navigate('/restaurateur')
  }

  function launchSalesDemo() {
    stopDemo()
    resetPlan()
    navigate('/abonnement')
  }

  return (
    <div className="flex flex-col gap-5 px-4 pt-5 pb-6 sm:px-6 lg:px-8">
      <section className="rounded-[32px] overflow-hidden bg-white border border-gray-100">
        <div className="grid lg:grid-cols-[minmax(0,1.1fr)_360px]">
          <div className="p-5 sm:p-7" style={{ background: 'linear-gradient(135deg, #085041 0%, #0F6E56 58%, #1D9E75 100%)' }}>
            <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#9FE1CB' }}>
              Mode présentation
            </div>
            <h1 className="text-2xl lg:text-4xl font-bold text-white mt-3 leading-tight">
              Démontrer MaréeForce en trois vues : Théo, Marco et restaurateur.
            </h1>
            <p className="text-sm lg:text-base mt-3 leading-relaxed max-w-2xl" style={{ color: '#D5F4EA' }}>
              Utilisez cette page pour enchaîner toutes les fonctionnalités : scan gratuit, Premium 4€, commission artisan, Pro restaurant, QR et impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button onClick={launchTheoDemo} className="btn-primary sm:w-auto">
                Lancer le parcours Théo
              </button>
              <button onClick={launchMarcoDemo} className="btn-secondary bg-white/5 border-white/20 text-white hover:bg-white/10 sm:w-auto">
                Lancer le parcours Marco
              </button>
              <button onClick={launchRestaurantDemo} className="btn-secondary bg-white/5 border-white/20 text-white hover:bg-white/10 sm:w-auto">
                Lancer le parcours restaurant
              </button>
            </div>
          </div>

          <div className="p-5 sm:p-7 bg-white">
            <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#1D9E75' }}>
              État de la démo
            </div>
            <div className="grid gap-3 mt-4">
              <div className="rounded-2xl bg-gray-50 p-4">
                <div className="text-xs text-gray-400">Accès actif</div>
                <div className="font-bold text-gray-900 mt-1">
                  {tier === 'free' ? 'Gratuit' : tier === 'freemium' ? 'Premium' : 'Restaurant Pro'}
                </div>
              </div>
              <div className="rounded-2xl bg-gray-50 p-4">
                <div className="text-xs text-gray-400">Objectif de vente</div>
                <div className="font-bold text-gray-900 mt-1">4€/mois + 10€/mois + 5-8%</div>
              </div>
              <button onClick={launchSalesDemo} className="btn-secondary">
                Ouvrir le tunnel de vente
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <div className="card">
          <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#1D9E75' }}>
            Parcours consommateur
          </div>
          <h2 className="font-bold text-gray-900 text-lg mt-1">Théo achète mieux</h2>
          <div className="grid gap-2 mt-4">
            {theoFlow.map(item => (
              <div key={item.step} className="flex gap-3 rounded-2xl bg-gray-50 p-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: '#1D9E75' }}>
                  {item.step}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{item.title}</div>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={launchTheoDemo} className="btn-primary mt-4">
            Jouer la vente Premium
          </button>
        </div>

        <div className="card">
          <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#1D9E75' }}>
            Parcours artisan
          </div>
          <h2 className="font-bold text-gray-900 text-lg mt-1">Marco vend en direct</h2>
          <div className="grid gap-2 mt-4">
            {marcoFlow.map(item => (
              <div key={item.step} className="flex gap-3 rounded-2xl bg-gray-50 p-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: '#0F6E56' }}>
                  {item.step}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{item.title}</div>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={launchMarcoDemo} className="btn-primary mt-4">
            Jouer Premium + commission
          </button>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)] xl:items-start">
        <div className="card">
          <h2 className="font-bold text-gray-900 text-lg">Toutes les features à montrer</h2>
          <div className="grid gap-3 mt-4 sm:grid-cols-2">
            {featureLinks.map(feature => (
              <Link key={feature.to} to={feature.to} className="rounded-2xl border border-gray-100 p-4 transition-colors hover:border-teal-200 hover:bg-teal-50/40">
                <div className="text-sm font-bold text-gray-900">{feature.label}</div>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{feature.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <ProQrGenerator
            fishermanName="Marco Ferreira"
            productName="Maquereau de ligne · lot MF-0426"
            location="Douarnenez, Bretagne"
            locked={!isSubscribed}
            onUnlock={() => activatePlan('freemium')}
          />

          <ImpactDashboard
            title="Impact à présenter"
            subtitle="Les compteurs qui rendent le modèle MaréeForce concret"
          />
        </div>
      </section>
    </div>
  )
}
