/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from 'react'
import useLocalStorageState from './useLocalStorageState'

const SubscriptionContext = createContext(null)

const DEFAULT_SUBSCRIPTION = {
  tier: 'free',
  activatedAt: null,
}

export function SubscriptionProvider({ children }) {
  const [subscription, setSubscription] = useLocalStorageState('fishtrace-subscription', DEFAULT_SUBSCRIPTION)

  function activatePlan(tier) {
    setSubscription({
      tier,
      activatedAt: new Date().toISOString(),
    })
  }

  function resetPlan() {
    setSubscription(DEFAULT_SUBSCRIPTION)
  }

  const value = {
    subscription,
    tier: subscription.tier,
    isSubscribed: subscription.tier === 'freemium' || subscription.tier === 'pro',
    isPro: subscription.tier === 'pro',
    activatePlan,
    resetPlan,
  }

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscription() {
  const context = useContext(SubscriptionContext)

  if (!context) {
    throw new Error('useSubscription must be used within SubscriptionProvider')
  }

  return context
}
