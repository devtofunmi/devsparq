'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { User } from '@supabase/supabase-js'

export default function Dashboard() {
  const [user, setUser] = useState<null | User>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Get current session (user) when the component mounts
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        setUser(data.session.user)
      } else {
        toast.error('You must be logged in to access this page.')
        router.push('/auth') // Redirect to login if not logged in
      }
      setLoading(false)
    }

    checkSession()
  }, [router])

  if (loading) {
    return <div className="text-white">Loading...</div>
  }

  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen bg-[#0F172A] w-full text-white">

      <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-white">
  <h1 className="text-2xl md:text-4xl font-semibold text-center">
  Thanks for your patience i’m still working on this page!
  </h1>
       </div>

      {/* <section className="py-12 px-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.email}</h1>
        <p className="text-lg text-gray-400">
          Here you can manage your saved projects, likes, and more!
        </p>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-center mb-6">Your Favorites</h2>
          Display user's saved/liked projects here
          <div className="bg-[#1F2937] p-6 rounded-xl shadow-md text-center">
            <p className="text-lg">No favorites yet. Start exploring!</p>
          </div>
        </div>
      </section> */}
    </main>
  )
}
