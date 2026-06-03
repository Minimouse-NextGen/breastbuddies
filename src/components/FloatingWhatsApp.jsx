import { SmallIcon } from "./Graphics"

const whatsappLink = "https://wa.me/917299788877?text=Hello%20BreastBuddies%2C%20I%20would%20like%20to%20book%20a%20lactation%20consultation."

function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact breastbuddies on WhatsApp"
      className="fixed bottom-4 right-4 z-50 grid h-12 w-12 place-items-center rounded-full bg-emerald-500 text-white shadow-2xl shadow-emerald-900/25 transition hover:-translate-y-1 hover:bg-emerald-600 sm:bottom-5 sm:right-5 sm:h-14 sm:w-14"
    >
      <SmallIcon type="whatsapp" color="#ffffff" className="h-8 w-8" />
    </a>
  )
}

export default FloatingWhatsApp
