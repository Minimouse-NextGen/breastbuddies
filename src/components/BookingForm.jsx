import { useState } from "react"
import {
  CONSULTATION_DETAILS,
  RESPONSE_TIME_MESSAGE,
  WHATSAPP_REASSURANCE_MESSAGE,
} from "../content/consultationContent"
import { SmallIcon } from "./Graphics"

const consultationModes = ["Online Consultation", "In-Person Consultation"]
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const initialFormData = {
  fullName: "",
  mobileNumber: "",
  email: "",
  babyAgeOrPregnancyWeek: "",
  primaryConcern: "",
  consultationMode: "",
}

const whatsappFollowUpLink =
  "https://wa.me/917338890927?text=Hello%20BreastBuddies%2C%20I%20just%20submitted%20a%20consultation%20request%20and%20wanted%20to%20follow%20up."

function BookingForm() {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  function updateField(field, value) {
    setFormData((current) => ({ ...current, [field]: value }))
    setErrors((current) => {
      const nextErrors = { ...current }
      delete nextErrors[field]
      return nextErrors
    })
  }

  function updateMobileNumber(value) {
    updateField("mobileNumber", value.replace(/[^\d+\s-]/g, "").slice(0, 18))
  }

  function validateForm() {
    const nextErrors = {}

    if (!formData.fullName.trim()) nextErrors.fullName = "Please enter your full name."
    if (!formData.mobileNumber.trim()) nextErrors.mobileNumber = "Please enter your mobile number."

    if (!formData.email.trim()) {
      nextErrors.email = "Please enter your email address."
    } else if (!emailPattern.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid email address."
    }

    if (!formData.babyAgeOrPregnancyWeek.trim()) {
      nextErrors.babyAgeOrPregnancyWeek = "Please enter the baby age or pregnancy week."
    }
    if (!formData.primaryConcern.trim()) nextErrors.primaryConcern = "Please tell us your primary concern."
    if (!formData.consultationMode) {
      nextErrors.consultationMode = "Please select a preferred consultation mode."
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!validateForm()) return

    const consultationRequest = {
      fullName: formData.fullName.trim(),
      mobileNumber: formData.mobileNumber.trim(),
      email: formData.email.trim(),
      babyAgeOrPregnancyWeek: formData.babyAgeOrPregnancyWeek.trim(),
      primaryConcern: formData.primaryConcern.trim(),
      consultationMode: formData.consultationMode,
    }

    // TODO: Connect this form submission to EmailJS.
    console.log("Consultation request ready for submission", consultationRequest)

    setIsSubmitted(true)
    setFormData(initialFormData)
  }

  return (
    <section id="booking" className="bg-gradient-to-b from-[#eaf7ff] to-[#f6fbff] pb-8 pt-4 lg:pb-10 lg:pt-6">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="heading-h2">Request a Consultation</h2>
          <div className="mx-auto mt-3 h-3 w-8 rounded-full bg-[#ffb6ca]" />
          <p className="mx-auto mt-5 max-w-3xl font-inter text-base font-normal leading-7 text-[#1E2A52]/85">
            Tell us a little about the support you need and Divya Umashankar will personally
            connect with you on WhatsApp to understand your concerns and guide you toward the
            support that best meets your family&apos;s needs.
          </p>
          <div className="mt-4 space-y-2">
            <p className="font-inter text-sm font-semibold text-[#0353A4]">{WHATSAPP_REASSURANCE_MESSAGE}</p>
            <p className="font-inter text-sm font-semibold text-[#0353A4]/85">{RESPONSE_TIME_MESSAGE}</p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <aside className="space-y-5 lg:sticky lg:top-28 lg:col-span-4">
            <div className="w-full rounded-3xl border border-sky-300 bg-gradient-to-b from-sky-50 to-[#F4FAFF] p-6 text-[#1E2A52] shadow-lg shadow-sky-900/10 lg:p-8">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-sky-200 bg-white text-[#0353A4] shadow-sm shadow-sky-900/10">
                <SmallIcon type="info" color="#0353A4" className="h-5 w-5" />
              </span>
              <div className="mt-5">
                <p className="font-inter text-base font-bold leading-6 text-[#1E2A52]">Care Guidance</p>
                <p className="mt-3 font-inter text-base font-semibold leading-7 text-[#1E2A52]/85">
                  Online consultations have limitations. Cases that require in-person assessment of
                  the baby or mother may be referred for offline care to support the best possible outcomes.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-[#DDE8F7] bg-white p-6 shadow-[0_12px_30px_rgba(30,42,82,0.07)] lg:p-8">
              <p className="font-playfair text-2xl font-bold text-[#1E2A52]">{CONSULTATION_DETAILS.title}</p>
              <p className="mt-3 font-inter text-sm leading-7 text-[#1E2A52]/80">{CONSULTATION_DETAILS.description}</p>
              <ul className="mt-5 space-y-3">
                {CONSULTATION_DETAILS.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 font-inter text-sm leading-7 text-[#1E2A52]/82">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#FF477E]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {isSubmitted ? (
            <div className="flex min-w-0 flex-col items-center justify-center rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center shadow-2xl shadow-emerald-900/10 sm:p-10 lg:col-span-8">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                <SmallIcon type="check" color="#059669" className="h-7 w-7" />
              </span>
              <p className="mt-5 font-playfair text-2xl font-bold text-[#1E2A52]">Request Received!</p>
              <p className="mx-auto mt-3 max-w-md font-inter text-base leading-7 text-[#1E2A52]/80">
                Thanks! We&apos;ve received your request. For the fastest response, message us directly on WhatsApp
                — we typically reply within a few hours there.
              </p>
              <a
                href={whatsappFollowUpLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 font-inter text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-600"
              >
                <SmallIcon type="whatsapp" color="#ffffff" className="h-5 w-5" />
                Message Us on WhatsApp
              </a>
            </div>
          ) : (
            <form className="min-w-0 rounded-3xl border border-sky-100 bg-white p-6 shadow-2xl shadow-sky-900/10 sm:p-8 lg:col-span-8 xl:p-10" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 [&>*]:min-w-0">
                <label className="block">
                  <span className="font-inter text-sm font-semibold text-[#1E2A52]">Full Name</span>
                  <input type="text" name="fullName" required value={formData.fullName} onChange={(event) => updateField("fullName", event.target.value)} className="mt-2 h-[58px] w-full rounded-lg border border-slate-200 bg-white px-4 font-inter text-[#1E2A52] outline-none transition placeholder:text-slate-400 focus:border-[#0353A4] focus:ring-4 focus:ring-sky-100" placeholder="Enter your full name" />
                  {errors.fullName && <p className="mt-2 font-inter text-xs font-semibold text-[#B8325C]">{errors.fullName}</p>}
                </label>

                <label className="block">
                  <span className="font-inter text-sm font-semibold text-[#1E2A52]">Mobile Number</span>
                  <input type="tel" name="mobileNumber" required value={formData.mobileNumber} onChange={(event) => updateMobileNumber(event.target.value)} inputMode="tel" maxLength="18" className="mt-2 h-[58px] w-full rounded-lg border border-slate-200 bg-white px-4 font-inter text-[#1E2A52] outline-none transition placeholder:text-slate-400 focus:border-[#0353A4] focus:ring-4 focus:ring-sky-100" placeholder="e.g. +91 98765 43210" />
                  {errors.mobileNumber && <p className="mt-2 font-inter text-xs font-semibold text-[#B8325C]">{errors.mobileNumber}</p>}
                </label>

                <label className="block">
                  <span className="font-inter text-sm font-semibold text-[#1E2A52]">Email Address</span>
                  <input type="email" name="email" required value={formData.email} onChange={(event) => updateField("email", event.target.value)} className="mt-2 h-[58px] w-full rounded-lg border border-slate-200 bg-white px-4 font-inter text-[#1E2A52] outline-none transition placeholder:text-slate-400 focus:border-[#0353A4] focus:ring-4 focus:ring-sky-100" placeholder="Enter your email" />
                  {errors.email && <p className="mt-2 font-inter text-xs font-semibold text-[#B8325C]">{errors.email}</p>}
                </label>

                <label className="block">
                  <span className="font-inter text-sm font-semibold text-[#1E2A52]">Baby Age / Pregnancy Week</span>
                  <input type="text" name="babyAgeOrPregnancyWeek" required value={formData.babyAgeOrPregnancyWeek} onChange={(event) => updateField("babyAgeOrPregnancyWeek", event.target.value)} className="mt-2 h-[58px] w-full rounded-lg border border-slate-200 bg-white px-4 font-inter text-[#1E2A52] outline-none transition placeholder:text-slate-400 focus:border-[#0353A4] focus:ring-4 focus:ring-sky-100" placeholder="e.g. 8 weeks / 3 months / 28 weeks pregnant" />
                  {errors.babyAgeOrPregnancyWeek && <p className="mt-2 font-inter text-xs font-semibold text-[#B8325C]">{errors.babyAgeOrPregnancyWeek}</p>}
                </label>

                <label className="block md:col-span-2">
                  <span className="font-inter text-sm font-semibold text-[#1E2A52]">Primary Concern</span>
                  <textarea name="primaryConcern" rows="4" required value={formData.primaryConcern} onChange={(event) => updateField("primaryConcern", event.target.value)} className="mt-2 w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3.5 font-inter text-[#1E2A52] outline-none transition placeholder:text-slate-400 focus:border-[#0353A4] focus:ring-4 focus:ring-sky-100" placeholder="Tell us a little about the feeding concern or support you are looking for..." />
                  {errors.primaryConcern && <p className="mt-2 font-inter text-xs font-semibold text-[#B8325C]">{errors.primaryConcern}</p>}
                </label>

                <label className="block md:col-span-2">
                  <span className="font-inter text-sm font-semibold text-[#1E2A52]">Preferred Consultation Mode</span>
                  <select name="consultationMode" required value={formData.consultationMode} onChange={(event) => updateField("consultationMode", event.target.value)} className="mt-2 h-[58px] w-full rounded-lg border border-slate-200 bg-white px-4 font-inter text-[#1E2A52] outline-none transition focus:border-[#0353A4] focus:ring-4 focus:ring-sky-100">
                    <option value="" disabled>Select mode</option>
                    {consultationModes.map((mode) => <option key={mode} value={mode}>{mode}</option>)}
                  </select>
                  {errors.consultationMode && <p className="mt-2 font-inter text-xs font-semibold text-[#B8325C]">{errors.consultationMode}</p>}
                </label>
              </div>

              <button type="submit" className="bb-button bb-button-primary bb-button-full mt-7">Request Consultation</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default BookingForm
