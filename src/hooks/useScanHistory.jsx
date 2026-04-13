/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react'
import useLocalStorageState from './useLocalStorageState'

const ScanHistoryContext = createContext(null)
const MAX_HISTORY = 24

export function ScanHistoryProvider({ children }) {
  const [history, setHistory] = useLocalStorageState('fishtrace-scan-history', [])

  function addScan(product) {
    const scannedAt = new Date()

    setHistory(previousHistory => {
      const latestEntry = previousHistory[0]
      const latestTimestamp = latestEntry ? Date.parse(latestEntry.scannedAt) : 0

      if (
        latestEntry?.productId === product.id &&
        Number.isFinite(latestTimestamp) &&
        scannedAt.getTime() - latestTimestamp < 10000
      ) {
        return previousHistory
      }

      const nextEntry = {
        id: `${product.id}-${scannedAt.getTime()}`,
        productId: product.id,
        name: product.name,
        brand: product.brand,
        emoji: product.emoji,
        score: product.score,
        origin: product.origin,
        method: product.method,
        label: product.label,
        scannedAt: scannedAt.toISOString(),
      }

      return [nextEntry, ...previousHistory].slice(0, MAX_HISTORY)
    })
  }

  function clearHistory() {
    setHistory([])
  }

  const value = {
    history,
    addScan,
    clearHistory,
  }

  return (
    <ScanHistoryContext.Provider value={value}>
      {children}
    </ScanHistoryContext.Provider>
  )
}

export function useScanHistory() {
  const context = useContext(ScanHistoryContext)

  if (!context) {
    throw new Error('useScanHistory must be used within ScanHistoryProvider')
  }

  return context
}
