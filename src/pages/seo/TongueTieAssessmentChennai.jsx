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

const PAGE_PATH = "/tongue-tie-assessment-chennai"
const TITLE = "Tongue Tie Feeding Support Chennai | BreastBuddies"
const DESCRIPTION =
  "BreastBuddies offers feeding observation and lactation support in Chennai when tongue tie or oral function concerns may be affecting breastfeeding."

const FAQ_ITEMS = [
  {
    question: "Does tongue tie always need a procedure?",
    answer:
      "No. Some feeding concerns can be supported with positioning and feeding changes, while others may need review by a qualified medical or dental provider. BreastBuddies helps families understand feeding function and appropriate next steps.",
  },
  {
    question: "Can a quick check miss tongue movement concerns?",
    answer:
      "Sometimes a feeding concern needs more than a brief visual check. Looking at latch, tongue movement, milk transfer, and parent comfort can give a clearer picture of what may be affecting feeds.",
  },
  {
    question: "What happens if in-person medical review is needed?",
    answer:
      "If a concern appears to need hands-on medical assessment, BreastBuddies will explain that clearly and guide you toward appropriate in-person care while continuing feeding support where suitable.",
  },
]

export default function TongueTieAssessmentChennai() {
  return (
    <>
      <SeoHead title={TITLE} description={DESCRIPTION} canonicalPath={PAGE_PATH} />

      <SeoPageShell>
        <SeoPageSchema
          path={PAGE_PATH}
          name="Tongue Tie Feeding Support Chennai"
          description={DESCRIPTION}
          serviceName="Tongue Tie Feeding Support"
          areaServed={{ "@type": "City", name: "Chennai" }}
        />

        <section className="mb-12">
          <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            Tongue Tie Feeding Support in Chennai -{" "}
            <span className="text-rose-700">Latch, Comfort, and Next-Step Guidance</span>
          </h1>

          <div className="mb-8 rounded-xl border border-sky-100 bg-sky-50 p-6">
            <p className="font-semibold text-gray-900">Can tongue tie affect breastfeeding?</p>
            <p className="mt-2 leading-relaxed text-gray-700">
              Tongue movement can affect latch, comfort, sucking patterns, and milk transfer for
              some babies. A lactation-focused assessment looks at how feeding is working, not just
              how the mouth looks at rest.
            </p>
          </div>

          <p className="mb-4 text-lg leading-relaxed text-gray-700">
            If your baby struggles to latch, feeds for long periods without seeming settled, or
            causes ongoing nipple pain during feeding, oral function may be one part of the picture.
          </p>
          <p className="mb-8 text-lg leading-relaxed text-gray-700">
            BreastBuddies provides feeding observation and lactation guidance for Chennai families.
            When a concern needs hands-on assessment or treatment, families are guided toward an
            appropriate medical or dental professional.
          </p>

          <CallToActionBar
            heading="Concerned about latch, pain, or tongue movement?"
            subheading="Call or WhatsApp to discuss the right next step"
          />
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Signs Worth Discussing</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white p-5">
              <h3 className="mb-3 font-semibold text-gray-900">Baby feeding signs</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Difficulty latching or staying latched</li>
                <li>Clicking sounds during feeding</li>
                <li>Sliding off the breast frequently</li>
                <li>Feeds that are very long or unsettled</li>
                <li>Weight gain concerns discussed with your care provider</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-5">
              <h3 className="mb-3 font-semibold text-gray-900">Parent comfort signs</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Persistent nipple pain during feeds</li>
                <li>Cracked, blistered, or flattened nipples</li>
                <li>Feeling like baby is chewing rather than sucking</li>
                <li>Repeated plugged ducts or feeding-related discomfort</li>
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm italic text-gray-600">
            These signs do not diagnose tongue tie by themselves. They are reasons to seek a
            thoughtful feeding assessment.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Related Support</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <ServiceLink title="Full lactation consultation in Chennai" href="/lactation-consultant-chennai" />
            <ServiceLink title="Low milk supply help in Chennai" href="/low-milk-supply-help-chennai" />
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
          heading="Get Feeding Clarity"
          description="Call BreastBuddies for lactation support when latch, pain, or tongue movement concerns are making feeds harder."
        />
      </SeoPageShell>

      <FaqSchema items={FAQ_ITEMS} path={PAGE_PATH} />
    </>
  )
}
