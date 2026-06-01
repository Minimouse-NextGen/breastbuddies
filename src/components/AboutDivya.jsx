import { SmallIcon } from "./Graphics"

function AboutDivya() {
  const profileCredentials = [
    { text: "National Trainer for BPNI, India", icon: "online" },
    { text: "Ex ALPI Advisory Team Member", icon: "family" },
    { text: "Professional Advisory Committee Member for GOLD Lactation", icon: "award" },
    { text: "Assessor for Breastfeeding Friendly Hospital Initiative", icon: "shield" },
  ]

  const profileDetails = [
    {
      title: "Qualifications",
      icon: "award",
      items: [
        "Advanced Certified Lactation Professional - Begin It India",
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
      title: "Experience",
      icon: "shield",
      items: [
        "Worked with leading hospitals in India and international exposure at Children's Hospital of Philadelphia, USA.",
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
        <div className="grid items-start gap-8 lg:grid-cols-[0.42fr_0.58fr] xl:gap-10">
          <div className="rounded-[1.35rem] bg-[#F6FBFF] p-5 shadow-[0_16px_42px_rgba(30,42,82,0.09)]">
            <div className="overflow-hidden rounded-[1.2rem] bg-white">
              <img
                src="/divya-dinesh.jpeg"
                alt="Divya Umashankar"
                className="aspect-[4/4.35] h-full w-full object-cover object-[45%_28%]"
              />
            </div>
          </div>

          <div>
            <h2 className="heading-h2">
              Meet <span className="text-[#FF6B9A]">Divya Umashankar</span>
            </h2>

            <div className="mt-5 space-y-5 font-inter text-base font-medium leading-7 text-[#1E2A52]/85">
              <p>
                Divya Umashankar is an Advanced Certified Lactation Professional with specialized
                training in Infant and Young Child Feeding and Maternal, Infant, Young Child and
                Adolescent Nutrition. She supports mothers, babies, and families with compassionate,
                evidence-informed lactation care.
              </p>
              <p>
                Her experience includes antenatal lactation guidance, postpartum breastfeeding
                support, induced lactation, relactation, support for babies with special needs,
                and family-centered feeding care.
              </p>
              <p>
                Divya believes lactation support is not just about feeding a baby at the breast.
                It is about understanding the mother, baby, and family's needs, respecting their
                choices, and helping them make informed, confident feeding decisions.
              </p>
            </div>

            <a
              href="#booking"
              className="consultation-button mt-7 inline-flex min-h-[48px] items-center justify-center rounded-xl px-6 py-3 font-inter text-sm font-semibold"
            >
              Know more
            </a>
          </div>
        </div>

        <div className="mt-5 rounded-3xl border border-[#FFD1DF]/70 bg-white px-5 py-5 shadow-[0_18px_42px_rgba(255,107,154,0.13)]">
          <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
            {profileCredentials.map((credential) => (
              <div key={credential.text} className="flex min-h-[66px] items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#E93F82] text-white shadow-md shadow-pink-500/20">
                  <SmallIcon type={credential.icon} color="#ffffff" className="h-7 w-7" />
                </span>
                <p className="font-inter text-sm font-semibold leading-5 text-[#1E2A52] xl:text-[15px]">
                  {credential.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid overflow-hidden rounded-2xl border border-[#DDE8F7] bg-white shadow-[0_12px_30px_rgba(30,42,82,0.07)] sm:grid-cols-2 lg:grid-cols-4">
          {profileDetails.map((detail) => (
            <div key={detail.title} className="border-b border-[#DDE8F7] p-5 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
              <div className="flex items-start gap-3">
                <SmallIcon type={detail.icon} color="#4F8EF7" className="h-8 w-8 shrink-0" />
                <div>
                  <h3 className="font-playfair text-xl font-bold leading-tight text-[#1E2A52]">
                    {detail.title}
                  </h3>
                  {detail.subtitle && (
                    <p className="mt-1 font-inter text-xs font-semibold text-[#4F8EF7]">
                      {detail.subtitle}
                    </p>
                  )}
                </div>
              </div>
              <ul className="mt-4 space-y-3 font-inter text-sm font-medium leading-6 text-[#1E2A52]/80">
                {detail.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#1E2A52]/70" />
                    <span>{item}</span>
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
