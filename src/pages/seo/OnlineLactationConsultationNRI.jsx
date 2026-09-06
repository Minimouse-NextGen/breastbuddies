import BookingForm from "../../components/BookingForm"
import SeoHead from "../../components/SeoHead"
import { FAQ, FaqSchema, SeoPageSchema, SeoPageShell, ServiceLink } from "./SeoPageParts"

const PAGE_PATH = "/online-lactation-consultation-nri-mothers"
const TITLE = "Online Lactation Consultant for NRI Mothers | BreastBuddies"
const DESCRIPTION =
  "Online lactation support for NRI and Indian mothers abroad, with culturally aware breastfeeding guidance from BreastBuddies."

const FAQ_ITEMS = [
  {
    question: "Can you help if I am not in India?",
    answer:
      "Yes. Many breastfeeding challenges, including latch, positioning, pumping, and milk supply worries, can be discussed over video. If a concern needs hands-on care, BreastBuddies will guide you to seek local in-person support.",
  },
  {
    question: "How do time zones work for scheduling?",
    answer:
      "Time zone fit depends on availability. Share where you are based when you enquire, and BreastBuddies will confirm whether a suitable online consultation slot is available.",
  },
  {
    question: "What if my baby needs an in-person exam?",
    answer:
      "If feeding signs suggest a hands-on exam may be needed, BreastBuddies will explain that clearly and help you think through the type of local provider to contact.",
  },
  {
    question: "Do you understand Indian postpartum practices and family expectations?",
    answer:
      "Yes. BreastBuddies can discuss common Indian postpartum practices and family dynamics respectfully while helping you make informed feeding decisions.",
  },
]

export default function OnlineLactationConsultationNRI() {
  return (
    <>
      <SeoHead title={TITLE} description={DESCRIPTION} canonicalPath={PAGE_PATH} />

      <SeoPageShell>
        <SeoPageSchema
          path={PAGE_PATH}
          name="Online Lactation Consultant for NRI Mothers"
          description={DESCRIPTION}
          serviceName="Online Lactation Support for NRI Mothers"
          areaServed={{ "@type": "Place", name: "Online consultations for Indian families abroad" }}
        />

        <section className="mb-12">
          <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            Online Lactation Consultant for NRI Mothers -{" "}
            <span className="text-rose-700">Breastfeeding Support That Understands Your World</span>
          </h1>

          <div className="mb-8 rounded-xl border border-sky-100 bg-sky-50 p-6">
            <p className="font-semibold text-gray-900">How can online support help NRI mothers?</p>
            <p className="mt-2 leading-relaxed text-gray-700">
              Online support gives you a calm place to discuss breastfeeding questions, cultural
              expectations, family advice, and practical feeding concerns when you are away from
              familiar support systems.
            </p>
          </div>

          <p className="text-lg leading-relaxed text-gray-700">
            Being a new mother away from home can feel isolating. BreastBuddies offers online
            lactation consultations for NRI and expat Indian mothers, combining practical feeding
            support with respect for the cultural context many Indian families navigate after birth.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Why NRI Mothers Choose BreastBuddies</h2>
          <p className="mb-4 leading-relaxed text-gray-700">
            BreastBuddies can discuss common Indian postpartum traditions, family involvement, and
            feeding expectations without dismissing what matters to you. The goal is to help you
            make informed choices while keeping your family context in view.
          </p>
          <p className="leading-relaxed text-gray-700">
            Online sessions can support latch and positioning questions, milk supply worries,
            pumping routines, weaning questions, and decision-making about when local in-person
            care is needed.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Related Support</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <ServiceLink title="Latch and positioning support" href="/lactation-consultant-chennai" />
            <ServiceLink title="Low milk supply guidance" href="/low-milk-supply-help-chennai" />
            <ServiceLink title="Tongue tie feeding questions" href="/tongue-tie-assessment-chennai" />
            <ServiceLink title="International online lactation consultation" href="/online-lactation-consultant-international" />
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

        <section className="mb-12">
          <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 p-6 text-center">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">Book Your Online Consultation</h2>
            <p className="mx-auto mb-4 max-w-xl text-gray-700">
              Fill in the form below and BreastBuddies will get back to you on WhatsApp, or message
              directly if that is easier from where you are.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="tel:+917338890927"
                className="inline-flex items-center justify-center rounded-lg bg-rose-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-rose-800"
              >
                Call Now
              </a>
              <a
                href="https://wa.me/917338890927"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border-2 border-rose-700 px-6 py-3 font-semibold text-rose-700 transition-colors hover:bg-rose-50"
              >
                WhatsApp Us Instead
              </a>
            </div>
          </div>
          <BookingForm />
        </section>
      </SeoPageShell>

      <FaqSchema items={FAQ_ITEMS} path={PAGE_PATH} />
    </>
  )
}
