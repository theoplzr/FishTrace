/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react'
import useLocalStorageState from './useLocalStorageState'

const DemoModeContext = createContext(null)

const DEFAULT_DEMO_STATE = {
  active: false,
  step: 0,
  startedAt: null,
}

export const DEMO_STEPS = [
  {
    step: 1,
    title: 'Situation initiale',
    shortTitle: 'Rayon poisson',
    description: "Vendredi soir, Théo est face au rayon poisson. Il voit des labels partout et ne sait pas lesquels croire.",
    quote: "Encore ces labels... je comprends rien à tout ça.",
  },
  {
    step: 2,
    title: 'Problème',
    shortTitle: 'Doute MSC',
    description: "Il prend un saumon MSC, mais il se méfie après avoir lu des critiques sur la certification.",
    quote: "MSC c'est vraiment fiable ? J'ai lu que c'était pas si clean.",
  },
  {
    step: 3,
    title: 'Motivation',
    shortTitle: 'Réflexe FishTrace',
    description: "Il se souvient de FishTrace, l'app MaréeForce recommandée par un ami, et décide de la lancer.",
    quote: "FishTrace — cette appli qui scannait les poissons !",
  },
  {
    step: 4,
    title: 'Action',
    shortTitle: 'Scan du saumon',
    description: "FishTrace scanne le code-barre et affiche un score D avec l'explication: surpêché, importé du Chili, 3 intermédiaires.",
    quote: "Score D ! Je le savais que c'était pas bon...",
  },
  {
    step: 5,
    title: 'Alternatives',
    shortTitle: 'Choix durable',
    description: "L'app propose trois alternatives durables à moins de 5 km, dont le maquereau de Marco Ferreira.",
    quote: "Pêché par Marco Ferreira, Douarnenez — Score A !",
  },
  {
    step: 6,
    title: 'Conséquence',
    shortTitle: 'Abonnement',
    description: "Théo choisit le maquereau, repart rassuré, puis s'abonne au plan freemium le soir même.",
    quote: "Enfin une app qui m'aide vraiment à choisir. Je m'abonne !",
  },
]

export function DemoModeProvider({ children }) {
  const [demoState, setDemoState] = useLocalStorageState('fishtrace-demo-mode', DEFAULT_DEMO_STATE)

  function startDemo() {
    setDemoState({
      active: true,
      step: 1,
      startedAt: new Date().toISOString(),
    })
  }

  function goToStep(step) {
    setDemoState(currentState => ({
      ...currentState,
      active: true,
      step,
    }))
  }

  function stopDemo() {
    setDemoState(DEFAULT_DEMO_STATE)
  }

  const value = {
    demoState,
    isDemoActive: demoState.active,
    demoStep: demoState.step,
    storyProductId: 'saumon-msc-chili',
    startDemo,
    goToStep,
    stopDemo,
  }

  return (
    <DemoModeContext.Provider value={value}>
      {children}
    </DemoModeContext.Provider>
  )
}

export function useDemoMode() {
  const context = useContext(DemoModeContext)

  if (!context) {
    throw new Error('useDemoMode must be used within DemoModeProvider')
  }

  return context
}
