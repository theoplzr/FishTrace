/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useEffectEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PRODUCTS } from '../data/mockData'
import { DEMO_STEPS, useDemoMode } from '../hooks/useDemoMode'

const DEMO_PRODUCTS = PRODUCTS.filter(product => ['saumon-msc-chili', 'thon-boite'].includes(product.id))
const ANALYSIS_STEPS = [
  { title: 'Lecture du code-barre', detail: 'Identification du produit et rapprochement catalogue.' },
  { title: 'Croisement IFREMER', detail: 'Vérification de la zone, du stock et de la méthode.' },
  { title: 'Calcul du score', detail: 'Pondération traçabilité, labels et intermédiaires.' },
  { title: 'Recherche d’alternatives', detail: 'Matching avec les artisans MaréeForce à proximité.' },
]

export default function Scanner() {
  const videoRef = useRef(null)
  const navigate = useNavigate()
  const { startDemo, goToStep, stopDemo, storyProductId } = useDemoMode()

  const [cameraActive, setCameraActive] = useState(false)
  const [cameraError, setCameraError] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [showManualDemo, setShowManualDemo] = useState(false)
  const [guidedDemoActive, setGuidedDemoActive] = useState(false)
  const [guidedStepIndex, setGuidedStepIndex] = useState(0)
  const [analysisStepIndex, setAnalysisStepIndex] = useState(0)
  const [detectedProduct, setDetectedProduct] = useState(null)

  const currentGuidedStep = DEMO_STEPS[guidedStepIndex]

  async function startCamera() {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError(true)
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
        setCameraError(false)
      }
    } catch {
      setCameraError(true)
    }
  }

  function stopCamera() {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop())
    }
  }

  function startGuidedDemo() {
    startDemo()
    setShowManualDemo(false)
    setGuidedDemoActive(true)
    setGuidedStepIndex(0)
  }

  function cancelGuidedDemo() {
    stopDemo()
    setGuidedDemoActive(false)
    setGuidedStepIndex(0)
  }

  function simulateScan(productId, { guided = false } = {}) {
    const product = PRODUCTS.find(item => item.id === productId) || null

    if (!product) return

    if (!guided) {
      stopDemo()
      setGuidedDemoActive(false)
    }

    setDetectedProduct(product)
    setAnalysisStepIndex(0)
    setScanning(true)
    setShowManualDemo(false)

    ANALYSIS_STEPS.forEach((_, index) => {
      window.setTimeout(() => {
        setAnalysisStepIndex(index)
      }, index * 650)
    })

    window.setTimeout(() => {
      stopCamera()
      if (guided) goToStep(4)
      navigate(`/resultat/${productId}`)
    }, 3200)
  }

  const playGuidedScan = useEffectEvent(() => {
    simulateScan(storyProductId, { guided: true })
  })

  useEffect(() => {
    startCamera()
    return () => stopCamera()
  }, [])

  useEffect(() => {
    if (!guidedDemoActive || scanning) return undefined

    if (guidedStepIndex >= 2) {
      const timer = window.setTimeout(() => {
        setGuidedStepIndex(3)
      }, 1700)

      return () => window.clearTimeout(timer)
    }

    const timer = window.setTimeout(() => {
      setGuidedStepIndex(currentIndex => currentIndex + 1)
    }, 1900)

    return () => window.clearTimeout(timer)
  }, [guidedDemoActive, guidedStepIndex, scanning])

  useEffect(() => {
    if (!guidedDemoActive || scanning || guidedStepIndex !== 3) return undefined

    const timer = window.setTimeout(() => {
      playGuidedScan()
    }, 1600)

    return () => window.clearTimeout(timer)
  }, [guidedDemoActive, guidedStepIndex, scanning])

  return (
    <div className="bg-black lg:my-6 lg:grid lg:min-h-[720px] lg:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.75fr)] lg:overflow-hidden lg:rounded-[32px]">
      <div className="relative flex-1 flex items-center justify-center overflow-hidden min-h-[55vh] lg:min-h-[720px]">
        {cameraActive && (
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover absolute inset-0" />
        )}

        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.46) 100%)' }} />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <div className="relative w-56 h-56">
            {[['top-0 left-0', 'border-t-4 border-l-4'], ['top-0 right-0', 'border-t-4 border-r-4'], ['bottom-0 left-0', 'border-b-4 border-l-4'], ['bottom-0 right-0', 'border-b-4 border-r-4']].map(([position, border], index) => (
              <div key={index} className={`absolute w-8 h-8 ${position} ${border} rounded-sm`} style={{ borderColor: '#1D9E75' }} />
            ))}

            {!scanning && (
              <div className="absolute left-2 right-2 h-0.5" style={{ backgroundColor: '#1D9E75', top: '50%', boxShadow: '0 0 6px #1D9E75', animation: 'scanline 2s ease-in-out infinite' }} />
            )}

            {scanning && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 rounded-[28px] border border-white/20 p-4 backdrop-blur-md text-white" style={{ backgroundColor: 'rgba(8, 80, 65, 0.55)' }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mx-auto" style={{ backgroundColor: 'rgba(159,225,203,0.22)' }}>
                    {detectedProduct?.emoji || '🐟'}
                  </div>
                  <div className="text-center mt-3">
                    <div className="text-xs uppercase tracking-[0.18em]" style={{ color: '#9FE1CB' }}>FishTrace analyse</div>
                    <div className="font-semibold text-sm mt-1">{ANALYSIS_STEPS[analysisStepIndex]?.title}</div>
                    <div className="text-[11px] leading-relaxed mt-1 text-white/75">{ANALYSIS_STEPS[analysisStepIndex]?.detail}</div>
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-white/15 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${((analysisStepIndex + 1) / ANALYSIS_STEPS.length) * 100}%`, backgroundColor: '#9FE1CB' }}
                    />
                  </div>
                  <div className="text-[11px] text-center mt-3 text-white/80">
                    Produit détecté: <span className="font-semibold text-white">{detectedProduct?.name}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {!scanning && (
            <p className="text-white text-sm mt-5 opacity-90 text-center">
              {cameraError ? 'Caméra non disponible. Utilisez l’exemple guidé ou choisissez un produit.' : 'Pointez vers un code-barre ou lancez un exemple guidé.'}
            </p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-t-3xl p-5 shadow-2xl lg:rounded-none lg:flex lg:flex-col lg:justify-center lg:px-8">
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4 lg:hidden" />

        {!scanning && !guidedDemoActive && !showManualDemo && (
          <>
            <h1 className="font-bold text-gray-900 text-base mb-1">Scanner un produit</h1>
            <p className="text-xs text-gray-400 mb-4">
              Analysez un produit en rayon ou explorez un exemple guidé pour découvrir le fonctionnement.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <button onClick={startGuidedDemo} className="btn-primary sm:w-auto lg:w-full">
                🎬 Voir un exemple guidé
              </button>
              <button onClick={() => { stopDemo(); setShowManualDemo(true) }} className="btn-secondary sm:w-auto lg:w-full">
                Choisir un produit
              </button>
            </div>
            {cameraError && (
              <p className="text-xs text-center text-gray-400 mt-3">
                L'accès caméra a échoué. Vous pouvez quand même analyser un produit de la base MaréeForce.
              </p>
            )}
          </>
        )}

        {!scanning && guidedDemoActive && currentGuidedStep && (
          <div className="rounded-[28px] p-4" style={{ backgroundColor: '#E1F5EE' }}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: '#1D9E75' }}>
                  Exemple guidé · Étape {currentGuidedStep.step}/6
                </div>
                <h2 className="font-bold text-gray-900 text-base mt-1">{currentGuidedStep.title}</h2>
              </div>
              <button onClick={cancelGuidedDemo} className="text-xs font-semibold text-gray-500">
                Quitter
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-3 leading-relaxed">{currentGuidedStep.description}</p>
            <div className="rounded-2xl px-4 py-3 mt-3 text-sm italic" style={{ backgroundColor: 'white', color: '#085041' }}>
              "{currentGuidedStep.quote}"
            </div>
            <div className="flex gap-2 mt-4">
              {DEMO_STEPS.slice(0, 4).map((step, index) => (
                <div
                  key={step.step}
                  className="h-1.5 flex-1 rounded-full transition-all"
                  style={{ backgroundColor: index <= guidedStepIndex ? '#1D9E75' : '#BFEADC' }}
                />
              ))}
            </div>
          </div>
        )}

        {!scanning && showManualDemo && (
          <>
            <h2 className="font-bold text-gray-900 text-base mb-3">Choisir un produit à scanner</h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {DEMO_PRODUCTS.map(product => (
                <button
                  key={product.id}
                  onClick={() => simulateScan(product.id)}
                  className="flex items-center gap-3 p-3 rounded-2xl border-2 border-gray-100 hover:border-teal-200 transition-colors text-left w-full"
                >
                  <span className="text-2xl">{product.emoji}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-gray-900">{product.name}</div>
                    <div className="text-xs text-gray-400">{product.brand} · {product.origin}</div>
                  </div>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: product.score === 'D' ? '#D85A30' : '#A32D2D' }}>
                    {product.score}
                  </div>
                </button>
              ))}
            </div>
            <button onClick={() => setShowManualDemo(false)} className="text-sm text-gray-400 mt-3 hover:text-gray-600">
              ← Retour
            </button>
          </>
        )}

        {scanning && (
          <div className="text-center py-2">
            <p className="font-semibold text-gray-900">Analyse FishTrace en cours…</p>
            <p className="text-xs text-gray-400 mt-1">
              {ANALYSIS_STEPS[analysisStepIndex]?.detail}
            </p>
          </div>
        )}
      </div>

      <style>{`@keyframes scanline { 0%,100%{top:10%} 50%{top:85%} }`}</style>
    </div>
  )
}
