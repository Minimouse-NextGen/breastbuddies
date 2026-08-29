import Header from "../../components/Header"
import Footer from "../../components/Footer"
import FloatingWhatsApp from "../../components/FloatingWhatsApp"

// Shared layout shell for standalone SEO landing pages (service pages, neighborhood
// pages). Keeps the site's real navigation/footer/WhatsApp button around content
// that Google may land visitors on directly, instead of leaving them on an orphan page.
export function SeoPageShell({ children }) {
  return (
    <>
      <Header />
      <main className="pt-[72px]">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">{children}</div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}

export function ServiceCard({ title, description, link }) {
  const content = (
    <div className="h-full rounded-lg border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md">
      <h3 className="mb-2 font-semibold text-gray-900">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-600">{description}</p>
    </div>
  )

  if (link) {
    return (
      <a href={link} className="block">
        {content}
      </a>
    )
  }

  return content
}

export function ServiceLink({ title, href }) {
  return (
    <a
      href={href}
      className="block rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
    >
      <span className="font-semibold text-gray-900">{title}</span>
      <span className="ml-2 text-rose-700">→</span>
    </a>
  )
}

export function ReviewCard({ quote, name, area }) {
  return (
    <blockquote className="rounded-lg border border-gray-200 bg-white p-5">
      <p className="mb-3 italic text-gray-700">"{quote}"</p>
      <footer className="text-sm text-gray-500">
        — {name}, {area}
      </footer>
    </blockquote>
  )
}

export function FAQ({ question, answer }) {
  return (
    <details className="group border-b border-gray-200 pb-4">
      <summary className="flex list-none items-center justify-between font-semibold text-gray-900 group-open:text-rose-700">
        {question}
        <span className="text-xl text-gray-400 transition-transform group-open:rotate-45">+</span>
      </summary>
      <p className="mt-3 leading-relaxed text-gray-600">{answer}</p>
    </details>
  )
}

export function FaqSchema({ items }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }),
      }}
    />
  )
}

export function CallToActionBar({ heading, subheading }) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-xl border border-rose-200 bg-rose-50 p-6 sm:flex-row sm:items-center">
      <div className="flex-1">
        <p className="font-semibold text-gray-900">{heading}</p>
        <p className="mt-1 text-sm text-gray-600">{subheading}</p>
      </div>
      <a
        href="tel:+917338890927"
        className="inline-flex items-center rounded-lg bg-rose-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-rose-800"
      >
        Call Now
      </a>
    </div>
  )
}

export function BottomCta({ heading, description }) {
  return (
    <section className="rounded-xl border border-rose-200 bg-rose-50 p-8 text-center">
      <h2 className="mb-3 text-2xl font-bold text-gray-900">{heading}</h2>
      <p className="mx-auto mb-6 max-w-xl text-gray-700">{description}</p>
      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <a
          href="tel:+917338890927"
          className="inline-flex items-center justify-center rounded-lg bg-rose-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-rose-800"
        >
          Call Now
        </a>
        <a
          href="https://wa.me/917338890927"
          className="inline-flex items-center justify-center rounded-lg border-2 border-rose-700 px-6 py-3 font-semibold text-rose-700 transition-colors hover:bg-rose-50"
        >
          WhatsApp Us
        </a>
      </div>
    </section>
  )
}
