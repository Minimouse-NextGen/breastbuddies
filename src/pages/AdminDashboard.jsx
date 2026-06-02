import { useEffect, useMemo, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { getAdminBookings, updateBookingNotes, updateBookingStatus } from "../services/bookingsService"
import { supabase } from "../services/supabaseClient"

const statusOptions = ["pending", "confirmed", "completed", "cancelled"]
const activeStatuses = ["pending", "confirmed"]

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

function AdminDashboard({ session }) {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [message, setMessage] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [adminNotes, setAdminNotes] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState("")

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

  useEffect(() => {
    if (!session) {
      return
    }

    let isMounted = true

    async function loadBookings() {
      try {
        setIsLoading(true)
        setMessage("")
        const data = await getAdminBookings()
        if (isMounted) {
          setBookings(data)
        }
      } catch (error) {
        if (isMounted) {
          setMessage(error.message || "Unable to load bookings.")
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadBookings()

    return () => {
      isMounted = false
    }
  }, [session])

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

  async function handleSignOut() {
    await supabase.auth.signOut()
    navigate("/admin/login", { replace: true })
  }

  return (
    <main className="min-h-screen bg-[#F8FBFF] px-4 py-6 font-inter text-[#1E2A52] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 border-b border-sky-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link to="/" className="text-sm font-semibold text-[#4F8EF7]">
              Back to website
            </Link>
            <h1 className="mt-2 font-playfair text-4xl font-bold">Admin Dashboard</h1>
            <p className="mt-2 text-sm text-[#1E2A52]/70">
              Track consultation requests, availability, notes, and status.
            </p>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-lg border border-sky-200 bg-white px-5 py-3 text-sm font-semibold shadow-sm transition hover:border-[#4F8EF7]"
          >
            Sign Out
          </button>
        </header>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Today's bookings", dashboardCounts.today],
            ["Upcoming bookings", dashboardCounts.upcoming],
            ["Pending bookings", dashboardCounts.pending],
            ["Completed bookings", dashboardCounts.completed],
          ].map(([label, value]) => (
            <article key={label} className="rounded-lg border border-sky-100 bg-white p-5 shadow-sm shadow-sky-900/5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#4F8EF7]">{label}</p>
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
              className="h-11 rounded-lg border border-sky-200 bg-white px-3 text-sm outline-none focus:border-[#4F8EF7] focus:ring-4 focus:ring-sky-100"
              aria-label="Filter bookings by date"
            />
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="h-11 rounded-lg border border-sky-200 bg-white px-3 text-sm outline-none focus:border-[#4F8EF7] focus:ring-4 focus:ring-sky-100"
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
              className="h-11 rounded-lg border border-sky-200 bg-white px-3 text-sm outline-none focus:border-[#4F8EF7] focus:ring-4 focus:ring-sky-100 lg:col-span-3"
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
                          className="h-10 rounded-lg border border-sky-200 bg-white px-3 font-semibold outline-none focus:border-[#4F8EF7] focus:ring-4 focus:ring-sky-100"
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
                          className="rounded-lg border border-sky-200 bg-white px-3 py-2 text-xs font-bold text-[#4F8EF7] transition hover:border-[#4F8EF7]"
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
                className="rounded-lg border border-sky-200 px-3 py-2 text-sm font-bold"
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
                  <dt className="text-xs font-bold uppercase tracking-[0.12em] text-[#4F8EF7]">{label}</dt>
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
                className="mt-2 w-full resize-none rounded-lg border border-sky-200 bg-white px-4 py-3 outline-none focus:border-[#4F8EF7] focus:ring-4 focus:ring-sky-100"
                placeholder="Add internal notes for Divya and Dinesh"
              />
            </label>

            <button
              type="button"
              onClick={handleSaveNotes}
              disabled={updatingId === selectedBooking.id}
              className="consultation-button mt-4 rounded-lg px-5 py-3 text-sm font-semibold"
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
