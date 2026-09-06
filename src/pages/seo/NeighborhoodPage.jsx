import SeoHead from "../../components/SeoHead"
import {
  BottomCta,
  CallToActionBar,
  FAQ,
  FaqSchema,
  SeoPageSchema,
  SeoPageShell,
  ServiceLink,
} from "./SeoPageParts"

export default function NeighborhoodPage({ area, areaSlug, nearbyAreas, areaNote }) {
  const pagePath = `/lactation-consultant-${areaSlug}-chennai`
  const title = `Lactation Consultant in ${area} Chennai | BreastBuddies`
  const description = `BreastBuddies offers lactation and breastfeeding support for families in ${area}, Chennai, with online consultation options when appropriate.`

  const faqItems = [
    {
      question: `Can BreastBuddies support families in ${area}?`,
      answer: `BreastBuddies states support for families in ${area} and nearby Chennai neighborhoods including ${nearbyAreas}. Please call or WhatsApp to confirm current in-person or online availability.`,
    },
    {
      question: `Are home visits available in ${area}?`,
      answer: `Home visit availability in ${area} needs business confirmation for each enquiry. BreastBuddies can confirm whether in-person or online support is the right fit when you contact us.`,
    },
    {
      question: "What breastfeeding concerns can be discussed?",
      answer:
        "Families commonly ask about latch, nipple pain, low milk supply worries, pumping, newborn feeding, and tongue tie feeding concerns.",
    },
  ]

  return (
    <>
      <SeoHead
        title={title}
        description={description}
        canonicalPath={pagePath}
        robots="noindex,follow"
      />

      <SeoPageShell>
        <SeoPageSchema
          path={pagePath}
          name={`Lactation Consultant in ${area}, Chennai`}
          description={description}
          serviceName="Lactation Consultation"
          areaServed={{ "@type": "City", name: "Chennai" }}
        />

        <section className="mb-12">
          <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            Lactation Consultant in {area}, Chennai -{" "}
            <span className="text-rose-700">Breastfeeding Support Near You</span>
          </h1>

          <p className="mb-4 text-lg leading-relaxed text-gray-700">
            Looking for breastfeeding support in {area}, Chennai? BreastBuddies supports families
            with latch concerns, low milk supply worries, newborn feeding questions, and tongue tie
            feeding concerns.
          </p>

          <p className="mb-8 text-lg leading-relaxed text-gray-700">{areaNote}</p>

          <CallToActionBar
            heading={`Need lactation support in ${area}?`}
            subheading="Call or WhatsApp to confirm current consultation availability"
          />
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Support Available for {area} Families
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <ServiceLink title="Latch assessment and positioning" href="/lactation-consultant-chennai" />
            <ServiceLink title="Low milk supply help" href="/low-milk-supply-help-chennai" />
            <ServiceLink title="Tongue tie feeding support" href="/tongue-tie-assessment-chennai" />
            <ServiceLink title="Online lactation consultation" href="/online-lactation-consultation-india" />
          </div>

          <p className="mt-4 text-gray-600">
            These neighborhood pages are being reviewed for consolidation into a stronger Chennai
            service-area experience.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqItems.map((item) => (
              <FAQ key={item.question} question={item.question} answer={item.answer} />
            ))}
          </div>
        </section>

        <BottomCta
          heading={`Get Breastfeeding Help in ${area}`}
          description={`Call or WhatsApp BreastBuddies to confirm support options for ${area}, Chennai.`}
        />
      </SeoPageShell>

      <FaqSchema items={faqItems} path={pagePath} />
    </>
  )
}
