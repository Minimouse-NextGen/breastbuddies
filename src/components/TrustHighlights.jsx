import { SmallIcon } from "./Graphics"

const highlights = [
  { title: "Advanced\nCertified Lactation\nProfessional", icon: "award", color: "#4F8EF7", bg: "#EFF6FF" },
  { title: "Antenatal &\nPostpartum Support", icon: "baby", color: "#FF6B9A", bg: "#FFF1F5" },
  { title: "Online\nConsultations", icon: "online", color: "#4F8EF7", bg: "#EFF6FF" },
  { title: "Chennai &\nIndia-wide", icon: "location", color: "#4F8EF7", bg: "#EFF6FF" },
]

function TrustHighlights() {
  return (
    <section className="relative z-10 -mt-10 mb-6 pb-1 pt-0 lg:-mt-12 lg:mb-8">
      <div className="wide-section-frame grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((item) => (
          <div
            key={item.title}
            className="grid min-h-[76px] grid-cols-[44px_1fr] items-center gap-4 rounded-2xl border border-[#E6F0FF] bg-white px-5 py-3 shadow-[0_10px_24px_rgba(30,42,82,0.09)]"
          >
            <span
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full"
              style={{ backgroundColor: item.bg }}
            >
              <SmallIcon type={item.icon} color={item.color} className="h-6 w-6" />
            </span>
            <p className="whitespace-pre-line font-inter text-sm font-bold leading-[1.3] text-[#1E2A52] xl:text-base">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TrustHighlights
