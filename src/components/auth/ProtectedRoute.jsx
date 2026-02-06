'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import styles from './ProtectedRoute.module.css'

export function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login')
        }
    }, [isAuthenticated, loading, router])

    if (loading) {
        return (
            <div className={styles.loading}>
                Cargando...
            </div>
        )
    }

    return isAuthenticated ? children : null
}
