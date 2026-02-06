'use client'

import { useProjectStore } from '@/lib/store'
import { ListFilterPlus, ArrowUp, ArrowDown } from "lucide-react";
import { SORT_LABELS } from '@/lib/constants';
import { useEffect, useState, useRef } from 'react'
import styles from './SortDropDown.module.css'

export const SortDropDown = () => {
  const { sortBy, setSortBy, sortDirection, setSortDirection } = useProjectStore()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleSortDirection = (e) => {
    e.stopPropagation()
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
  }

  const currentOption = SORT_LABELS.find(opt => opt.value === sortBy)

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button
        className={styles.button}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Ordenar proyectos"
        aria-expanded={isOpen}
      >
        <ListFilterPlus />
        {currentOption && (
          <span className={styles.currentSort}>{currentOption.label}</span>
        )}
      </button>

      <button
        className={styles.directionButton}
        onClick={toggleSortDirection}
        aria-label={`Ordenar ${sortDirection === 'asc' ? 'descendente' : 'ascendente'}`}
        title={sortDirection === 'asc' ? 'Ascendente' : 'Descendente'}
      >
        {sortDirection === 'asc' ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
      </button>

      {isOpen && (
        <div className={styles.menu} role="menu">
          {SORT_LABELS.map((option) => (
            <button
              key={option.value}
              className={`${styles.item} ${sortBy === option.value ? styles.selected : ''}`}
              onClick={() => {
                setSortBy(option.value)
                setIsOpen(false)
              }}
              role="menuitem"
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}