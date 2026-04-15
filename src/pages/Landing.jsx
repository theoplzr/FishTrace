import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="min-h-[calc(100vh-120px)] px-4 py-8 sm:px-6 lg:px-8 flex items-center">
      <section className="w-full rounded-[36px] overflow-hidden bg-white border border-gray-100">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="p-6 sm:p-10 lg:p-12" style={{ background: 'linear-gradient(135deg, #E1F5EE 0%, #ffffff 70%)' }}>
            <img src="/brand-mark.svg" alt="MaréeForce" className="w-16 h-16 rounded-3xl shadow-sm" />
            <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mt-6 leading-tight">
              MaréeForce
            </h1>
            <p className="text-lg font-semibold mt-2" style={{ color: '#0F6E56' }}>
              Scannez la mer. Soutenez les artisans.
            </p>
            <p className="text-sm sm:text-base text-gray-600 mt-4 max-w-xl leading-relaxed">
              Choisissez votre espace pour accéder directement aux fonctionnalités utiles. Pas de parcours compliqué : consommateur, artisan ou restaurateur.
            </p>

            <div className="grid gap-3 mt-8 lg:grid-cols-3">
              <Link to="/scan" className="rounded-[28px] p-5 text-left transition-transform hover:-translate-y-0.5" style={{ backgroundColor: '#0F6E56', color: 'white' }}>
                <div className="text-3xl">📷</div>
                <div className="font-bold text-xl mt-4">Consommateur</div>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: '#D5F4EA' }}>
                  Scan gratuit, puis Premium à 4€/mois.
                </p>
              </Link>

              <Link to="/artisan" className="rounded-[28px] p-5 text-left border-2 transition-transform hover:-translate-y-0.5" style={{ borderColor: '#1D9E75', color: '#085041', backgroundColor: '#F7FCFA' }}>
                <div className="text-3xl">🎣</div>
                <div className="font-bold text-xl mt-4">Artisan</div>
                <p className="text-sm mt-2 leading-relaxed text-gray-600">
                  Premium 4€/mois + commission à la vente.
                </p>
              </Link>

              <Link to="/restaurateur" className="rounded-[28px] p-5 text-left border-2 transition-transform hover:-translate-y-0.5" style={{ borderColor: '#2F4F3E', color: '#2F4F3E', backgroundColor: '#FAF7EF' }}>
                <div className="text-3xl">🍽️</div>
                <div className="font-bold text-xl mt-4">Restaurateur</div>
                <p className="text-sm mt-2 leading-relaxed text-gray-600">
                  Pro 10€/mois avec label éco-responsable.
                </p>
              </Link>
            </div>
          </div>

          <div className="p-6 sm:p-10 flex flex-col justify-between" style={{ backgroundColor: '#085041' }}>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#9FE1CB' }}>
                Exemple traçabilité
              </div>
              <div className="rounded-[28px] bg-white/10 p-5 mt-4">
                <div className="text-sm" style={{ color: '#9FE1CB' }}>Produit</div>
                <div className="text-2xl font-bold text-white mt-1">Maquereau de ligne</div>
                <div className="text-sm mt-3" style={{ color: '#D5F4EA' }}>Pêché par Marco Ferreira · Douarnenez</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-8">
              {[
                { n: 'A', l: 'score' },
                { n: '0', l: 'intermédiaire' },
                { n: 'QR', l: 'preuve' },
              ].map(stat => (
                <div key={stat.l} className="rounded-2xl p-3 bg-white/10 text-center">
                  <div className="text-xl font-bold text-white">{stat.n}</div>
                  <div className="text-[11px]" style={{ color: '#9FE1CB' }}>{stat.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
