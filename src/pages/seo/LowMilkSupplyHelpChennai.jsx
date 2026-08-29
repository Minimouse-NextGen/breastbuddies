import { Helmet } from "react-helmet-async"
import {
  BottomCta,
  CallToActionBar,
  FAQ,
  FaqSchema,
  SeoPageShell,
  ServiceLink,
} from "./SeoPageParts"

const FAQ_ITEMS = [
  {
    question: "How do I know if I actually have low milk supply?",
    answer:
      "Many mothers worry about low supply based on signs that are actually normal — softer breasts, shorter feeds, or a baby cluster feeding. A proper assessment looks at your baby's weight gain, wet and dirty diapers, and feeding behavior before assuming supply is the issue.",
  },
  {
    question: "Can low milk supply be fixed?",
    answer:
      "In most cases, yes. Supply usually responds well to correcting the latch, adjusting feeding frequency, and addressing any underlying cause. We build a plan specific to your situation rather than a one-size-fits-all fix.",
  },
  {
    question: "Do I need to take supplements or medication to increase supply?",
    answer:
      "Not always. We start with feeding-based techniques first, since they address the root cause. Supplements or medication are only discussed when appropriate, and always alongside — not instead of — a proper feeding assessment.",
  },
  {
    question: "How soon will I see a difference?",
    answer:
      "Many mothers notice a change within a few days of adjusting feeding technique and frequency. Milk supply responds gradually, so we typically follow up within a week to track progress and adjust the plan.",
  },
]

export default function LowMilkSupplyHelpChennai() {
  const title = "Low Milk Supply Help in Chennai | BreastBuddies IBCLC"
  const description =
    "Worried about low milk supply? IBCLC-certified assessment and a personalized plan to help you build and protect your supply. Serving Chennai and online."
  const canonical = "https://www.breastbuddies.co.in/low-milk-supply-help-chennai"

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
            Low Milk Supply Help in Chennai —{" "}
            <span className="text-rose-700">A Plan Built Around Your Baby</span>
          </h1>

          <p className="mb-4 text-lg leading-relaxed text-gray-700">
            "Am I making enough milk?" is one of the most common worries new
            mothers bring to us — and it's often more complicated than it looks.
            Sometimes supply genuinely needs support. Just as often, supply is
            fine and something else, like a shallow latch, is making feeding
            feel harder than it should.
          </p>

          <p className="mb-8 text-lg leading-relaxed text-gray-700">
            BreastBuddies offers a thorough, judgment-free assessment before
            recommending anything — so you're not guessing with supplements,
            teas, or gadgets that may not address the actual cause.
          </p>

          <CallToActionBar
            heading="Concerned about your milk supply? Get an honest assessment."
            subheading="Call now or WhatsApp for same-day guidance"
          />
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            How We Approach Low Milk Supply
          </h2>

          <p className="mb-4 leading-relaxed text-gray-700">
            Before recommending anything, we look at the full picture: your
            baby's weight trend, feeding frequency and duration, latch quality,
            and any history that could affect supply (delivery type, delayed
            first feed, previous breast surgery, hormonal factors). Perceived
            low supply — where supply is actually adequate — is common, and
            ruling that out first prevents unnecessary stress and unneeded
            supplementation.
          </p>

          <p className="leading-relaxed text-gray-700">
            When supply does need building, we prioritize feeding-based
            techniques — latch correction, paced and responsive feeding,
            recommended pump routines — since they address the root cause
            rather than masking the symptom.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Related Support</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <ServiceLink title="Full Lactation Consultation in Chennai" href="/lactation-consultant-chennai" />
            <ServiceLink title="Tongue Tie Assessment" href="/tongue-tie-assessment-chennai" />
            <ServiceLink title="Online Consultation (Anywhere in India)" href="/online-lactation-consultation-india" />
            <ServiceLink title="Book a Consultation" href="/book-consultation" />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {FAQ_ITEMS.map((item) => (
              <FAQ key={item.question} question={item.question} answer={item.answer} />
            ))}
          </div>
        </section>

        <BottomCta
          heading="Let's Find Out What's Really Going On"
          description="Get a clear, judgment-free answer on your milk supply — and a plan that actually fits your baby."
        />
      </SeoPageShell>

      <FaqSchema items={FAQ_ITEMS} />
    </>
  )
}
