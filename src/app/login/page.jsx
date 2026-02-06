'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { LoginForm } from '@/components/auth/LoginForm'
import styles from './login.module.css'

export default function LoginPage() {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const router = useRouter()

    const handleSubmit = async (email, password) => {
        setError('')
        setLoading(true)

        const result = await login(email, password)

        if (result.success) {
            router.push('/')
        } else {
            setError(result.error || 'Error al iniciar sesión')
        }

        setLoading(false)
    }

    return (
        <main className={styles.container}>
            <section className={styles.loginCard}>
                <LoginForm
                    onSubmit={handleSubmit}
                    error={error}
                    loading={loading}
                />
            </section>
        </main>
    )
}
