import { Link } from 'react-router-dom'

const options = [
  {
    to: '/scan',
    icon: '📷',
    title: 'Consommateurs',
    text: 'Scanner un QR MaréeForce et comprendre simplement le produit.',
    price: 'Scan gratuit · Premium 4€/mois',
    primary: true,
  },
  {
    to: '/artisan',
    icon: '🎣',
    title: 'Artisans',
    text: 'Vendre mieux, gagner en visibilité et générer des QR de traçabilité.',
    price: 'Premium 4€/mois + commission',
  },
  {
    to: '/restaurateur',
    icon: '🍽️',
    title: 'Restaurateurs',
    text: 'Afficher un label éco-responsable et prouver l’origine des poissons en salle.',
    price: 'Pro 10€/mois',
  },
]

export default function Landing() {
  return (
    <div className="min-h-[calc(100vh-120px)] px-4 py-8 sm:px-6 lg:px-8 flex items-center">
      <section className="w-full max-w-5xl mx-auto rounded-[36px] overflow-hidden bg-white border border-gray-100">
        <div className="p-6 sm:p-10 text-center" style={{ background: 'linear-gradient(135deg, #E1F5EE 0%, #ffffff 78%)' }}>
          <img src="/brand-mark.svg" alt="MaréeForce" className="w-20 h-20 rounded-3xl shadow-sm mx-auto" />
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mt-5">MaréeForce</h1>
          <p className="text-lg font-semibold mt-2" style={{ color: '#0F6E56' }}>
            Scannez la mer. Soutenez les artisans.
          </p>
          <p className="text-sm sm:text-base text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
            MaréeForce rend les produits de la mer plus transparents : les consommateurs vérifient l’origine, les artisans vendent plus justement, les restaurants prouvent leur engagement.
          </p>

          <div className="grid gap-3 mt-8 lg:grid-cols-3">
            {options.map(option => (
              <Link
                key={option.to}
                to={option.to}
                className="rounded-[28px] p-5 text-left border-2 transition-transform hover:-translate-y-0.5"
                style={option.primary
                  ? { backgroundColor: '#0F6E56', color: 'white', borderColor: '#0F6E56' }
                  : { backgroundColor: '#F7FCFA', color: '#085041', borderColor: '#D5F4EA' }}
              >
                <div className="text-3xl">{option.icon}</div>
                <div className="font-bold text-xl mt-4">{option.title}</div>
                <p className={`text-sm mt-2 leading-relaxed ${option.primary ? '' : 'text-gray-600'}`} style={option.primary ? { color: '#D5F4EA' } : {}}>
                  {option.text}
                </p>
                <div className="text-xs font-bold mt-4 px-3 py-1.5 rounded-full inline-flex" style={option.primary ? { backgroundColor: 'rgba(255,255,255,0.14)', color: 'white' } : { backgroundColor: '#E1F5EE', color: '#0F6E56' }}>
                  {option.price}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
