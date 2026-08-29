import { Helmet } from "react-helmet-async"

export default function OnlineLactationConsultation() {
  return (
    <>
      <Helmet>
        <title>Online Lactation Consultation India | BreastBuddies IBCLC</title>
        <meta
          name="description"
          content="Book an online lactation consultation with an IBCLC-certified consultant. Expert breastfeeding support via video call, anywhere in India."
        />
        <link
          rel="canonical"
          href="https://www.breastbuddies.co.in/online-lactation-consultation-india"
        />
        <meta
          property="og:title"
          content="Online Lactation Consultation India | BreastBuddies IBCLC"
        />
        <meta
          property="og:description"
          content="Book an online lactation consultation with an IBCLC-certified consultant. Expert breastfeeding support via video call, anywhere in India."
        />
        <meta
          property="og:url"
          content="https://www.breastbuddies.co.in/online-lactation-consultation-india"
        />
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <section className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            Online Lactation Consultation —{" "}
            <span className="text-rose-700">IBCLC Breastfeeding Support Across India</span>
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">You don't need to be in Chennai to get expert breastfeeding help. BreastBuddies' online lactation consultations bring IBCLC-certified support to your home — whether you're in Mumbai, Bangalore, Delhi, Hyderabad, or a small town where lactation consultants simply don't exist.</p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">All you need is a phone or laptop with a camera. We observe a full feed over video, assess your baby's latch and positioning, check for <a href="/tongue-tie-assessment-chennai" className="text-rose-700 underline hover:text-rose-900">tongue tie indicators</a>, and build a personalized plan.</p>
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Expert breastfeeding support from the comfort of your home</p>
              <p className="text-gray-600 text-sm mt-1">Video consultations available 7 days a week</p>
            </div>
            <a href="https://wa.me/917338890927" className="inline-flex items-center px-6 py-3 bg-rose-700 text-white font-semibold rounded-lg hover:bg-rose-800 transition-colors">Book on WhatsApp</a>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Online Lactation Consulting Works</h2>
          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            <BenefitCard title="Your real environment" description="We watch you feed your baby in your actual chair, your usual position — more realistic than a clinical setting where everything feels unfamiliar." />
            <BenefitCard title="No travel stress" description="No packing a diaper bag, driving through traffic, or timing the visit between feeds. For a sleep-deprived new mother, that matters." />
            <BenefitCard title="Full visual assessment" description="We can see latch, positioning, and baby's oral movement on video. If we spot tongue tie indicators, we guide you on what to look for." />
            <BenefitCard title="Written follow-up plan" description="Every session includes a written follow-up plan emailed to you afterward, so you're never relying on memory alone." />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Cover in an Online Session</h2>
          <div className="space-y-4">
            <SessionItem title="Full Feeding Observation" description="We watch your baby feed from start to finish — latch depth, sucking pattern, swallowing sounds, and positioning from multiple angles." />
            <SessionItem title="Milk Supply Assessment" description="We review your baby's weight gain pattern, diaper output, feeding frequency, and look for signs of true vs. perceived low supply." />
            <SessionItem title="Oral Assessment Guidance" description="While we can't perform a hands-on tongue tie exam over video, we guide you through visual indicators and refer to specialists in your city if needed." />
            <SessionItem title="Pumping & Bottle-Feeding Support" description="For mothers returning to work or exclusively pumping — we build a schedule, troubleshoot pump flange fit, and optimize your output." />
            <SessionItem title="Personalized Action Plan" description="Every session ends with a clear, written plan covering feeding positions, frequency, supplementation (if needed), and follow-up milestones." />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Who This Is For</h2>
          <ul className="space-y-3 text-gray-700">
            <ListItem text="Mothers in cities without IBCLC-certified consultants (most of India)" />
            <ListItem text="NRI and expat mothers who want consultation in their language" />
            <ListItem text="Mothers on bed rest or recovering from C-section" />
            <ListItem text="Working mothers who can't take time off for in-person visits" />
            <ListItem text="Mothers in joint families who need evidence-based guidance to share with family members" />
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <FAQ question="Is an online lactation consultation as effective as in-person?" answer="For most breastfeeding issues — yes. Studies show that telehealth lactation support achieves comparable outcomes to in-person visits for latch correction, supply management, and feeding plans." />
            <FAQ question="What do I need for the session?" answer="A phone or laptop with a working camera, a quiet space, and your baby ready for a feed. We'll guide you through everything else." />
            <FAQ question="How long is a session?" answer="45–60 minutes for a full initial consultation. Follow-ups are 20–30 minutes." />
            <FAQ question="Can you help if I'm exclusively pumping?" answer="Absolutely. We help with pump selection, flange fitting, pumping schedules, and maintaining or increasing supply when exclusively pumping." />
          </div>
        </section>

        <section className="bg-rose-50 border border-rose-200 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Book Your Online Consultation</h2>
          <p className="text-gray-700 mb-6 max-w-xl mx-auto">IBCLC-certified breastfeeding support, available from anywhere in India. No travel, no waiting — just expert help when you need it.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:+917338890927" className="inline-flex items-center justify-center px-6 py-3 bg-rose-700 text-white font-semibold rounded-lg hover:bg-rose-800 transition-colors">Call to Book</a>
            <a href="https://wa.me/917338890927" className="inline-flex items-center justify-center px-6 py-3 border-2 border-rose-700 text-rose-700 font-semibold rounded-lg hover:bg-rose-50 transition-colors">WhatsApp Us</a>
          </div>
        </section>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "Is an online lactation consultation as effective as in-person?", acceptedAnswer: { "@type": "Answer", text: "For most breastfeeding issues — yes. Studies show that telehealth lactation support achieves comparable outcomes to in-person visits." } },
          { "@type": "Question", name: "How long is an online lactation session?", acceptedAnswer: { "@type": "Answer", text: "45–60 minutes for a full initial consultation. Follow-ups are 20–30 minutes." } },
        ],
      }) }} />
    </>
  )
}

function BenefitCard({ title, description }) {
  return (<div className="bg-white border border-gray-200 rounded-lg p-5"><h3 className="font-semibold text-gray-900 mb-2">{title}</h3><p className="text-gray-600 text-sm leading-relaxed">{description}</p></div>)
}
function SessionItem({ title, description }) {
  return (<div className="flex gap-3 items-start"><div className="w-2 h-2 rounded-full bg-rose-700 mt-2.5 flex-shrink-0" /><div><h3 className="font-semibold text-gray-900">{title}</h3><p className="text-gray-600 text-sm leading-relaxed">{description}</p></div></div>)
}
function ListItem({ text }) {
  return (<li className="flex gap-3 items-start"><span className="text-rose-700 mt-0.5">✓</span><span>{text}</span></li>)
}
function FAQ({ question, answer }) {
  return (<details className="group border-b border-gray-200 pb-4"><summary className="cursor-pointer font-semibold text-gray-900 group-open:text-rose-700 list-none flex justify-between items-center">{question}<span className="text-gray-400 group-open:rotate-45 transition-transform text-xl">+</span></summary><p className="text-gray-600 mt-3 leading-relaxed">{answer}</p></details>)
}
