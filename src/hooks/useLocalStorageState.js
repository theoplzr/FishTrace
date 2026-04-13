import { useEffect, useState } from 'react'

function resolveInitialValue(initialValue) {
  return typeof initialValue === 'function' ? initialValue() : initialValue
}

export default function useLocalStorageState(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return resolveInitialValue(initialValue)

    try {
      const storedValue = window.localStorage.getItem(key)
      return storedValue ? JSON.parse(storedValue) : resolveInitialValue(initialValue)
    } catch {
      return resolveInitialValue(initialValue)
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Ignore storage errors in demo environments.
    }
  }, [key, value])

  return [value, setValue]
}
