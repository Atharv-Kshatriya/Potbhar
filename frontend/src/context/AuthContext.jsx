import { createContext, useContext, useState, useEffect } from 'react'
import { login as apiLogin, register as apiRegister, getMe } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('potbhar_token')
    const stored = localStorage.getItem('potbhar_user')
    if (token && stored) {
      try { setUser(JSON.parse(stored)) } catch {}
      getMe().then(r => { setUser(r.data); localStorage.setItem('potbhar_user', JSON.stringify(r.data)) })
        .catch(() => { localStorage.clear() })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    const r = await apiLogin(email, password)
    localStorage.setItem('potbhar_token', r.data.access_token)
    localStorage.setItem('potbhar_user', JSON.stringify(r.data.user))
    setUser(r.data.user)
    return r.data.user
  }

  const register = async (data) => {
    const r = await apiRegister(data)
    localStorage.setItem('potbhar_token', r.data.access_token)
    localStorage.setItem('potbhar_user', JSON.stringify(r.data.user))
    setUser(r.data.user)
    return r.data.user
  }

  const logout = () => {
    localStorage.removeItem('potbhar_token')
    localStorage.removeItem('potbhar_user')
    setUser(null)
  }

  const refreshUser = async () => {
    try {
      const r = await getMe()
      setUser(r.data)
      localStorage.setItem('potbhar_user', JSON.stringify(r.data))
    } catch {}
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
