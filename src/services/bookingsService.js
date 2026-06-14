import { isSupabaseConfigured, supabase } from "./supabaseClient"

const IN_PERSON_MODE = "In-Person Consult (Hospital)"
const LEGACY_IN_PERSON_MODE = "In-Person Consult(Hospital)"
const IN_PERSON_DURATION = "Not applicable"
const STORED_IN_PERSON_DURATION = "30 minutes"
const IN_PERSON_TIME_SLOT = "To be confirmed"
const IN_PERSON_PLACEHOLDER_TIME = "12:00 AM"

function isInPersonConsultationMode(mode) {
  return mode === IN_PERSON_MODE || mode === LEGACY_IN_PERSON_MODE
}

function formatDatabaseTime(value) {
  if (!value || value.includes("AM") || value.includes("PM")) {
    return value
  }

  const [rawHour, rawMinute] = value.split(":").map(Number)
  const period = rawHour >= 12 ? "PM" : "AM"
  const hour = rawHour % 12 || 12
  return `${String(hour).padStart(2, "0")}:${String(rawMinute).padStart(2, "0")} ${period}`
}

function normalizeBookingRecord(booking) {
  if (!booking || !isInPersonConsultationMode(booking.consultation_mode)) {
    return booking
  }

  return {
    ...booking,
    consultation_duration: IN_PERSON_DURATION,
    preferred_time_slot: IN_PERSON_TIME_SLOT,
  }
}

export async function createBooking(booking) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured.")
  }

  const isInPersonConsultation = isInPersonConsultationMode(booking.consultationMode)

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
      preferred_time_slot: isInPersonConsultation ? IN_PERSON_TIME_SLOT : booking.slotRange,
      consultation_duration: isInPersonConsultation ? STORED_IN_PERSON_DURATION : booking.consultationDuration,
      start_time: isInPersonConsultation ? IN_PERSON_PLACEHOLDER_TIME : booking.startTime,
      end_time: isInPersonConsultation ? IN_PERSON_PLACEHOLDER_TIME : booking.endTime,
      status: "pending",
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  return normalizeBookingRecord(data)
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

  return data.map(normalizeBookingRecord)
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

  return normalizeBookingRecord(data)
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

  return normalizeBookingRecord(data)
}
