import { SmallIcon } from "./Graphics"

const highlights = [
  { title: "Certified Advanced\nLactation Professional", icon: "award", color: "#0353A4", bg: "#EFF6FF" },
  { title: "Latch Assessment &\nBreastfeeding Support", icon: "baby", color: "#FF477E", bg: "#FFF1F5" },
  { title: "Online Lactation\nConsultations Worldwide", icon: "online", color: "#0353A4", bg: "#EFF6FF" },
  { title: "Chennai & Worldwide\nBreastfeeding Support", icon: "location", color: "#0353A4", bg: "#EFF6FF" },
]

function TrustHighlights() {
  return (
    <section id="trust-highlights" className="relative z-10 mb-6 pb-1 pt-0 sm:-mt-8 lg:-mt-12 lg:mb-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {highlights.map((item) => (
          <div
            key={item.title}
            className="grid min-h-[76px] min-w-0 grid-cols-[44px_minmax(0,1fr)] items-center gap-4 rounded-2xl border border-[#E6F0FF] bg-white px-5 py-3 shadow-[0_10px_24px_rgba(30,42,82,0.09)]"
          >
            <span
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full"
              style={{ backgroundColor: item.bg }}
            >
              <SmallIcon type={item.icon} color={item.color} className="h-6 w-6" />
            </span>
            <p className="min-w-0 whitespace-pre-line break-words font-inter text-sm font-bold leading-[1.3] text-[#1E2A52] xl:text-base">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TrustHighlights
