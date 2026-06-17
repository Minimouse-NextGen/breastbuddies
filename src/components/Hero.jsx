import { SmallIcon } from "./Graphics"
import { scrollToSection } from "../utils/scrollToSection"

const whatsappLink = "https://wa.me/917299788877?text=Hello%20BreastBuddies%2C%20I%20would%20like%20to%20book%20a%20lactation%20consultation."

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-br from-[#F7FCFF] via-[#EAF4FF] to-[#DFF0FF] pb-16 pt-5 sm:pb-20 lg:min-h-[560px] lg:pt-4">
      <div className="pointer-events-none absolute left-4 top-8 hidden h-20 w-20 rounded-full border-4 border-white/70 lg:block" />
      <div className="pointer-events-none absolute right-[36%] top-12 hidden text-4xl text-white/70 lg:block">♡</div>
      <div className="mx-auto grid min-h-0 max-w-7xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:min-h-[440px] lg:grid-cols-2 lg:px-8 xl:min-h-[470px]">
        <div className="relative z-10 mx-auto w-full max-w-3xl text-center lg:mx-0 lg:pt-2 lg:text-left">
          <h1 className="heading-h1">
            <span className="block">Compassionate</span>
            <span className="block">Lactation Support for</span>
            <span className="block italic text-[#FF477E]">Every Family</span>
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
              className="bb-button bb-button-primary bb-button-full sm:w-auto sm:max-w-[300px]"
            >
              <SmallIcon type="calendar" color="currentColor" className="h-5 w-5 shrink-0" />
              <span>Book a Virtual Consultation</span>
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bb-button bb-button-whatsapp-outline bb-button-full sm:w-auto sm:max-w-[260px]"
            >
              <SmallIcon type="whatsapp" color="#25D366" className="h-4 w-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-full items-center justify-center overflow-hidden pt-4 sm:min-h-[360px] lg:min-h-[440px] lg:overflow-visible xl:min-h-[460px]">
          <div className="absolute left-1/2 top-1/2 h-[230px] w-[230px] max-w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 bg-[#FF477E]/12 shadow-[0_18px_55px_rgba(3,83,164,0.12)] sm:h-[320px] sm:w-[320px] lg:h-[390px] lg:w-[390px]" />
          <img
            src="/mother-feeding.png"
            alt="Mother holding and feeding a baby"
            className="relative z-10 h-auto max-h-[460px] w-full max-w-full object-contain pt-4 mix-blend-multiply sm:pt-6"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
