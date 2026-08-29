import { Helmet } from "react-helmet-async"
import BookingForm from "../../components/BookingForm"
import { FAQ, FaqSchema, SeoPageShell, ServiceLink } from "./SeoPageParts"

const FAQ_ITEMS = [
  {
    question: "Can you actually help if I'm not in India?",
    answer:
      "Yes — most breastfeeding challenges (latch, positioning, milk supply, pumping, weaning worries) can be thoroughly assessed and supported over video, wherever you're based. It's the same assessment approach we use in person, adapted for a screen.",
  },
  {
    question: "How do the time zones work for scheduling?",
    answer:
      "We schedule sessions to overlap with common evening or morning hours in the US, UK, Canada, and Australia relative to Indian Standard Time. Time zone differences are something we plan around, not a barrier to booking.",
  },
  {
    question: "If my baby needs an in-person exam (like for tongue tie), what happens?",
    answer:
      "If we spot something that needs a hands-on exam, we'll tell you clearly and help you think through finding the right kind of local provider to see in person, while continuing to support you remotely for everything else.",
  },
  {
    question: "Do you understand things like confinement period practices and family expectations?",
    answer:
      "Yes. We're familiar with common Indian postpartum practices and the family dynamics that often come with them, and we work with what matters to you and your family rather than dismissing it as unnecessary.",
  },
]

export default function OnlineLactationConsultationNRI() {
  const title = "Online Lactation Consultant for NRI Mothers | BreastBuddies IBCLC"
  const description =
    "IBCLC-certified online lactation support for NRI and Indian mothers abroad in the USA, UK, Canada & Australia. Culturally aware breastfeeding help via video call."
  const canonical = "https://www.breastbuddies.co.in/online-lactation-consultation-nri-mothers"

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
            Online Lactation Consultant for NRI Mothers —{" "}
            <span className="text-rose-700">Breastfeeding Support That Understands Your World</span>
          </h1>

          <p className="text-lg leading-relaxed text-gray-700">
            Being a new mother away from home is hard enough. Add breastfeeding
            struggles, a pediatrician unfamiliar with the postpartum practices
            you grew up with, and family "helping" over video calls from
            thousands of miles away, and it can feel isolating fast.
            BreastBuddies provides IBCLC-certified online lactation
            consultations built specifically for NRI and expat Indian mothers
            in the USA, UK, Canada, Australia, and beyond — combining
            international clinical standards with an understanding of the
            cultural context you're navigating.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Why NRI Mothers Choose BreastBuddies</h2>
          <p className="mb-4 leading-relaxed text-gray-700">
            We understand Indian postpartum traditions — confinement period
            practices, family involvement, foods believed to help supply —
            without dismissing them as old-fashioned. If they matter to you or
            your family, they're part of the conversation, not something we
            talk you out of.
          </p>
          <p className="mb-4 leading-relaxed text-gray-700">
            We also bridge the gap between what your Western pediatrician says
            and what your family back home expects, so you're not stuck
            translating between two systems of advice on your own. And because
            we speak the same cultural language, you don't have to spend the
            first ten minutes of every session explaining context.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">We Work Around Your Time Zone</h2>
          <p className="leading-relaxed text-gray-700">
            Sessions are scheduled to overlap with common evening or morning
            hours in the US, UK, Canada, and Australia relative to Indian
            Standard Time. Whatever part of the world you're in, time zone is
            never a reason not to book — tell us where you are and we'll find
            a slot that works.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">What We Help With</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <ServiceLink title="Latch & Positioning Support" href="/lactation-consultant-chennai" />
            <ServiceLink title="Low Milk Supply Guidance" href="/low-milk-supply-help-chennai" />
            <ServiceLink title="Tongue Tie Guidance (with local specialist referral)" href="/tongue-tie-assessment-chennai" />
            <ServiceLink title="Pumping & Return-to-Work Planning" href="/online-lactation-consultant-international" />
          </div>
          <p className="mt-4 text-gray-700">
            When family and community support isn't nearby, having someone who
            understands both the clinical side and the cultural side makes a
            real difference — that's what we aim to be for you.
          </p>
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
              Fill in the form below and we'll get back to you on WhatsApp, or
              message us directly if that's easier from where you are.
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
