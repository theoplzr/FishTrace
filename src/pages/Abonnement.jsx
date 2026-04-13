import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ImpactDashboard from '../components/ImpactDashboard'
import ProQrGenerator from '../components/ProQrGenerator'
import { PLANS } from '../data/mockData'
import { DEMO_STEPS, useDemoMode } from '../hooks/useDemoMode'
import { useSubscription } from '../hooks/useSubscription'

const FAQ = [
  { q: "Pourquoi un freemium à 4€/mois ?", a: "Le plan Théo finance les alternatives durables, l'historique des scans et l'accompagnement des artisans sans dépendre d'un modèle publicitaire." },
  { q: 'Que contient le plan Pro ?', a: 'Le plan Pro ajoute le QR “pêché par X”, des exports de traçabilité, un suivi d’impact et une logique de preuve à afficher en salle ou en rayon.' },
  { q: 'Les labels MSC sont-ils tous mauvais ?', a: "Non. FishTrace ne diabolise pas un logo seul : l'app recroise zone, méthode de pêche, intermédiaires et critiques documentées." },
  { q: 'Puis-je résilier ?', a: 'Oui. Dans cette démo, le changement de plan est instantané et local, sans paiement réel.' },
]

export default function Abonnement() {
  const [openFaq, setOpenFaq] = useState(null)
  const { tier, isPro, activatePlan, resetPlan } = useSubscription()
  const { isDemoActive, demoStep, stopDemo } = useDemoMode()
  const demoStepData = DEMO_STEPS.find(step => step.step === 6)

  useEffect(() => {
    if (isDemoActive && demoStep === 6 && tier === 'free') {
      activatePlan('freemium')
    }
  }, [activatePlan, demoStep, isDemoActive, tier])

  return (
    <div className="flex flex-col gap-0 pb-6">
      <div className="px-4 pt-6 pb-5 text-center sm:px-6 lg:px-8" style={{ backgroundColor: '#E1F5EE' }}>
        <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#1D9E75' }}>
          Plans FishTrace
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Choisissez votre plan</h1>
        <p className="text-sm text-gray-500 mt-1">Freemium pour Théo, Pro pour restaurateurs et GMS</p>
        <div className="inline-flex mt-4 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ backgroundColor: '#0F6E56', color: 'white' }}>
          Plan actif : {tier === 'free' ? 'Gratuit' : tier === 'freemium' ? 'Freemium' : 'Pro'}
        </div>
      </div>

      {isDemoActive && demoStep === 6 && demoStepData && (
        <div className="mx-4 mt-4 rounded-[28px] p-4" style={{ backgroundColor: '#085041' }}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#9FE1CB' }}>
                Démo Théo · Étape 6/6
              </div>
              <div className="font-bold text-white mt-1">{demoStepData.shortTitle}</div>
            </div>
            <button onClick={stopDemo} className="text-xs font-semibold" style={{ color: '#9FE1CB' }}>
              Clore la démo
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
                <button onClick={resetPlan} className="btn-secondary">
                  {isActive ? 'Plan actuel' : plan.cta}
                </button>
              )}

              {plan.id === 'freemium' && (
                <button onClick={() => activatePlan('freemium')} className="btn-primary">
                  {isActive ? 'Plan Freemium actif' : plan.cta}
                </button>
              )}

              {plan.id === 'pro' && (
                <div className="flex flex-col gap-3">
                  <button onClick={() => activatePlan('pro')} className="btn-primary">
                    {isActive ? 'Plan Pro actif' : 'Activer la démo Pro'}
                  </button>
                  <a href="mailto:contact@mareeforce.fr?subject=Plan Pro FishTrace" className="btn-secondary text-center block">
                    Contacter l'équipe
                  </a>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="px-4 mt-4 sm:px-6 lg:px-8 grid gap-4 xl:grid-cols-2 xl:items-start">
        <ImpactDashboard
          title="Dashboard impact"
          subtitle="Compteurs animés pour matérialiser la traction projetée en soutenance"
        />

        <ProQrGenerator
          fishermanName="Marco Ferreira"
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

      <div className="mx-4 mt-5 p-4 rounded-2xl bg-gray-100 text-center sm:mx-6 lg:mx-8">
        <p className="text-xs text-gray-400 leading-relaxed">
          FishTrace est la brique citoyenne de MaréeForce : plaidoyer, circuit court et preuve de traçabilité.
          <br />
          Démo locale CESI Nancy — aucun paiement réel n'est collecté.
        </p>
      </div>

      <div className="px-4 mt-5 sm:px-6 lg:px-8">
        <Link to="/mission" className="btn-secondary md:w-auto">Voir la mission MaréeForce</Link>
      </div>
    </div>
  )
}
