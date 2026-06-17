import { isSupabaseConfigured, supabase } from "./supabaseClient"

const IN_PERSON_MODE = "In-Person Consult (Hospital)"
const LEGACY_IN_PERSON_MODE = "In-Person Consult(Hospital)"
const IN_PERSON_DURATION = "Not applicable"
const STORED_IN_PERSON_DURATION = "30 minutes"
const IN_PERSON_TIME_SLOT = "To be confirmed"
const IN_PERSON_PLACEHOLDER_TIME = "12:00 AM"

function convertTimeToMinutes(timeValue) {
  const [time, period] = timeValue.split(" ")
  const [rawHour, rawMinute] = time.split(":").map(Number)
  const hour = period === "PM" && rawHour !== 12 ? rawHour + 12 : period === "AM" && rawHour === 12 ? 0 : rawHour
  return hour * 60 + rawMinute
}

function getDurationMinutesFromRange(startTime, endTime, consultationDuration) {
  if (consultationDuration === "1 hour") {
    return 60
  }

  if (consultationDuration === "30 minutes") {
    return 30
  }

  if (!startTime || !endTime) {
    return 0
  }

  return Math.max(convertTimeToMinutes(endTime) - convertTimeToMinutes(startTime), 0)
}

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

  return data.map((slot) => {
    const startTime = formatDatabaseTime(slot.start_time)
    const endTime = formatDatabaseTime(slot.end_time)

    return {
      id: slot.id,
      date: slot.preferred_date,
      startTime,
      endTime,
      duration: getDurationMinutesFromRange(startTime, endTime, slot.consultation_duration),
      status: slot.status,
      source: slot.source,
      reason: slot.reason || "",
    }
  })
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

function normalizeBlockedSlotRecord(blockedSlot) {
  return {
    ...blockedSlot,
    start_time: formatDatabaseTime(blockedSlot.start_time),
    end_time: formatDatabaseTime(blockedSlot.end_time),
    is_full_day: Boolean(blockedSlot.is_full_day),
    blocked_by: blockedSlot.blocked_by || "",
  }
}

export async function getAdminBlockedSlots() {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured.")
  }

  const { data, error } = await supabase
    .from("blocked_slots")
    .select("*")
    .order("block_date", { ascending: true })
    .order("start_time", { ascending: true })
    .order("created_at", { ascending: false })

  if (error) {
    throw error
  }

  return data.map(normalizeBlockedSlotRecord)
}

export async function createBlockedSlot({ blockDate, startTime, endTime, reason, isFullDay, blockedBy }) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured.")
  }

  const { data, error } = await supabase
    .from("blocked_slots")
    .insert({
      block_date: blockDate,
      start_time: isFullDay ? "00:00" : startTime,
      end_time: isFullDay ? "23:59" : endTime,
      is_full_day: Boolean(isFullDay),
      reason: reason?.trim() || "",
      blocked_by: blockedBy?.trim() || "",
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  return normalizeBlockedSlotRecord(data)
}

export async function removeBlockedSlot(blockedSlotId) {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured.")
  }

  const { error } = await supabase
    .from("blocked_slots")
    .delete()
    .eq("id", blockedSlotId)

  if (error) {
    throw error
  }
}
