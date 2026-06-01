import { useEffect, useState } from "react"
import AboutDivya from "./components/AboutDivya"
import BookingForm from "./components/BookingForm"
import FloatingWhatsApp from "./components/FloatingWhatsApp"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Hero from "./components/Hero"
import LaunchLanding from "./components/LaunchLanding"
import Services from "./components/Services"
import TrustHighlights from "./components/TrustHighlights"

const launchAccessKey = "breastbuddies-launch-entered-v2"
const launchPath = "/launch"

function App() {
  const [hasEnteredLaunch, setHasEnteredLaunch] = useState(
    () => window.location.pathname !== launchPath
      && sessionStorage.getItem(launchAccessKey) === "true",
  )

  useEffect(() => {
    function syncLaunchState() {
      if (window.location.pathname === launchPath) {
        sessionStorage.removeItem(launchAccessKey)
        setHasEnteredLaunch(false)
        return
      }

      setHasEnteredLaunch(sessionStorage.getItem(launchAccessKey) === "true")
    }

    syncLaunchState()
    window.addEventListener("popstate", syncLaunchState)

    return () => window.removeEventListener("popstate", syncLaunchState)
  }, [])

  function handleLaunchEnter() {
    sessionStorage.setItem(launchAccessKey, "true")
    window.history.replaceState({}, "", "/")
    setHasEnteredLaunch(true)
  }

  if (!hasEnteredLaunch) {
    return <LaunchLanding onEnter={handleLaunchEnter} />
  }

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

export default App
