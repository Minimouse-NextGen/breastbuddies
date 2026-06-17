import { useEffect, useState } from "react"
import { BrandTagline, BrandWordmark, LogoMark, SmallIcon } from "./Graphics"
import { scrollToSection } from "../utils/scrollToSection"

const navItems = [
  { label: "Home", id: "top" },
  { label: "About Divya", id: "about" },
  { label: "Services", id: "services" },
  { label: "Gallery", id: "gallery" },
  { label: "Book Consultation", id: "booking" },
]

const whatsappLink = "https://wa.me/917299788877?text=Hello%20BreastBuddies%2C%20I%20would%20like%20to%20book%20a%20lactation%20consultation."

function Header() {
  const [activeSection, setActiveSection] = useState("top")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id)

    function updateActiveSection() {
      const scrollPosition = window.scrollY + 120
      let nextActiveSection = "top"

      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId)

        if (!section) {
          continue
        }

        if (scrollPosition >= section.offsetTop) {
          nextActiveSection = sectionId
        }
      }

      setActiveSection(nextActiveSection)
    }

    updateActiveSection()
    window.addEventListener("scroll", updateActiveSection, { passive: true })

    return () => {
      window.removeEventListener("scroll", updateActiveSection)
    }
  }, [])

  function handleSectionClick(event, sectionId) {
    scrollToSection(event, sectionId)
    setActiveSection(sectionId)
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-sky-100 bg-white shadow-sm shadow-sky-900/5">
      <div className="mx-auto flex min-h-[76px] w-full max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:gap-6 lg:px-8">
        <a
          href="/"
          onClick={(event) => handleSectionClick(event, "top")}
          className="flex min-w-0 items-center gap-3 sm:gap-4"
          aria-label="breastbuddies home"
        >
          <LogoMark className="h-12 w-12 shrink-0 sm:h-14 sm:w-14" />
          <span className="flex min-w-0 flex-col justify-center">
            <BrandWordmark className="block" sizeClassName="text-[25px] sm:text-[34px]" />
            <BrandTagline className="mt-1 block max-w-[280px] font-inter text-[11.5px] font-semibold leading-[1.3] text-[#FF477E] sm:max-w-none sm:text-[13px]" />
          </span>
        </a>

        <nav className="hidden flex-1 items-center justify-center gap-3 font-inter text-[15px] font-semibold text-[#1E2A52] lg:flex xl:gap-4">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.id === "top" ? "/" : `/#${item.id}`}
              onClick={(event) => handleSectionClick(event, item.id)}
              className={`inline-flex min-h-[44px] items-center justify-center rounded-xl px-4 text-center leading-none transition ${
                activeSection === item.id
                  ? "bg-[#EAF4FF] text-[#0353A4]"
                  : "hover:bg-[#F4F8FF] hover:text-[#0353A4]"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-5 md:flex">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bb-button bb-button-whatsapp-outline hidden min-w-[210px] xl:flex"
          >
            <SmallIcon type="whatsapp" color="#25D366" className="h-4 w-4" />
            Chat on WhatsApp
          </a>
          <a
            href="/#booking"
            onClick={(event) => handleSectionClick(event, "booking")}
            className="bb-button bb-button-primary"
          >
            Book Consultation
          </a>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-sky-100 bg-white text-[#1E2A52] shadow-sm shadow-sky-900/5 lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span className="sr-only">Menu</span>
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
            <path
              d={isMenuOpen ? "M6 6l12 12M18 6 6 18" : "M4 7h16M4 12h16M4 17h16"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-sky-100 bg-white px-4 pb-4 shadow-lg shadow-sky-900/5 lg:hidden">
          <nav className="grid gap-2 pt-3 font-inter text-sm font-semibold text-[#1E2A52]" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.id === "top" ? "/" : `/#${item.id}`}
                onClick={(event) => handleSectionClick(event, item.id)}
                className={`rounded-xl px-4 py-3 ${
                  activeSection === item.id
                    ? "bg-[#EAF4FF] text-[#0353A4]"
                    : "hover:bg-[#F4F8FF] hover:text-[#0353A4]"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bb-button bb-button-whatsapp-outline bb-button-full mt-3"
          >
            <SmallIcon type="whatsapp" color="#25D366" className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        </div>
      )}
    </header>
  )
}

export default Header
