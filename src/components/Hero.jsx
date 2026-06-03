import { SmallIcon } from "./Graphics"
import { scrollToSection } from "../utils/scrollToSection"

const whatsappLink = "https://wa.me/917299788877?text=Hello%20BreastBuddies%2C%20I%20would%20like%20to%20book%20a%20lactation%20consultation."

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-br from-[#F7FCFF] via-[#EAF4FF] to-[#DFF0FF] pb-16 pt-5 sm:pb-20 lg:min-h-[560px] lg:pt-4">
      <div className="pointer-events-none absolute left-4 top-8 hidden h-20 w-20 rounded-full border-4 border-white/70 lg:block" />
      <div className="pointer-events-none absolute right-[36%] top-12 hidden text-4xl text-white/70 lg:block">♡</div>
      <div className="wide-section-frame grid min-h-0 items-start gap-8 lg:min-h-[440px] lg:grid-cols-[0.92fr_1.08fr] xl:min-h-[470px]">
        <div className="relative z-10 max-w-3xl text-center lg:pt-2 lg:text-left">
          <h1 className="heading-h1">
            <span className="block">Compassionate</span>
            <span className="block">Lactation Support for</span>
            <span className="block italic text-[#FF6B9A]">Every Family</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl font-inter text-base font-medium leading-7 text-[#1E2A52]/85 sm:text-lg lg:mx-0 xl:max-w-2xl">
            Personalized antenatal and postpartum breastfeeding support by Divya
            Umashankar for mothers, babies, and families at every stage of their
            feeding journey with confidence and care.
          </p>

          <div className="mt-6 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center lg:justify-start">
            <a
              href="/#booking"
              onClick={(event) => scrollToSection(event, "booking")}
              className="consultation-button inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-xl px-5 py-3 text-center font-inter text-sm font-semibold leading-tight sm:w-auto sm:max-w-[300px]"
            >
              <SmallIcon type="calendar" color="currentColor" className="h-5 w-5 shrink-0" />
              <span>Book a Virtual Consultation</span>
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-3 rounded-xl border-2 border-[#FF9BB9] bg-white px-5 py-3 text-center font-inter text-sm font-semibold leading-tight text-[#FF6B9A] shadow-sm transition hover:-translate-y-0.5 hover:border-[#FF6B9A] sm:w-auto sm:max-w-[220px]"
            >
              <SmallIcon type="whatsapp" color="#34C38F" className="h-5 w-5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="relative mx-auto flex h-[260px] w-full max-w-full items-center justify-center overflow-hidden pt-4 sm:h-[360px] lg:h-[440px] lg:overflow-visible xl:h-[460px]">
          <div className="absolute left-1/2 top-1/2 h-[230px] w-[230px] max-w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 bg-[#FF6B9A]/12 shadow-[0_18px_55px_rgba(79,142,247,0.12)] sm:h-[320px] sm:w-[320px] lg:h-[390px] lg:w-[390px]" />
          <img
            src="/mother-feeding.png"
            alt="Mother holding and feeding a baby"
            className="relative z-10 h-full max-h-[460px] w-full max-w-full object-contain pt-4 mix-blend-multiply sm:pt-6"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
