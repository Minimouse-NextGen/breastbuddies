import { BrandTagline, LogoMark, SmallIcon } from "./Graphics"
import { scrollToSection } from "../utils/scrollToSection"

const whatsappLink = "https://wa.me/917299788877?text=Hello%20BreastBuddies%2C%20I%20would%20like%20to%20book%20a%20lactation%20consultation."

function Footer() {
  return (
    <footer className="border-t border-sky-900 bg-gradient-to-br from-[#1E2A52] to-[#4F8EF7] py-8 font-inter text-white lg:py-9">
      <div className="mx-auto w-[92vw] max-w-[1600px] px-4 sm:px-8 lg:px-12 xl:px-[72px]">
        <div className="grid min-w-0 gap-8 md:grid-cols-2 lg:grid-cols-[minmax(320px,420px)_minmax(140px,1fr)_minmax(180px,1fr)_minmax(220px,1.2fr)] lg:items-start lg:gap-x-12 lg:gap-y-8">
          <div className="min-w-0">
            <div className="flex items-center gap-3 sm:gap-4">
              <LogoMark className="h-12 w-12 shrink-0 sm:h-16 sm:w-16 lg:h-14 lg:w-14 xl:h-[72px] xl:w-[72px]" />
              <div className="min-w-0">
                <p className="whitespace-nowrap font-playfair text-[1.75rem] font-bold leading-none tracking-normal sm:text-[2.25rem] lg:text-[2rem] xl:text-[2.45rem]">
                  breastbuddies
                </p>
                <BrandTagline className="mt-2 block text-sm leading-6 text-white/90 md:whitespace-nowrap" />
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <p className="font-semibold text-white">Quick Links</p>
            <div className="mt-4 space-y-2 text-sm text-white/90">
              <a href="/" onClick={(event) => scrollToSection(event, "top")} className="block hover:text-white">Home</a>
              <a href="/#about" onClick={(event) => scrollToSection(event, "about")} className="block hover:text-white">About Divya</a>
              <a href="/#services" onClick={(event) => scrollToSection(event, "services")} className="block hover:text-white">Services</a>
              <a href="/#booking" onClick={(event) => scrollToSection(event, "booking")} className="block hover:text-white">Book Consultation</a>
            </div>
          </div>

          <div className="min-w-0">
            <p className="font-semibold text-white">Connect</p>
            <div className="mt-4 space-y-3 text-sm text-white/90">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-w-0 items-center gap-2 break-words hover:text-white"
              >
                <SmallIcon type="whatsapp" color="#22c55e" className="h-5 w-5 shrink-0" />
                <span className="min-w-0">Chat on WhatsApp</span>
              </a>
              <p className="break-words">hello@breastbuddies.com</p>
              <p className="break-words">@breastbuddies</p>
            </div>
          </div>

          <div className="min-w-0">
            <p className="font-semibold text-white">Our Commitment</p>
            <p className="mt-4 text-sm leading-7 text-white/90">
              Empathetic. Evidence-informed. Personalized. Here for every step of
              your feeding journey.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center font-inter text-sm text-white/90">
          <p>&copy; 2026 BreastBuddies. All Rights Reserved.</p>
          <p className="mt-2 text-xs text-sky-100">Because every mother deserves support.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
