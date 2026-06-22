import { TESTIMONIALS } from "../content/consultationContent"

function Testimonials() {
  return (
    <section className="bg-[#F8FBFF] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="text-center">
          <h2 className="heading-h2">Kind Words From Families</h2>
          <p className="mx-auto mt-4 max-w-3xl font-inter text-base leading-7 text-[#1E2A52]/80">
            BreastBuddies is built around gentle, evidence-based support that
            helps mothers feel more confident and less alone.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {TESTIMONIALS.map((testimonial) => (
            <article
              key={testimonial.name}
              className="flex h-full flex-col justify-between rounded-3xl border border-[#DDE8F7] bg-white p-6 shadow-[0_12px_30px_rgba(30,42,82,0.07)]"
            >
              <p className="font-inter text-sm leading-7 text-[#1E2A52]/82 sm:text-[15px]">
                "{testimonial.quote}"
              </p>
              <p className="mt-5 font-inter text-sm font-semibold text-[#0353A4]">
                {testimonial.name}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
