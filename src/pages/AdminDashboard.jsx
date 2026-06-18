import { useEffect, useMemo, useRef, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
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

const sidebarSections = [
  { id: "dashboard", label: "Dashboard", icon: "home" },
  { id: "bookings", label: "Bookings", icon: "bookings" },
  {
    id: "calendar",
    label: "Calendar",
    icon: "calendar",
    children: [
      { id: "manage-availability", label: "Manage Availability" },
      { id: "blocked-dates", label: "Blocked Dates" },
    ],
  },
  { id: "clients", label: "Clients", icon: "clients" },
  { id: "consultants", label: "Consultants", icon: "consultants" },
  { id: "services", label: "Services", icon: "services" },
  { id: "messages", label: "Messages", icon: "messages" },
  { id: "settings", label: "Settings", icon: "settings" },
]

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

function formatLongDate(value) {
  if (!value) {
    return "-"
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`))
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

function formatTimeForSelect(value) {
  if (!value) {
    return ""
  }

  if (value.includes("AM") || value.includes("PM")) {
    return value
  }

  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(`2000-01-01T${value}:00`))
}

function formatTimeRange(startTime, endTime, isFullDay = false) {
  if (isFullDay) {
    return "Full day"
  }

  if (!startTime || !endTime) {
    return "-"
  }

  return `${formatTimeForSelect(startTime)} - ${formatTimeForSelect(endTime)}`
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

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

function getSidebarTargetView(itemId) {
  if (itemId === "manage-availability" || itemId === "blocked-dates") {
    return "manage-availability"
  }

  return "dashboard"
}

function SidebarIcon({ type, className = "h-5 w-5" }) {
  const commonProps = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true",
  }

  if (type === "home") {
    return (
      <svg {...commonProps}>
        <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1v-9.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    )
  }

  if (type === "bookings") {
    return (
      <svg {...commonProps}>
        <rect x="4" y="5" width="16" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }

  if (type === "calendar") {
    return (
      <svg {...commonProps}>
        <rect x="4" y="4.5" width="16" height="15.5" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 2.8v3.4M16 2.8v3.4M4 9.5h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8.5 13h3M8.5 16h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }

  if (type === "clients" || type === "consultants") {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="8" r="3.3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M5.5 19.5c1.2-2.9 3.5-4.3 6.5-4.3s5.3 1.4 6.5 4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }

  if (type === "services") {
    return (
      <svg {...commonProps}>
        <path d="M7 9.5h10M7 13h10M7 16.5h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <rect x="4" y="5" width="16" height="14" rx="3" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    )
  }

  if (type === "messages") {
    return (
      <svg {...commonProps}>
        <path d="M6.5 18.5 4 20v-4.8A3.2 3.2 0 0 1 7.2 12h9.6a3.2 3.2 0 0 1 3.2 3.2v2.1a3.2 3.2 0 0 1-3.2 3.2H8.6a3.1 3.1 0 0 1-2.1-.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M8 16h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg {...commonProps}>
      <path d="M12 3.5v3M12 17.5v3M4.5 12h3M16.5 12h3M6.7 6.7l2.1 2.1M15.2 15.2l2.1 2.1M17.3 6.7l-2.1 2.1M8.8 15.2l-2.1 2.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

function ActionIcon({ type, className = "h-5 w-5" }) {
  const commonProps = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": "true",
  }

  if (type === "arrow-left") {
    return (
      <svg {...commonProps}>
        <path d="M14.5 6 8.5 12l6 6M9 12h10" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (type === "arrow-right") {
    return (
      <svg {...commonProps}>
        <path d="m9.5 6 6 6-6 6M15 12H5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (type === "calendar-plus") {
    return (
      <svg {...commonProps}>
        <rect x="3.5" y="4.5" width="17" height="15.5" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M7.5 2.8v3.4M16.5 2.8v3.4M3.5 9.2h17M12 12v5M9.5 14.5h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }

  if (type === "trash") {
    return (
      <svg {...commonProps}>
        <path d="M5 7.5h14M9 4.5h6M9 10.5v6M15 10.5v6M7.5 7.5l.7 10a2 2 0 0 0 2 1.9h3.6a2 2 0 0 0 2-1.9l.7-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (type === "menu") {
    return (
      <svg {...commonProps}>
        <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }

  if (type === "close") {
    return (
      <svg {...commonProps}>
        <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    )
  }

  if (type === "chevron-down") {
    return (
      <svg {...commonProps}>
        <path d="m7 10 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  return (
    <svg {...commonProps}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 8v4l2.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function AdminDashboard({ session }) {
  const navigate = useNavigate()
  const blockFormRef = useRef(null)
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
  const [blockedSlotsFilter, setBlockedSlotsFilter] = useState("upcoming")
  const [activeView, setActiveView] = useState("manage-availability")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [blockForm, setBlockForm] = useState({
    blockDate: "",
    startTime: "",
    endTime: "",
    reason: "",
    isFullDay: false,
  })

  const today = useMemo(() => getTodayInputValue(), [])
  const profileName = "Divya"
  const profileRole = "Administrator"
  const profileInitials = getInitials(profileName)

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

  const filteredBlockedSlots = useMemo(() => {
    const sortedSlots = [...blockedSlots].sort((left, right) => (
      left.block_date.localeCompare(right.block_date)
      || convertTimeValueToMinutes(left.start_time) - convertTimeValueToMinutes(right.start_time)
    ))

    if (blockedSlotsFilter === "all") {
      return sortedSlots
    }

    if (blockedSlotsFilter === "past") {
      return sortedSlots.filter((slot) => slot.block_date < today)
    }

    return sortedSlots.filter((slot) => slot.block_date >= today)
  }, [blockedSlots, blockedSlotsFilter, today])

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

  function handleSidebarSelect(itemId) {
    setActiveView(getSidebarTargetView(itemId))
    setIsSidebarOpen(false)
  }

  function scrollToBlockForm() {
    blockFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  function renderSidebarInner({ onClose } = {}) {
    return (
      <>
        <div className="flex h-[88px] items-center justify-between border-b border-[#E2E8F0] px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full border border-[#E2E8F0] bg-white">
              <img src="/favicon.png" alt="BreastBuddies logo" className="h-8 w-8 rounded-full object-cover" />
            </div>
            <div className="font-playfair text-[24px] font-bold leading-none">
              <span className="text-[#FF477E]">Breast</span>
              <span className="text-[#0353A4]">Buddies</span>
            </div>
          </div>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="grid h-10 w-10 place-items-center rounded-xl border border-[#E2E8F0] bg-white text-[#0F172A] lg:hidden"
              aria-label="Close admin menu"
            >
              <ActionIcon type="close" className="h-4 w-4" />
            </button>
          ) : null}
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <nav className="space-y-2" aria-label="Admin navigation">
            {sidebarSections.map((item) => {
              const isCalendarGroup = item.id === "calendar"
              const isItemActive = item.id === "dashboard"
                ? activeView === "dashboard"
                : isCalendarGroup
                  ? activeView === "manage-availability"
                  : false

              return (
                <div key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleSidebarSelect(item.id)}
                    className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-[15px] font-semibold transition ${
                      isItemActive
                        ? "bg-[#EEF5FF] text-[#0353A4]"
                        : "text-[#0F172A] hover:bg-[#F8FAFC]"
                    }`}
                  >
                    <span className={`grid h-9 w-9 place-items-center rounded-xl ${isItemActive ? "bg-white text-[#0353A4]" : "text-[#64748B]"}`}>
                      <SidebarIcon type={item.icon} />
                    </span>
                    <span className="flex-1">{item.label}</span>
                    {item.children ? (
                      <span className={`${isItemActive ? "text-[#0353A4]" : "text-[#94A3B8]"}`}>
                        <ActionIcon type="chevron-down" className="h-4 w-4" />
                      </span>
                    ) : null}
                  </button>

                  {item.children ? (
                    <div className="mt-2 space-y-1 pl-[56px]">
                      {item.children.map((child) => {
                        const isChildActive = child.id === "manage-availability"
                          ? activeView === "manage-availability"
                          : false

                        return (
                          <button
                            key={child.id}
                            type="button"
                            onClick={() => handleSidebarSelect(child.id)}
                            className={`flex w-full items-center gap-3 rounded-2xl px-4 py-2.5 text-left text-[15px] font-medium transition ${
                              isChildActive
                                ? "bg-[#EEF5FF] text-[#0353A4]"
                                : "text-[#334155] hover:bg-[#F8FAFC]"
                            }`}
                          >
                            <span className={`h-2 w-2 rounded-full ${isChildActive ? "bg-[#0353A4]" : "bg-[#CBD5E1]"}`} />
                            <span>{child.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  ) : null}
                </div>
              )
            })}
          </nav>
        </div>

        <div className="p-4">
          <div className="rounded-[24px] border border-[#E2E8F0] bg-[#FFFFFF] p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-[#EEF5FF] text-[#0353A4]">
              <span className="text-xl font-bold">?</span>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-[#0F172A]">Need Help?</h3>
            <p className="mt-2 text-sm leading-6 text-[#64748B]">
              Learn how to manage availability and calendar updates from the admin panel.
            </p>
            <button
              type="button"
              className="mt-5 inline-flex h-11 items-center justify-center rounded-xl border border-[#0353A4] px-4 text-sm font-semibold text-[#0353A4] transition hover:bg-[#EEF5FF]"
            >
              View Guide
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="mt-3 inline-flex h-11 items-center justify-center rounded-xl border border-[#E2E8F0] px-4 text-sm font-semibold text-[#334155] transition hover:bg-[#F8FAFC]"
            >
              Sign Out
            </button>
          </div>
        </div>
      </>
    )
  }

  function renderSidebar() {
    return (
      <aside className="flex h-full w-full max-w-[256px] flex-col border-r border-[#E2E8F0] bg-white">
        {renderSidebarInner()}
      </aside>
    )
  }

  function renderTopBar() {
    return (
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {activeView === "manage-availability" ? (
          <button
            type="button"
            onClick={() => setActiveView("dashboard")}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E3A8A] transition hover:text-[#0353A4]"
          >
            <ActionIcon type="arrow-left" className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </button>
        ) : (
          <div className="text-sm font-medium text-[#64748B]">Admin Dashboard</div>
        )}

        <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#E2E8F0] bg-white px-4 py-3 shadow-[0_6px_20px_rgba(15,23,42,0.04)] md:min-w-[220px] md:justify-end">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-[#EEF5FF] text-sm font-bold text-[#1E3A8A]">
            {profileInitials}
          </div>
          <div className="text-left">
            <p className="text-[16px] font-semibold leading-none text-[#0F172A]">{profileName}</p>
            <p className="mt-1 text-sm text-[#64748B]">{profileRole}</p>
          </div>
          <span className="text-[#64748B]">
            <ActionIcon type="chevron-down" className="h-4 w-4" />
          </span>
        </div>
      </div>
    )
  }

  function renderManageAvailability() {
    return (
      <>
        <section className="rounded-[24px] border border-[#E2E8F0] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.05)] md:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[#0F172A] md:text-[38px]">Manage Availability</h1>
              <p className="mt-2 max-w-2xl text-[15px] leading-7 text-[#64748B]">
                Block specific dates and time slots. Changes are reflected in real-time on the website.
              </p>
            </div>
            <button
              type="button"
              onClick={scrollToBlockForm}
              className="inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-[#0353A4] px-5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(3,83,164,0.18)] transition hover:bg-[#02427f]"
            >
              <ActionIcon type="calendar-plus" className="h-5 w-5" />
              <span>Block Date / Time</span>
            </button>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.03fr_1.25fr]">
            <article className="rounded-[20px] border border-[#E2E8F0] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] md:p-6">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setAvailabilityMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))}
                  className="grid h-10 w-10 place-items-center rounded-full text-[#0F172A] transition hover:bg-[#F8FAFC]"
                  aria-label="Previous month"
                >
                  <ActionIcon type="arrow-left" className="h-5 w-5" />
                </button>
                <h2 className="text-[22px] font-semibold text-[#0F172A]">
                  {availabilityMonthNames[availabilityMonth.getMonth()]} {availabilityMonth.getFullYear()}
                </h2>
                <button
                  type="button"
                  onClick={() => setAvailabilityMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))}
                  className="grid h-10 w-10 place-items-center rounded-full text-[#0F172A] transition hover:bg-[#F8FAFC]"
                  aria-label="Next month"
                >
                  <ActionIcon type="arrow-right" className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-7 grid grid-cols-7 gap-y-4 text-center">
                {availabilityWeekdays.map((day) => (
                  <div key={day} className="text-sm font-semibold text-[#1E3A8A]">{day}</div>
                ))}

                {availabilityCalendarDays.map((day) => {
                  const dayStatus = getBlockedStatusForDate(blockedSlots, day.inputValue)
                  const isSelected = day.inputValue === selectedDateForAvailability

                  return (
                    <button
                      key={day.inputValue}
                      type="button"
                      onClick={() => handleAvailabilityDateSelect(day.inputValue)}
                      className={`relative mx-auto grid h-11 w-11 place-items-center rounded-full text-base font-medium transition ${
                        isSelected
                          ? "bg-[#0353A4] text-white shadow-[0_12px_28px_rgba(3,83,164,0.28)]"
                          : day.isCurrentMonth
                            ? "text-[#0F172A] hover:bg-[#F8FAFC]"
                            : "text-[#94A3B8]"
                      }`}
                    >
                      <span>{day.day}</span>
                      {!isSelected && dayStatus !== "available" ? (
                        <span
                          className={`absolute bottom-1.5 h-1.5 w-1.5 rounded-full ${
                            dayStatus === "full" ? "bg-[#FB7185]" : "bg-[#F59E0B]"
                          }`}
                        />
                      ) : null}
                    </button>
                  )
                })}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-[#334155]">
                <div className="inline-flex items-center gap-2">
                  <span className="h-5 w-5 rounded-md bg-[#DCFCE7]" />
                  <span>Available</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <span className="h-5 w-5 rounded-md bg-[#FEF3C7]" />
                  <span>Partially Blocked</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <span className="h-5 w-5 rounded-md bg-[#FEE2E2]" />
                  <span>Fully Blocked</span>
                </div>
              </div>
            </article>

            <article ref={blockFormRef} className="overflow-hidden rounded-[20px] border border-[#E2E8F0] bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
              <div className="border-b border-[#E2E8F0] px-6 py-5">
                <h2 className="text-[18px] font-semibold text-[#1E3A8A]">Block Date / Time</h2>
              </div>

              <form className="px-6 py-5" onSubmit={handleCreateBlockedSlot}>
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block md:col-span-2">
                    <span className="text-sm font-medium text-[#0F172A]">Date</span>
                    <input
                      type="date"
                      value={blockForm.blockDate}
                      onChange={(event) => updateBlockField("blockDate", event.target.value)}
                      className="mt-2 h-11 w-full rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm text-[#0F172A] outline-none transition focus:border-[#0353A4] focus:ring-4 focus:ring-[#DCEBFF]"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-[#0F172A]">From</span>
                    <input
                      type="time"
                      value={blockForm.startTime}
                      onChange={(event) => updateBlockField("startTime", event.target.value)}
                      disabled={blockForm.isFullDay}
                      className="mt-2 h-11 w-full rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm text-[#0F172A] outline-none transition focus:border-[#0353A4] focus:ring-4 focus:ring-[#DCEBFF] disabled:bg-[#F8FAFC] disabled:text-[#94A3B8]"
                      required={!blockForm.isFullDay}
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-[#0F172A]">To</span>
                    <input
                      type="time"
                      value={blockForm.endTime}
                      onChange={(event) => updateBlockField("endTime", event.target.value)}
                      disabled={blockForm.isFullDay}
                      className="mt-2 h-11 w-full rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm text-[#0F172A] outline-none transition focus:border-[#0353A4] focus:ring-4 focus:ring-[#DCEBFF] disabled:bg-[#F8FAFC] disabled:text-[#94A3B8]"
                      required={!blockForm.isFullDay}
                    />
                  </label>

                  <label className="block md:col-span-2">
                    <span className="text-sm font-medium text-[#0F172A]">Reason (Optional)</span>
                    <input
                      type="text"
                      value={blockForm.reason}
                      onChange={(event) => updateBlockField("reason", event.target.value)}
                      className="mt-2 h-11 w-full rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm text-[#0F172A] outline-none transition focus:border-[#0353A4] focus:ring-4 focus:ring-[#DCEBFF]"
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
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-[#0353A4] px-5 text-sm font-semibold text-white transition hover:bg-[#02427f] disabled:opacity-70"
                  >
                    {isBlockingSlot ? "Adding..." : "Add Block"}
                  </button>
                </div>
              </form>

              <div className="border-t border-[#E2E8F0] px-6 py-4">
                <h3 className="text-[22px] font-semibold text-[#0353A4]">
                  Blocked slots on {formatLongDate(selectedDateForAvailability)}
                </h3>
              </div>

              <div className="px-6 pb-6">
                {blockedSlotsForSelectedDate.length === 0 ? (
                  <p className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-4 text-sm text-[#64748B]">
                    No blocked slots for this date.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {blockedSlotsForSelectedDate.map((slot) => (
                      <div key={slot.id} className="flex flex-col gap-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-6">
                          <span className="text-base font-medium text-[#0F172A]">
                            {formatTimeRange(slot.start_time, slot.end_time, slot.is_full_day)}
                          </span>
                          <span className="text-sm text-[#334155]">{slot.reason || "No reason added"}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveBlockedSlot(slot.id)}
                          disabled={removingBlockedSlotId === slot.id}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF1F2] text-[#EF4444] transition hover:bg-[#FFE4E6] disabled:opacity-70"
                          aria-label="Delete blocked slot"
                        >
                          <ActionIcon type="trash" className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </article>
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-[24px] border border-[#E2E8F0] bg-white shadow-[0_12px_32px_rgba(15,23,42,0.05)]">
          <div className="flex flex-col gap-4 border-b border-[#E2E8F0] px-6 py-5 md:flex-row md:items-center md:justify-between">
            <h2 className="text-[20px] font-semibold text-[#0F172A]">All Blocked Dates &amp; Time Slots</h2>
            <label className="flex items-center gap-3">
              <span className="sr-only">Filter blocked slots</span>
              <select
                value={blockedSlotsFilter}
                onChange={(event) => setBlockedSlotsFilter(event.target.value)}
                className="h-11 rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm font-medium text-[#334155] outline-none transition focus:border-[#0353A4] focus:ring-4 focus:ring-[#DCEBFF]"
              >
                <option value="upcoming">All Upcoming</option>
                <option value="all">All Dates</option>
                <option value="past">Past Dates</option>
              </select>
            </label>
          </div>

          {filteredBlockedSlots.length === 0 ? (
            <p className="px-6 py-8 text-sm font-medium text-[#64748B]">No blocked dates or time slots added yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="bg-[#FBFCFE] text-sm font-medium text-[#64748B]">
                  <tr>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Time</th>
                    <th className="px-6 py-4 font-medium">Reason</th>
                    <th className="px-6 py-4 font-medium">Blocked By</th>
                    <th className="px-6 py-4 font-medium">Created On</th>
                    <th className="px-6 py-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBlockedSlots.map((slot) => (
                    <tr key={slot.id} className="border-t border-[#E2E8F0]">
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-[#0F172A]">{formatLongDate(slot.block_date)}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-[#334155]">{formatTimeRange(slot.start_time, slot.end_time, slot.is_full_day)}</td>
                      <td className="px-6 py-4 text-[#334155]">{slot.reason || "-"}</td>
                      <td className="px-6 py-4 text-[#334155]">{slot.blocked_by || "Divya"}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-[#334155]">{formatDateTime(slot.created_at)}</td>
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => handleRemoveBlockedSlot(slot.id)}
                          disabled={removingBlockedSlotId === slot.id}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#FFF1F2] text-[#EF4444] transition hover:bg-[#FFE4E6] disabled:opacity-70"
                          aria-label="Delete blocked slot"
                        >
                          <ActionIcon type="trash" className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex flex-col gap-4 border-t border-[#E2E8F0] px-6 py-5 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-[#475569]">
              Showing {filteredBlockedSlots.length} of {blockedSlots.length}
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-xl border border-[#E2E8F0] bg-white text-[#64748B]"
                aria-label="Previous page"
              >
                <ActionIcon type="arrow-left" className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-xl border border-[#0353A4] bg-[#EEF5FF] text-[#0353A4]"
                aria-current="page"
              >
                1
              </button>
              <button
                type="button"
                className="grid h-10 w-10 place-items-center rounded-xl border border-[#E2E8F0] bg-white text-[#64748B]"
                aria-label="Next page"
              >
                <ActionIcon type="arrow-right" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      </>
    )
  }

  function renderDashboardHome() {
    return (
      <>
        <section className="rounded-[24px] border border-[#E2E8F0] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.05)] md:p-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-[28px] font-bold tracking-[-0.02em] text-[#0F172A] md:text-[38px]">Dashboard</h1>
              <p className="mt-2 max-w-2xl text-[15px] leading-7 text-[#64748B]">
                Monitor booking activity, review new requests, and jump into calendar management when availability needs an update.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveView("manage-availability")}
              className="inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-[#0353A4] px-5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(3,83,164,0.18)] transition hover:bg-[#02427f]"
            >
              <ActionIcon type="calendar-plus" className="h-5 w-5" />
              <span>Manage Availability</span>
            </button>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["Today's bookings", dashboardCounts.today],
              ["Upcoming bookings", dashboardCounts.upcoming],
              ["Pending bookings", dashboardCounts.pending],
              ["Completed bookings", dashboardCounts.completed],
            ].map(([label, value]) => (
              <article key={label} className="rounded-[20px] border border-[#E2E8F0] bg-[#FBFCFE] p-5 shadow-[0_8px_24px_rgba(15,23,42,0.03)]">
                <p className="text-sm font-medium text-[#64748B]">{label}</p>
                <p className="mt-3 text-[34px] font-semibold tracking-[-0.03em] text-[#0F172A]">{value}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-[24px] border border-[#E2E8F0] bg-white shadow-[0_12px_32px_rgba(15,23,42,0.05)]">
          <div className="grid gap-4 border-b border-[#E2E8F0] px-6 py-5 xl:grid-cols-[minmax(0,1fr)_180px_180px]">
            <div>
              <h2 className="text-[20px] font-semibold text-[#0F172A]">Bookings</h2>
              <p className="mt-1 text-sm text-[#64748B]">
                Showing {filteredBookings.length} of {bookings.length} requests.
              </p>
            </div>
            <input
              type="date"
              value={dateFilter}
              onChange={(event) => setDateFilter(event.target.value)}
              className="h-11 rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm text-[#0F172A] outline-none transition focus:border-[#0353A4] focus:ring-4 focus:ring-[#DCEBFF]"
              aria-label="Filter bookings by date"
            />
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="h-11 rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm text-[#0F172A] outline-none transition focus:border-[#0353A4] focus:ring-4 focus:ring-[#DCEBFF]"
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
              className="h-11 rounded-xl border border-[#E2E8F0] bg-white px-4 text-sm text-[#0F172A] outline-none transition focus:border-[#0353A4] focus:ring-4 focus:ring-[#DCEBFF] xl:col-span-3"
            />
          </div>

          {isLoading ? (
            <p className="px-6 py-8 text-sm font-medium text-[#64748B]">Loading bookings...</p>
          ) : filteredBookings.length === 0 ? (
            <p className="px-6 py-8 text-sm font-medium text-[#64748B]">No bookings match the selected filters.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="bg-[#FBFCFE] text-sm font-medium text-[#64748B]">
                  <tr>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Time</th>
                    <th className="px-6 py-4 font-medium">Duration</th>
                    <th className="px-6 py-4 font-medium">Name</th>
                    <th className="px-6 py-4 font-medium">Mobile</th>
                    <th className="px-6 py-4 font-medium">Concern</th>
                    <th className="px-6 py-4 font-medium">Mode</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="border-t border-[#E2E8F0] align-top">
                      <td className="whitespace-nowrap px-6 py-4 text-[#334155]">{formatDate(booking.preferred_date)}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-[#334155]">{booking.preferred_time_slot}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-[#334155]">{booking.consultation_duration}</td>
                      <td className="px-6 py-4 font-medium text-[#0F172A]">{booking.full_name}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-[#334155]">{booking.mobile_number}</td>
                      <td className="max-w-xs px-6 py-4 text-[#334155]">{booking.primary_concern}</td>
                      <td className="px-6 py-4 text-[#334155]">{booking.consultation_mode}</td>
                      <td className="px-6 py-4">
                        <select
                          value={booking.status}
                          disabled={updatingId === booking.id}
                          onChange={(event) => handleStatusChange(booking.id, event.target.value)}
                          className="h-10 rounded-xl border border-[#E2E8F0] bg-white px-3 font-medium text-[#0F172A] outline-none transition focus:border-[#0353A4] focus:ring-4 focus:ring-[#DCEBFF]"
                        >
                          {(allowedStatusTransitions[booking.status] || [booking.status]).map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => openDetails(booking)}
                          className="inline-flex h-10 items-center justify-center rounded-xl border border-[#E2E8F0] px-4 text-sm font-semibold text-[#0353A4] transition hover:bg-[#EEF5FF]"
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
      </>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-inter text-[#0F172A]">
      <div className="lg:hidden">
        <div className="sticky top-0 z-40 flex items-center justify-between border-b border-[#E2E8F0] bg-white px-4 py-4">
          <div className="font-playfair text-[24px] font-bold leading-none">
            <span className="text-[#FF477E]">Breast</span>
            <span className="text-[#0353A4]">Buddies</span>
          </div>
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-xl border border-[#E2E8F0] bg-white text-[#0F172A]"
            aria-label="Open admin menu"
          >
            <ActionIcon type="menu" className="h-5 w-5" />
          </button>
        </div>
      </div>

      {isSidebarOpen ? (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/30 lg:hidden">
          <div className="flex h-full max-w-[256px] flex-col bg-white shadow-2xl">
            <div className="flex min-h-0 flex-1 flex-col">
              {renderSidebarInner({ onClose: () => setIsSidebarOpen(false) })}
            </div>
          </div>
        </div>
      ) : null}

      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <div className="sticky top-0 hidden h-screen lg:block">
          {renderSidebar()}
        </div>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8 xl:px-10">
          <div className="mx-auto max-w-[1220px]">
            {renderTopBar()}

            {message ? (
              <p className="mt-5 rounded-2xl border border-[#FBCFE8] bg-[#FFF1F7] px-4 py-3 text-sm font-medium text-[#BE185D]">
                {message}
              </p>
            ) : null}

            <div className="mt-6">
              {activeView === "manage-availability" ? renderManageAvailability() : renderDashboardHome()}
            </div>
          </div>
        </main>
      </div>

      {selectedBooking ? (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-[#0F172A]/40 px-4 py-6">
          <section className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[24px] border border-[#E2E8F0] bg-white p-6 shadow-2xl sm:p-7">
            <div className="flex items-start justify-between gap-4 border-b border-[#E2E8F0] pb-4">
              <div>
                <h2 className="text-[28px] font-semibold text-[#0F172A]">Booking Details</h2>
                <p className="mt-1 text-sm text-[#64748B]">{selectedBooking.preferred_time_slot}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                className="inline-flex h-10 items-center justify-center rounded-xl border border-[#E2E8F0] px-4 text-sm font-semibold text-[#334155] transition hover:bg-[#F8FAFC]"
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
                <div key={label} className="rounded-[20px] border border-[#E2E8F0] bg-[#FBFCFE] p-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[#64748B]">{label}</dt>
                  <dd className="mt-2 text-sm font-medium text-[#0F172A]">{value || "-"}</dd>
                </div>
              ))}
            </dl>

            <label className="mt-5 block">
              <span className="text-sm font-semibold text-[#0F172A]">Admin Notes</span>
              <textarea
                value={adminNotes}
                onChange={(event) => setAdminNotes(event.target.value)}
                rows="5"
                className="mt-2 w-full resize-none rounded-[20px] border border-[#E2E8F0] bg-white px-4 py-3 text-sm text-[#0F172A] outline-none transition focus:border-[#0353A4] focus:ring-4 focus:ring-[#DCEBFF]"
                placeholder="Add internal notes for Divya and Dinesh"
              />
            </label>

            <button
              type="button"
              onClick={handleSaveNotes}
              disabled={updatingId === selectedBooking.id}
              className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-[#0353A4] px-5 text-sm font-semibold text-white transition hover:bg-[#02427f] disabled:opacity-70"
            >
              {updatingId === selectedBooking.id ? "Saving..." : "Save Notes"}
            </button>
          </section>
        </div>
      ) : null}
    </div>
  )
}

export default AdminDashboard
