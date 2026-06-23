import { SmallIcon } from "./Graphics"
import antenatalSupport from "../assets/antenatal-support.png"
import postpartumSupport from "../assets/postpartum-support.png"
import specializedSupport from "../assets/specialized-support.png"

const services = [
  {
    title: "Breastfeeding Classes & Assessment During Pregnancy",
    description:
      "Helping expecting mothers and families prepare for a confident breastfeeding journey with caring, personalized support.",
    image: antenatalSupport,
    accent: "#0353A4",
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
      "Supporting mothers and babies through breastfeeding challenges after delivery with practical, mother-friendly care.",
    image: postpartumSupport,
    accent: "#FF477E",
    border: "border-[#FFD1DF]",
    background: "bg-[#FFF8FB]",
    points: [
      "Latch assessment & optimization",
      "Supply management, pain relief & low milk supply support",
      "Engorgement, mastitis & jaundice support",
      "Newborn feeding support for early challenges",
      "Breastfeeding confidence & reassurance",
    ],
  },
  {
    title: "Specialized Lactation Support",
    description:
      "Personalized support for complex feeding situations, tongue tie breastfeeding support, and special care needs.",
    image: specializedSupport,
    accent: "#0353A4",
    border: "border-[#D6E6FF]",
    background: "bg-white",
    points: [
      "Induced lactation & relactation",
      "Cleft lip & palate support",
      "Tongue tie breastfeeding support",
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
      className="rounded-t-[36px] bg-gradient-to-b from-[#F8FBFF] via-white to-[#F8FBFF] px-4 pb-2 pt-8 sm:px-6 lg:rounded-t-[56px] lg:px-8 lg:pb-4 lg:pt-10"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="text-center">
          <h2 className="heading-h2">
            How I Can Support You
          </h2>
          <p className="mx-auto mt-4 max-w-3xl font-inter text-base font-normal leading-7 text-[#1E2A52]/80">
            Compassionate breastfeeding support for every stage of motherhood
            — from pregnancy preparation to newborn feeding and beyond.
          </p>
          <div className="mx-auto mt-3 flex items-center justify-center gap-2 text-[#FF477E]">
            <span className="h-px w-10 bg-[#FF477E]/35" />
            <span className="text-xl leading-none">♥</span>
            <span className="h-px w-10 bg-[#FF477E]/35" />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-8">
          {services.map((service) => (
            <article
              key={service.title}
              className={`flex h-full min-w-0 flex-col justify-between rounded-3xl border ${service.border} ${service.background} p-5 shadow-md shadow-sky-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7 lg:min-h-[500px] lg:p-8`}
            >
              <div>
                <div className="flex min-w-0 flex-col gap-5 sm:flex-row sm:items-start lg:min-h-[210px]">
                  <img
                    src={service.image}
                    alt=""
                    className="h-[112px] w-[112px] max-w-full shrink-0 object-contain sm:h-[130px] sm:w-[130px]"
                  />

                  <div className="min-w-0">
                    <h3 className="heading-h3">
                      {service.title}
                    </h3>
                    <p className="mt-3 font-inter text-sm font-normal leading-relaxed text-[#1E2A52]/80 xl:text-base">
                      {service.description}
                    </p>
                  </div>
                </div>

                <ul className="mt-7 space-y-4 sm:mt-8 sm:space-y-5">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex min-w-0 items-start gap-3 font-inter text-sm font-medium leading-6 text-[#1E2A52]/85 xl:gap-3.5 xl:text-[15px] xl:leading-7"
                    >
                      <span
                        className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 bg-white"
                        style={{ borderColor: service.accent }}
                      >
                        <SmallIcon type="check" color={service.accent} className="h-3.5 w-3.5" />
                      </span>
                      <span className="min-w-0 break-words">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
