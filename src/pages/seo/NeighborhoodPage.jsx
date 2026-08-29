import { Helmet } from "react-helmet-async"
import {
  BottomCta,
  CallToActionBar,
  FAQ,
  FaqSchema,
  SeoPageShell,
  ServiceLink,
} from "./SeoPageParts"

// Reusable landing page shell for /lactation-consultant-{slug}-chennai routes.
// One component driven by src/content/neighborhoods.js instead of a hand-copied
// file per area, so the six (and any future) neighborhood pages stay in sync.
export default function NeighborhoodPage({ area, areaSlug, nearbyAreas, areaNote }) {
  const title = `Lactation Consultant in ${area} Chennai | BreastBuddies`
  const description = `IBCLC-certified lactation consultant serving ${area}, Chennai. Expert breastfeeding support, latch help & tongue tie assessment. Same-day appointments available.`
  const canonical = `https://www.breastbuddies.co.in/lactation-consultant-${areaSlug}-chennai`

  const faqItems = [
    {
      question: `How quickly can I get an appointment in ${area}?`,
      answer: `We offer same-day and next-day appointments for urgent breastfeeding concerns in ${area} and surrounding areas. Call us to check today's availability.`,
    },
    {
      question: `Do you do home visits in ${area}?`,
      answer: `Yes, we provide home visit consultations in ${area} and nearby neighborhoods. Home visits are ideal for mothers recovering from C-sections or with newborns.`,
    },
    {
      question: "What's the cost of a lactation consultation?",
      answer:
        "Contact us for current consultation fees. One professional session often saves weeks of trial and error — and is more effective than every gadget and supplement combined.",
    },
  ]

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
      </Helmet>

      <SeoPageShell>
        <section className="mb-12">
          <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            Lactation Consultant in {area}, Chennai —{" "}
            <span className="text-rose-700">Breastfeeding Support Near You</span>
          </h1>

          <p className="mb-4 text-lg leading-relaxed text-gray-700">
            Looking for a lactation consultant in {area}, Chennai? BreastBuddies
            provides IBCLC-certified breastfeeding support to new mothers in{" "}
            {area} and surrounding neighborhoods including {nearbyAreas}. Whether
            you're dealing with latch pain, low milk supply, tongue tie
            concerns, or just need expert guidance from someone who's helped
            hundreds of Chennai mothers — we're close by.
          </p>

          <p className="mb-8 text-lg leading-relaxed text-gray-700">{areaNote}</p>

          <CallToActionBar
            heading={`Same-day appointments available in ${area}`}
            subheading="Call now or WhatsApp to book"
          />
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Services Available in {area}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <ServiceLink title="Latch Assessment & Correction" href="/lactation-consultant-chennai" />
            <ServiceLink title="Low Milk Supply Management" href="/low-milk-supply-help-chennai" />
            <ServiceLink title="Tongue Tie Assessment" href="/tongue-tie-assessment-chennai" />
            <ServiceLink title="Nipple Pain & Damage Treatment" href="/lactation-consultant-chennai" />
            <ServiceLink title="Return-to-Work Pumping Plans" href="/lactation-consultant-chennai" />
            <ServiceLink title="Online Consultation" href="/online-lactation-consultation-india" />
          </div>

          <p className="mt-4 text-gray-600">
            Can't travel? We also offer{" "}
            <a
              href="/online-lactation-consultation-india"
              className="text-rose-700 underline hover:text-rose-900"
            >
              online video consultations
            </a>{" "}
            — get the same thorough assessment without leaving {area}.
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
          description={`Breastfeeding doesn't have to be a struggle. Call BreastBuddies for same-day support in ${area}, Chennai.`}
        />
      </SeoPageShell>

      <FaqSchema items={faqItems} />
    </>
  )
}
