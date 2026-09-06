import SeoHead from "../../components/SeoHead"
import {
  BottomCta,
  CallToActionBar,
  FAQ,
  FaqSchema,
  SeoPageSchema,
  SeoPageShell,
  ServiceCard,
  ServiceLink,
} from "./SeoPageParts"

const PAGE_PATH = "/lactation-consultant-chennai"
const TITLE = "Lactation Consultant in Chennai | BreastBuddies"
const DESCRIPTION =
  "BreastBuddies offers lactation consultation in Chennai with Divya Umashankar, ACLP, for latch, milk supply, newborn feeding, and tongue tie concerns."

const FAQ_ITEMS = [
  {
    question: "When should I see a lactation consultant?",
    answer:
      "You can reach out during pregnancy, in the first days after birth, or whenever feeding becomes painful, confusing, or stressful. Earlier support can make it easier to understand latch, milk transfer, and feeding routines.",
  },
  {
    question: "What happens during a lactation consultation?",
    answer:
      "A consultation usually includes listening to your feeding history, observing a feed when possible, reviewing baby behavior and parent comfort, and creating practical next steps for your family.",
  },
  {
    question: "Can BreastBuddies help with latch and milk supply concerns?",
    answer:
      "Yes. BreastBuddies supports families with latch concerns, painful feeding, newborn feeding questions, and low milk supply worries using personalized, evidence-informed guidance.",
  },
  {
    question: "Do you offer home visits in Chennai?",
    answer:
      "Home visit and in-person availability may vary by location and schedule. Please call or WhatsApp BreastBuddies to confirm what is available for your area.",
  },
]

export default function LactationConsultantChennai() {
  return (
    <>
      <SeoHead title={TITLE} description={DESCRIPTION} canonicalPath={PAGE_PATH} />

      <SeoPageShell>
        <SeoPageSchema
          path={PAGE_PATH}
          name="Lactation Consultant in Chennai"
          description={DESCRIPTION}
          serviceName="Lactation Consultation in Chennai"
          areaServed={{ "@type": "City", name: "Chennai" }}
        />

        <section className="mb-12">
          <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            Lactation Consultant in Chennai -{" "}
            <span className="text-rose-700">Breastfeeding Support for Your Family</span>
          </h1>

          <div className="mb-8 rounded-xl border border-sky-100 bg-sky-50 p-6">
            <p className="font-semibold text-gray-900">What does a lactation consultant do?</p>
            <p className="mt-2 leading-relaxed text-gray-700">
              A lactation consultant helps parents understand breastfeeding, latch, milk transfer,
              pumping, newborn feeding patterns, and feeding challenges. At BreastBuddies, Divya
              Umashankar provides practical support based on confirmed lactation training and the
              needs of each mother-baby pair.
            </p>
          </div>

          <p className="mb-6 text-lg leading-relaxed text-gray-700">
            If breastfeeding is not going the way you expected, you are not alone. Many new mothers
            in Chennai need help with painful latching, low milk supply worries, newborn feeding,
            or a baby who struggles to stay at the breast.
          </p>

          <p className="mb-8 text-lg leading-relaxed text-gray-700">
            BreastBuddies supports families across Chennai and also offers{" "}
            <a
              href="/online-lactation-consultation-india"
              className="text-rose-700 underline hover:text-rose-900"
            >
              online lactation consultations in India
            </a>
            . The goal is to understand what is happening, explain it clearly, and help you decide
            the next step with confidence.
          </p>

          <CallToActionBar
            heading="Need breastfeeding support in Chennai?"
            subheading="Call or WhatsApp to check consultation availability"
          />
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            Why Families Choose BreastBuddies
          </h2>

          <p className="mb-4 leading-relaxed text-gray-700">
            Breastfeeding support works best when it is calm, specific, and respectful of the
            family in front of us. BreastBuddies focuses on unhurried guidance for mothers and
            babies, with attention to comfort, feeding behavior, and practical routines at home.
          </p>

          <p className="leading-relaxed text-gray-700">
            Divya Umashankar is confirmed as an Advanced Certified Lactation Professional (ACLP)
            with specializations in infant and young child feeding from BPNI Delhi and maternal,
            infant, young child, and adolescent nutrition from IIT.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">What We Help With</h2>

          <div className="grid gap-6 sm:grid-cols-2">
            <ServiceCard
              title="Latch Assessment & Positioning"
              description="Support for painful feeds, shallow latch, positioning, and baby slipping off the breast."
            />
            <ServiceCard
              title="Low Milk Supply Concerns"
              description="A careful look at weight gain, diaper output, feeding frequency, latch, and parent history before assuming supply is low."
              link="/low-milk-supply-help-chennai"
            />
            <ServiceCard
              title="Tongue Tie Feeding Concerns"
              description="Feeding observation and next-step guidance when tongue movement may be affecting latch, comfort, or milk transfer."
              link="/tongue-tie-assessment-chennai"
            />
            <ServiceCard
              title="Newborn Feeding Support"
              description="Help understanding early feeding patterns, family routines, and when extra feeding support may be needed."
            />
            <ServiceCard
              title="Return-to-Work Pumping Plans"
              description="Support with pumping routines, milk expression, and feeding plans around work schedules."
            />
            <ServiceCard
              title="Online Lactation Consultation"
              description="Video-based breastfeeding support for families who cannot meet in person or are outside Chennai."
              link="/online-lactation-consultation-india"
            />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Related Support</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <ServiceLink title="Low milk supply help in Chennai" href="/low-milk-supply-help-chennai" />
            <ServiceLink title="Tongue tie feeding support in Chennai" href="/tongue-tie-assessment-chennai" />
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
          heading="Ready to Talk Through Feeding Concerns?"
          description="Call or WhatsApp BreastBuddies to check the right consultation option for your family."
        />
      </SeoPageShell>

      <FaqSchema items={FAQ_ITEMS} path={PAGE_PATH} />
    </>
  )
}
