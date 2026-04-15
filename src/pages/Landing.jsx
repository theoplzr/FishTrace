import { Link } from 'react-router-dom'
import { IMPACT_STATS } from '../data/mockData'

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

const audienceCards = [
  {
    name: 'Consommateur',
    role: 'Achat responsable',
    title: 'Je veux acheter du poisson sans me faire avoir par les labels.',
    desc: 'Scannez un produit, comprenez son score, puis trouvez une alternative artisanale près de vous.',
    cta: 'Scanner un produit',
    to: '/scan',
    color: '#E1F5EE',
    icon: '📷',
  },
  {
    name: 'Artisan',
    role: 'Vente directe',
    title: 'Je veux vendre mieux ma pêche et prouver mon travail.',
    desc: 'Publiez vos lots du jour, recevez des demandes directes et générez un QR de traçabilité.',
    cta: 'Ouvrir l’espace artisan',
    to: '/artisan',
    color: '#FAEEDA',
    icon: '🎣',
  },
]

const differentiators = [
  { title: 'Avant achat', desc: 'Scan en rayon, score A-F et alerte greenwashing sur les produits déjà devant vous.' },
  { title: 'Après scan', desc: 'Alternatives locales reliées à de vrais profils artisans, pas seulement un guide théorique.' },
  { title: 'Côté artisan', desc: 'QR traçabilité, demandes directes et preuve de méthode pour valoriser le prix juste.' },
]

export default function Landing() {
  return (
    <div className="flex flex-col">
      <section className="px-5 pt-8 pb-6 lg:px-8 lg:pt-10 lg:pb-8" style={{background:'linear-gradient(180deg, #E1F5EE 0%, #f9fafb 100%)'}}>
        <div className="lg:grid lg:grid-cols-[minmax(0,1.2fr)_360px] lg:gap-8 lg:items-center">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <img src="/brand-mark.svg" alt="FishTrace" className="w-12 h-12 rounded-2xl shadow-sm" />
              <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: '#D7F3EA', color: '#0F6E56' }}>
                Gratuit pour commencer
              </span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mt-3 leading-tight">
              Deux vues.<br />
              <span style={{color:'#1D9E75'}}>Un même objectif.</span><br />
              Mieux choisir la mer.
            </h1>
            <p className="text-sm lg:text-base font-semibold mt-3" style={{color:'#0F6E56'}}>
              FishTrace pour les consommateurs. MaréeForce pour les artisans.
            </p>
            <p className="text-gray-500 mt-3 text-sm lg:text-base leading-relaxed max-w-2xl">
              L’app répond à deux besoins simples : côté consommateur, comprendre ce qu’on achète ; côté artisan, prouver la pêche et capter plus de valeur en direct.
            </p>
            <div className="mt-4 rounded-2xl p-4 bg-white/80 border border-white">
              <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#1D9E75' }}>
                Commencez selon votre besoin
              </div>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                Si vous êtes consommateur, lancez un scan. Si vous êtes artisan, ouvrez l’espace professionnel pour créer une preuve de traçabilité et vendre plus directement.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Link to="/scan" className="btn-primary text-center sm:w-auto">
                📷 Scanner un poisson
              </Link>
              <Link to="/mission" className="btn-secondary text-center sm:w-auto">
                Notre mission
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 mt-3 text-xs text-gray-500">
              <span className="px-3 py-1.5 rounded-full bg-white border border-gray-100">Scan consommateur</span>
              <span className="px-3 py-1.5 rounded-full bg-white border border-gray-100">Espace artisan</span>
              <span className="px-3 py-1.5 rounded-full bg-white border border-gray-100">Premium 4€ · Pro 10€</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 lg:mt-0">
            {[
              { n: IMPACT_STATS.scans.toLocaleString('fr'), l:'scans' },
              { n: IMPACT_STATS.artisans, l:'artisans' },
              { n: `${IMPACT_STATS.kg_saved.toLocaleString('fr')} kg`, l:'surpêche évitée' },
              { n: IMPACT_STATS.users.toLocaleString('fr'), l:'consommateurs engagés' },
            ].map(s => (
              <div key={s.l} className="bg-white rounded-xl p-3 text-center border border-gray-100">
                <div className="text-lg font-bold" style={{color:'#1D9E75'}}>{s.n}</div>
                <div className="text-xs text-gray-400">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-6 lg:px-8">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Choisissez votre vue</h2>
        <p className="text-sm text-gray-500 mb-4">La navigation est volontairement simple : une entrée pour acheter mieux, une entrée pour vendre mieux.</p>
        <div className="grid gap-4 lg:grid-cols-2">
          {audienceCards.map(card => (
            <div key={card.name} className="rounded-[28px] p-5 border border-gray-100 bg-white">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ backgroundColor: card.color }}>
                  {card.icon}
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#1D9E75' }}>
                    {card.name} · {card.role}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mt-1 leading-snug">{card.title}</h3>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">{card.desc}</p>
                </div>
              </div>
              <Link to={card.to} className="btn-primary mt-5">
                {card.cta}
              </Link>
            </div>
          ))}
        </div>
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
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Link to="/scan" className="btn-primary text-center md:w-auto">
            Essayer maintenant →
          </Link>
          <Link to="/historique" className="btn-secondary text-center md:w-auto">
            Voir mes scans
          </Link>
        </div>
      </section>

      <section className="px-5 py-6 lg:px-8 bg-white">
        <h2 className="text-lg font-bold text-gray-900 mb-1">Ce qui différencie FishTrace</h2>
        <p className="text-sm text-gray-500 mb-4">
          Poiscaille rend le circuit court accessible via un casier. FishTrace se positionne avant et après l’achat : diagnostic, preuve et redirection vers l’artisan.
        </p>
        <div className="grid gap-3 lg:grid-cols-3">
          {differentiators.map(item => (
            <div key={item.title} className="card">
              <div className="font-semibold text-sm" style={{ color: '#0F6E56' }}>{item.title}</div>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
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
            <Link to="/artisan" className="text-xs font-semibold mt-2 block" style={{color:'#0F6E56'}}>
              Ouvrir l’espace artisan →
            </Link>
          </div>

          <div className="rounded-2xl p-5 text-center" style={{backgroundColor:'#085041'}}>
            <div className="text-2xl mb-2">🐟</div>
            <h3 className="font-bold text-white text-base mb-1">Besoin d'aller plus loin ?</h3>
            <p className="text-xs mb-4" style={{color:'#9FE1CB'}}>Le scan est gratuit. Les offres servent à débloquer plus d'alternatives, l'historique complet et le plan Pro.</p>
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
