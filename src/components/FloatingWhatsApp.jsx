import { SmallIcon } from "./Graphics"
import WhatsAppCallout from "./WhatsAppCallout"

const whatsappLink = "https://wa.me/917299788877?text=Hello%20BreastBuddies%2C%20I%20would%20like%20to%20book%20a%20lactation%20consultation."

function FloatingWhatsApp() {
  return (
    <div className="group fixed bottom-4 right-4 z-50 sm:bottom-5 sm:right-5">
      <WhatsAppCallout
        className="bottom-full right-[8px] mb-4"
        arrowClassName="bottom-[-7px] right-6 border-b border-r"
      />
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
