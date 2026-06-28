import { HOW_IT_WORKS_STEPS } from "../content/consultationContent"

const commonIconProps = {
  viewBox: "0 0 64 64",
  fill: "none",
  "aria-hidden": "true",
  className: "h-[40px] w-[40px]",
}

const commonStrokeProps = {
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
}

function ClipboardProfilePenIcon() {
  return (
    <svg {...commonIconProps}>
      <rect x="18" y="11" width="28" height="40" rx="4" {...commonStrokeProps} />
      <path d="M26 11.5h12a2.5 2.5 0 0 0-2.5-2.5h-7a2.5 2.5 0 0 0-2.5 2.5Z" {...commonStrokeProps} />
      <circle cx="32" cy="23" r="5" {...commonStrokeProps} />
      <path d="M24.5 34c1.8-3.2 4.5-4.8 7.5-4.8s5.7 1.6 7.5 4.8" {...commonStrokeProps} />
      <path d="M24 41h9M24 46h6" {...commonStrokeProps} />
      <path d="m42.5 42.5 7.5 7.5M45.5 39.5l3 3" {...commonStrokeProps} />
      <path d="m39 49 1.6-5.3 8.7-8.7a2.6 2.6 0 1 1 3.7 3.7l-8.7 8.7L39 49Z" {...commonStrokeProps} />
    </svg>
  )
}

function WhatsAppBubbleIcon() {
  return (
    <svg {...commonIconProps}>
      <path d="M32 13c-10.9 0-19.5 8.3-19.5 18.8 0 4 1.3 7.6 3.6 10.6L14 51l8.9-2.8c2.7 1.4 5.8 2.1 9.1 2.1 10.9 0 19.5-8.3 19.5-18.8S42.9 13 32 13Z" {...commonStrokeProps} />
      <path d="M26.4 24.7c.5-1.2 1.1-1.2 1.7-1.2.5 0 1 0 1.4.1.5.1.8 1.2 1.4 2.5.5 1.3 1 2.7 1.1 2.9.2.2.2.5 0 .8-.2.4-.4.8-.8 1.2-.4.4-.8.9-1.1 1.2-.4.4-.8.8-.4 1.6.4.8 1.8 3 4.4 4.2 2 1 2.9 1 3.4.8.5-.2 1.9-1.9 2.4-2.5.5-.6 1-.5 1.6-.3.7.2 4 1.9 4.7 2.2.7.4 1.2.6 1.3 1 .1.4.1 2.1-.6 3.1-.7 1-4 2.8-4.7 2.9-.7.1-1.5.3-2.4.1-1-.2-2.3-.6-3.9-1.3-6.8-3-11.2-10.3-11.5-10.8-.3-.5-2.8-3.8-2.8-7.2 0-3.4 1.8-5.1 2.4-5.8Z" {...commonStrokeProps} />
    </svg>
  )
}

function CalendarClockIcon() {
  return (
    <svg {...commonIconProps}>
      <rect x="14" y="14" width="30" height="30" rx="4" {...commonStrokeProps} />
      <path d="M22 10v8M36 10v8M14 22h30" {...commonStrokeProps} />
      <path d="M21 28h4M29 28h4M21 35h4M29 35h4" {...commonStrokeProps} />
      <circle cx="45.5" cy="42.5" r="8.5" {...commonStrokeProps} />
      <path d="M45.5 37.8v5.1l3.2 2.1" {...commonStrokeProps} />
    </svg>
  )
}

function HandHeartIcon() {
  return (
    <svg {...commonIconProps}>
      <path d="M31.7 17.8c2.2-3.1 6.7-3.8 9.8-1.4 3.2 2.4 3.7 6.9 1.3 10.1-2.2 2.9-10.8 9.3-10.8 9.3s-8.6-6.4-10.8-9.3c-2.4-3.2-1.8-7.7 1.3-10.1 3.1-2.4 7.6-1.7 9.2 1.4Z" {...commonStrokeProps} />
      <path d="M10 39.5h10.5c2.2 0 3.8-.2 5.1-1 1.3-.8 2.7-1.8 4.4-3.2 1.7-1.5 3.3-2.3 5.1-2.3 2.4 0 4.2 1.6 4.2 3.8 0 1.3-.7 2.6-2 3.7l-5.6 4.8c-2.4 2.1-4.8 3.1-7.5 3.1H18.3" {...commonStrokeProps} />
      <path d="M10 36.5h6.3v15H10zM16.3 49.8h8.5c2.2 0 4-.6 5.7-2l8.2-6.8c1-.8 2.6-.8 3.5.1.9 1 .8 2.5-.1 3.4l-7.9 7.1c-2.4 2.1-5.1 3.2-8.3 3.2H16.3" {...commonStrokeProps} />
    </svg>
  )
}

function ClipboardCheckIcon() {
  return (
    <svg {...commonIconProps}>
      <rect x="18" y="11" width="28" height="40" rx="4" {...commonStrokeProps} />
      <path d="M26 11.5h12a2.5 2.5 0 0 0-2.5-2.5h-7a2.5 2.5 0 0 0-2.5 2.5Z" {...commonStrokeProps} />
      <path d="m26 33 5.4 5.2L39.5 29" {...commonStrokeProps} />
    </svg>
  )
}

const stepIcons = [
  ClipboardProfilePenIcon,
  WhatsAppBubbleIcon,
  CalendarClockIcon,
  HandHeartIcon,
  ClipboardCheckIcon,
]

const verticalConnectorStyle = {
  backgroundImage: "radial-gradient(circle, #FF477E 1.5px, transparent 1.6px)",
  backgroundPosition: "center top",
  backgroundRepeat: "repeat-y",
  backgroundSize: "2px 9px",
}

const horizontalConnectorStyle = {
  backgroundImage: "radial-gradient(circle, #FF477E 1.5px, transparent 1.6px)",
  backgroundPosition: "left center",
  backgroundRepeat: "repeat-x",
  backgroundSize: "9px 2px",
}

function HowItWorks() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[1500px] px-4 pb-14 pt-10">
        <div className="text-center">
          <h2 className="font-playfair text-[clamp(2.5rem,3vw,2.75rem)] font-bold leading-[1.08] text-[#1E2A52]">
            How It Works
          </h2>
          <span
            className="mx-auto mt-2 block h-px w-[248px] max-w-full bg-[#0353A4]"
            aria-hidden="true"
          />
          <p className="mx-auto mt-4 max-w-[980px] font-inter text-[clamp(1.375rem,1.45vw,1.5rem)] leading-[1.6] text-[#1E2A52]/80">
            A simple, supportive process to help you get the right
            breastfeeding guidance without feeling overwhelmed.
          </p>
        </div>

        <ol className="mt-10 grid grid-cols-1 gap-x-4 gap-y-12 min-[768px]:grid-cols-2 min-[900px]:grid-cols-3 min-[1100px]:grid-cols-5 min-[1100px]:gap-x-3 xl:gap-x-4">
          {HOW_IT_WORKS_STEPS.map((step, index) => {
            const Icon = stepIcons[index]
            const isLastStep = index === HOW_IT_WORKS_STEPS.length - 1
            const showDesktopConnector = index < 4
            const showTabletConnector = index === 0 || index === 2
            const showMobileConnector = !isLastStep

            return (
              <li
                key={step.title}
                className="relative flex min-w-0 flex-col items-center text-center"
              >
                {showMobileConnector ? (
                  <>
                    <span
                      className="absolute left-1/2 top-[118px] h-[30px] w-[2px] -translate-x-1/2 md:hidden"
                      style={verticalConnectorStyle}
                      aria-hidden="true"
                    />
                    <span
                      className="absolute left-1/2 top-[154px] h-0 w-0 -translate-x-1/2 border-x-[6px] border-b-0 border-t-[9px] border-x-transparent border-t-[#FF477E] md:hidden"
                      aria-hidden="true"
                    />
                  </>
                ) : null}

                {showTabletConnector ? (
                  <>
                    <span
                      className="absolute left-[calc(50%+48px)] right-[calc(-50%+62px)] top-[52px] hidden h-[2px] min-[768px]:block min-[1100px]:hidden"
                      style={horizontalConnectorStyle}
                      aria-hidden="true"
                    />
                    <span
                      className="absolute right-[calc(-50%+48px)] top-[52px] hidden h-0 w-0 -translate-y-1/2 border-b-[5px] border-l-[8px] border-t-[5px] border-b-transparent border-l-[#FF477E] border-t-transparent min-[768px]:block min-[1100px]:hidden"
                      aria-hidden="true"
                    />
                  </>
                ) : null}

                {showDesktopConnector ? (
                  <>
                    <span
                      className="absolute left-[calc(50%+48px)] right-[calc(-50%+62px)] top-[52px] hidden h-[2px] min-[1100px]:block"
                      style={horizontalConnectorStyle}
                      aria-hidden="true"
                    />
                    <span
                      className="absolute right-[calc(-50%+48px)] top-[52px] hidden h-0 w-0 -translate-y-1/2 border-b-[5px] border-l-[8px] border-t-[5px] border-b-transparent border-l-[#FF477E] border-t-transparent min-[1100px]:block"
                      aria-hidden="true"
                    />
                  </>
                ) : null}

                <div className="flex w-full flex-col items-center">
                  <div className="relative mx-auto mb-4 grid h-[96px] w-[96px] place-items-center rounded-full border-[1.5px] border-[#9BC6F2] bg-white text-[#0F3D99]">
                    <span className="absolute left-[10px] top-[-10px] z-10 flex h-[31px] w-[31px] items-center justify-center rounded-full bg-[#FF477E] font-inter text-[0.95rem] font-bold text-white">
                      {index + 1}
                    </span>
                    <Icon />
                  </div>
                </div>

                <h3 className="mx-auto mb-3 max-w-[250px] text-balance font-playfair text-[clamp(1.5rem,1.15vw,1.625rem)] font-bold leading-[1.18] text-[#0F3D99]">
                  {step.title}
                </h3>
                <p className="mx-auto max-w-[250px] font-inter text-[clamp(1rem,0.92vw,1.125rem)] leading-[1.6] text-[#1E2A52]/82">
                  {step.description}
                </p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

export default HowItWorks
