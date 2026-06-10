'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
})

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isLocal, setIsLocal] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    setIsLocal(url === '' || url === 'https://placeholder.supabase.co')
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (isLocal) {
      router.push('/admin')
      return
    }

    const parsed = loginSchema.safeParse({ email, password })
    if (!parsed.success) {
      setError(parsed.error.errors[0].message)
      return
    }

    setLoading(true)
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    router.push('/admin')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4">
      <div className="w-full max-w-md rounded-2xl border border-hairline bg-surface-2 p-8">
        <div className="text-center mb-6">
          <h1 className="text-display-md text-ink">Admin Login</h1>
          <p className="text-body-sm text-ink-muted mt-2">
            {isLocal
              ? 'Mode lokal - klik masuk untuk melanjutkan'
              : 'Masuk ke panel admin Nyong Noni Sulut'}
          </p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required={!isLocal}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required={!isLocal}
            />
          </div>
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Memproses...' : 'Masuk'}
          </Button>
          {isLocal && (
            <p className="text-xs text-center text-ink-muted mt-2">
              Mode pengembangan lokal - autentikasi dilewati
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
