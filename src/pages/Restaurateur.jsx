import { Link } from 'react-router-dom'
import ImpactDashboard from '../components/ImpactDashboard'
import ProQrGenerator from '../components/ProQrGenerator'
import { useSubscription } from '../hooks/useSubscription'

const labelSteps = [
  'Carte avec produits tracés MaréeForce',
  'QR menu consultable par les clients',
  'Mise en avant des artisans partenaires',
  'Rapport impact mensuel pour la communication',
]

export default function Restaurateur() {
  const { isPro, activatePlan } = useSubscription()

  return (
    <div className="flex flex-col gap-5 px-4 pt-5 pb-6 sm:px-6 lg:px-8">
      <section className="rounded-[32px] overflow-hidden bg-white border border-gray-100">
        <div className="grid lg:grid-cols-[minmax(0,1.05fr)_380px]">
          <div className="p-5 sm:p-7" style={{ background: 'linear-gradient(135deg, #2F4F3E 0%, #0F6E56 62%, #1D9E75 100%)' }}>
            <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#9FE1CB' }}>
              Vue restaurateur · label éco-responsable
            </div>
            <h1 className="text-2xl lg:text-4xl font-bold text-white mt-3 leading-tight">
              Prouver une carte responsable avec un QR client.
            </h1>
            <p className="text-sm lg:text-base mt-3 leading-relaxed max-w-2xl" style={{ color: '#D5F4EA' }}>
              Le plan Pro est réservé aux restaurateurs qui veulent afficher un label éco-responsable, relier leur carte aux artisans et rassurer les clients en salle.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button onClick={() => activatePlan('pro')} className="btn-primary sm:w-auto">
                Passer au Pro 10€/mois
              </button>
              <Link to="/abonnement" className="btn-secondary bg-white/5 border-white/20 text-white hover:bg-white/10 sm:w-auto">
                Voir les offres
              </Link>
            </div>
          </div>

          <div className="p-5 sm:p-7 bg-white">
            <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#1D9E75' }}>
              Label MaréeForce
            </div>
            <h2 className="font-bold text-gray-900 text-xl mt-2">Restaurant éco-responsable</h2>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Un badge simple à afficher sur la carte, avec la preuve produit derrière chaque poisson.
            </p>
            <div className="grid gap-2 mt-5">
              {labelSteps.map(step => (
                <div key={step} className="rounded-2xl bg-gray-50 p-3 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs" style={{ backgroundColor: '#1D9E75' }}>
                    ✓
                  </span>
                  <span className="text-sm font-semibold text-gray-800">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)] lg:items-start">
        <ImpactDashboard
          title="Impact restaurant"
          subtitle="Des preuves simples pour valoriser les choix responsables auprès des clients"
        />

        <ProQrGenerator
          fishermanName="Marco Ferreira"
          productName="Maquereau de ligne · menu du jour"
          location="Douarnenez → Restaurant partenaire"
          locked={!isPro}
          onUnlock={() => activatePlan('pro')}
        />
      </section>
    </div>
  )
}
