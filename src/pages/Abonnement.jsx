import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PLANS } from '../data/mockData'

const FAQ = [
  { q:'Comment annuler mon abonnement ?',      a:"Vous pouvez annuler à tout moment depuis votre profil. Aucun préavis requis, aucune pénalité." },
  { q:'Mes données sont-elles protégées ?',    a:"Oui. FishTrace ne revend jamais vos données à des tiers. Nous respectons le RGPD." },
  { q:'Les labels MSC sont-ils tous mauvais ?', a:"Non, mais certains manquent de rigueur. FishTrace croise plusieurs sources (IFREMER, Bloom, MSC) pour donner une note honnête." },
  { q:'Comment fonctionnent les alternatives ?', a:"L'app identifie des artisans certifiés MaréeForce près de chez vous, pêchant les mêmes espèces avec des méthodes durables." },
]

export default function Abonnement() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="flex flex-col gap-0 pb-6">

      {/* Header */}
      <div className="px-4 pt-6 pb-5 text-center" style={{backgroundColor:'#E1F5EE'}}>
        <div className="text-3xl mb-2">🐟</div>
        <h1 className="text-2xl font-bold text-gray-900">Choisissez votre plan</h1>
        <p className="text-sm text-gray-500 mt-1">Commencez gratuitement, évoluez selon vos besoins</p>
      </div>

      {/* Plans */}
      <div className="flex flex-col gap-4 px-4 pt-5">
        {PLANS.map(plan => (
          <div
            key={plan.id}
            className="card relative"
            style={plan.recommended ? {border:'2px solid #1D9E75'} : {}}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="text-xs font-bold px-3 py-1 rounded-full text-white whitespace-nowrap" style={{backgroundColor:'#1D9E75'}}>
                  {plan.badge}
                </span>
              </div>
            )}

            {/* Plan header */}
            <div className="flex items-baseline justify-between mb-4 mt-1">
              <h2 className="text-lg font-bold text-gray-900">{plan.name}</h2>
              <div className="text-right">
                <span className="text-2xl font-bold" style={{color:'#0F6E56'}}>{plan.price === 0 ? 'Gratuit' : `${plan.price}€`}</span>
                {plan.billing && <span className="text-xs text-gray-400 ml-0.5">{plan.billing}</span>}
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-2 mb-5">
              {plan.features.map(f => (
                <div key={f.text} className="flex items-center gap-2.5">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${f.ok ? 'text-white' : 'bg-gray-100'}`}
                    style={f.ok ? {backgroundColor:'#1D9E75'} : {}}>
                    {f.ok ? '✓' : <span className="text-gray-300">×</span>}
                  </div>
                  <span className={`text-sm ${f.ok ? 'text-gray-700' : 'text-gray-300'}`}>{f.text}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            {plan.id === 'free' && (
              <Link to="/scan" className="btn-secondary text-center">{plan.cta}</Link>
            )}
            {plan.id === 'freemium' && (
              <button className="btn-primary" onClick={() => alert('Paiement Stripe — coming soon 🚀')}>
                {plan.cta}
              </button>
            )}
            {plan.id === 'pro' && (
              <a href="mailto:contact@mareeforce.fr?subject=Plan Pro FishTrace" className="btn-secondary text-center block">
                {plan.cta}
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Dashboard Impact teaser */}
      <div className="mx-4 mt-4 rounded-2xl p-5" style={{backgroundColor:'#085041'}}>
        <h3 className="font-bold text-white text-sm mb-3">Votre impact en temps réel</h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { n:'12 847',  l:'scans effectués', icon:'📷' },
            { n:'47',      l:'artisans soutenus', icon:'🎣' },
            { n:'3 200 kg', l:'de surpêche évitée', icon:'🌊' },
            { n:'5 130',   l:'consommateurs engagés', icon:'👥' },
          ].map(s => (
            <div key={s.l} className="rounded-xl p-3" style={{backgroundColor:'rgba(255,255,255,0.1)'}}>
              <div className="text-lg">{s.icon}</div>
              <div className="text-base font-bold text-white mt-1">{s.n}</div>
              <div className="text-xs" style={{color:'#9FE1CB'}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="px-4 mt-5">
        <h2 className="font-bold text-gray-900 text-base mb-3">Questions fréquentes</h2>
        <div className="flex flex-col gap-2">
          {FAQ.map((item, i) => (
            <div key={i} className="card cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 pr-3">{item.q}</span>
                <span className="text-gray-400 flex-shrink-0 transition-transform" style={{transform: openFaq === i ? 'rotate(180deg)' : 'none'}}>▾</span>
              </div>
              {openFaq === i && (
                <p className="text-sm text-gray-500 mt-2 leading-relaxed border-t border-gray-50 pt-2">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mention CESI */}
      <div className="mx-4 mt-5 p-4 rounded-2xl bg-gray-100 text-center">
        <p className="text-xs text-gray-400 leading-relaxed">
          FishTrace est un projet de démonstration scolaire — Bloc Innovation · FISA INFO A4 2025–2026 · CESI Nancy.<br />
          Aucun paiement réel n'est collecté.
        </p>
      </div>

    </div>
  )
}
