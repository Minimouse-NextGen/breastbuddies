import emailjs from "@emailjs/browser"
import { useMemo, useState } from "react"

const modes = ["Online video call", "In-Person Consult(Hospital)"]
const durations = ["30 minutes", "1 hour"]
const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
]

const bookedSlots = [
  {
    date: "2026-06-01",
    startTime: "09:30 AM",
    duration: 60,
  },
]

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const indianMobilePattern = /^(?:\+91[\s-]?|91[\s-]?|0)?[6-9]\d{9}$/
const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const initialFormData = {
  fullName: "",
  mobileNumber: "",
  emailAddress: "",
  babyInfo: "",
  primaryConcern: "",
  consultationMode: "",
  preferredDate: "",
  consultationDuration: "",
  preferredTimeSlot: "",
}

function getTodayInputValue() {
  const today = new Date()
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset())
  return today.toISOString().split("T")[0]
}

function dateToInputValue(date) {
  const normalized = new Date(date)
  normalized.setMinutes(normalized.getMinutes() - normalized.getTimezoneOffset())
  return normalized.toISOString().split("T")[0]
}

function formatDisplayDate(inputDate) {
  if (!inputDate) {
    return "dd-mm-yyyy"
  }

  const [year, month, day] = inputDate.split("-")
  return `${day}-${month}-${year}`
}

function buildCalendarDays(monthDate) {
  const year = monthDate.getFullYear()
  const month = monthDate.getMonth()
  const firstDay = new Date(year, month, 1)
  const firstMondayOffset = (firstDay.getDay() + 6) % 7
  const calendarStart = new Date(year, month, 1 - firstMondayOffset)

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(calendarStart)
    date.setDate(calendarStart.getDate() + index)

    return {
      date,
      inputValue: dateToInputValue(date),
      isCurrentMonth: date.getMonth() === month,
      day: date.getDate(),
    }
  })
}

function convertTimeToMinutes(timeValue) {
  const [time, period] = timeValue.split(" ")
  const [rawHour, rawMinute] = time.split(":").map(Number)
  const hour = period === "PM" && rawHour !== 12 ? rawHour + 12 : period === "AM" && rawHour === 12 ? 0 : rawHour
  return hour * 60 + rawMinute
}

function convertMinutesToTime(minutes) {
  const normalizedMinutes = ((minutes % 1440) + 1440) % 1440
  const hour24 = Math.floor(normalizedMinutes / 60)
  const minute = normalizedMinutes % 60
  const period = hour24 >= 12 ? "PM" : "AM"
  const hour12 = hour24 % 12 || 12
  return `${String(hour12).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${period}`
}

function getDurationMinutes(duration) {
  return duration === "1 hour" ? 60 : 30
}

function getEndTime(startTime, duration) {
  return convertMinutesToTime(convertTimeToMinutes(startTime) + duration)
}

function getTimeRange(startTime, duration) {
  return `${startTime} - ${getEndTime(startTime, duration)}`
}

function getOccupiedSlotStarts(startTime, duration) {
  const start = convertTimeToMinutes(startTime)
  const end = start + duration

  return timeSlots.filter((slot) => {
    const slotStart = convertTimeToMinutes(slot)
    return slotStart >= start && slotStart < end
  })
}

function hasContinuousSlotBlocks(startTime, duration) {
  return getOccupiedSlotStarts(startTime, duration).length === duration / 30
}

function isSlotInsideSelectedRange(slotTime, selectedStartTime, duration) {
  if (!selectedStartTime) {
    return false
  }

  const slotStart = convertTimeToMinutes(slotTime)
  const selectedStart = convertTimeToMinutes(selectedStartTime)
  const selectedEnd = selectedStart + duration

  return slotStart > selectedStart && slotStart < selectedEnd
}

function isSlotDisabledByBooking(slotTime, selectedDate, existingBookedSlots) {
  return existingBookedSlots.some((booking) => {
    if (selectedDate && booking.date !== selectedDate) {
      return false
    }

      return getOccupiedSlotStarts(booking.startTime, booking.duration).includes(slotTime)
    })
  }

function isSlotRangeDisabledByBooking(slotTime, selectedDate, duration, existingBookedSlots) {
  const requestedSlots = getOccupiedSlotStarts(slotTime, duration)

  return requestedSlots.some((slot) => isSlotDisabledByBooking(slot, selectedDate, existingBookedSlots))
}

function isSlotSelectable(slotTime, selectedDate, selectedStartTime, duration, existingBookedSlots) {
  return hasContinuousSlotBlocks(slotTime, duration)
    && !isSlotRangeDisabledByBooking(slotTime, selectedDate, duration, existingBookedSlots)
    && !isSlotInsideSelectedRange(slotTime, selectedStartTime, duration)
}

function BookingForm() {
  const minDate = useMemo(() => getTodayInputValue(), [])
  const [formData, setFormData] = useState(initialFormData)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [calendarMonth, setCalendarMonth] = useState(() => new Date())
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("error")
  const [errors, setErrors] = useState({})
  const [isSending, setIsSending] = useState(false)
  const calendarDays = useMemo(() => buildCalendarDays(calendarMonth), [calendarMonth])

  function updateField(field, value) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }))
    setErrors((current) => {
      const nextErrors = { ...current }
      delete nextErrors[field]
      return nextErrors
    })
    setMessage("")
  }

  function updateMobileNumber(value) {
    const sanitized = value.replace(/[^\d+\s-]/g, "").slice(0, 18)
    updateField("mobileNumber", sanitized)
  }

  function validateForm() {
    const nextErrors = {}
    const mobileNumber = formData.mobileNumber.replace(/[\s-]/g, "")

    if (!formData.fullName.trim()) {
      nextErrors.fullName = "Please enter your full name."
    }

    if (!formData.mobileNumber.trim()) {
      nextErrors.mobileNumber = "Please enter your mobile number."
    } else if (!indianMobilePattern.test(mobileNumber)) {
      nextErrors.mobileNumber = "Please enter a valid Indian mobile number."
    }

    if (!formData.emailAddress.trim()) {
      nextErrors.emailAddress = "Please enter your email address."
    } else if (!emailPattern.test(formData.emailAddress.trim())) {
      nextErrors.emailAddress = "Please enter a valid email address."
    }

    if (!formData.babyInfo.trim()) {
      nextErrors.babyInfo = "Please enter the baby age or pregnancy week."
    }

    if (!formData.primaryConcern.trim()) {
      nextErrors.primaryConcern = "Please tell us your primary concern."
    }

    if (!formData.consultationMode) {
      nextErrors.consultationMode = "Please select a preferred consultation mode."
    }

    if (!formData.preferredDate) {
      nextErrors.preferredDate = "Please select a preferred consultation date."
    }

    if (!formData.consultationDuration) {
      nextErrors.consultationDuration = "Please select a consultation duration."
    }

    if (!formData.preferredTimeSlot) {
      nextErrors.preferredTimeSlot = "Please select an available time slot."
    } else if (
      formData.preferredDate
      && formData.consultationDuration
      && !isSlotSelectable(
        formData.preferredTimeSlot,
        formData.preferredDate,
        "",
        getDurationMinutes(formData.consultationDuration),
        bookedSlots,
      )
    ) {
      nextErrors.preferredTimeSlot = "Please choose a time slot that is still available."
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!validateForm()) {
      setMessageType("error")
      setMessage("Please complete the highlighted fields before submitting.")
      return
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setMessageType("error")
      setMessage("Email service is not configured yet. Please contact us through WhatsApp.")
      return
    }

    const selectedSlotRange = getTimeRange(
      formData.preferredTimeSlot,
      getDurationMinutes(formData.consultationDuration),
    )

    const templateParams = {
      subject: "New Consultation Request - BreastBuddies",
      to_email: "divya.us@gmail.com",
      full_name: formData.fullName,
      mobile_number: formData.mobileNumber,
      email_address: formData.emailAddress,
      baby_info: formData.babyInfo,
      primary_concern: formData.primaryConcern,
      consultation_mode: formData.consultationMode,
      preferred_date: formData.preferredDate,
      preferred_time_slot: selectedSlotRange,
      consultation_duration: formData.consultationDuration,
      submitted_from: "BreastBuddies Website",
      message: `A new consultation request has been submitted.

Full Name:
${formData.fullName}

Mobile Number:
${formData.mobileNumber}

Email Address:
${formData.emailAddress}

Baby Age / Pregnancy Week:
${formData.babyInfo}

Primary Concern:
${formData.primaryConcern}

Consultation Mode:
${formData.consultationMode}

Preferred Date:
${formData.preferredDate}

Preferred Time Slot:
${selectedSlotRange}

Consultation Duration:
${formData.consultationDuration}

Submitted From:
BreastBuddies Website`,
    }

    console.log("Consultation Request Submitted", formData)

    try {
      setIsSending(true)
      await emailjs.send(serviceId, templateId, templateParams, { publicKey })
      setMessageType("success")
      setMessage(
        "Thank you. Your consultation request has been received. We will contact you shortly via WhatsApp or email.",
      )
      setFormData(initialFormData)
      setErrors({})
      setIsCalendarOpen(false)
    } catch (error) {
      console.error("EmailJS consultation request failed", error)
      setMessageType("error")
      setMessage("Something went wrong. Please try again or contact us through WhatsApp.")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section id="booking" className="bg-gradient-to-b from-[#eaf7ff] to-[#f6fbff] pb-8 pt-4 lg:pb-10 lg:pt-6">
      <div className="section-frame">
        <div className="text-center">
          <h2 className="heading-h2">
            Book an Online Lactation Consultation
          </h2>
          <div className="mx-auto mt-3 h-3 w-8 rounded-full bg-[#ffb6ca]" />
          <p className="mx-auto mt-5 max-w-3xl font-inter text-base font-normal leading-7 text-[#1E2A52]/85">
            Fill out the form below and I'll connect with you on WhatsApp to
            understand your needs and help you book a session.
          </p>
        </div>

        <form
          className="mx-auto mt-10 max-w-5xl rounded-2xl border border-sky-100 bg-white p-5 shadow-2xl shadow-sky-900/10 sm:p-8"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <label className="block">
              <span className="font-inter text-sm font-semibold text-[#1E2A52]">Full Name</span>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={(event) => updateField("fullName", event.target.value)}
                className="mt-2 h-[58px] w-full rounded-lg border border-slate-200 bg-white px-4 font-inter text-[#1E2A52] outline-none transition placeholder:text-slate-400 focus:border-[#4F8EF7] focus:ring-4 focus:ring-sky-100"
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="mt-2 font-inter text-xs font-semibold text-[#B8325C]">{errors.fullName}</p>}
            </label>

            <label className="block">
              <span className="font-inter text-sm font-semibold text-[#1E2A52]">Mobile Number</span>
              <input
                type="tel"
                name="mobile"
                required
                value={formData.mobileNumber}
                onChange={(event) => updateMobileNumber(event.target.value)}
                inputMode="numeric"
                maxLength="18"
                className="mt-2 h-[58px] w-full rounded-lg border border-slate-200 bg-white px-4 font-inter text-[#1E2A52] outline-none transition placeholder:text-slate-400 focus:border-[#4F8EF7] focus:ring-4 focus:ring-sky-100"
                placeholder="e.g. +91 98765 43210"
              />
              {errors.mobileNumber && <p className="mt-2 font-inter text-xs font-semibold text-[#B8325C]">{errors.mobileNumber}</p>}
            </label>

            <label className="block">
              <span className="font-inter text-sm font-semibold text-[#1E2A52]">Email Address</span>
              <input
                type="email"
                name="email"
                required
                value={formData.emailAddress}
                onChange={(event) => updateField("emailAddress", event.target.value)}
                className="mt-2 h-[58px] w-full rounded-lg border border-slate-200 bg-white px-4 font-inter text-[#1E2A52] outline-none transition placeholder:text-slate-400 focus:border-[#4F8EF7] focus:ring-4 focus:ring-sky-100"
                placeholder="Enter your email"
              />
              {errors.emailAddress && <p className="mt-2 font-inter text-xs font-semibold text-[#B8325C]">{errors.emailAddress}</p>}
            </label>

            <label className="block">
              <span className="font-inter text-sm font-semibold text-[#1E2A52]">Baby Age / Pregnancy Week</span>
              <input
                type="text"
                name="babyAge"
                required
                value={formData.babyInfo}
                onChange={(event) => updateField("babyInfo", event.target.value)}
                className="mt-2 h-[58px] w-full rounded-lg border border-slate-200 bg-white px-4 font-inter text-[#1E2A52] outline-none transition placeholder:text-slate-400 focus:border-[#4F8EF7] focus:ring-4 focus:ring-sky-100"
                placeholder="e.g. 8 weeks / 3 months"
              />
              {errors.babyInfo && <p className="mt-2 font-inter text-xs font-semibold text-[#B8325C]">{errors.babyInfo}</p>}
            </label>

            <label className="block md:col-span-2">
              <span className="font-inter text-sm font-semibold text-[#1E2A52]">Primary Concern</span>
              <textarea
                name="concern"
                rows="3"
                required
                value={formData.primaryConcern}
                onChange={(event) => updateField("primaryConcern", event.target.value)}
                className="mt-2 w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3.5 font-inter text-[#1E2A52] outline-none transition placeholder:text-slate-400 focus:border-[#4F8EF7] focus:ring-4 focus:ring-sky-100"
                placeholder="Tell us a little bit about what you're experiencing..."
              />
              {errors.primaryConcern && <p className="mt-2 font-inter text-xs font-semibold text-[#B8325C]">{errors.primaryConcern}</p>}
            </label>

            <label className="block">
              <span className="font-inter text-sm font-semibold text-[#1E2A52]">Preferred Consultation Mode</span>
              <select
                name="mode"
                required
                className="mt-2 h-[58px] w-full rounded-lg border border-slate-200 bg-white px-4 font-inter text-[#1E2A52] outline-none transition focus:border-[#4F8EF7] focus:ring-4 focus:ring-sky-100"
                value={formData.consultationMode}
                onChange={(event) => updateField("consultationMode", event.target.value)}
              >
                <option value="" disabled>
                  Select mode
                </option>
                {modes.map((mode) => (
                  <option key={mode}>{mode}</option>
                ))}
              </select>
              {errors.consultationMode && <p className="mt-2 font-inter text-xs font-semibold text-[#B8325C]">{errors.consultationMode}</p>}
            </label>

            <div className="relative">
              <span className="font-inter text-sm font-semibold text-[#1E2A52]">Preferred Date</span>
              <button
                type="button"
                onClick={() => setIsCalendarOpen((current) => !current)}
                className="mt-2 flex h-[58px] w-full items-center justify-between rounded-xl border border-sky-200 bg-white px-4 text-left font-inter text-[#1E2A52] outline-none transition hover:border-[#4F8EF7] hover:bg-[#F8FBFF] focus:border-[#4F8EF7] focus:ring-4 focus:ring-sky-100"
                aria-expanded={isCalendarOpen}
                aria-label="Choose preferred date"
              >
                <span className={formData.preferredDate ? "font-medium" : "text-slate-400"}>
                  {formatDisplayDate(formData.preferredDate)}
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#F8FBFF] text-[#1E2A52]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                    <path
                      d="M7 3v3M17 3v3M4 9h16M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              {isCalendarOpen && (
                <div className="absolute left-0 top-full z-30 mt-3 w-full min-w-[320px] rounded-3xl border border-sky-100 bg-white p-4 shadow-2xl shadow-sky-900/15 sm:w-[380px]">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        setCalendarMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))
                      }}
                      className="grid h-10 w-10 place-items-center rounded-xl text-[#1E2A52] transition hover:bg-[#F8FBFF]"
                      aria-label="Previous month"
                    >
                      ←
                    </button>
                    <div className="text-center">
                      <p className="font-playfair text-xl font-bold text-[#1E2A52]">
                        {monthNames[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}
                      </p>
                      <p className="mt-0.5 font-inter text-xs font-medium text-[#1E2A52]/55">
                        Select a consultation date
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setCalendarMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))
                      }}
                      className="grid h-10 w-10 place-items-center rounded-xl text-[#1E2A52] transition hover:bg-[#F8FBFF]"
                      aria-label="Next month"
                    >
                      →
                    </button>
                  </div>

                  <div className="mt-5 grid grid-cols-7 gap-2">
                    {weekdays.map((day) => (
                      <div key={day} className="text-center font-inter text-xs font-semibold text-[#1E2A52]/55">
                        {day}
                      </div>
                    ))}
                    {calendarDays.map((item) => {
                      const isPast = item.inputValue < minDate
                      const isSelected = item.inputValue === formData.preferredDate

                      return (
                        <button
                          key={item.inputValue}
                          type="button"
                          disabled={isPast}
                          onClick={() => {
                            setFormData((current) => ({
                              ...current,
                              preferredDate: item.inputValue,
                              preferredTimeSlot: "",
                            }))
                            setErrors((current) => {
                              const nextErrors = { ...current }
                              delete nextErrors.preferredDate
                              delete nextErrors.preferredTimeSlot
                              return nextErrors
                            })
                            setIsCalendarOpen(false)
                            setMessage("")
                          }}
                          className={`grid h-10 place-items-center rounded-2xl font-inter text-sm font-semibold transition-all ${
                            isSelected
                              ? "bg-[#4F8EF7] text-white shadow-lg shadow-blue-500/20"
                              : item.isCurrentMonth
                                ? "text-[#1E2A52] hover:bg-[#EAF4FF] hover:text-[#4F8EF7]"
                                : "text-[#1E2A52]/30 hover:bg-[#F8FBFF]"
                          } ${isPast ? "cursor-not-allowed opacity-30 hover:bg-transparent hover:text-[#1E2A52]/30" : ""}`}
                        >
                          {item.day}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
              {errors.preferredDate && <p className="mt-2 font-inter text-xs font-semibold text-[#B8325C]">{errors.preferredDate}</p>}
            </div>

            <label className="block">
              <span className="font-inter text-sm font-semibold text-[#1E2A52]">Consultation Duration</span>
              <select
                name="duration"
                required
                value={formData.consultationDuration}
                onChange={(event) => {
                  setFormData((current) => ({
                    ...current,
                    consultationDuration: event.target.value,
                    preferredTimeSlot: "",
                  }))
                  setErrors((current) => {
                    const nextErrors = { ...current }
                    delete nextErrors.consultationDuration
                    delete nextErrors.preferredTimeSlot
                    return nextErrors
                  })
                  setMessage("")
                }}
                className="mt-2 h-[58px] w-full rounded-xl border border-sky-200 bg-white px-4 font-inter text-[#1E2A52] outline-none transition focus:border-[#4F8EF7] focus:ring-4 focus:ring-sky-100"
              >
                <option value="" disabled>
                  Select duration
                </option>
                {durations.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              {errors.consultationDuration && <p className="mt-2 font-inter text-xs font-semibold text-[#B8325C]">{errors.consultationDuration}</p>}
            </label>
          </div>

          <div className="mt-6 rounded-3xl border border-sky-100 bg-[#F8FBFF] p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-inter text-base font-semibold text-[#1E2A52]">Preferred Time Slot</p>
                <p className="mt-1 font-inter text-sm text-[#1E2A52]/65">
                  Select a date and duration, then choose a time range that works for you.
                </p>
              </div>
              <div className="rounded-2xl bg-white px-4 py-3 text-left shadow-sm shadow-sky-900/5 sm:text-right">
                <p className="font-inter text-xs font-semibold uppercase tracking-[0.16em] text-[#4F8EF7]">
                  SELECTION
                </p>
                <p className="mt-1 font-inter text-sm font-semibold text-[#1E2A52]">
                  {formData.preferredTimeSlot
                    ? getTimeRange(
                        formData.preferredTimeSlot,
                        getDurationMinutes(formData.consultationDuration),
                      )
                    : "No slot selected"}
                </p>
              </div>
            </div>

            {formData.preferredDate && formData.consultationDuration ? (
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {timeSlots.map((slot) => {
                  const isSelected = formData.preferredTimeSlot === slot
                  const durationMinutes = getDurationMinutes(formData.consultationDuration)
                  const isBooked = isSlotDisabledByBooking(
                    slot,
                    formData.preferredDate,
                    bookedSlots,
                  )
                  const isUnavailable = !hasContinuousSlotBlocks(slot, durationMinutes)
                  const isRangeBooked = isSlotRangeDisabledByBooking(
                    slot,
                    formData.preferredDate,
                    durationMinutes,
                    bookedSlots,
                  )
                  const isIncluded = isSlotInsideSelectedRange(
                    slot,
                    formData.preferredTimeSlot,
                    durationMinutes,
                  )
                  const isSelectable = isSelected || isSlotSelectable(
                    slot,
                    formData.preferredDate,
                    formData.preferredTimeSlot,
                    durationMinutes,
                    bookedSlots,
                  )
                  const range = getTimeRange(slot, durationMinutes)

                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={!isSelectable}
                      onClick={() => {
                        if (!isSelectable) {
                          return
                        }
                        updateField("preferredTimeSlot", slot)
                        setMessage("")
                      }}
                      className={`group rounded-2xl border px-4 py-3 text-left font-inter transition-all duration-300 ${
                        isSelected
                          ? "border-[#4F8EF7] bg-[#EAF4FF] text-[#1E2A52] shadow-md shadow-blue-500/10"
                          : isBooked || isIncluded || isUnavailable || isRangeBooked
                            ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 opacity-70"
                          : "border-sky-100 bg-white text-[#1E2A52]/80 hover:-translate-y-0.5 hover:border-[#4F8EF7] hover:bg-white hover:shadow-md hover:shadow-sky-900/5"
                      }`}
                      aria-pressed={isSelected}
                    >
                      <span className="block text-base font-semibold">{slot}</span>
                      <span
                        className={`mt-1 block text-xs font-medium ${
                          isSelected
                            ? "text-[#4F8EF7]"
                            : isBooked || isIncluded || isUnavailable || isRangeBooked
                              ? "text-slate-400"
                              : "text-[#1E2A52]/55 group-hover:text-[#4F8EF7]"
                        }`}
                      >
                        {isBooked || isRangeBooked
                          ? "Booked"
                          : isIncluded
                            ? "Included"
                            : isUnavailable
                              ? "Unavailable"
                              : range}
                      </span>
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="mt-4 rounded-xl border border-dashed border-sky-200 bg-[#F8FBFF] px-4 py-5 font-inter text-sm text-[#1E2A52]/65">
                Available time slots will appear here after selecting a date and duration.
              </div>
            )}
            {errors.preferredTimeSlot && <p className="mt-3 font-inter text-xs font-semibold text-[#B8325C]">{errors.preferredTimeSlot}</p>}
          </div>

          {message && (
            <p
              className={`mt-5 rounded-xl px-4 py-3 font-inter text-sm font-medium ${
                messageType === "success"
                  ? "bg-emerald-50 text-[#1E2A52]"
                  : "bg-pink-50 text-[#B8325C]"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSending}
            className="consultation-button mt-7 w-full rounded-lg px-7 py-4 font-inter font-semibold"
          >
            {isSending ? "Sending Request..." : "Request Consultation"}
          </button>
        </form>
      </div>
    </section>
  )
}

export default BookingForm
