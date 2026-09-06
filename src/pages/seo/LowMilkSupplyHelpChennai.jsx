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

const PAGE_PATH = "/low-milk-supply-help-chennai"
const TITLE = "Low Milk Supply Help in Chennai | BreastBuddies"
const DESCRIPTION =
  "Worried about low milk supply? BreastBuddies offers lactation assessment and a personalized feeding plan for Chennai families and online clients."

const FAQ_ITEMS = [
  {
    question: "How do I know if I actually have low milk supply?",
    answer:
      "Many mothers worry about low supply based on signs that can also be normal, such as softer breasts, shorter feeds, or cluster feeding. A proper assessment looks at baby's weight gain, wet and dirty diapers, and feeding behavior before assuming supply is the issue.",
  },
  {
    question: "Can low milk supply be improved?",
    answer:
      "Many supply concerns improve when latch, feeding frequency, milk transfer, and pumping routines are addressed. The right plan depends on the cause, so BreastBuddies starts with an assessment rather than a one-size-fits-all fix.",
  },
  {
    question: "Do I need supplements or medication to increase supply?",
    answer:
      "Not always. Feeding-based techniques are usually reviewed first. Supplements or medication should be discussed only when appropriate and alongside a proper feeding assessment.",
  },
  {
    question: "When should I seek support for low milk supply worries?",
    answer:
      "Seek support if your baby has poor weight gain, fewer wet or dirty diapers than expected, ongoing feeding distress, painful latch, or if you feel unsure about how feeding is going.",
  },
]

export default function LowMilkSupplyHelpChennai() {
  return (
    <>
      <SeoHead title={TITLE} description={DESCRIPTION} canonicalPath={PAGE_PATH} />

      <SeoPageShell>
        <SeoPageSchema
          path={PAGE_PATH}
          name="Low Milk Supply Help in Chennai"
          description={DESCRIPTION}
          serviceName="Low Milk Supply Lactation Support"
          areaServed={{ "@type": "City", name: "Chennai" }}
        />

        <section className="mb-12">
          <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            Low Milk Supply Help in Chennai -{" "}
            <span className="text-rose-700">A Plan Built Around Your Baby</span>
          </h1>

          <div className="mb-8 rounded-xl border border-sky-100 bg-sky-50 p-6">
            <p className="font-semibold text-gray-900">What can cause low milk supply concerns?</p>
            <p className="mt-2 leading-relaxed text-gray-700">
              Milk supply concerns can come from latch difficulties, feeding frequency, milk
              transfer, pumping routines, parent health history, or normal changes that only feel
              like low supply. A proper assessment looks at the full feeding picture before making
              a plan.
            </p>
          </div>

          <p className="mb-4 text-lg leading-relaxed text-gray-700">
            "Am I making enough milk?" is one of the most common worries new mothers bring to us.
            Sometimes supply genuinely needs support. Just as often, supply is fine and something
            else, like a shallow latch, is making feeding feel harder than it should.
          </p>

          <p className="mb-8 text-lg leading-relaxed text-gray-700">
            BreastBuddies offers a thorough, judgment-free assessment before recommending a plan,
            so families are not left guessing with supplements, teas, or gadgets that may not
            address the actual cause.
          </p>

          <CallToActionBar
            heading="Concerned about your milk supply? Get an honest assessment."
            subheading="Call or WhatsApp to check consultation availability"
          />
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            How We Approach Low Milk Supply
          </h2>

          <p className="mb-4 leading-relaxed text-gray-700">
            Before recommending anything, we look at the full picture: baby's weight trend, feeding
            frequency and duration, latch quality, and any history that could affect supply, such
            as delivery type, delayed first feed, previous breast surgery, or hormonal factors.
          </p>

          <p className="leading-relaxed text-gray-700">
            When supply does need building, BreastBuddies focuses on practical next steps such as
            latch correction, responsive feeding, and pump routines that fit the family.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Related Support</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <ServiceLink title="Full lactation consultation in Chennai" href="/lactation-consultant-chennai" />
            <ServiceLink title="Tongue tie feeding support" href="/tongue-tie-assessment-chennai" />
            <ServiceLink title="Online lactation consultation in India" href="/online-lactation-consultation-india" />
            <ServiceLink title="Request a lactation consultation" href="/book-consultation" />
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
          description="Get a clear, judgment-free look at your milk supply concern and a plan that fits your baby."
        />
      </SeoPageShell>

      <FaqSchema items={FAQ_ITEMS} path={PAGE_PATH} />
    </>
  )
}
