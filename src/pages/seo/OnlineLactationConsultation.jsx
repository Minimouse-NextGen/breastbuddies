import SeoHead from "../../components/SeoHead"
import {
  BottomCta,
  FAQ,
  FaqSchema,
  SeoPageSchema,
  SeoPageShell,
  ServiceLink,
} from "./SeoPageParts"

const PAGE_PATH = "/online-lactation-consultation-india"
const TITLE = "Online Lactation Consultation India | BreastBuddies"
const DESCRIPTION =
  "Book online lactation consultation with BreastBuddies for breastfeeding support, latch questions, milk supply concerns, and feeding guidance across India."

const FAQ_ITEMS = [
  {
    question: "Is an online lactation consultation useful?",
    answer:
      "Online lactation support can be useful for many latch, positioning, milk supply, pumping, and feeding-routine questions. If a hands-on assessment is needed, BreastBuddies will explain that and guide you toward in-person care.",
  },
  {
    question: "What do I need for the session?",
    answer:
      "You need a phone or laptop with a working camera, a stable internet connection, a quiet space, and your baby ready for a feed if feeding observation is part of the session.",
  },
  {
    question: "How does an online consultation work?",
    answer:
      "You share your concern, join by video call, feed or position your baby as guided where appropriate, and receive practical next steps for your feeding situation.",
  },
  {
    question: "Can you help if I am exclusively pumping?",
    answer:
      "Yes. BreastBuddies can help with pumping routines, flange-fit questions, milk expression habits, and planning feeds around your family schedule.",
  },
]

export default function OnlineLactationConsultation() {
  return (
    <>
      <SeoHead title={TITLE} description={DESCRIPTION} canonicalPath={PAGE_PATH} />

      <SeoPageShell>
        <SeoPageSchema
          path={PAGE_PATH}
          name="Online Lactation Consultation India"
          description={DESCRIPTION}
          serviceName="Online Lactation Consultation"
          areaServed={{ "@type": "Country", name: "India" }}
        />

        <section className="mb-12">
          <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            Online Lactation Consultation -{" "}
            <span className="text-rose-700">Breastfeeding Support Across India</span>
          </h1>

          <div className="mb-8 rounded-xl border border-sky-100 bg-sky-50 p-6">
            <p className="font-semibold text-gray-900">How does an online consultation work?</p>
            <p className="mt-2 leading-relaxed text-gray-700">
              You join a video call from home, share your feeding concern, and receive guidance on
              latch, positioning, milk supply, pumping, or next steps. If your situation needs a
              hands-on exam, BreastBuddies will say so clearly.
            </p>
          </div>

          <p className="mb-4 text-lg leading-relaxed text-gray-700">
            You do not need to be in Chennai to get lactation support. BreastBuddies offers online
            consultations for families across India, including parents who do not have easy access
            to local breastfeeding support.
          </p>
          <p className="mb-8 text-lg leading-relaxed text-gray-700">
            During a video consultation, we can discuss feeding history, observe positioning when
            appropriate, talk through{" "}
            <a href="/tongue-tie-assessment-chennai" className="text-rose-700 underline hover:text-rose-900">
              tongue tie feeding concerns
            </a>
            , and create practical next steps for your family.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Why Online Support Can Help</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <BenefitCard title="Your real environment" description="Guidance happens in the chair, room, and routine you actually use at home." />
            <BenefitCard title="Less travel stress" description="You can get support without packing for a clinic visit or timing travel around feeds." />
            <BenefitCard title="Visual feeding guidance" description="Video can support discussion of positioning, latch, pumping setup, and feeding behavior." />
            <BenefitCard title="Clear next steps" description="You leave with practical actions and a sense of when in-person care may be needed." />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">What We Cover</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <ServiceLink title="Latch and positioning support" href="/lactation-consultant-chennai" />
            <ServiceLink title="Low milk supply concerns" href="/low-milk-supply-help-chennai" />
            <ServiceLink title="Tongue tie feeding questions" href="/tongue-tie-assessment-chennai" />
            <ServiceLink title="Request an online consultation" href="/book-consultation" />
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
          heading="Book Your Online Consultation"
          description="Get lactation support from home, with clear guidance on what can be handled online and when in-person assessment is better."
        />
      </SeoPageShell>

      <FaqSchema items={FAQ_ITEMS} path={PAGE_PATH} />
    </>
  )
}

function BenefitCard({ title, description }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5">
      <h3 className="mb-2 font-semibold text-gray-900">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-600">{description}</p>
    </div>
  )
}
