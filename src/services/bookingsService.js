import { isSupabaseConfigured, supabase } from "./supabaseClient"

function formatDatabaseTime(value) {
  if (!value || value.includes("AM") || value.includes("PM")) {
    return value
  }

  const [rawHour, rawMinute] = value.split(":").map(Number)
  const period = rawHour >= 12 ? "PM" : "AM"
  const hour = rawHour % 12 || 12
  return `${String(hour).padStart(2, "0")}:${String(rawMinute).padStart(2, "0")} ${period}`
}

export async function createBooking(booking) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured.")
  }

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      full_name: booking.fullName.trim(),
      mobile_number: booking.mobileNumber.trim(),
      email_address: booking.emailAddress.trim(),
      baby_info: booking.babyInfo.trim(),
      primary_concern: booking.primaryConcern.trim(),
      consultation_mode: booking.consultationMode,
      preferred_date: booking.preferredDate,
      preferred_time_slot: booking.slotRange,
      consultation_duration: booking.consultationDuration,
      start_time: booking.startTime,
      end_time: booking.endTime,
      status: "pending",
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function getUnavailableBookingSlots(preferredDate) {
  if (!isSupabaseConfigured || !preferredDate) {
    return []
  }

  const { data, error } = await supabase.rpc("get_unavailable_booking_slots", {
    selected_date: preferredDate,
  })

  if (error) {
    throw error
  }

  return data.map((booking) => ({
    id: booking.id,
    date: booking.preferred_date,
    startTime: formatDatabaseTime(booking.start_time),
    duration: booking.consultation_duration === "1 hour" ? 60 : 30,
    status: booking.status,
  }))
}

export async function getAdminBookings() {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured.")
  }

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("preferred_date", { ascending: true })
    .order("start_time", { ascending: true })
    .order("created_at", { ascending: false })

  if (error) {
    throw error
  }

  return data
}

export async function updateBookingStatus(bookingId, status) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured.")
  }

  const { data, error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", bookingId)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function updateBookingNotes(bookingId, adminNotes) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured.")
  }

  const { data, error } = await supabase
    .from("bookings")
    .update({ admin_notes: adminNotes })
    .eq("id", bookingId)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}
