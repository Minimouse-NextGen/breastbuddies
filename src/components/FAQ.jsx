import { useState } from "react"

const faqItems = [
  {
    question: "When should I see a Lactation Consultant?",
    answer:
      "You can reach out to a Lactation Consultant during pregnancy, in the early newborn days, or anytime breastfeeding starts to feel painful, confusing, or stressful. Many families connect with BreastBuddies for preparation before birth, support after delivery, and guidance during feeding changes as baby grows.",
  },
  {
    question: "How can a Lactation Consultant help with breastfeeding?",
    answer:
      "A Lactation Consultant can help you understand feeding positions, improve comfort, build confidence, and work through common breastfeeding concerns with calm, practical guidance. Support may include latch assessment, newborn feeding support, low milk supply support, and help creating a plan that feels manageable for your family.",
  },
  {
    question: "Do you provide online lactation consultation in India?",
    answer:
      "Yes. BreastBuddies offers Online Lactation Consultation India families can access from home, along with support for mothers in Chennai and families living in other cities. Online sessions are designed to be warm, practical, and easy to follow, with in-person referral guidance when a hands-on assessment is needed.",
  },
  {
    question: "Can you help with latch issues and low milk supply?",
    answer:
      "Yes. Divya Umashankar supports families through latch concerns, painful feeds, low milk supply support, feeding worries in the newborn period, and questions about how breastfeeding is going day to day. The goal is to understand what you are experiencing and offer clear, evidence-based next steps.",
  },
  {
    question: "Can you guide parents about tongue tie breastfeeding concerns?",
    answer:
      "Yes. BreastBuddies can offer feeding guidance and tongue tie breastfeeding support when families are worried about comfort, milk transfer, or feeding efficiency. Support focuses on breastfeeding guidance, observation, and next-step recommendations, rather than diagnosis or treatment.",
  },
  {
    question: "Is BreastBuddies available for mothers outside Chennai?",
    answer:
      "Yes. While many families look for a Lactation Consultant in Chennai, BreastBuddies also supports mothers across India and worldwide through online consultations. This makes it easier for families outside Chennai to receive timely, professional breastfeeding support from home.",
  },
  {
    question: "What is the difference between a breastfeeding consultant and a lactation consultant?",
    answer:
      "Many parents use the terms breastfeeding consultant and Lactation Consultant interchangeably when searching for qualified feeding support. Many parents search for \"IBCLC near me\" when they need qualified breastfeeding support. BreastBuddies helps families connect with evidence-based lactation guidance from Divya Umashankar, a Certified Advanced Lactation Professional and Lactation Consultant.",
  },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section
      id="faq"
      className="bg-white px-4 py-8 sm:px-6 lg:px-8 lg:py-10"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto w-full max-w-5xl">
        <div className="text-center">
          <h2 className="heading-h2">Frequently Asked Questions</h2>
          <p className="mx-auto mt-4 max-w-3xl font-inter text-base leading-7 text-[#1E2A52]/80">
            A few gentle answers for families looking for a Lactation
            Consultant, breastfeeding support, or online guidance from
            BreastBuddies.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {faqItems.map((item, index) => {
            const panelId = `faq-panel-${index}`
            const buttonId = `faq-button-${index}`
            const isOpen = openIndex === index

            return (
              <article
                key={item.question}
                className="overflow-hidden rounded-3xl border border-[#DDE8F7] bg-[#F8FBFF] shadow-[0_12px_30px_rgba(30,42,82,0.07)]"
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    <span className="font-inter text-base font-semibold leading-7 text-[#1E2A52] sm:text-[17px]">
                      {item.question}
                    </span>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#D6E6FF] bg-white text-[#0353A4] transition-transform ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                        <path
                          d="M12 5v14M5 12h14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>
                </h3>

                {isOpen ? (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="border-t border-[#DDE8F7] bg-white px-5 py-5 sm:px-6"
                  >
                    <p className="font-inter text-sm leading-7 text-[#1E2A52]/80 sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                ) : null}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQ
