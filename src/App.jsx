import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Scanner from './pages/Scanner'
import Resultat from './pages/Resultat'
import Alternatives from './pages/Alternatives'
import ProfilPecheur from './pages/ProfilPecheur'
import Abonnement from './pages/Abonnement'
import Mission from './pages/Mission'
import Historique from './pages/Historique'
import EspaceArtisan from './pages/EspaceArtisan'
import Demo from './pages/Demo'
import { SubscriptionProvider } from './hooks/useSubscription'
import { ScanHistoryProvider } from './hooks/useScanHistory'
import { DemoModeProvider } from './hooks/useDemoMode'

export default function App() {
  return (
    <SubscriptionProvider>
      <ScanHistoryProvider>
        <DemoModeProvider>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1 pb-8">
                <div className="page-shell">
                  <Routes>
                    <Route path="/"                 element={<Landing />} />
                    <Route path="/scan"             element={<Scanner />} />
                    <Route path="/resultat/:id"     element={<Resultat />} />
                    <Route path="/alternatives/:id" element={<Alternatives />} />
                    <Route path="/pecheur/:id"      element={<ProfilPecheur />} />
                    <Route path="/abonnement"       element={<Abonnement />} />
                    <Route path="/mission"          element={<Mission />} />
                    <Route path="/historique"       element={<Historique />} />
                    <Route path="/artisan"          element={<EspaceArtisan />} />
                    <Route path="/demo"             element={<Demo />} />
                  </Routes>
                </div>
              </main>
            </div>
          </BrowserRouter>
        </DemoModeProvider>
      </ScanHistoryProvider>
    </SubscriptionProvider>
  )
}
