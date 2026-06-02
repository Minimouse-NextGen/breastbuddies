import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { isAllowedAdminEmail } from "../services/adminAccess"
import { isSupabaseConfigured, supabase } from "../services/supabaseClient"

function AdminLogin({ session }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (session && isAllowedAdminEmail(session.user.email)) {
    return <Navigate to="/admin" replace />
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage("")

    if (!isSupabaseConfigured) {
      setMessage("Supabase is not configured.")
      return
    }

    const normalizedEmail = email.trim().toLowerCase()

    if (!isAllowedAdminEmail(normalizedEmail)) {
      setMessage("This email is not allowed to access the admin panel.")
      return
    }

    try {
      setIsSubmitting(true)
      const { error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      })

      if (error) {
        throw error
      }

      navigate("/admin", { replace: true })
    } catch (error) {
      setMessage(error.message || "Unable to sign in.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#F8FBFF] px-4 py-10 font-inter text-[#1E2A52]">
      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-md place-items-center">
        <form
          className="w-full rounded-lg border border-sky-100 bg-white p-6 shadow-xl shadow-sky-900/10"
          onSubmit={handleSubmit}
        >
          <Link to="/" className="font-inter text-sm font-semibold text-[#4F8EF7]">
            Back to website
          </Link>
          <h1 className="mt-5 font-playfair text-3xl font-bold">Admin Login</h1>
          <p className="mt-2 text-sm leading-6 text-[#1E2A52]/70">
            Sign in to view and manage BreastBuddies bookings.
          </p>

          <label className="mt-6 block">
            <span className="text-sm font-semibold">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="mt-2 h-12 w-full rounded-lg border border-slate-200 px-4 outline-none focus:border-[#4F8EF7] focus:ring-4 focus:ring-sky-100"
            />
          </label>

          <label className="mt-4 block">
            <span className="text-sm font-semibold">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="mt-2 h-12 w-full rounded-lg border border-slate-200 px-4 outline-none focus:border-[#4F8EF7] focus:ring-4 focus:ring-sky-100"
            />
          </label>

          {message && (
            <p className="mt-4 rounded-lg bg-pink-50 px-4 py-3 text-sm font-semibold text-[#B8325C]">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="consultation-button mt-6 w-full rounded-lg px-5 py-3 font-semibold"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  )
}

export default AdminLogin
