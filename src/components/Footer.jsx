import { Link } from 'react-router-dom'
import { useSubscription } from '../hooks/useSubscription'

export default function Footer() {
  const { tier } = useSubscription()
  const tierLabel = tier === 'pro' ? 'Plan Pro actif' : tier === 'freemium' ? 'Plan Freemium actif' : 'Plan Gratuit'

  return (
    <footer className="mt-8 border-t border-gray-100 bg-white">
      <div className="site-shell py-6 flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="font-bold text-sm text-gray-900">FishTrace by MaréeForce</div>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              Scannez la mer. Soutenez les artisans.
            </p>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: '#E1F5EE', color: '#0F6E56' }}>
            {tierLabel}
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
          <Link to="/scan" className="rounded-xl bg-gray-50 px-3 py-2 text-gray-700">Scanner</Link>
          <Link to="/historique" className="rounded-xl bg-gray-50 px-3 py-2 text-gray-700">Historique</Link>
          <Link to="/mission" className="rounded-xl bg-gray-50 px-3 py-2 text-gray-700">Notre mission</Link>
          <Link to="/abonnement" className="rounded-xl bg-gray-50 px-3 py-2 text-gray-700">Abonnement</Link>
        </div>

        <div className="text-xs text-gray-400 leading-relaxed">
          Projet scolaire CESI Nancy · Bloc Innovation · FISA INFO A4 2025–2026.
          <br />
          Démo PWA prête pour l'ajout à l'écran d'accueil.
        </div>
      </div>
    </footer>
  )
}
