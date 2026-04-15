import { Link } from 'react-router-dom'
import ImpactDashboard from '../components/ImpactDashboard'

const PILLARS = [
  {
    title: 'Plaidoyer',
    icon: '⚖️',
    color: '#E1F5EE',
    textColor: '#085041',
    description: "Faire pression pour une régulation qui protège la pêche artisanale face aux logiques industrielles.",
  },
  {
    title: 'Circuit court',
    icon: '🔗',
    color: '#EAF3DE',
    textColor: '#1B4D0A',
    description: "Réduire les intermédiaires pour redonner de la valeur au pêcheur et de la transparence au consommateur.",
  },
  {
    title: 'FishTrace',
    icon: '📱',
    color: '#FAEEDA',
    textColor: '#633806',
    description: 'Transformer un achat flou en décision informée grâce au scan, au score et aux alternatives locales.',
  },
]

const OUTCOMES = [
  {
    title: 'Pour les consommateurs',
    description: 'Comprendre instantanément l’origine réelle, la méthode de pêche et le niveau de greenwashing avant d’acheter.',
  },
  {
    title: 'Pour les artisans',
    description: 'Retrouver de la marge, de la visibilité et une relation directe avec les acheteurs grâce à une preuve traçable.',
  },
  {
    title: 'Face aux concurrents',
    description: 'Compléter les paniers type Poiscaille par un outil de scan, de score et de redirection au moment du doute.',
  },
]

export default function Mission() {
  return (
    <div className="flex flex-col gap-5 px-4 pt-5 pb-2 sm:px-6 lg:px-8">
      <section className="rounded-[28px] p-5" style={{ background: 'linear-gradient(180deg, #E1F5EE 0%, #ffffff 100%)' }}>
        <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#1D9E75' }}>
          Notre mission
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mt-2 leading-tight">
          Rendre la pêche durable lisible, désirable et économiquement viable.
        </h1>
        <p className="text-sm text-gray-600 mt-3 leading-relaxed">
          MaréeForce ne se contente pas de dénoncer la pêche industrielle. L’application relie plaidoyer, circuit court et preuve produit pour créer un changement concret côté consommateur et côté artisan pêcheur.
        </p>
      </section>

      <section className="grid gap-3 lg:grid-cols-3">
        {PILLARS.map(pillar => (
          <div key={pillar.title} className="card flex gap-3 items-start">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: pillar.color }}>
              {pillar.icon}
            </div>
            <div>
              <h2 className="font-semibold text-base" style={{ color: pillar.textColor }}>{pillar.title}</h2>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">{pillar.description}</p>
            </div>
          </div>
        ))}
      </section>

      <ImpactDashboard
        title="Impact MaréeForce"
        subtitle="Des indicateurs pour suivre les scans, les artisans soutenus et les choix responsables"
      />

      <section className="card">
        <h2 className="font-semibold text-base text-gray-900">Ce que MaréeForce change</h2>
        <div className="grid gap-3 lg:grid-cols-3 mt-4">
          {OUTCOMES.map(outcome => (
            <div key={outcome.title} className="rounded-2xl p-4 bg-gray-50">
              <div className="font-semibold text-sm text-gray-900">{outcome.title}</div>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">{outcome.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[28px] p-5 text-center" style={{ backgroundColor: '#085041' }}>
        <div className="text-2xl mb-2">🌊</div>
        <h2 className="font-bold text-white text-lg">Passer de l’intention à l’action</h2>
        <p className="text-sm mt-2 leading-relaxed" style={{ color: '#9FE1CB' }}>
          Scan, score, alternatives, preuve de traçabilité: le produit doit raconter une histoire crédible en moins de 10 secondes.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-5">
          <Link to="/scan" className="btn-primary sm:w-auto">Lancer un scan</Link>
          <Link to="/artisan" className="btn-secondary bg-white/5 border-white/20 text-white hover:bg-white/10 sm:w-auto">
            Ouvrir l’espace artisan
          </Link>
          <Link to="/abonnement/restaurateur" className="btn-secondary bg-white/5 border-white/20 text-white hover:bg-white/10 sm:w-auto">
            Voir les plans
          </Link>
        </div>
      </section>
    </div>
  )
}
