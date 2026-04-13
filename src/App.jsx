import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Scanner from './pages/Scanner'
import Resultat from './pages/Resultat'
import Alternatives from './pages/Alternatives'
import ProfilPecheur from './pages/ProfilPecheur'
import Abonnement from './pages/Abonnement'

export default function App() {
  return (
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
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
