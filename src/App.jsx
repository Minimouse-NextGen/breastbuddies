import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import AboutDivya from "./components/AboutDivya"
import BookingForm from "./components/BookingForm"
import FAQ from "./components/FAQ"
import FloatingWhatsApp from "./components/FloatingWhatsApp"
import Footer from "./components/Footer"
import { BrandWordmark, LogoMark } from "./components/Graphics"
import Header from "./components/Header"
import Hero from "./components/Hero"
import HowItWorks from "./components/HowItWorks"
import Services from "./components/Services"
import Testimonials from "./components/Testimonials"
import TrustHighlights from "./components/TrustHighlights"
import AdminDashboard from "./pages/AdminDashboard"
import AdminLogin from "./pages/AdminLogin"
import { verifyAdminAccess } from "./services/adminAccess"
import { isSupabaseConfigured, supabase } from "./services/supabaseClient"
import { getSectionIdFromPathname } from "./utils/sectionRoutes"

const PUBLIC_SITE_URL = "https://www.breastbuddies.co.in"

const routeMeta = {
  "/": {
    title: "BreastBuddies | Lactation Consultant in Chennai",
    description:
      "Certified lactation consultant in Chennai. Latch help, milk supply support, newborn feeding guidance. Online consults available.",
    canonicalPath: "/",
  },
  "/services": {
    title: "Services | BreastBuddies Lactation Support",
    description:
      "Latch assessment, milk supply support, tongue-tie guidance & newborn feeding help — in-person in Chennai or online.",
    canonicalPath: "/services",
  },
  "/about-divya": {
    title: "About Divya Umashankar | BreastBuddies",
    description:
      "Meet Divya Umashankar, certified lactation consultant supporting Chennai families and clients worldwide.",
    canonicalPath: "/about-divya",
  },
  "/book-consultation": {
    title: "Book a Consultation | BreastBuddies",
    description:
      "Book an in-person or online lactation consultation with BreastBuddies, Chennai.",
    canonicalPath: "/book-consultation",
  },
  "/gallery": {
    title: "Gallery | BreastBuddies",
    description:
      "A look at BreastBuddies' lactation consulting practice in Chennai.",
    canonicalPath: "/gallery",
  },
}

const routeMetaAliases = {
  "/home": routeMeta["/"],
  "/about": routeMeta["/about-divya"],
}

function RouteHead() {
  const location = useLocation()
  const meta = routeMeta[location.pathname] ?? routeMetaAliases[location.pathname] ?? routeMeta["/"]
  const canonicalUrl = `${PUBLIC_SITE_URL}${meta.canonicalPath}`

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  )
}

function GalleryPlaceholder() {
  return (
    <section id="gallery" className="bg-white px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
      <div className="section-frame">
        <div className="rounded-3xl border border-[#DDE8F7] bg-[#F8FBFF] px-6 py-10 text-center shadow-[0_12px_30px_rgba(30,42,82,0.07)] sm:px-8">
          <h2 className="heading-h2">Gallery</h2>
          <p className="mx-auto mt-4 max-w-2xl font-inter text-base leading-7 text-[#1E2A52]/80">
            Gallery updates are coming soon. Please explore the rest of the site or book a consultation.
          </p>
        </div>
      </div>
    </section>
  )
}

function WebsitePage() {
  const location = useLocation()
  const activeSection = getSectionIdFromPathname(location.pathname) ?? "top"
  const shouldShowGalleryPlaceholder = activeSection === "gallery"

  useEffect(() => {
    const sectionId = getSectionIdFromPathname(location.pathname) ?? "top"

    const scrollToTarget = () => {
      if (sectionId === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" })
        return
      }

      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }

    const frameId = window.requestAnimationFrame(scrollToTarget)

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [location.pathname])

  return (
    <div className="site-shell font-inter text-[#1E2A52]">
      <RouteHead />
      <Header />
      <main className="pt-[72px]">
        <Hero />
        <TrustHighlights />
        <AboutDivya />
        <Services />
        <FAQ />
        <Testimonials />
        {shouldShowGalleryPlaceholder ? <GalleryPlaceholder /> : null}
        <HowItWorks />
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
      <Route path="/home" element={<WebsitePage />} />
      <Route path="/about" element={<WebsitePage />} />
      <Route path="/about-divya" element={<WebsitePage />} />
      <Route path="/services" element={<WebsitePage />} />
      <Route path="/gallery" element={<WebsitePage />} />
      <Route path="/book-consultation" element={<WebsitePage />} />
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
