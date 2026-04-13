import { Link } from 'react-router-dom'
import { IMPACT_STATS } from '../data/mockData'
import ImpactDashboard from '../components/ImpactDashboard'

const steps = [
  { n:'1', icon:'📷', title:'Scannez', desc:"Pointez la caméra vers le code-barre de n'importe quel poisson en supermarché." },
  { n:'2', icon:'⭐', title:'Obtenez un score', desc:'FishTrace analyse la zone de pêche, la méthode et les intermédiaires. Score A→F instantané.' },
  { n:'3', icon:'🎣', title:'Choisissez mieux', desc:"Découvrez des alternatives durables pêchées par des artisans locaux, disponibles près de chez vous." },
]

const pillars = [
  { icon:'⚖️', color:'#E1F5EE', textColor:'#085041', title:'Plaidoyer', desc:'Contre-lobbying à Bruxelles. Coalition avec Bloom, Greenpeace et syndicats de pêche pour réguler les industriels.' },
  { icon:'🔗', color:'#EAF3DE', textColor:'#1B4D0A', title:'Circuit court', desc:'Plateforme directe pêcheur → consommateur. Label traçable anti-greenwashing. Commission 5–8%.' },
  { icon:'📱', color:'#FAEEDA', textColor:'#633806', title:'FishTrace', desc:'Application mobile de traçabilité en temps réel. Scan → score durabilité → alternatives artisanales.' },
]

const stats = [
  { value:'-53%', label:'de la flotte artisanale française en 30 ans', source:'IFREMER, 2023' },
  { value:'4,4 Md€', label:'de déficit commercial maritime annuel', source:'FranceAgriMer, 2023' },
  { value:'-60%', label:'de revenus pour les pêcheurs artisanaux en 10 ans', source:'CNPMEM, 2023' },
  { value:'4×', label:'plus de poisson importé que produit en France', source:'FranceAgriMer, 2023' },
]

export default function Landing() {
  return (
    <div className="flex flex-col">
      <section className="px-5 pt-8 pb-6 lg:px-8 lg:pt-10 lg:pb-8" style={{background:'linear-gradient(180deg, #E1F5EE 0%, #f9fafb 100%)'}}>
        <div className="lg:grid lg:grid-cols-[minmax(0,1.2fr)_360px] lg:gap-8 lg:items-center">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <img src="/brand-mark.svg" alt="FishTrace" className="w-12 h-12 rounded-2xl shadow-sm" />
              <span className="text-xs font-semibold px-3 py-1 rounded-full text-white" style={{backgroundColor:'#1D9E75'}}>
                🌊 Bloc Innovation · CESI FISA INFO A4
              </span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mt-3 leading-tight">
              Scannez.<br />
              <span style={{color:'#1D9E75'}}>Choisissez.</span><br />
              Agissez.
            </h1>
            <p className="text-sm lg:text-base font-semibold mt-3" style={{color:'#0F6E56'}}>
              Scannez la mer. Soutenez les artisans.
            </p>
            <p className="text-gray-500 mt-3 text-sm lg:text-base leading-relaxed max-w-2xl">
              FishTrace analyse la durabilité de votre poisson en 2 secondes et vous connecte directement aux pêcheurs artisanaux de votre région.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Link to="/scan" className="btn-primary text-center sm:w-auto">
                📷 Scanner un poisson
              </Link>
              <Link to="/mission" className="btn-secondary text-center sm:w-auto">
                Découvrir la mission
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6 lg:mt-0">
            {[
              { n: IMPACT_STATS.scans.toLocaleString('fr'), l:'scans' },
              { n: IMPACT_STATS.artisans, l:'artisans' },
              { n: IMPACT_STATS.users.toLocaleString('fr'), l:'utilisateurs' },
            ].map(s => (
              <div key={s.l} className="bg-white rounded-xl p-3 text-center border border-gray-100">
                <div className="text-lg font-bold" style={{color:'#1D9E75'}}>{s.n}</div>
                <div className="text-xs text-gray-400">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-2 lg:px-8">
        <ImpactDashboard
          title="Dashboard d'impact"
          subtitle="Compteurs animés pour la soutenance MaréeForce"
        />
      </section>

      <section className="px-5 py-6 lg:px-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Comment ça marche ?</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {steps.map(s => (
            <div key={s.n} className="card flex gap-4 items-start">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{backgroundColor:'#1D9E75'}}>
                {s.n}
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">{s.icon} {s.title}</div>
                <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <Link to="/scan" className="btn-primary mt-4 text-center md:w-auto">
          Essayer maintenant →
        </Link>
      </section>

      <section className="px-5 py-6 lg:px-8" style={{backgroundColor:'#0F6E56'}}>
        <h2 className="text-lg font-bold text-white mb-1">La crise, en chiffres</h2>
        <p className="text-xs mb-4" style={{color:'#9FE1CB'}}>La pêche industrielle détruit l'artisanat français</p>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
          {stats.map(s => (
            <div key={s.value} className="rounded-2xl p-3" style={{backgroundColor:'rgba(255,255,255,0.1)'}}>
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-xs mt-1 leading-tight" style={{color:'#9FE1CB'}}>{s.label}</div>
              <div className="text-xs mt-1 opacity-60 text-white">{s.source}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-6 lg:px-8">
        <h2 className="text-lg font-bold text-gray-900 mb-1">MaréeForce en 3 piliers</h2>
        <p className="text-xs text-gray-400 mb-4">L'unique agence d'impact à approche intégrée</p>
        <div className="grid gap-3 lg:grid-cols-3">
          {pillars.map(p => (
            <div key={p.title} className="card flex gap-3 items-start">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{backgroundColor:p.color}}>
                {p.icon}
              </div>
              <div>
                <div className="font-semibold text-sm" style={{color:p.textColor}}>{p.title}</div>
                <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 pb-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl p-5" style={{backgroundColor:'#E1F5EE', borderLeft:'4px solid #1D9E75'}}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{backgroundColor:'#9FE1CB'}}>
                🎣
              </div>
              <div>
                <div className="font-semibold text-sm" style={{color:'#085041'}}>Marco Ferreira</div>
                <div className="text-xs" style={{color:'#1D9E75'}}>Pêcheur artisan · Douarnenez, Bretagne</div>
              </div>
            </div>
            <p className="text-sm italic leading-relaxed" style={{color:'#085041'}}>
              "Avant FishTrace, je bradais mon poisson à des grossistes. Maintenant mes clients savent exactement d'où il vient, et mes revenus ont augmenté de <strong>+34%</strong>."
            </p>
            <Link to="/pecheur/marco-ferreira" className="text-xs font-semibold mt-3 block" style={{color:'#1D9E75'}}>
              Voir son profil →
            </Link>
          </div>

          <div className="rounded-2xl p-5 text-center" style={{backgroundColor:'#085041'}}>
            <div className="text-2xl mb-2">🐟</div>
            <h3 className="font-bold text-white text-base mb-1">Accédez aux alternatives durables</h3>
            <p className="text-xs mb-4" style={{color:'#9FE1CB'}}>4€/mois · Sans engagement · Annulation à tout moment</p>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link to="/abonnement" className="inline-block bg-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors hover:bg-gray-100 sm:w-auto" style={{color:'#0F6E56'}}>
                Voir les offres →
              </Link>
              <Link to="/historique" className="inline-block text-sm font-semibold px-6 py-2.5 rounded-xl border border-white/15 text-white sm:w-auto">
                Voir l'historique local
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
