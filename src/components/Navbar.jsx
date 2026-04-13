import { Link, useLocation } from 'react-router-dom'
import { useSubscription } from '../hooks/useSubscription'

export default function Navbar() {
  const { pathname } = useLocation()
  const { tier } = useSubscription()
  const planLabel = tier === 'pro' ? 'Pro' : tier === 'freemium' ? 'Premium' : '4€/mois'

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src="/brand-mark.svg" alt="FishTrace" className="w-9 h-9 rounded-xl" />
          <div>
            <span className="font-bold text-gray-900 text-sm">FishTrace</span>
            <div className="text-gray-400 text-[11px] leading-tight hidden sm:block">by MaréeForce · Scannez la mer.</div>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/historique" className="text-gray-500 text-xs font-semibold px-3 py-2 rounded-xl border border-gray-200">
            🕘
          </Link>
          {pathname !== '/scan' && (
            <Link to="/scan" className="text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors" style={{backgroundColor:'#1D9E75'}}>
              Scanner
            </Link>
          )}
          <Link to="/abonnement" className="text-xs font-semibold px-3 py-2 rounded-xl border-2 transition-colors hover:bg-teal-50" style={{borderColor:'#1D9E75', color:'#0F6E56'}}>
            {planLabel}
          </Link>
        </div>
      </div>
    </nav>
  )
}
