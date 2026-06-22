import { SmallIcon } from "./Graphics"
import {
  RESPONSE_TIME_MESSAGE,
  WHATSAPP_REASSURANCE_MESSAGE,
} from "../content/consultationContent"

const whatsappLink = "https://wa.me/917299788877?text=Hello%20BreastBuddies%2C%20I%20would%20like%20to%20book%20a%20lactation%20consultation."

function FloatingWhatsApp() {
  return (
    <div className="group fixed bottom-4 right-4 z-50 sm:bottom-5 sm:right-5">
      <div className="pointer-events-none absolute bottom-full right-0 mb-3 w-[280px] translate-y-1 rounded-2xl border border-[#DDE8F7] bg-white p-4 text-left opacity-0 shadow-[0_12px_30px_rgba(30,42,82,0.12)] transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <p className="font-inter text-sm font-semibold leading-6 text-[#0353A4]">
          {WHATSAPP_REASSURANCE_MESSAGE}
        </p>
        <p className="mt-2 font-inter text-sm font-semibold leading-6 text-[#0353A4]/85">
          {RESPONSE_TIME_MESSAGE}
        </p>
      </div>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact BreastBuddies on WhatsApp"
        className="grid h-12 w-12 place-items-center rounded-full bg-emerald-500 text-white shadow-2xl shadow-emerald-900/25 transition hover:-translate-y-1 hover:bg-emerald-600 sm:h-14 sm:w-14"
      >
        <SmallIcon type="whatsapp" color="#ffffff" className="h-8 w-8" />
      </a>
    </div>
  )
}

export default FloatingWhatsApp
