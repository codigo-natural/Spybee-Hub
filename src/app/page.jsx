import { ProjectProvider } from '@/components/projects/ProjectProvider'
import { ProjectLayout } from '@/components/projects/ProjectLayout'
import { HomeContent } from '@/components/projects/HomeContent'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

export default function Home() {
  return (
    <ProtectedRoute>
      <ProjectProvider>
        <HomeContent />
        <ProjectLayout />
      </ProjectProvider>
    </ProtectedRoute>
  )
}
