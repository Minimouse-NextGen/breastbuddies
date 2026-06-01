import { useEffect, useState } from "react"
import { LogoMark, SmallIcon } from "./Graphics"

const navItems = [
  { label: "Home", href: "#top" },
  { label: "About Divya", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Book Consultation", href: "#booking" },
]

function Header() {
  const [activeSection, setActiveSection] = useState(() => window.location.hash || "#top")

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href)

    function updateActiveSection() {
      const scrollPosition = window.scrollY + 120
      let nextActiveSection = "#top"

      for (const sectionId of sectionIds) {
        const section = document.querySelector(sectionId)

        if (!section) {
          continue
        }

        if (scrollPosition >= section.offsetTop) {
          nextActiveSection = sectionId
        }
      }

      setActiveSection(nextActiveSection)
    }

    function handleHashChange() {
      setActiveSection(window.location.hash || "#top")
    }

    updateActiveSection()
    window.addEventListener("scroll", updateActiveSection, { passive: true })
    window.addEventListener("hashchange", handleHashChange)

    return () => {
      window.removeEventListener("scroll", updateActiveSection)
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-sky-100 bg-white shadow-sm shadow-sky-900/5">
      <div className="flex min-h-[72px] w-full items-center justify-between gap-6 px-4 py-2 sm:px-6 lg:px-8">
        <a href="#top" className="flex min-w-[330px] items-center gap-3" aria-label="breastbuddies home">
          <LogoMark className="h-12 w-12 shrink-0" />
          <span>
            <span className="block font-playfair text-[28px] font-bold leading-none tracking-normal text-[#4F8EF7]">
              breastbuddies
            </span>
            <span className="mt-1.5 block font-inter text-[12px] font-semibold leading-none text-[#FF6B9A]">
              Because every mother deserves support.
            </span>
          </span>
        </a>

        <nav className="hidden flex-1 items-center justify-center gap-4 font-inter text-[15px] font-semibold text-[#1E2A52] lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setActiveSection(item.href)}
              className={`inline-flex min-h-[44px] items-center justify-center rounded-xl px-4 text-center leading-none transition ${
                activeSection === item.href
                  ? "bg-[#EAF4FF] text-[#4F8EF7]"
                  : "hover:bg-[#F4F8FF] hover:text-[#4F8EF7]"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-5">
          <a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
            rel="noreferrer"
            className="hidden min-w-[210px] items-center justify-center gap-3 rounded-2xl border-2 border-[#34C38F]/60 bg-white px-6 py-3 font-inter text-[15px] font-semibold text-[#1E2A52] shadow-sm transition hover:-translate-y-0.5 hover:border-[#34C38F] md:flex"
          >
            <SmallIcon type="whatsapp" color="#16a974" className="h-5 w-5" />
            Chat on WhatsApp
          </a>
          <a
            href="#booking"
            className="consultation-button rounded-2xl px-7 py-3 font-inter text-[15px] font-semibold"
          >
            Book Consultation
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
