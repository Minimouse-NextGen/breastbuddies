import { SmallIcon } from "./Graphics"
import antenatalSupport from "../assets/antenatal-support.png"
import postpartumSupport from "../assets/postpartum-support.png"
import specializedSupport from "../assets/specialized-support.png"

const services = [
  {
    title: "Breastfeeding Classes & Assessment During Pregnancy",
    description:
      "Helping expecting mothers and families prepare for a confident breastfeeding journey.",
    image: antenatalSupport,
    accent: "#4F8EF7",
    border: "border-[#D6E6FF]",
    background: "bg-white",
    points: [
      "Prenatal breastfeeding classes",
      "Breastfeeding preparation & expectations",
      "Family breastfeeding education",
      "Building feeding confidence",
    ],
  },
  {
    title: "Postpartum Breastfeeding Support",
    description:
      "Supporting mothers and babies through breastfeeding challenges after delivery.",
    image: postpartumSupport,
    accent: "#FF6B9A",
    border: "border-[#FFD1DF]",
    background: "bg-[#FFF8FB]",
    points: [
      "Latch assessment & optimization",
      "Supply management & pain relief",
      "Engorgement, mastitis & jaundice support",
      "Low milk supply concerns",
      "Breastfeeding confidence & reassurance",
    ],
  },
  {
    title: "Specialized Lactation Support",
    description:
      "Personalized support for complex feeding situations and special care needs.",
    image: specializedSupport,
    accent: "#34C38F",
    border: "border-[#CFF0E5]",
    background: "bg-white",
    points: [
      "Induced lactation & relactation",
      "Cleft lip & palate support",
      "Special feeding needs",
      "Adoption & surrogacy feeding support",
      "Inclusive feeding support",
    ],
  },
]

function Services() {
  return (
    <section
      id="services"
      className="rounded-t-[56px] bg-gradient-to-b from-[#F8FBFF] via-white to-[#F8FBFF] px-4 pb-2 pt-8 sm:px-6 lg:px-8 lg:pb-4 lg:pt-10"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="text-center">
          <h2 className="heading-h2">
            How I Can Support You
          </h2>
          <div className="mx-auto mt-3 flex items-center justify-center gap-2 text-[#FF6B9A]">
            <span className="h-px w-10 bg-[#FFB8CD]" />
            <span className="text-xl leading-none">♥</span>
            <span className="h-px w-10 bg-[#FFB8CD]" />
          </div>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className={`flex h-full min-h-[500px] flex-col justify-between rounded-3xl border ${service.border} ${service.background} p-8 shadow-md shadow-sky-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
            >
              <div>
                <div className="flex min-h-[210px] flex-col gap-5 sm:flex-row sm:items-start">
                  <img
                    src={service.image}
                    alt=""
                    className="h-[130px] w-[130px] shrink-0 object-contain"
                  />

                  <div>
                    <h3 className="heading-h3">
                      {service.title}
                    </h3>
                    <p className="mt-3 font-inter text-sm font-normal leading-relaxed text-[#1E2A52]/80 xl:text-base">
                      {service.description}
                    </p>
                  </div>
                </div>

                <ul className="mt-8 space-y-5">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 font-inter text-sm font-medium leading-6 text-[#1E2A52]/85 xl:gap-3.5 xl:text-[15px] xl:leading-7"
                    >
                      <span
                        className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 bg-white"
                        style={{ borderColor: service.accent }}
                      >
                        <SmallIcon type="check" color={service.accent} className="h-3.5 w-3.5" />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#booking"
                className="mt-8 inline-flex items-center gap-4 font-inter text-sm font-semibold transition hover:gap-5 xl:text-base"
                style={{ color: service.accent }}
              >
                View Full Support Areas
                <span className="text-2xl leading-none" aria-hidden="true">
                  →
                </span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
