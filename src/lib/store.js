const { create } = require('zustand')

export const useProjectStore = create((set) => ({
  projects: [],
  selectedProject: null,
  searchQuery: '',
  sortBy: 'alphabetical',
  sortDirection: 'asc',
  currentPage: 1,
  isSidebarCollapsed: false,
  setProjects: (projects) => set({ projects }),
  setSelectedProject: (project) => set({ selectedProject: project }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortDirection: (direction) => set({ sortDirection: direction }),
  setCurrentPage: (pageUpdater) =>
    set((state) => ({
      currentPage:
        typeof pageUpdater === 'function'
          ? pageUpdater(state.currentPage)
          : pageUpdater,
    })),
  setIsSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),
}))
