import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sun, Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react'

const ADMIN_USER = 'admin'
const ADMIN_PASS = '123'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      if (username === ADMIN_USER && password === ADMIN_PASS) {
        sessionStorage.setItem('sca_admin_auth', 'true')
        navigate('/admin/dashboard')
      } else {
        setError('Invalid username or password. Please try again.')
      }
      setLoading(false)
    }, 600)
  }

  return (
    <div className="min-h-screen bg-night-950 flex items-center justify-center p-5 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-night-900/40 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-night-800/30 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-10 opacity-0" style={{ animation: 'fadeUp 0.7s 0.1s ease-out forwards' }}>
          <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
            <Sun className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-white font-black text-2xl tracking-tight">SCA Tech Solar</h1>
          <p className="text-night-500 text-sm mt-1">Admin Dashboard</p>
        </div>

        {/* Login Card */}
        <div
          className="bg-night-900/60 backdrop-blur-xl rounded-3xl p-8 border border-white/5 shadow-2xl opacity-0"
          style={{ animation: 'fadeUp 0.7s 0.3s ease-out forwards' }}
        >
          <h2 className="text-white font-bold text-lg mb-1">Welcome back</h2>
          <p className="text-night-500 text-sm mb-8">Sign in to access your dashboard</p>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-xs font-bold text-night-400 uppercase tracking-wider mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="admin"
                required
                className="w-full px-4 py-3.5 rounded-xl bg-night-950/80 border border-white/10 focus:border-white/30 focus:ring-2 focus:ring-white/5 outline-none text-sm text-white placeholder-night-600 transition-all"
              />
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold text-night-400 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-night-950/80 border border-white/10 focus:border-white/30 focus:ring-2 focus:ring-white/5 outline-none text-sm text-white placeholder-night-600 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-night-500 hover:text-night-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-night-900 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-night-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-night-300 border-t-night-900 rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-night-600 text-xs text-center mt-6 opacity-0" style={{ animation: 'fadeUp 0.7s 0.5s ease-out forwards' }}>
          Protected area — authorized personnel only.
        </p>
      </div>
    </div>
  )
}
