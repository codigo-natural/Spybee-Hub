import { useEffect, useState } from 'react'
import { SEARCH_DEBOUNCE_DELAY } from '@/lib/constants'

export function useDebounce(value, delay = SEARCH_DEBOUNCE_DELAY) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}
