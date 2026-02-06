'use client'

import { useState, useEffect } from 'react'
import { useProjectStore } from '@/lib/store'
import { Search, X } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce'
import styles from './SearchBar.module.css'

export const SearchBar = () => {
  const { searchQuery, setSearchQuery, setCurrentPage } = useProjectStore()
  const [inputValue, setInputValue] = useState(searchQuery)
  const debouncedValue = useDebounce(inputValue)

  useEffect(() => {
    if (debouncedValue !== searchQuery) {
      setSearchQuery(debouncedValue)
      setCurrentPage(1)
    }
  }, [debouncedValue, searchQuery, setSearchQuery, setCurrentPage])

  const handleClear = () => {
    setInputValue('')
    setSearchQuery('')
    setCurrentPage(1)
  }

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Buscar"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={styles.input}
        aria-label="Buscar proyectos"
      />
      <Search className={styles.icon} aria-hidden="true" />
      {inputValue && (
        <button
          onClick={handleClear}
          className={styles.clearButton}
          aria-label="Limpiar búsqueda"
          type="button"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}
