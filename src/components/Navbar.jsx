import { Link, useLocation } from 'react-router-dom'
import { useSubscription } from '../hooks/useSubscription'

const NAV_ITEMS = [
  { to: '/', label: 'Accueil' },
  { to: '/historique', label: 'Historique' },
  { to: '/artisan', label: 'Artisan' },
  { to: '/mission', label: 'Mission' },
  { to: '/abonnement', label: 'Offres' },
  { to: '/demo', label: 'Démo' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const { tier } = useSubscription()
  const planLabel = tier === 'pro' ? 'Pro 10€' : tier === 'freemium' ? 'Premium 4€' : 'Gratuit'

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="site-shell py-3">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 min-w-0">
            <img src="/brand-mark.svg" alt="FishTrace" className="w-9 h-9 rounded-xl" />
            <div className="min-w-0">
              <span className="font-bold text-gray-900 text-sm block">FishTrace</span>
              <div className="text-gray-400 text-[11px] leading-tight hidden sm:block">Scan consommateur + preuve artisan.</div>
            </div>
          </Link>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/scan"
              className="text-sm font-semibold px-4 py-2.5 rounded-2xl text-white transition-colors"
              style={{ backgroundColor: '#1D9E75' }}
            >
              Scanner
            </Link>
            <div className="hidden lg:inline-flex text-xs font-semibold px-3 py-2 rounded-xl border-2 transition-colors hover:bg-teal-50" style={{borderColor:'#1D9E75', color:'#0F6E56'}}>
              {planLabel}
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide">
          {NAV_ITEMS.map(item => {
            const isActive = pathname === item.to

            return (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-2xl px-4 py-2.5 text-sm font-medium transition-colors whitespace-nowrap"
                style={isActive
                  ? { backgroundColor: '#1D9E75', color: 'white' }
                  : { backgroundColor: '#F5F7F8', color: '#374151' }}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
