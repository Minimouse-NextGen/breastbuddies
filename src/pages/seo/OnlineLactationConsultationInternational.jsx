import BookingForm from "../../components/BookingForm"
import SeoHead from "../../components/SeoHead"
import { FAQ, FaqSchema, SeoPageSchema, SeoPageShell, ServiceLink } from "./SeoPageParts"

const PAGE_PATH = "/online-lactation-consultant-international"
const TITLE = "Online Lactation Consultant | International Breastfeeding Support"
const DESCRIPTION =
  "Online lactation consultation from BreastBuddies for families outside India who need breastfeeding, pumping, latch, or feeding guidance by video call."

const FAQ_ITEMS = [
  {
    question: "What credential is confirmed for Divya Umashankar?",
    answer:
      "Divya Umashankar is confirmed as an Advanced Certified Lactation Professional (ACLP), with infant and young child feeding and maternal-child nutrition specializations.",
  },
  {
    question: "Do you work with mothers outside India?",
    answer:
      "Yes. BreastBuddies can consult with families outside India by video call when the concern is suitable for online lactation support.",
  },
  {
    question: "What if I need in-person care for something like tongue tie?",
    answer:
      "BreastBuddies will explain when a hands-on exam may be needed and guide you to seek an appropriate local medical or dental professional.",
  },
  {
    question: "What do I need for the video call?",
    answer:
      "A phone or laptop with a working camera and a stable internet connection is usually enough. You may also want a quiet feeding space and any pump or feeding tools you use regularly.",
  },
]

export default function OnlineLactationConsultationInternational() {
  return (
    <>
      <SeoHead title={TITLE} description={DESCRIPTION} canonicalPath={PAGE_PATH} />

      <SeoPageShell>
        <SeoPageSchema
          path={PAGE_PATH}
          name="Online Lactation Consultant"
          description={DESCRIPTION}
          serviceName="International Online Lactation Consultation"
          areaServed={{ "@type": "Place", name: "Online consultations worldwide" }}
        />

        <section className="mb-12">
          <h1 className="mb-6 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            Online Lactation Consultant -{" "}
            <span className="text-rose-700">Breastfeeding Support Wherever You Are</span>
          </h1>

          <div className="mb-8 rounded-xl border border-sky-100 bg-sky-50 p-6">
            <p className="font-semibold text-gray-900">Can lactation support work internationally?</p>
            <p className="mt-2 leading-relaxed text-gray-700">
              Many breastfeeding, pumping, positioning, and feeding-routine questions can be
              supported over video. When a concern requires hands-on care, BreastBuddies will help
              you identify the type of local support to seek.
            </p>
          </div>

          <p className="text-lg leading-relaxed text-gray-700">
            Breastfeeding challenges do not always wait for local appointments. BreastBuddies offers
            online consultations to families outside India when video-based lactation support is a
            good fit.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Why Choose Online Lactation Support</h2>
          <p className="mb-4 leading-relaxed text-gray-700">
            Online care can be especially helpful when you need timely guidance, are recovering at
            home, are exclusively pumping, or want a structured discussion about latch, supply, or
            feeding routines.
          </p>
          <p className="leading-relaxed text-gray-700">
            BreastBuddies keeps the scope of online support clear. If your baby or your situation
            needs a hands-on assessment, that recommendation is part of the plan.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">What We Help With</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <ServiceLink title="Latch assessment and positioning" href="/lactation-consultant-chennai" />
            <ServiceLink title="Milk supply evaluation" href="/low-milk-supply-help-chennai" />
            <ServiceLink title="NRI and expat mother support" href="/online-lactation-consultation-nri-mothers" />
            <ServiceLink title="Request a consultation" href="/book-consultation" />
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
            <h2 className="mb-2 text-2xl font-bold text-gray-900">Book Your Consultation</h2>
            <p className="mx-auto mb-4 max-w-xl text-gray-700">
              Fill in the form below and BreastBuddies will get back to you on WhatsApp, or message
              directly to start the conversation.
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
