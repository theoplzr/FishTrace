import { Link } from 'react-router-dom'

const qrCases = [
  {
    title: 'Maquereau de ligne',
    subtitle: 'Pêché par Marco Ferreira · Douarnenez',
    href: '/trace/marco-ferreira?product=maquereau-marco',
    score: 'A',
  },
  {
    title: 'Bar de ligne',
    subtitle: 'Pêché par Sylvie Kernevez · Saint-Malo',
    href: '/trace/sylvie-kernevez?product=bar-sylvie',
    score: 'A',
  },
]

function getQrImageUrl(path) {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const url = `${origin}${path}`
  return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=10&data=${encodeURIComponent(url)}`
}

export default function Scanner() {
  return (
    <div className="px-4 pt-5 pb-6 sm:px-6 lg:px-8">
      <section className="rounded-[32px] p-5 sm:p-8" style={{ background: 'linear-gradient(135deg, #E1F5EE 0%, #ffffff 82%)' }}>
        <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#1D9E75' }}>
          Vue consommateurs
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mt-2">Scanner un QR MaréeForce</h1>
        <p className="text-sm text-gray-600 mt-3 leading-relaxed max-w-2xl">
          Pour la présentation, deux QR sont déjà prêts. Cliquez sur un produit pour simuler le scan et afficher sa fiche de traçabilité.
        </p>
      </section>

      <div className="grid gap-4 mt-5 lg:grid-cols-2">
        {qrCases.map(item => (
          <Link key={item.href} to={item.href} className="card transition-transform hover:-translate-y-0.5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#1D9E75' }}>
                  QR prêt à scanner
                </div>
                <h2 className="text-xl font-bold text-gray-900 mt-2">{item.title}</h2>
                <p className="text-sm text-gray-500 mt-1">{item.subtitle}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl font-bold" style={{ backgroundColor: '#1D9E75' }}>
                {item.score}
              </div>
            </div>
            <div className="mt-5 rounded-3xl p-4 text-center" style={{ backgroundColor: '#F5F7F8' }}>
              <img src={getQrImageUrl(item.href)} alt={`QR ${item.title}`} className="w-36 h-36 rounded-2xl bg-white mx-auto" />
              <div className="text-sm font-semibold text-gray-900 mt-2">Cliquer pour lire le QR</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="rounded-[28px] p-5 mt-5" style={{ backgroundColor: '#085041' }}>
        <h2 className="font-bold text-white">Abonnement Premium</h2>
        <p className="text-sm mt-2 leading-relaxed" style={{ color: '#9FE1CB' }}>
          Le scan simple affiche le produit, sa provenance et le pêcheur. Pour 4€/mois, le consommateur débloque plus de détails, l’historique, les avis, les alternatives, les goodies et la newsletter.
        </p>
        <Link to="/abonnement/consommateur" className="inline-block mt-4 bg-white font-semibold text-sm px-5 py-2.5 rounded-xl" style={{ color: '#0F6E56' }}>
          Voir Premium 4€/mois
        </Link>
      </div>
    </div>
  )
}
