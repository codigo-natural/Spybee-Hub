'use client'

import { useEffect } from 'react'
import { useProjectStore } from '@/lib/store'
import projectsData from '@/data/mock_data.json'

export function ProjectProvider({ children }) {
  const setProjects = useProjectStore((state) => state.setProjects)

  useEffect(() => {
    setProjects(projectsData)
  }, [setProjects])

  return children
}
