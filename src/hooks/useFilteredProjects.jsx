import { useMemo } from 'react'
import { useProjectStore } from '@/lib/store'
import { PAGINATION, SORT_OPTIONS } from '@/lib/constants'

/**
 * maneja la lógica de filtrado y ordenamiento de proyectos
 * @returns {Object} Proyectos filtrados, ordenados y paginados
 */
export function useFilteredProjects() {
    const { projects, searchQuery, sortBy, sortDirection, currentPage } = useProjectStore()

    const filteredAndSortedProjects = useMemo(() => {
        const query = searchQuery.toLowerCase()

        const filtered = projects.filter((project) => {
            if (!query) return true

            return (
                project.title.toLowerCase().includes(query) ||
                project.status.toLowerCase().includes(query) ||
                project.projectPlanData.plan.toLowerCase().includes(query) ||
                project.users.some(user =>
                    user.name.toLowerCase().includes(query) ||
                    user.lastName.toLowerCase().includes(query)
                )
            )
        })

        return filtered.sort((a, b) => {
            let comparison = 0

            switch (sortBy) {
                case SORT_OPTIONS.ALPHABETICAL:
                    comparison = a.title.localeCompare(b.title)
                    break
                case SORT_OPTIONS.INCIDENTS:
                    comparison = b.incidents.length - a.incidents.length
                    break
                case SORT_OPTIONS.RFI:
                    comparison = (
                        b.incidents.filter((i) => i.tag?.toUpperCase() === 'RFI').length -
                        a.incidents.filter((i) => i.tag?.toUpperCase() === 'RFI').length
                    )
                    break
                case SORT_OPTIONS.TASKS:
                    comparison = (
                        b.incidents.filter((i) => i.tag?.toUpperCase() === 'TASK' || i.item?.toLowerCase() === 'task').length -
                        a.incidents.filter((i) => i.tag?.toUpperCase() === 'TASK' || i.item?.toLowerCase() === 'task').length
                    )
                    break
                default:
                    comparison = 0
            }

            return sortDirection === 'asc' ? comparison : -comparison
        })
    }, [projects, searchQuery, sortBy, sortDirection])

    const totalPages = Math.ceil(filteredAndSortedProjects.length / PAGINATION.ITEMS_PER_PAGE)
    const paginatedProjects = useMemo(() => {
        const start = (currentPage - 1) * PAGINATION.ITEMS_PER_PAGE
        return filteredAndSortedProjects.slice(start, start + PAGINATION.ITEMS_PER_PAGE)
    }, [filteredAndSortedProjects, currentPage])

    return {
        projects: paginatedProjects,
        totalProjects: filteredAndSortedProjects.length,
        totalPages,
        hasResults: filteredAndSortedProjects.length > 0,
    }
}
