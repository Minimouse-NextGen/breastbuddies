import { Helmet } from "react-helmet-async"
import BookingForm from "../../components/BookingForm"
import { FAQ, FaqSchema, SeoPageShell, ServiceLink } from "./SeoPageParts"

const FAQ_ITEMS = [
  {
    question: "Is an IBCLC credential recognized internationally?",
    answer:
      "Yes. IBCLC (International Board Certified Lactation Consultant) is awarded by the International Board of Lactation Consultant Examiners and is recognized as the gold-standard lactation credential worldwide — it isn't tied to any one country's healthcare system.",
  },
  {
    question: "Do you work with mothers outside India?",
    answer:
      "Yes, we consult with mothers anywhere in the world by video call, with sessions scheduled around your time zone rather than ours.",
  },
  {
    question: "What if I need in-person care for something like tongue tie?",
    answer:
      "We'll say so clearly and help you think through finding the right kind of local provider to examine your baby in person, while continuing to support you remotely for everything else.",
  },
  {
    question: "What do I need for the video call?",
    answer:
      "A phone or laptop with a camera and a stable internet connection. We'll guide you on positioning so we can observe a full feed clearly, just like an in-person visit.",
  },
]

export default function OnlineLactationConsultationInternational() {
  const title = "Online Lactation Consultant | International IBCLC Breastfeeding Support"
  const description =
    "IBCLC-certified online lactation consultations for mothers anywhere in the world. Evidence-based, judgment-free breastfeeding support via video call."
  const canonical = "https://www.breastbuddies.co.in/online-lactation-consultant-international"

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
            Online Lactation Consultant —{" "}
            <span className="text-rose-700">IBCLC Breastfeeding Support, Wherever You Are</span>
          </h1>

          <p className="text-lg leading-relaxed text-gray-700">
            Breastfeeding challenges don't respect borders, and neither does
            good lactation support. BreastBuddies offers IBCLC-certified online
            consultations to mothers anywhere in the world — the same
            internationally recognized clinical credential you'd look for from
            a consultant in your own country, delivered over video call, on
            your schedule.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Why Choose an Online IBCLC Consultation</h2>
          <p className="mb-4 leading-relaxed text-gray-700">
            IBCLC is a globally recognized credential from the International
            Board of Lactation Consultant Examiners, not a location-specific
            qualification — so the clinical quality of your consultation
            doesn't depend on where you happen to live.
          </p>
          <p className="mb-4 leading-relaxed text-gray-700">
            Sessions are unhurried and one-on-one, without the time pressure of
            a rushed in-person appointment squeezed between other patients.
            And a full visual assessment of latch and positioning works well
            over video — we can see what we need to see just as clearly as we
            would in person.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">What We Help With</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <ServiceLink title="Latch Assessment" href="/lactation-consultant-chennai" />
            <ServiceLink title="Milk Supply Evaluation" href="/low-milk-supply-help-chennai" />
            <ServiceLink title="Pumping & Return-to-Work Planning" href="/online-lactation-consultation-nri-mothers" />
            <ServiceLink title="General Feeding Troubleshooting" href="/lactation-consultant-chennai" />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">How It Works</h2>
          <div className="space-y-4">
            {[
              "Book a session at a time that works for you, wherever you are",
              "Join by video call from a phone or laptop — no special equipment needed",
              "Get a full assessment of feeding, latch, and positioning, just as you would in person",
              "Receive a written follow-up plan, with optional follow-up message support after the session",
            ].map((step, i) => (
              <div key={step} className="flex items-start gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-100 text-sm font-semibold text-rose-700">
                  {i + 1}
                </span>
                <p className="pt-1 text-gray-700">{step}</p>
              </div>
            ))}
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
              Fill in the form below and we'll get back to you on WhatsApp, or
              message us directly to start the conversation.
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

      <FaqSchema items={FAQ_ITEMS} />
    </>
  )
}
