import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PRODUCTS } from '../data/mockData'

const DEMO_PRODUCTS = PRODUCTS.filter(p => ['saumon-msc-chili','thon-boite'].includes(p.id))

export default function Scanner() {
  const videoRef = useRef(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraError, setCameraError] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [showDemo, setShowDemo] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    startCamera()
    return () => stopCamera()
  }, [])

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
      }
    } catch {
      setCameraError(true)
    }
  }

  function stopCamera() {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(t => t.stop())
    }
  }

  function simulateScan(productId) {
    setScanning(true)
    setShowDemo(false)
    setTimeout(() => {
      stopCamera()
      navigate(`/resultat/${productId}`)
    }, 1800)
  }

  return (
    <div className="flex flex-col min-h-screen bg-black">

      {/* Scanning area */}
      <div className="relative flex-1 flex items-center justify-center" style={{minHeight:'60vh'}}>
        {cameraActive && (
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover absolute inset-0" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Corner frame */}
          <div className="relative w-56 h-56">
            {[['top-0 left-0','border-t-4 border-l-4'],['top-0 right-0','border-t-4 border-r-4'],['bottom-0 left-0','border-b-4 border-l-4'],['bottom-0 right-0','border-b-4 border-r-4']].map(([pos,border],i)=>(
              <div key={i} className={`absolute w-8 h-8 ${pos} ${border} rounded-sm`} style={{borderColor:'#1D9E75'}} />
            ))}
            {/* Scan line animated */}
            {!scanning && (
              <div className="absolute left-2 right-2 h-0.5 scan-line" style={{backgroundColor:'#1D9E75', top:'50%', boxShadow:'0 0 6px #1D9E75', animation:'scanline 2s ease-in-out infinite'}} />
            )}
            {scanning && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-4 border-white border-t-transparent animate-spin" />
              </div>
            )}
          </div>

          {!scanning && (
            <p className="text-white text-sm mt-4 opacity-80">
              {cameraError ? '📷 Caméra non disponible' : 'Pointez vers un code-barre'}
            </p>
          )}
          {scanning && (
            <p className="text-white text-sm mt-4" style={{color:'#9FE1CB'}}>Analyse en cours...</p>
          )}
        </div>
      </div>

      {/* Bottom sheet */}
      <div className="bg-white rounded-t-3xl p-5 shadow-2xl">
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />

        {!scanning && !showDemo && (
          <>
            <h2 className="font-bold text-gray-900 text-base mb-1">Scanner un produit</h2>
            <p className="text-xs text-gray-400 mb-4">Ou choisissez un produit de démonstration ci-dessous</p>
            <button onClick={() => setShowDemo(true)} className="btn-primary">
              🎬 Lancer la démo soutenance
            </button>
            {cameraError && (
              <p className="text-xs text-center text-gray-400 mt-3">
                La caméra n'est pas accessible. Utilisez la démo ci-dessus.
              </p>
            )}
          </>
        )}

        {showDemo && (
          <>
            <h2 className="font-bold text-gray-900 text-base mb-3">Choisir un produit à scanner</h2>
            <div className="flex flex-col gap-2">
              {DEMO_PRODUCTS.map(p => (
                <button
                  key={p.id}
                  onClick={() => simulateScan(p.id)}
                  className="flex items-center gap-3 p-3 rounded-2xl border-2 border-gray-100 hover:border-teal-200 transition-colors text-left w-full"
                >
                  <span className="text-2xl">{p.emoji}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-gray-900">{p.name}</div>
                    <div className="text-xs text-gray-400">{p.brand} · {p.origin}</div>
                  </div>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold" style={{backgroundColor: p.score === 'D' ? '#D85A30' : '#A32D2D'}}>
                    {p.score}
                  </div>
                </button>
              ))}
              <button onClick={() => setShowDemo(false)} className="text-sm text-gray-400 mt-1 hover:text-gray-600">
                ← Retour
              </button>
            </div>
          </>
        )}

        {scanning && (
          <div className="text-center py-2">
            <p className="font-semibold text-gray-900">Analyse FishTrace en cours…</p>
            <p className="text-xs text-gray-400 mt-1">Vérification IFREMER · Calcul du score · Recherche alternatives</p>
          </div>
        )}
      </div>

      <style>{`@keyframes scanline { 0%,100%{top:10%} 50%{top:85%} }`}</style>
    </div>
  )
}
