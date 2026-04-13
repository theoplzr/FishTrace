import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Scanner from './pages/Scanner'
import Resultat from './pages/Resultat'
import Alternatives from './pages/Alternatives'
import ProfilPecheur from './pages/ProfilPecheur'
import Abonnement from './pages/Abonnement'
import Mission from './pages/Mission'
import Historique from './pages/Historique'
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
                <Routes>
                  <Route path="/"                 element={<Landing />} />
                  <Route path="/scan"             element={<Scanner />} />
                  <Route path="/resultat/:id"     element={<Resultat />} />
                  <Route path="/alternatives/:id" element={<Alternatives />} />
                  <Route path="/pecheur/:id"      element={<ProfilPecheur />} />
                  <Route path="/abonnement"       element={<Abonnement />} />
                  <Route path="/mission"          element={<Mission />} />
                  <Route path="/historique"       element={<Historique />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </DemoModeProvider>
      </ScanHistoryProvider>
    </SubscriptionProvider>
  )
}
