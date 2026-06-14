import { LogoMark, SmallIcon } from "./Graphics"
import { scrollToSection } from "../utils/scrollToSection"

const whatsappLink = "https://wa.me/917299788877?text=Hello%20BreastBuddies%2C%20I%20would%20like%20to%20book%20a%20lactation%20consultation."

function Footer() {
  return (
    <footer className="border-t border-sky-900 bg-gradient-to-br from-[#1E2A52] to-[#4F8EF7] py-8 font-inter text-white lg:py-9">
      <div className="wide-section-frame grid min-w-0 gap-y-8 gap-x-7 sm:grid-cols-2 lg:grid-cols-[minmax(360px,1.45fr)_minmax(120px,0.65fr)_minmax(190px,0.85fr)_minmax(220px,1fr)] lg:items-start xl:grid-cols-[minmax(390px,1.55fr)_minmax(140px,0.7fr)_minmax(210px,0.9fr)_minmax(260px,1fr)] xl:gap-x-10">
        <div className="min-w-0">
          <div className="flex items-start gap-3 sm:gap-4">
            <LogoMark className="h-12 w-12 shrink-0 sm:h-16 sm:w-16 lg:h-14 lg:w-14 xl:h-[72px] xl:w-[72px]" />
            <div className="min-w-0 pt-1">
              <p className="whitespace-nowrap font-playfair text-[1.75rem] font-bold leading-none tracking-normal sm:text-[2.25rem] lg:text-[2rem] xl:text-[2.45rem]">
                breastbuddies
              </p>
              <p className="mt-2 max-w-[18rem] text-sm leading-6 text-sky-100">
                Because every mother deserves support.
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="font-semibold">Quick Links</p>
          <div className="mt-4 space-y-2 text-sm text-sky-100">
            <a href="/" onClick={(event) => scrollToSection(event, "top")} className="block hover:text-white">Home</a>
            <a href="/#about" onClick={(event) => scrollToSection(event, "about")} className="block hover:text-white">About Divya</a>
            <a href="/#services" onClick={(event) => scrollToSection(event, "services")} className="block hover:text-white">Services</a>
            <a href="/#booking" onClick={(event) => scrollToSection(event, "booking")} className="block hover:text-white">Book Consultation</a>
          </div>
        </div>

        <div>
          <p className="font-semibold">Connect</p>
          <div className="mt-4 space-y-3 text-sm text-sky-100">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex min-w-0 items-center gap-2 break-words hover:text-white">
              <SmallIcon type="whatsapp" color="#22c55e" className="h-5 w-5" />
              <span className="min-w-0">Chat on WhatsApp</span>
            </a>
            <p className="break-words">hello@breastbuddies.com</p>
            <p className="break-words">@breastbuddies</p>
          </div>
        </div>

        <div>
          <p className="font-semibold">Our Commitment</p>
          <p className="mt-4 text-sm leading-7 text-sky-100">
            Empathetic. Evidence-informed. Personalized. Here for every step of
            your feeding journey.
          </p>
        </div>
      </div>
      <div className="wide-section-frame mt-7 text-center font-inter text-sm text-sky-100">
        <p>&copy; 2026 BreastBuddies. All Rights Reserved.</p>
        <p className="mt-2 text-xs text-sky-200">Because every mother deserves support.</p>
      </div>
    </footer>
  )
}

export default Footer
