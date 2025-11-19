import { create } from 'zustand'

interface AuthState {
  isAuthenticated: boolean
  token: string | null
  user: any | null
  login: (token: string, user: any) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => {
  // Initialize from localStorage
  const storedToken = localStorage.getItem('auth_token')
  const storedUser = localStorage.getItem('auth_user')
  
  return {
    isAuthenticated: !!storedToken,
    token: storedToken,
    user: storedUser ? JSON.parse(storedUser) : null,
    login: (token: string, user: any) => {
      localStorage.setItem('auth_token', token)
      localStorage.setItem('auth_user', JSON.stringify(user))
      set({ isAuthenticated: true, token, user })
    },
    logout: () => {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_user')
      set({ isAuthenticated: false, token: null, user: null })
    },
  }
})

