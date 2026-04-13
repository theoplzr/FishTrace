import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{backgroundColor:'#1D9E75'}}>
            FT
          </div>
          <div>
            <span className="font-bold text-gray-900 text-sm">FishTrace</span>
            <span className="text-gray-400 text-xs ml-1.5 hidden sm:inline">by MaréeForce</span>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          {pathname !== '/scan' && (
            <Link to="/scan" className="text-white text-xs font-semibold px-3 py-2 rounded-xl transition-colors" style={{backgroundColor:'#1D9E75'}}>
              Scanner
            </Link>
          )}
          <Link to="/abonnement" className="text-xs font-semibold px-3 py-2 rounded-xl border-2 transition-colors hover:bg-teal-50" style={{borderColor:'#1D9E75', color:'#0F6E56'}}>
            4€/mois
          </Link>
        </div>
      </div>
    </nav>
  )
}
