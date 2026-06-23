import { SmallIcon } from "./Graphics"
import { scrollToSection } from "../utils/scrollToSection"

function AboutDivya() {
  const profileCredentials = [
    { text: "National Trainer for BPNI, India", icon: "online" },
    { text: "Former Advisory Team Member, ALPI", icon: "family" },
    { text: "Professional Advisory Committee Member for GOLD Lactation", icon: "award" },
    { text: "Assessor for Breastfeeding Friendly Hospital Initiative", icon: "shield" },
  ]

  const profileDetails = [
    {
      title: "Qualifications",
      icon: "award",
      items: [
        "Advanced Certified Lactation Professional (ACLP)",
        "Infant & Young Child Feeding Specialization - BPNI Delhi",
        "Maternal, Infant, Young Child & Adolescent Nutrition Specialization - IIT",
      ],
    },
    {
      title: "Mentored By",
      icon: "family",
      items: [
        "Dr. Padmini Balagopal (IBCLC)",
        "Dr. Shacchhee Baweja (Pediatrician & IBCLC)",
      ],
    },
    {
      title: "Experience & Global Exposure",
      icon: "shield",
      items: [
        "Worked with leading hospitals in India and gained international training exposure at Children's Hospital of Philadelphia, USA, observing advanced newborn and NICU care practices to better support mothers and babies.",
      ],
    },
    {
      title: "Hospital Associations",
      subtitle: "(Visiting Consultant)",
      icon: "online",
      items: [
        "Joseph Hospital, Chetpet",
        "Apollo Hospitals",
        "Kauvery Hospital",
      ],
    },
  ]

  return (
    <section id="about" className="bg-white pb-8 pt-6 lg:pb-10 lg:pt-8">
      <div className="section-frame">
        <div className="grid min-w-0 items-start gap-8 lg:grid-cols-[minmax(500px,0.46fr)_minmax(0,0.54fr)] xl:gap-10">
          <div className="mx-auto mb-[300px] w-full max-w-[640px] rounded-[8px] bg-[#F6FBFF] p-[8px] shadow-[0_16px_42px_rgba(30,42,82,0.09)] sm:mb-[230px] lg:mb-[120px] lg:max-w-none">
            <div className="relative">
              <div className="overflow-hidden rounded-[8px] bg-white">
                <img
                  src="/divya-dinesh.jpeg"
                  alt="Divya Umashankar"
                  className="aspect-square h-full w-full max-w-full object-cover object-center"
                />
              </div>
              <div className="absolute bottom-0 left-1/2 grid w-[98%] max-w-[600px] -translate-x-1/2 translate-y-[82%] grid-cols-2 gap-2 rounded-[12px] border border-[rgba(246,90,150,0.14)] bg-[rgba(255,246,249,0.92)] px-2.5 py-2.5 shadow-[0_12px_30px_rgba(30,41,59,0.10)] backdrop-blur-[8px] max-[379px]:grid-cols-1 lg:grid-cols-4">
                {profileCredentials.map((credential) => (
                  <div
                    key={credential.text}
                    className="flex min-h-[95px] min-w-0 flex-col items-center justify-start rounded-[10px] border border-[rgba(246,90,150,0.12)] bg-white px-1.5 py-2 text-center shadow-[0_8px_18px_rgba(30,41,59,0.06)]"
                  >
                    <span className="mb-1.5 flex h-[38px] shrink-0 items-center justify-center">
                      <span className="grid h-[34px] w-[34px] place-items-center rounded-full bg-[#F33D8A] text-white shadow-[0_8px_16px_rgba(243,61,138,0.22)]">
                        <SmallIcon type={credential.icon} color="#ffffff" className="h-4 w-4" />
                      </span>
                    </span>
                    <p className="min-h-[36px] min-w-0 whitespace-normal break-normal font-inter text-[10px] font-bold leading-[1.25] text-[#17254D] [overflow-wrap:normal] [word-break:normal]">
                      {credential.text}
                    </p>
                    <span className="mt-1.5 h-[2px] w-6 rounded-full bg-[#F65A96]" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <h2 className="heading-h2">
              Meet <span className="text-[#FF477E]">Divya Umashankar</span>
            </h2>

            <div className="mt-5 space-y-5 font-inter text-base font-medium leading-7 text-[#1E2A52]/85">
              <p>
                Divya Umashankar is a Certified Advanced Lactation Professional
                and Lactation Consultant with specialized training in Infant and
                Young Child Feeding. She supports mothers, babies, and families
                with compassionate, evidence-based care.
              </p>
              <p>
                She has many years of experience working with families from
                different parts of the world. Her work across diverse settings
                helps her offer support that is respectful, practical, and
                tailored to each family's needs.
              </p>
              <p>
                Her experience includes antenatal lactation guidance,
                postpartum breastfeeding support, induced lactation,
                relactation, support for babies with special needs, and
                family-centered feeding care.
              </p>
              <p>
                Divya Umashankar believes lactation support is not just about
                feeding a baby at the breast. It is about understanding the
                mother, baby, and family's needs, respecting their choices, and
                helping them make informed, confident feeding decisions.
              </p>
            </div>

            <a
              href="/#booking"
              onClick={(event) => scrollToSection(event, "booking")}
              className="bb-button bb-button-secondary mt-7"
            >
              Know more
            </a>
          </div>
        </div>

        <div className="mt-6 grid min-w-0 overflow-hidden rounded-2xl border border-[#DDE8F7] bg-white shadow-[0_12px_30px_rgba(30,42,82,0.07)] sm:grid-cols-2 lg:grid-cols-4">
          {profileDetails.map((detail) => (
            <div key={detail.title} className="min-w-0 border-b border-[#DDE8F7] p-5 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
              <div className="flex items-start gap-3">
                <SmallIcon type={detail.icon} color="#0353A4" className="h-8 w-8 shrink-0" />
                <div className="min-w-0">
                  <h3 className="font-playfair text-xl font-bold leading-tight text-[#1E2A52]">
                    {detail.title}
                  </h3>
                  {detail.subtitle && (
                    <p className="mt-1 font-inter text-xs font-semibold text-[#0353A4]">
                      {detail.subtitle}
                    </p>
                  )}
                </div>
              </div>
              <ul className="mt-4 space-y-3 font-inter text-sm font-medium leading-6 text-[#1E2A52]/80">
                {detail.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#1E2A52]/70" />
                    <span className="min-w-0 break-words">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutDivya
