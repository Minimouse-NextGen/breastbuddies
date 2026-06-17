import { useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import AboutDivya from "./components/AboutDivya"
import BookingForm from "./components/BookingForm"
import FloatingWhatsApp from "./components/FloatingWhatsApp"
import Footer from "./components/Footer"
import { BrandWordmark, LogoMark } from "./components/Graphics"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Services from "./components/Services"
import TrustHighlights from "./components/TrustHighlights"
import AdminDashboard from "./pages/AdminDashboard"
import AdminLogin from "./pages/AdminLogin"
import { verifyAdminAccess } from "./services/adminAccess"
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
  const [isAdminChecking, setIsAdminChecking] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminAccessMessage, setAdminAccessMessage] = useState("")

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

  useEffect(() => {
    if (!isSupabaseConfigured || !session) {
      return undefined
    }

    let isMounted = true

    async function checkAdminAccess() {
      try {
        setIsAdminChecking(true)
        const hasAdminAccess = await verifyAdminAccess(supabase)

        if (isMounted) {
          setIsAdmin(hasAdminAccess)
          setAdminAccessMessage(hasAdminAccess ? "" : "This account is not authorized for admin access.")
        }

        if (!hasAdminAccess) {
          await supabase.auth.signOut()
        }
      } catch (error) {
        console.error("Unable to verify admin access", error)
        if (isMounted) {
          setIsAdmin(false)
          setAdminAccessMessage("This account is not authorized for admin access.")
        }
        await supabase.auth.signOut()
      } finally {
        if (isMounted) {
          setIsAdminChecking(false)
        }
      }
    }

    checkAdminAccess()

    return () => {
      isMounted = false
    }
  }, [session])

  const hasVerifiedAdminSession = Boolean(session && isAdmin)
  const isAdminLoading = isAuthLoading || isAdminChecking

  return (
    <Routes>
      <Route path="/" element={<WebsitePage />} />
      <Route
        path="/admin/login"
        element={<AdminLogin session={session} />}
      />
      <Route
        path="/admin"
        element={isAdminLoading ? (
          <main className="grid min-h-screen place-items-center bg-[#F8FAFC] px-4 font-inter text-[#0F172A]">
            <div className="text-center">
              <LogoMark className="mx-auto h-16 w-16" />
              <BrandWordmark className="mt-4 block" sizeClassName="text-3xl" />
              <p className="mt-3 text-sm font-semibold text-slate-500">Loading admin...</p>
            </div>
          </main>
        ) : !session ? (
          <Navigate
            to="/admin/login"
            replace
            state={adminAccessMessage ? { message: adminAccessMessage } : undefined}
          />
        ) : !hasVerifiedAdminSession ? (
          <Navigate
            to="/admin/login"
            replace
            state={{ message: adminAccessMessage || "This account is not authorized for admin access." }}
          />
        ) : (
          <AdminDashboard session={session} />
        )}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
