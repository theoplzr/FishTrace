import { Link } from 'react-router-dom'
import { useScanHistory } from '../hooks/useScanHistory'
import { useSubscription } from '../hooks/useSubscription'

function formatDate(date) {
  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date))
}

export default function Historique() {
  const { history, clearHistory } = useScanHistory()
  const { isSubscribed } = useSubscription()
  const visibleHistory = isSubscribed ? history : history.slice(0, 1)
  const lockedCount = history.length - visibleHistory.length

  if (history.length === 0) {
    return (
      <div className="px-4 pt-6 flex flex-col gap-4 sm:px-6 lg:px-8">
        <div className="card text-center py-10">
          <div className="text-4xl mb-3">🕘</div>
          <h1 className="font-bold text-gray-900 text-lg">Aucun scan enregistré</h1>
          <p className="text-sm text-gray-500 mt-2">
            Votre historique local apparaîtra ici après votre premier scan.
          </p>
        </div>
        <Link to="/scan" className="btn-primary md:w-auto">Scanner un produit</Link>
      </div>
    )
  }

  return (
    <div className="px-4 pt-5 pb-2 flex flex-col gap-4 sm:px-6 lg:px-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Historique des scans</h1>
          <p className="text-sm text-gray-500 mt-1">
            Sauvegardé en local sur cet appareil.
          </p>
        </div>
        <button onClick={clearHistory} className="text-xs font-semibold px-3 py-2 rounded-xl border border-gray-200 text-gray-500">
          Vider
        </button>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {visibleHistory.map(entry => (
          <Link key={entry.id} to={`/resultat/${entry.productId}`} className="card flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ backgroundColor: '#E1F5EE' }}>
              {entry.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-gray-900">{entry.name}</span>
                <span className="text-xs px-2 py-0.5 rounded-full text-white font-bold" style={{ backgroundColor: entry.score === 'A' ? '#1D9E75' : entry.score === 'D' ? '#D85A30' : '#A32D2D' }}>
                  {entry.score}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{entry.brand} · {entry.origin}</p>
              <p className="text-xs text-gray-400 mt-2">{formatDate(entry.scannedAt)}</p>
            </div>
            <span className="text-sm text-gray-300">→</span>
          </Link>
        ))}
      </div>

      {!isSubscribed && lockedCount > 0 && (
        <div className="card" style={{ backgroundColor: '#085041' }}>
          <div className="text-center">
            <div className="text-2xl mb-2">🔒</div>
            <h2 className="font-bold text-white text-sm">Historique complet réservé au Freemium</h2>
            <p className="text-xs mt-2 leading-relaxed" style={{ color: '#9FE1CB' }}>
              {lockedCount} scan{lockedCount > 1 ? 's' : ''} supplémentaire{lockedCount > 1 ? 's' : ''} sont bien enregistrés en local, mais masqués en plan gratuit.
            </p>
            <Link to="/abonnement" className="inline-block mt-4 bg-white font-semibold text-sm px-5 py-2.5 rounded-xl" style={{ color: '#0F6E56' }}>
              Débloquer l'historique
            </Link>
          </div>
        </div>
      )}

      <Link to="/scan" className="btn-secondary md:w-auto">Scanner un autre produit</Link>
    </div>
  )
}
