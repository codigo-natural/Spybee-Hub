'use client'

import React from 'react'
import { SortDropDown } from './SortDropDown'
import { SearchBar } from './SearchBar'
import { useProjectStore } from '@/lib/store'
import styles from './HomeContent.module.css'
import { Button } from '../ui/Button/Button'

export const HomeContent = () => {
  const { projects } = useProjectStore()
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Mis proyectos
          <span className={styles.count}>{projects.length} proyectos</span>
        </h1>
        <div className={styles.controls}>
          <SortDropDown />
          <SearchBar />
          <Button>+ Crear proyecto</Button>
        </div>
      </header>
    </section>
  )
}
