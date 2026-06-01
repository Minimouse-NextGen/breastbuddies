import { SmallIcon } from "./Graphics"

function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/91XXXXXXXXXX"
      target="_blank"
      rel="noreferrer"
      aria-label="Contact breastbuddies on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white shadow-2xl shadow-emerald-900/25 transition hover:-translate-y-1 hover:bg-emerald-600"
    >
      <SmallIcon type="whatsapp" color="#ffffff" className="h-8 w-8" />
    </a>
  )
}

export default FloatingWhatsApp
