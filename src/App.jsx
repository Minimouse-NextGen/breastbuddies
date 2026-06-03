import { useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Analytics } from "@vercel/analytics/react"
import AboutDivya from "./components/AboutDivya"
import BookingForm from "./components/BookingForm"
import FloatingWhatsApp from "./components/FloatingWhatsApp"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Services from "./components/Services"
import TrustHighlights from "./components/TrustHighlights"
import AdminDashboard from "./pages/AdminDashboard"
import AdminLogin from "./pages/AdminLogin"
import { isAllowedAdminEmail } from "./services/adminAccess"
import { isSupabaseConfigured, supabase } from "./services/supabaseClient"

function WebsitePage() {
  return (
    <div className="site-shell font-inter text-[#1E2A52]">
      <Header />
      <main className="pt-[72px]">
        <Hero />
        <TrustHighlights />
        <AboutDivya />
        <Services />
        <BookingForm />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}

function App() {
  const [session, setSession] = useState(null)
  const [isAuthLoading, setIsAuthLoading] = useState(() => isSupabaseConfigured)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      return undefined
    }

    let isMounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (isMounted) {
        setSession(data.session)
        setIsAuthLoading(false)
      }
    })

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
    })

    return () => {
      isMounted = false
      authListener.subscription.unsubscribe()
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<WebsitePage />} />
        <Route
          path="/admin/login"
          element={<AdminLogin session={session} />}
        />
        <Route
          path="/admin"
          element={isAuthLoading ? (
            <main className="grid min-h-screen place-items-center bg-[#F8FBFF] font-inter font-semibold text-[#1E2A52]">
              Loading admin...
            </main>
          ) : (
            <AdminDashboard session={isAllowedAdminEmail(session?.user?.email) ? session : null} />
          )}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Analytics />
    </>
  )
}

export default App
