import { useEffect, useMemo, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import {
  createBlockedSlot,
  getAdminBlockedSlots,
  getAdminBookings,
  removeBlockedSlot,
  updateBookingNotes,
  updateBookingStatus,
} from "../services/bookingsService"
import { supabase } from "../services/supabaseClient"

const statusOptions = ["pending", "confirmed", "completed", "cancelled"]
const activeStatuses = ["pending", "confirmed"]
const availabilityWeekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const availabilityMonthNames = [
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

const allowedStatusTransitions = {
  pending: ["pending", "confirmed", "cancelled"],
  confirmed: ["confirmed", "completed", "cancelled"],
  completed: ["completed"],
  cancelled: ["cancelled"],
}

function getTodayInputValue() {
  const today = new Date()
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset())
  return today.toISOString().split("T")[0]
}

function getInputDateValue(date) {
  const normalized = new Date(date)
  normalized.setMinutes(normalized.getMinutes() - normalized.getTimezoneOffset())
  return normalized.toISOString().split("T")[0]
}

function formatDate(value) {
  if (!value) {
    return "-"
  }

  const [year, month, day] = value.split("-")
  return `${day}-${month}-${year}`
}

function formatDateTime(value) {
  if (!value) {
    return "-"
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value))
}

function formatTimeRange(startTime, endTime, isFullDay = false) {
  if (isFullDay) {
    return "Full day"
  }

  if (!startTime || !endTime) {
    return "-"
  }

  return `${startTime} - ${endTime}`
}

function convertTimeValueToMinutes(timeValue) {
  if (!timeValue) {
    return 0
  }

  if (timeValue.includes("AM") || timeValue.includes("PM")) {
    const [time, period] = timeValue.split(" ")
    const [rawHour, rawMinute] = time.split(":").map(Number)
    const hour = period === "PM" && rawHour !== 12 ? rawHour + 12 : period === "AM" && rawHour === 12 ? 0 : rawHour
    return hour * 60 + rawMinute
  }

  const [hour, minute] = timeValue.split(":").map(Number)
  return hour * 60 + minute
}

function hasBlockedSlotOverlap(existingBlockedSlots, blockDate, startTime, endTime, currentId = "") {
  const nextStart = convertTimeValueToMinutes(startTime)
  const nextEnd = convertTimeValueToMinutes(endTime)

  return existingBlockedSlots.some((slot) => (
    slot.id !== currentId
    && slot.block_date === blockDate
    && nextStart < convertTimeValueToMinutes(slot.end_time)
    && nextEnd > convertTimeValueToMinutes(slot.start_time)
  ))
}

function getMonthCalendarDays(monthDate) {
  const year = monthDate.getFullYear()
  const month = monthDate.getMonth()
  const firstDay = new Date(year, month, 1)
  const startOffset = firstDay.getDay()
  const calendarStart = new Date(year, month, 1 - startOffset)

  return Array.from({ length: 42 }, (_, index) => {
    const nextDate = new Date(calendarStart)
    nextDate.setDate(calendarStart.getDate() + index)

    return {
      date: nextDate,
      inputValue: getInputDateValue(nextDate),
      day: nextDate.getDate(),
      isCurrentMonth: nextDate.getMonth() === month,
    }
  })
}

function getBlockedStatusForDate(blockedSlots, dateValue) {
  const slotsForDate = blockedSlots.filter((slot) => slot.block_date === dateValue)

  if (slotsForDate.length === 0) {
    return "available"
  }

  if (slotsForDate.some((slot) => slot.is_full_day)) {
    return "full"
  }

  return "partial"
}

function AdminDashboard({ session }) {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [blockedSlots, setBlockedSlots] = useState([])
  const [message, setMessage] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [adminNotes, setAdminNotes] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState("")
  const [isBlockingSlot, setIsBlockingSlot] = useState(false)
  const [removingBlockedSlotId, setRemovingBlockedSlotId] = useState("")
  const [selectedAvailabilityDate, setSelectedAvailabilityDate] = useState("")
  const [availabilityMonth, setAvailabilityMonth] = useState(() => new Date())
  const [blockForm, setBlockForm] = useState({
    blockDate: "",
    startTime: "",
    endTime: "",
    reason: "",
    isFullDay: false,
  })

  const today = useMemo(() => getTodayInputValue(), [])

  const dashboardCounts = useMemo(() => ({
    today: bookings.filter((booking) => booking.preferred_date === today).length,
    upcoming: bookings.filter((booking) => (
      booking.preferred_date >= today && activeStatuses.includes(booking.status)
    )).length,
    pending: bookings.filter((booking) => booking.status === "pending").length,
    completed: bookings.filter((booking) => booking.status === "completed").length,
  }), [bookings, today])

  const filteredBookings = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase()

    return bookings.filter((booking) => {
      const matchesDate = !dateFilter || booking.preferred_date === dateFilter
      const matchesStatus = statusFilter === "all" || booking.status === statusFilter
      const searchableText = [
        booking.full_name,
        booking.mobile_number,
        booking.email_address,
      ].join(" ").toLowerCase()
      const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch)

      return matchesDate && matchesStatus && matchesSearch
    })
  }, [bookings, dateFilter, searchQuery, statusFilter])

  const availabilityCalendarDays = useMemo(
    () => getMonthCalendarDays(availabilityMonth),
    [availabilityMonth],
  )

  const selectedDateForAvailability = selectedAvailabilityDate || blockForm.blockDate || today

  const blockedSlotsForSelectedDate = useMemo(
    () => blockedSlots.filter((slot) => slot.block_date === selectedDateForAvailability),
    [blockedSlots, selectedDateForAvailability],
  )

  useEffect(() => {
    if (!session) {
      return
    }

    let isMounted = true

    async function loadDashboardData() {
      try {
        setIsLoading(true)
        setMessage("")
        const [bookingData, blockedSlotData] = await Promise.all([
          getAdminBookings(),
          getAdminBlockedSlots(),
        ])

        if (isMounted) {
          setBookings(bookingData)
          setBlockedSlots(blockedSlotData)
          setSelectedAvailabilityDate((current) => current || today)
          setBlockForm((current) => ({
            ...current,
            blockDate: current.blockDate || today,
          }))
        }
      } catch (error) {
        if (isMounted) {
          setMessage(error.message || "Unable to load dashboard data.")
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadDashboardData()

    return () => {
      isMounted = false
    }
  }, [session, today])

  if (!session) {
    return <Navigate to="/admin/login" replace />
  }

  function openDetails(booking) {
    setSelectedBooking(booking)
    setAdminNotes(booking.admin_notes || "")
  }

  function syncUpdatedBooking(updatedBooking) {
    setBookings((current) => current.map((booking) => (
      booking.id === updatedBooking.id ? updatedBooking : booking
    )))
    setSelectedBooking((current) => (
      current?.id === updatedBooking.id ? updatedBooking : current
    ))
  }

  function updateBlockField(field, value) {
    setBlockForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function handleAvailabilityDateSelect(dateValue) {
    setSelectedAvailabilityDate(dateValue)
    setBlockForm((current) => ({
      ...current,
      blockDate: dateValue,
    }))
  }

  async function handleStatusChange(bookingId, status) {
    try {
      setUpdatingId(bookingId)
      setMessage("")
      const updatedBooking = await updateBookingStatus(bookingId, status)
      syncUpdatedBooking(updatedBooking)
    } catch (error) {
      setMessage(error.message || "Unable to update booking status.")
    } finally {
      setUpdatingId("")
    }
  }

  async function handleSaveNotes() {
    if (!selectedBooking) {
      return
    }

    try {
      setUpdatingId(selectedBooking.id)
      setMessage("")
      const updatedBooking = await updateBookingNotes(selectedBooking.id, adminNotes)
      syncUpdatedBooking(updatedBooking)
    } catch (error) {
      setMessage(error.message || "Unable to save admin notes.")
    } finally {
      setUpdatingId("")
    }
  }

  async function handleCreateBlockedSlot(event) {
    event.preventDefault()

    if (!blockForm.blockDate) {
      setMessage("Please select a date to block availability.")
      return
    }

    if (!blockForm.isFullDay && (!blockForm.startTime || !blockForm.endTime)) {
      setMessage("From and To times are required unless full day is selected.")
      return
    }

    const nextStartTime = blockForm.isFullDay ? "00:00" : blockForm.startTime
    const nextEndTime = blockForm.isFullDay ? "23:59" : blockForm.endTime

    if (!blockForm.isFullDay && convertTimeValueToMinutes(nextEndTime) <= convertTimeValueToMinutes(nextStartTime)) {
      setMessage("End time must be after start time.")
      return
    }

    if (hasBlockedSlotOverlap(blockedSlots, blockForm.blockDate, nextStartTime, nextEndTime)) {
      setMessage("This blocked time overlaps an existing blocked slot.")
      return
    }

    try {
      setIsBlockingSlot(true)
      setMessage("")

      const createdBlockedSlot = await createBlockedSlot({
        ...blockForm,
        blockedBy: session.user.email || "Admin",
      })

      setBlockedSlots((current) => {
        const next = [...current, createdBlockedSlot]
        return next.sort((left, right) => (
          left.block_date.localeCompare(right.block_date)
          || convertTimeValueToMinutes(left.start_time) - convertTimeValueToMinutes(right.start_time)
        ))
      })

      setSelectedAvailabilityDate(blockForm.blockDate)
      setBlockForm((current) => ({
        ...current,
        blockDate: current.blockDate,
        startTime: "",
        endTime: "",
        reason: "",
        isFullDay: false,
      }))
      setMessage("Availability blocked successfully.")
    } catch (error) {
      setMessage(
        error.code === "23P01"
          ? "This blocked time overlaps an existing blocked slot."
          : error.message || "Unable to block availability.",
      )
    } finally {
      setIsBlockingSlot(false)
    }
  }

  async function handleRemoveBlockedSlot(blockedSlotId) {
    try {
      setRemovingBlockedSlotId(blockedSlotId)
      setMessage("")
      await removeBlockedSlot(blockedSlotId)
      setBlockedSlots((current) => current.filter((slot) => slot.id !== blockedSlotId))
      setMessage("Blocked slot removed.")
    } catch (error) {
      setMessage(error.message || "Unable to remove blocked slot.")
    } finally {
      setRemovingBlockedSlotId("")
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    navigate("/admin/login", { replace: true })
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-6 font-inter text-[#0F172A] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="border-b border-[#E2E8F0] pb-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Link to="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0353A4]">
                <span aria-hidden="true">←</span>
                <span>Back to Dashboard</span>
              </Link>
              <h1 className="mt-4 font-playfair text-4xl font-bold text-[#0F172A]">Manage Availability</h1>
              <p className="mt-2 text-sm text-[#64748B]">
                Block specific dates and time slots. Changes are reflected in real-time on the website.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="bb-button bb-button-secondary bb-button-compact"
            >
              Sign Out
            </button>
          </div>
        </header>

        <section className="mt-6 rounded-[24px] border border-[#E2E8F0] bg-white p-5 shadow-[0_18px_48px_rgba(15,23,42,0.08)] sm:p-6">
          <div className="flex flex-col gap-4 border-b border-[#E2E8F0] pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-playfair text-2xl font-bold text-[#0F172A]">Manage Availability</h2>
              <p className="mt-1 text-sm text-[#64748B]">
                Block specific dates and time slots. Changes are reflected in real-time on the website.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleAvailabilityDateSelect(selectedDateForAvailability)}
              className="inline-flex h-12 items-center justify-center rounded-xl bg-[#0353A4] px-5 text-sm font-bold text-white transition hover:bg-[#0466C8]"
            >
              Block Date / Time
            </button>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.02fr_1.28fr]">
            <article className="rounded-[20px] border border-[#E2E8F0] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setAvailabilityMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))}
                  className="grid h-10 w-10 place-items-center rounded-xl text-[#0353A4] transition hover:bg-[#F8FAFC]"
                  aria-label="Previous month"
                >
                  ←
                </button>
                <h3 className="font-playfair text-3xl font-bold text-[#0F172A]">
                  {availabilityMonthNames[availabilityMonth.getMonth()]} {availabilityMonth.getFullYear()}
                </h3>
                <button
                  type="button"
                  onClick={() => setAvailabilityMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))}
                  className="grid h-10 w-10 place-items-center rounded-xl text-[#0353A4] transition hover:bg-[#F8FAFC]"
                  aria-label="Next month"
                >
                  →
                </button>
              </div>

              <div className="mt-6 grid grid-cols-7 gap-y-4 text-center">
                {availabilityWeekdays.map((day) => (
                  <div key={day} className="text-sm font-bold text-[#0F172A]">{day}</div>
                ))}

                {availabilityCalendarDays.map((day) => {
                  const dayStatus = getBlockedStatusForDate(blockedSlots, day.inputValue)
                  const isSelected = day.inputValue === selectedDateForAvailability

                  return (
                    <button
                      key={day.inputValue}
                      type="button"
                      onClick={() => handleAvailabilityDateSelect(day.inputValue)}
                      className={`relative mx-auto grid h-11 w-11 place-items-center rounded-full text-sm font-semibold transition ${
                        isSelected
                          ? "bg-[#0353A4] text-white shadow-[0_12px_24px_rgba(3,83,164,0.22)]"
                          : day.isCurrentMonth
                            ? "text-[#0F172A] hover:bg-[#F8FAFC]"
                            : "text-[#94A3B8]"
                      }`}
                    >
                      <span>{day.day}</span>
                      {!isSelected && dayStatus !== "available" && (
                        <span
                          className={`absolute bottom-1.5 h-1.5 w-1.5 rounded-full ${
                            dayStatus === "full" ? "bg-[#FCA5A5]" : "bg-[#FBBF24]"
                          }`}
                        />
                      )}
                    </button>
                  )
                })}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-[#64748B]">
                <div className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 rounded bg-[#DCFCE7]" />
                  <span>Available</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 rounded bg-[#FEF3C7]" />
                  <span>Partially Blocked</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 rounded bg-[#FECACA]" />
                  <span>Fully Blocked</span>
                </div>
              </div>
            </article>

            <article className="overflow-hidden rounded-[20px] border border-[#E2E8F0] bg-white shadow-sm">
              <div className="border-b border-[#E2E8F0] px-5 py-4">
                <h3 className="font-playfair text-2xl font-bold text-[#0F172A]">Block Date / Time</h3>
              </div>

              <form className="px-5 py-5" onSubmit={handleCreateBlockedSlot}>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block md:col-span-2">
                    <span className="text-sm font-bold text-[#0F172A]">Date</span>
                    <input
                      type="date"
                      value={blockForm.blockDate}
                      onChange={(event) => updateBlockField("blockDate", event.target.value)}
                      className="mt-2 h-11 w-full rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm outline-none focus:border-[#0353A4] focus:ring-4 focus:ring-sky-100"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-bold text-[#0F172A]">From</span>
                    <input
                      type="time"
                      value={blockForm.startTime}
                      onChange={(event) => updateBlockField("startTime", event.target.value)}
                      disabled={blockForm.isFullDay}
                      className="mt-2 h-11 w-full rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm outline-none focus:border-[#0353A4] focus:ring-4 focus:ring-sky-100 disabled:bg-slate-50"
                      required={!blockForm.isFullDay}
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-bold text-[#0F172A]">To</span>
                    <input
                      type="time"
                      value={blockForm.endTime}
                      onChange={(event) => updateBlockField("endTime", event.target.value)}
                      disabled={blockForm.isFullDay}
                      className="mt-2 h-11 w-full rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm outline-none focus:border-[#0353A4] focus:ring-4 focus:ring-sky-100 disabled:bg-slate-50"
                      required={!blockForm.isFullDay}
                    />
                  </label>

                  <label className="block md:col-span-2">
                    <span className="text-sm font-bold text-[#0F172A]">Reason (Optional)</span>
                    <input
                      type="text"
                      value={blockForm.reason}
                      onChange={(event) => updateBlockField("reason", event.target.value)}
                      className="mt-2 h-11 w-full rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm outline-none focus:border-[#0353A4] focus:ring-4 focus:ring-sky-100"
                      placeholder="Personal meeting"
                    />
                  </label>
                </div>

                <label className="mt-4 inline-flex items-center gap-3 text-sm font-medium text-[#0F172A]">
                  <input
                    type="checkbox"
                    checked={blockForm.isFullDay}
                    onChange={(event) => updateBlockField("isFullDay", event.target.checked)}
                    className="h-4 w-4 rounded border-[#CBD5E1] accent-[#0353A4]"
                  />
                  Block full day
                </label>

                <div className="mt-5 flex justify-end">
                  <button
                    type="submit"
                    disabled={isBlockingSlot}
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-[#0353A4] px-5 text-sm font-bold text-white transition hover:bg-[#0466C8] disabled:opacity-70"
                  >
                    {isBlockingSlot ? "Adding..." : "Add Block"}
                  </button>
                </div>
              </form>

              <div className="border-t border-[#E2E8F0] px-5 py-4">
                <h4 className="text-lg font-bold text-[#0353A4]">
                  Blocked slots on {formatDate(selectedDateForAvailability)}
                </h4>
              </div>

              <div className="px-5 pb-5">
                {blockedSlotsForSelectedDate.length === 0 ? (
                  <p className="rounded-xl bg-[#F8FAFC] px-4 py-4 text-sm text-[#64748B]">No blocked slots for this date.</p>
                ) : (
                  <div className="space-y-3">
                    {blockedSlotsForSelectedDate.map((slot) => (
                      <div key={slot.id} className="flex flex-col gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                          <span className="text-sm font-semibold text-[#0F172A]">
                            {formatTimeRange(slot.start_time, slot.end_time, slot.is_full_day)}
                          </span>
                          <span className="text-sm text-[#64748B]">{slot.reason || "-"}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveBlockedSlot(slot.id)}
                          disabled={removingBlockedSlotId === slot.id}
                          className="bb-button bb-button-outline bb-button-compact"
                        >
                          {removingBlockedSlotId === slot.id ? "Removing..." : "Unblock"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </article>
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-[24px] border border-[#E2E8F0] bg-white shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
          <div className="border-b border-[#E2E8F0] px-5 py-4">
            <h2 className="font-playfair text-2xl font-bold text-[#0F172A]">All Blocked Dates &amp; Time Slots</h2>
          </div>

          {blockedSlots.length === 0 ? (
            <p className="px-5 py-8 text-sm font-semibold text-[#64748B]">No blocked dates or time slots added yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="bg-[#F8FAFC] text-xs uppercase tracking-[0.12em] text-[#64748B]">
                  <tr>
                    <th className="px-5 py-4">Date</th>
                    <th className="px-5 py-4">Time</th>
                    <th className="px-5 py-4">Reason</th>
                    <th className="px-5 py-4">Blocked By</th>
                    <th className="px-5 py-4">Created On</th>
                    <th className="px-5 py-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {blockedSlots.map((slot) => (
                    <tr key={slot.id} className="border-t border-[#E2E8F0]">
                      <td className="px-5 py-4 font-semibold">{formatDate(slot.block_date)}</td>
                      <td className="px-5 py-4">{formatTimeRange(slot.start_time, slot.end_time, slot.is_full_day)}</td>
                      <td className="px-5 py-4">{slot.reason || "-"}</td>
                      <td className="px-5 py-4">{slot.blocked_by || "Admin"}</td>
                      <td className="px-5 py-4">{formatDateTime(slot.created_at)}</td>
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => handleRemoveBlockedSlot(slot.id)}
                          disabled={removingBlockedSlotId === slot.id}
                          className="bb-button bb-button-outline bb-button-compact"
                        >
                          {removingBlockedSlotId === slot.id ? "Removing..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Today's bookings", dashboardCounts.today],
            ["Upcoming bookings", dashboardCounts.upcoming],
            ["Pending bookings", dashboardCounts.pending],
            ["Completed bookings", dashboardCounts.completed],
          ].map(([label, value]) => (
            <article key={label} className="rounded-lg border border-sky-100 bg-white p-5 shadow-sm shadow-sky-900/5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#0353A4]">{label}</p>
              <p className="mt-2 text-3xl font-bold">{value}</p>
            </article>
          ))}
        </section>

        {message && (
          <p className="mt-5 rounded-lg bg-pink-50 px-4 py-3 text-sm font-semibold text-[#B8325C]">
            {message}
          </p>
        )}

        <section className="mt-6 overflow-hidden rounded-lg border border-sky-100 bg-white shadow-xl shadow-sky-900/8">
          <div className="grid gap-4 border-b border-sky-100 px-5 py-4 lg:grid-cols-[1fr_180px_180px]">
            <div>
              <h2 className="font-playfair text-2xl font-bold">Bookings</h2>
              <p className="mt-1 text-sm text-[#1E2A52]/65">
                Showing {filteredBookings.length} of {bookings.length} requests.
              </p>
            </div>
            <input
              type="date"
              value={dateFilter}
              onChange={(event) => setDateFilter(event.target.value)}
              className="h-11 rounded-lg border border-sky-200 bg-white px-3 text-sm outline-none focus:border-[#0353A4] focus:ring-4 focus:ring-sky-100"
              aria-label="Filter bookings by date"
            />
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="h-11 rounded-lg border border-sky-200 bg-white px-3 text-sm outline-none focus:border-[#0353A4] focus:ring-4 focus:ring-sky-100"
              aria-label="Filter bookings by status"
            >
              <option value="all">All statuses</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search name, mobile, or email"
              className="h-11 rounded-lg border border-sky-200 bg-white px-3 text-sm outline-none focus:border-[#0353A4] focus:ring-4 focus:ring-sky-100 lg:col-span-3"
            />
          </div>

          {isLoading ? (
            <p className="px-5 py-8 text-sm font-semibold text-[#1E2A52]/65">Loading bookings...</p>
          ) : filteredBookings.length === 0 ? (
            <p className="px-5 py-8 text-sm font-semibold text-[#1E2A52]/65">No bookings match the selected filters.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="bg-[#F8FBFF] text-xs uppercase tracking-[0.12em] text-[#1E2A52]/60">
                  <tr>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Duration</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Mobile</th>
                    <th className="px-4 py-3">Concern</th>
                    <th className="px-4 py-3">Mode</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="border-t border-sky-50 align-top">
                      <td className="whitespace-nowrap px-4 py-4">{formatDate(booking.preferred_date)}</td>
                      <td className="whitespace-nowrap px-4 py-4">{booking.preferred_time_slot}</td>
                      <td className="whitespace-nowrap px-4 py-4">{booking.consultation_duration}</td>
                      <td className="px-4 py-4 font-bold">{booking.full_name}</td>
                      <td className="whitespace-nowrap px-4 py-4">{booking.mobile_number}</td>
                      <td className="max-w-xs px-4 py-4">{booking.primary_concern}</td>
                      <td className="px-4 py-4">{booking.consultation_mode}</td>
                      <td className="px-4 py-4">
                        <select
                          value={booking.status}
                          disabled={updatingId === booking.id}
                          onChange={(event) => handleStatusChange(booking.id, event.target.value)}
                          className="h-10 rounded-lg border border-sky-200 bg-white px-3 font-semibold outline-none focus:border-[#0353A4] focus:ring-4 focus:ring-sky-100"
                        >
                          {(allowedStatusTransitions[booking.status] || [booking.status]).map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          type="button"
                          onClick={() => openDetails(booking)}
                          className="bb-button bb-button-outline bb-button-compact"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {selectedBooking && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-[#1E2A52]/35 px-4 py-6">
          <section className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-5 shadow-2xl shadow-sky-900/20 sm:p-6">
            <div className="flex items-start justify-between gap-4 border-b border-sky-100 pb-4">
              <div>
                <h2 className="font-playfair text-3xl font-bold">Booking Details</h2>
                <p className="mt-1 text-sm text-[#1E2A52]/65">{selectedBooking.preferred_time_slot}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                className="bb-button bb-button-outline bb-button-compact"
              >
                Close
              </button>
            </div>

            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                ["Full Name", selectedBooking.full_name],
                ["Mobile Number", selectedBooking.mobile_number],
                ["Email Address", selectedBooking.email_address],
                ["Baby Age / Pregnancy Week", selectedBooking.baby_info],
                ["Primary Concern", selectedBooking.primary_concern],
                ["Consultation Mode", selectedBooking.consultation_mode],
                ["Preferred Date", formatDate(selectedBooking.preferred_date)],
                ["Time Range", selectedBooking.preferred_time_slot],
                ["Duration", selectedBooking.consultation_duration],
                ["Status", selectedBooking.status],
                ["Created At", formatDateTime(selectedBooking.created_at)],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg bg-[#F8FBFF] p-4">
                  <dt className="text-xs font-bold uppercase tracking-[0.12em] text-[#0353A4]">{label}</dt>
                  <dd className="mt-1 text-sm font-semibold">{value || "-"}</dd>
                </div>
              ))}
            </dl>

            <label className="mt-5 block">
              <span className="text-sm font-bold">Admin Notes</span>
              <textarea
                value={adminNotes}
                onChange={(event) => setAdminNotes(event.target.value)}
                rows="5"
                className="mt-2 w-full resize-none rounded-lg border border-sky-200 bg-white px-4 py-3 outline-none focus:border-[#0353A4] focus:ring-4 focus:ring-sky-100"
                placeholder="Add internal notes for Divya and Dinesh"
              />
            </label>

            <button
              type="button"
              onClick={handleSaveNotes}
              disabled={updatingId === selectedBooking.id}
              className="bb-button bb-button-primary bb-button-compact mt-4"
            >
              {updatingId === selectedBooking.id ? "Saving..." : "Save Notes"}
            </button>
          </section>
        </div>
      )}
    </main>
  )
}

export default AdminDashboard
