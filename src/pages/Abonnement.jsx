import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ImpactDashboard from '../components/ImpactDashboard'
import ProQrGenerator from '../components/ProQrGenerator'
import { PLANS } from '../data/mockData'
import { DEMO_STEPS, useDemoMode } from '../hooks/useDemoMode'
import { useSubscription } from '../hooks/useSubscription'

const FAQ = [
  { q: "Pourquoi un plan Premium à 4€/mois ?", a: "Le plan Premium finance les alternatives durables, l'historique des scans et l'accompagnement des artisans sans dépendre d'un modèle publicitaire." },
  { q: 'Pourquoi le plan Pro est à 10€/mois ?', a: 'Un artisan indépendant n’a pas besoin d’un logiciel lourd. Le plan Pro reste accessible et couvre le profil certifié, le QR “pêché par X”, les demandes directes et le suivi d’impact.' },
  { q: 'En quoi FishTrace se différencie de Poiscaille ?', a: 'Poiscaille est surtout un modèle de casier de la mer. FishTrace intervient au moment du doute en rayon : scan, score, alerte greenwashing, puis redirection vers une alternative artisanale.' },
  { q: 'Les labels MSC sont-ils tous mauvais ?', a: "Non. FishTrace ne diabolise pas un logo seul : l'app recroise zone, méthode de pêche, intermédiaires et critiques documentées." },
  { q: 'Puis-je résilier ?', a: 'Oui. Les offres sont pensées sans engagement, avec une gestion simple depuis votre espace MaréeForce.' },
]

const REVENUE_STREAMS = [
  { title: 'Premium consommateurs', value: '4€/mois', desc: 'Accès aux alternatives complètes, filtres et historique.' },
  { title: 'Pro artisans', value: '10€/mois', desc: 'Profil certifié, QR traçabilité et commandes directes.' },
  { title: 'Commission circuit court', value: '5-8%', desc: 'Prélevée uniquement lorsqu’une commande directe est générée.' },
]

export default function Abonnement() {
  const [openFaq, setOpenFaq] = useState(null)
  const [checkoutPlan, setCheckoutPlan] = useState(null)
  const [purchaseNotice, setPurchaseNotice] = useState(null)
  const { tier, isPro, activatePlan, resetPlan } = useSubscription()
  const { isDemoActive, demoStep, stopDemo } = useDemoMode()
  const demoStepData = DEMO_STEPS.find(step => step.step === 6)

  useEffect(() => {
    if (isDemoActive && demoStep === 6 && tier === 'free') {
      activatePlan('freemium')
    }
  }, [activatePlan, demoStep, isDemoActive, tier])

  function openCheckout(plan) {
    setPurchaseNotice(null)
    setCheckoutPlan(plan)
  }

  function confirmCheckout() {
    if (!checkoutPlan) return

    activatePlan(checkoutPlan.id)
    setPurchaseNotice(`${checkoutPlan.name} activé. Les fonctionnalités sont maintenant accessibles.`)
    setCheckoutPlan(null)
  }

  function handleFreePlan() {
    resetPlan()
    setCheckoutPlan(null)
    setPurchaseNotice('Accès gratuit activé.')
  }

  return (
    <div className="flex flex-col gap-0 pb-6">
      <div className="px-4 pt-6 pb-6 sm:px-6 lg:px-8" style={{ backgroundColor: '#E1F5EE' }}>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#1D9E75' }}>
              Offres MaréeForce
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mt-2 leading-tight">Choisissez l’accès qui crée le plus de valeur</h1>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed max-w-2xl">
              MaréeForce combine abonnement consommateur, abonnement artisan et commission sur les ventes directes pour financer une pêche plus transparente.
            </p>
            <div className="inline-flex mt-4 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ backgroundColor: '#0F6E56', color: 'white' }}>
              Accès actuel : {tier === 'free' ? 'Gratuit' : tier === 'freemium' ? 'Premium' : 'Pro Artisan'}
            </div>
          </div>

          <div className="rounded-[28px] bg-white/85 border border-white p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#1D9E75' }}>
              Ce que finance MaréeForce
            </div>
            <div className="grid gap-2 mt-3">
              {REVENUE_STREAMS.map(stream => (
                <div key={stream.title} className="rounded-2xl bg-white p-3 border border-gray-100">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{stream.title}</div>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{stream.desc}</p>
                    </div>
                    <div className="text-sm font-bold whitespace-nowrap" style={{ color: '#0F6E56' }}>{stream.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {purchaseNotice && (
        <div className="mx-4 mt-4 rounded-2xl px-4 py-3 text-sm font-semibold sm:mx-6 lg:mx-8" style={{ backgroundColor: '#E1F5EE', color: '#0F6E56' }}>
          {purchaseNotice}
        </div>
      )}

      <div className="grid gap-3 px-4 pt-5 sm:px-6 lg:px-8 lg:grid-cols-2">
        <div className="rounded-[28px] p-5 bg-white border border-gray-100">
          <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#1D9E75' }}>
            Espace consommateur
          </div>
          <h2 className="font-bold text-gray-900 mt-1">Acheter sans se perdre dans les labels</h2>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            Le Premium débloque les alternatives complètes, les filtres par espèce, le profil pêcheur et l’historique local des scans.
          </p>
          <Link to="/scan" className="btn-secondary mt-4">Tester le scan</Link>
        </div>

        <div className="rounded-[28px] p-5 bg-white border border-gray-100">
          <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#1D9E75' }}>
            Espace artisan
          </div>
          <h2 className="font-bold text-gray-900 mt-1">Prouver la pêche artisanale et vendre en direct</h2>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            Le Pro Artisan ajoute le QR “pêché par X”, le profil certifié, les lots du jour et les demandes directes générées après les scans.
          </p>
          <Link to="/artisan" className="btn-secondary mt-4">Voir l’espace artisan</Link>
        </div>
      </div>

      {isDemoActive && demoStep === 6 && demoStepData && (
        <div className="mx-4 mt-4 rounded-[28px] p-4" style={{ backgroundColor: '#085041' }}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#9FE1CB' }}>
                Exemple guidé · Étape 6/6
              </div>
              <div className="font-bold text-white mt-1">{demoStepData.shortTitle}</div>
            </div>
            <button onClick={stopDemo} className="text-xs font-semibold" style={{ color: '#9FE1CB' }}>
              Fermer
            </button>
          </div>
          <p className="text-sm mt-3 leading-relaxed" style={{ color: '#D5F4EA' }}>{demoStepData.description}</p>
          <div className="rounded-2xl bg-white/10 px-4 py-3 mt-3 text-sm italic text-white">
            "{demoStepData.quote}"
          </div>
        </div>
      )}

      <div className="grid gap-4 px-4 pt-5 sm:px-6 lg:px-8 xl:grid-cols-3 xl:items-start">
        {PLANS.map(plan => {
          const isActive = tier === plan.id

          return (
            <div
              key={plan.id}
              className="card relative"
              style={plan.recommended ? { border: '2px solid #1D9E75' } : {}}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="text-xs font-bold px-3 py-1 rounded-full text-white whitespace-nowrap" style={{ backgroundColor: '#1D9E75' }}>
                    {plan.badge}
                  </span>
                </div>
              )}

              {isActive && (
                <div className="absolute -top-3 right-4">
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full text-white whitespace-nowrap" style={{ backgroundColor: '#0F6E56' }}>
                    Actif
                  </span>
                </div>
              )}

              <div className="flex items-baseline justify-between mb-4 mt-1">
                <h2 className="text-lg font-bold text-gray-900">{plan.name}</h2>
                <div className="text-right">
                  <span className="text-2xl font-bold" style={{ color: '#0F6E56' }}>{plan.price === 0 ? 'Gratuit' : `${plan.price}€`}</span>
                  {plan.billing && <span className="text-xs text-gray-400 ml-0.5">{plan.billing}</span>}
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-5">
                {plan.features.map(feature => (
                  <div key={feature.text} className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${feature.ok ? 'text-white' : 'bg-gray-100'}`}
                      style={feature.ok ? { backgroundColor: '#1D9E75' } : {}}>
                      {feature.ok ? '✓' : <span className="text-gray-300">×</span>}
                    </div>
                    <span className={`text-sm ${feature.ok ? 'text-gray-700' : 'text-gray-300'}`}>{feature.text}</span>
                  </div>
                ))}
              </div>

              {plan.id === 'free' && (
                <button onClick={handleFreePlan} className="btn-secondary">
                  {isActive ? 'Plan actuel' : plan.cta}
                </button>
              )}

              {plan.id === 'freemium' && (
                <button onClick={() => openCheckout(plan)} className="btn-primary">
                  {isActive ? 'Gérer Premium' : plan.cta}
                </button>
              )}

              {plan.id === 'pro' && (
                <div className="flex flex-col gap-3">
                  <button onClick={() => openCheckout(plan)} className="btn-primary">
                    {isActive ? 'Gérer Pro Artisan' : plan.cta}
                  </button>
                  <Link to="/artisan" className="btn-secondary text-center block">
                    Ouvrir l’espace artisan
                  </Link>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="px-4 mt-4 sm:px-6 lg:px-8 grid gap-4 xl:grid-cols-2 xl:items-start">
        <ImpactDashboard
          title="Impact MaréeForce"
          subtitle="Suivi des scans, des artisans référencés et des choix responsables"
        />

        <ProQrGenerator
          fishermanName="Artisan MaréeForce"
          productName="Maquereau de ligne"
          location="Douarnenez, Bretagne"
          locked={!isPro}
          onUnlock={() => activatePlan('pro')}
        />
      </div>

      <div className="px-4 mt-5 sm:px-6 lg:px-8">
        <h2 className="font-bold text-gray-900 text-base mb-3">Questions fréquentes</h2>
        <div className="grid gap-2 lg:grid-cols-2">
          {FAQ.map((item, index) => (
            <div key={index} className="card cursor-pointer" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 pr-3">{item.q}</span>
                <span className="text-gray-400 flex-shrink-0 transition-transform" style={{ transform: openFaq === index ? 'rotate(180deg)' : 'none' }}>▾</span>
              </div>
              {openFaq === index && (
                <p className="text-sm text-gray-500 mt-2 leading-relaxed border-t border-gray-50 pt-2">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 mt-5 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/mission" className="btn-secondary md:w-auto">Voir la mission MaréeForce</Link>
          <Link to="/artisan" className="btn-secondary md:w-auto">Voir l’espace artisan</Link>
        </div>
      </div>

      {checkoutPlan && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/45 px-3 pb-3 sm:items-center sm:p-6">
          <div className="w-full max-w-xl rounded-[32px] bg-white p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#1D9E75' }}>
                  Finaliser l’accès
                </div>
                <h2 className="text-xl font-bold text-gray-900 mt-1">{checkoutPlan.name}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {checkoutPlan.id === 'freemium'
                    ? 'Pour les consommateurs qui veulent choisir un poisson plus responsable.'
                    : 'Pour les artisans qui veulent prouver leur pêche et vendre plus directement.'}
                </p>
              </div>
              <button onClick={() => setCheckoutPlan(null)} className="text-sm font-semibold text-gray-400">
                Fermer
              </button>
            </div>

            <div className="rounded-3xl p-4 mt-5" style={{ backgroundColor: '#F5F7F8' }}>
              <div className="flex items-end justify-between gap-3">
                <div>
                  <div className="text-xs text-gray-400">Montant mensuel</div>
                  <div className="text-3xl font-bold mt-1" style={{ color: '#0F6E56' }}>
                    {checkoutPlan.price}€
                    <span className="text-sm text-gray-400 font-semibold">{checkoutPlan.billing}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">Engagement</div>
                  <div className="text-sm font-semibold text-gray-900 mt-1">Sans engagement</div>
                </div>
              </div>
            </div>

            <div className="grid gap-2 mt-4">
              {checkoutPlan.features.filter(feature => feature.ok).slice(0, 5).map(feature => (
                <div key={feature.text} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs" style={{ backgroundColor: '#1D9E75' }}>
                    ✓
                  </span>
                  {feature.text}
                </div>
              ))}
            </div>

            <div className="grid gap-3 mt-5 sm:grid-cols-2">
              <button onClick={confirmCheckout} className="btn-primary">
                Confirmer l’accès
              </button>
              <button onClick={() => setCheckoutPlan(null)} className="btn-secondary">
                Comparer encore
              </button>
            </div>

            <p className="text-[11px] text-gray-400 text-center mt-4 leading-relaxed">
              Accès mensuel, sans engagement. Gestion simple depuis votre espace MaréeForce.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
