import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { BrandTagline, BrandWordmark, LogoMark } from "./Graphics"
import { getSectionIdFromPathname, navItems, normalizePathname } from "../utils/sectionRoutes"

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const activeSection = getSectionIdFromPathname(location.pathname) ?? "top"

  function scrollToSectionId(sectionId) {
    if (sectionId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  function handleSectionClick(event, item) {
    event.preventDefault()
    setIsMenuOpen(false)

    if (normalizePathname(location.pathname) === item.path) {
      scrollToSectionId(item.id)
      return
    }

    navigate(item.path)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-sky-100 bg-white shadow-sm shadow-sky-900/5">
      <div className="mx-auto flex min-h-[76px] w-full max-w-7xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 lg:gap-6 lg:px-8">
        <Link
          to="/"
          onClick={(event) => handleSectionClick(event, navItems[0])}
          className="flex min-w-0 items-center gap-3 sm:gap-4"
          aria-label="breastbuddies home"
        >
          <LogoMark className="h-12 w-12 shrink-0 sm:h-14 sm:w-14" />
          <span className="flex min-w-0 flex-col justify-center">
            <BrandWordmark className="block" sizeClassName="text-[25px] sm:text-[34px]" />
            <BrandTagline className="mt-1 block max-w-[280px] font-inter text-[11.5px] font-semibold leading-[1.3] text-[#FF477E] sm:max-w-none sm:text-[13px]" />
          </span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-3 font-inter text-[15px] font-semibold text-[#1E2A52] lg:flex xl:gap-4">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={(event) => handleSectionClick(event, item)}
              className={`inline-flex min-h-[44px] items-center justify-center rounded-xl px-4 text-center leading-none transition ${
                activeSection === item.id
                  ? "bg-[#EAF4FF] text-[#0353A4]"
                  : "hover:bg-[#F4F8FF] hover:text-[#0353A4]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
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
              <Link
                key={item.id}
                to={item.path}
                onClick={(event) => handleSectionClick(event, item)}
                className={`rounded-xl px-4 py-3 ${
                  activeSection === item.id
                    ? "bg-[#EAF4FF] text-[#0353A4]"
                    : "hover:bg-[#F4F8FF] hover:text-[#0353A4]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
