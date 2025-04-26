'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'sonner'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showConfirmEmailNotice, setShowConfirmEmailNotice] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const router = useRouter()

  // Check session on load
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        router.push('/dashboard')
      }
    }

    checkSession()
  }, [router])

  // Handle resend cooldown timer
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (resendCooldown > 0) {
      timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1)
      }, 1000)
    }

    return () => clearTimeout(timer)
  }, [resendCooldown])

  // Handle login/signup
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
          toast.error(error.message)
          console.error('Login error:', error.message)
        } else {
          toast.success('Logged in successfully!')
          setTimeout(() => {
            router.push('/dashboard')
          }, 1000)
        }
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password })
        if (error) {
          toast.error(error.message)
          console.error('Signup error:', error.message)
        } else {
          toast.success('Signed up successfully! Check your email to confirm.')
          setShowConfirmEmailNotice(true)
        }
      }
    } finally {
      setLoading(false)
    }
  }

  // Handle resending confirmation email
  const resendConfirmation = async () => {
    if (resendCooldown > 0) return
    setLoading(true)

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Confirmation email resent successfully!')
      setResendCooldown(30)
    }

    setLoading(false)
  }

  // UI when showing confirm email notice
  if (showConfirmEmailNotice) {
    return (
      <main className="min-h-screen flex flex-col md:flex-row bg-[#0F172A]">
        <Toaster />
        {/* Left side (confirm email) */}
        <div className="w-full md:w-3/5 bg-white text-gray-800 flex flex-col justify items-left px-10 md:px-20 py-20">
          <div className="w-full max-w-md ">
            <h1 className="text-2xl font-bold mb-4">Confirm Your Email</h1>
            <p className="text-gray-800 mb-6">
              We've sent a confirmation link to
              <span className="text-gray-800 pl-2 font-bold">{email}</span>. 
              Please check your inbox and verify your email address.
            </p>

            <button
              onClick={() => setIsLogin(!true)}
              className="w-full cursor-pointer mb-4 bg-gradient-to-r from-[#6E00FF] to-[#0096FF] py-3 rounded-xl font-semibold hover:opacity-90 transition duration-200"
            >
              Go to Login
            </button>

            <button
              onClick={resendConfirmation}
              disabled={loading || resendCooldown > 0}
              className="w-full bg-transparent border border-[#6E00FF] py-3 rounded-xl font-semibold hover:bg-[#6E00FF]/20 transition duration-200 text-[#6E00FF]"
            >
              {resendCooldown > 0
                ? `Resend available in ${resendCooldown}s`
                : (loading ? 'Resending...' : 'Resend Confirmation Email')}
            </button>
          </div>
        </div>

        {/* Right side (info) */}
        <div className="flex w-full md:w-2/5 flex-col bg-[#0F172A] text-white  px-10 py-20">
          <h2 className="text-3xl font-bold mb-4">Welcome to DevSparq</h2>
          <p className="text-gray-300 mb-8">
            DevSparq helps indie developers discover real-world project inspirations,
            explore polished UI designs, and generate beautiful SVG backgrounds — all from one platform.
            Get inspired, create better, and spark your next big idea with DevSparq.
          </p>
          <div className="space-y-4">
            <div>• Find Similar Projects to what you're building</div>
            <div>• Explore stunning UI examples from real products</div>
            <div>• Generate custom SVG backgrounds easily</div>
          </div>
        </div>
      </main>
    )
  }

  // Normal login/signup UI
  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-[#0F172A]">
      <Toaster />
      
      {/* Left side (form) */}
      <div className="w-full md:w-3/5 bg-white text-gray-800 flex flex-col justify items-left px-10 md:px-20 py-20">
        <h1 className="text-3xl font-semibold">
          {isLogin ? 'Welcome back!' : 'Welcome'}
        </h1>

        <p className="mt-5 text-gray-400">
          {isLogin ? (
            <>
              Log in to explore real world projects <br /> and spark your next big idea.
            </>
          ) : (
            <>
              Find inspiration. Build better. <br /> Join DevSparq today.
            </>
          )}
        </p>

        <form onSubmit={handleAuth} className="space-y-5 w-full max-w-md mt-10">
          <input
            type="email"
            placeholder="Email"
            className="w-full text-gray-800 px-4 py-3 border border-black/10 rounded-xl  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6E00FF] transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full text-gray-800 px-4 py-3 border border-black/10 rounded-xl  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6E00FF] transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full cursor-pointer bg-gradient-to-r from-[#6E00FF] to-[#0096FF] py-3 rounded-xl font-semibold hover:opacity-90 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Loading...' : isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-400 animate-fade-in">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setShowConfirmEmailNotice(false)
            }}
            className="text-black cursor-pointer hover:underline ml-1 transition"
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>

      {/* Right side (info) */}
      <div className="flex w-full md:w-2/5 flex-col bg-[#0F172A] text-white px-10 py-20">
        <h2 className="text-3xl font-bold mb-4">Welcome to DevSparq</h2>
        <p className="text-gray-300 mb-8">
          DevSparq helps indie developers discover real-world project inspirations,
          explore polished UI designs, and generate beautiful SVG backgrounds — all from one platform.
          Get inspired, create better, and spark your next big idea with DevSparq.
        </p>
        <div className="space-y-4">
          <div>• Find Similar Projects to what you're building</div>
          <div>• Explore stunning UI examples from real products</div>
          <div>• Generate custom SVG backgrounds easily</div>
        </div>
      </div>
    </main>
  )
}
