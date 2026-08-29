import { Helmet } from "react-helmet-async"

export default function LactationConsultantChennai() {
  return (
    <>
      <Helmet>
        <title>Lactation Consultant in Chennai | BreastBuddies IBCLC</title>
        <meta
          name="description"
          content="IBCLC-certified lactation consultant in Chennai. Expert help with latching, milk supply, tongue tie & more. Same-day appointments. Book now."
        />
        <link
          rel="canonical"
          href="https://www.breastbuddies.co.in/lactation-consultant-chennai"
        />
        <meta
          property="og:title"
          content="Lactation Consultant in Chennai | BreastBuddies IBCLC"
        />
        <meta
          property="og:description"
          content="IBCLC-certified lactation consultant in Chennai. Expert help with latching, milk supply, tongue tie & more."
        />
        <meta
          property="og:url"
          content="https://www.breastbuddies.co.in/lactation-consultant-chennai"
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Lactation Consultant in Chennai —{" "}
            <span className="text-rose-700">
              IBCLC Certified Breastfeeding Support
            </span>
          </h1>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            If breastfeeding isn't going the way you expected, you're not alone —
            and you're not failing. Many new mothers in Chennai struggle with
            painful latching, low milk supply, or a baby who refuses to feed.
            These problems feel overwhelming at 3 AM, but they almost always have
            solutions.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            BreastBuddies is an{" "}
            <strong>IBCLC-certified lactation consultant</strong> serving mothers
            across Chennai, from Adyar and T. Nagar to Anna Nagar and Velachery.
            Whether you need hands-on help today or an{" "}
            <a
              href="/online-lactation-consultation-india"
              className="text-rose-700 underline hover:text-rose-900"
            >
              online consultation
            </a>{" "}
            from home, we're here to make breastfeeding work for you and your
            baby.
          </p>

          <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="font-semibold text-gray-900">
                Struggling with breastfeeding? Same-day appointments available.
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Call now or WhatsApp for immediate support
              </p>
            </div>
            <a
              href="tel:+917338890927"
              className="inline-flex items-center px-6 py-3 bg-rose-700 text-white font-semibold rounded-lg hover:bg-rose-800 transition-colors"
            >
              Call Now
            </a>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Chennai Mothers Choose BreastBuddies
          </h2>

          <p className="text-gray-700 leading-relaxed mb-4">
            Chennai mothers face unique breastfeeding challenges — from the heat
            affecting hydration and milk supply to well-meaning family advice
            that sometimes conflicts with evidence-based guidance. As an{" "}
            <strong>
              International Board Certified Lactation Consultant (IBCLC)
            </strong>
            , we bring clinical expertise that goes beyond what a pediatrician or
            family elder can offer.
          </p>

          <p className="text-gray-700 leading-relaxed mb-4">
            Unlike hospital-based consultants where you get 15 minutes between
            rounds, BreastBuddies provides unhurried, one-on-one sessions
            focused entirely on your feeding concerns. We've helped mothers
            across Chennai's neighborhoods — from first-time mothers in Besant
            Nagar nervous about their baby's latch to experienced mothers in
            Porur dealing with a tongue-tied second child.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Our approach is <strong>patient, gentle, and completely
            non-judgmental</strong>. We know you've probably already tried
            everything Google suggested. We start where you are and work from
            there.
          </p>
        </section>

        {/* Services Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What We Help With
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            <ServiceCard
              title="Latch Assessment & Correction"
              description="If feeding hurts or your baby can't maintain a deep latch, we observe a full feed, identify the problem, and correct it — often in a single session. Most mothers feel a difference immediately."
            />
            <ServiceCard
              title="Low Milk Supply"
              description="Before assuming supply is low, we assess whether it actually is (perceived low supply is common). If it is, we build a personalized plan using evidence-based techniques to increase production."
              link="/low-milk-supply-help-chennai"
            />
            <ServiceCard
              title="Tongue Tie & Lip Tie Evaluation"
              description="Tongue tie is frequently missed by pediatricians. We perform a thorough oral assessment and, if needed, refer to trusted ENTs in Chennai for frenectomy."
              link="/tongue-tie-assessment-chennai"
            />
            <ServiceCard
              title="Painful Feeding & Nipple Damage"
              description="Cracked, bleeding, or blistered nipples signal a latch problem, not a reason to stop breastfeeding. We fix the root cause so feeding becomes comfortable."
            />
            <ServiceCard
              title="Return-to-Work Pumping Plans"
              description="Going back to work doesn't mean stopping breastfeeding. We create a pumping and storage schedule tailored to your office hours and commute."
            />
            <ServiceCard
              title="Online Lactation Consultation"
              description="Can't visit in person? Our video consultations serve mothers anywhere in India with the same thorough assessment and follow-up support."
              link="/online-lactation-consultation-india"
            />
          </div>
        </section>

        {/* Social Proof / Reviews */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What Mothers Say
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <ReviewCard
              quote="She was patient and non-judgmental. My baby latched properly in the first visit itself."
              name="[Client Name]"
              area="Adyar, Chennai"
            />
            <ReviewCard
              quote="I was desperate and exhausted. Within one session, feeding was painless for the first time."
              name="[Client Name]"
              area="Anna Nagar, Chennai"
            />
          </div>

          <p className="text-sm text-gray-500 mt-4 italic">
            Replace placeholders with real client testimonials
          </p>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <FAQ
              question="When should I see a lactation consultant?"
              answer="Ideally within the first week after birth if breastfeeding isn't going smoothly. But it's never too late — we help mothers of babies from newborn to 12+ months old."
            />
            <FAQ
              question="What does an IBCLC do differently from a breastfeeding counselor?"
              answer="An IBCLC (International Board Certified Lactation Consultant) has completed 1,000+ hours of clinical lactation training and passed a rigorous international exam. It's the highest credential in lactation care — equivalent to a specialization, not just a workshop certificate."
            />
            <FAQ
              question="How many sessions will I need?"
              answer="Most breastfeeding problems improve significantly within 1–2 sessions. Complex cases (tongue tie, severe supply issues) may need 3–4 sessions with follow-up."
            />
            <FAQ
              question="Do you offer home visits in Chennai?"
              answer="Yes, we offer home visit consultations across Chennai. Home visits are ideal for mothers recovering from C-sections or with newborns who shouldn't be taken out yet."
            />
            <FAQ
              question="How much does a lactation consultation cost?"
              answer="Contact us for current consultation fees. One professional session often saves weeks of trial and error — and is more effective than every gadget and supplement combined."
            />
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-rose-50 border border-rose-200 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Ready to Get Help?
          </h2>
          <p className="text-gray-700 mb-6 max-w-xl mx-auto">
            Breastfeeding doesn't have to be a struggle. Call BreastBuddies today
            for same-day support in Chennai.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+917338890927"
              className="inline-flex items-center justify-center px-6 py-3 bg-rose-700 text-white font-semibold rounded-lg hover:bg-rose-800 transition-colors"
            >
              Call Now
            </a>
            <a
              href="https://wa.me/917338890927"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-rose-700 text-rose-700 font-semibold rounded-lg hover:bg-rose-50 transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </section>
      </main>

      {/* FAQ Schema for this page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "When should I see a lactation consultant?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Ideally within the first week after birth if breastfeeding isn't going smoothly. But it's never too late — we help mothers of babies from newborn to 12+ months old.",
                },
              },
              {
                "@type": "Question",
                name: "What does an IBCLC do differently from a breastfeeding counselor?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "An IBCLC has completed 1,000+ hours of clinical lactation training and passed a rigorous international exam. It's the highest credential in lactation care.",
                },
              },
              {
                "@type": "Question",
                name: "How many sessions will I need?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most breastfeeding problems improve significantly within 1–2 sessions. Complex cases may need 3–4 sessions with follow-up.",
                },
              },
            ],
          }),
        }}
      />
    </>
  )
}

function ServiceCard({ title, description, link }) {
  const content = (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow h-full">
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  )

  if (link) {
    return <a href={link} className="block">{content}</a>
  }
  return content
}

function ReviewCard({ quote, name, area }) {
  return (
    <blockquote className="bg-white border border-gray-200 rounded-lg p-5">
      <p className="text-gray-700 italic mb-3">"{quote}"</p>
      <footer className="text-sm text-gray-500">
        — {name}, {area}
      </footer>
    </blockquote>
  )
}

function FAQ({ question, answer }) {
  return (
    <details className="group border-b border-gray-200 pb-4">
      <summary className="cursor-pointer font-semibold text-gray-900 group-open:text-rose-700 list-none flex justify-between items-center">
        {question}
        <span className="text-gray-400 group-open:rotate-45 transition-transform text-xl">
          +
        </span>
      </summary>
      <p className="text-gray-600 mt-3 leading-relaxed">{answer}</p>
    </details>
  )
}
