import { HOW_IT_WORKS_STEPS, RESPONSE_TIME_MESSAGE } from "../content/consultationContent"

function HowItWorks() {
  return (
    <section className="bg-white px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="text-center">
          <h2 className="heading-h2">How It Works</h2>
          <p className="mx-auto mt-4 max-w-3xl font-inter text-base leading-7 text-[#1E2A52]/80">
            A simple, supportive process to help you get the right
            breastfeeding guidance without feeling overwhelmed.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <article
              key={step.title}
              className="rounded-3xl border border-[#DDE8F7] bg-[#F8FBFF] p-5 shadow-[0_12px_30px_rgba(30,42,82,0.07)]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[#0353A4] font-inter text-sm font-bold text-white shadow-[0_8px_18px_rgba(3,83,164,0.18)]">
                {index + 1}
              </span>
              <h3 className="mt-4 font-playfair text-xl font-bold text-[#1E2A52]">
                {step.title}
              </h3>
              <p className="mt-3 font-inter text-sm leading-7 text-[#1E2A52]/80">
                {step.description}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-6 text-center font-inter text-sm font-semibold text-[#0353A4]">
          {RESPONSE_TIME_MESSAGE}
        </p>
      </div>
    </section>
  )
}

export default HowItWorks
