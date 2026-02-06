'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        const hasCookie = document.cookie.includes('auth-token=')

        if (storedUser && hasCookie) {
            setUser(JSON.parse(storedUser))
        } else if (!hasCookie) {
            localStorage.removeItem('user')
            setUser(null)
        }
        setLoading(false)
    }, [])

    const login = async (email, password) => {
        if (email && password.length >= 6) {
            const userData = {
                id: '1',
                name: email.split('@')[0],
                email: email,
                avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=facc15&color=fff`,
            }

            document.cookie = 'auth-token=authenticated; path=/; max-age=86400; SameSite=Strict'

            localStorage.setItem('user', JSON.stringify(userData))
            setUser(userData)

            return { success: true }
        }

        return { success: false, error: 'Credenciales inválidas' }
    }

    const logout = () => {
        document.cookie = 'auth-token=; path=/; max-age=0'

        localStorage.removeItem('user')
        setUser(null)
        router.push('/login')
    }

    const value = {
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}