import { site, whatsappUrl } from '../config/site'
import { DAY_NAMES, dayOfIsoDate, nowInRestaurant, periodsFor, reservationSlots } from './hours'

export interface ReservationData {
  name: string
  date: string // YYYY-MM-DD
  time: string // HH:MM
  guests: string
  phone: string
  notes: string
}

export type ReservationErrors = Partial<Record<keyof ReservationData, string>>

export const emptyReservation: ReservationData = { name: '', date: '', time: '', guests: '2', phone: '', notes: '' }

export function validateReservation(d: ReservationData): ReservationErrors {
  const e: ReservationErrors = {}
  const today = nowInRestaurant().isoDate

  if (d.name.trim().length < 2) e.name = 'Escribe tu nombre (mínimo 2 caracteres).'

  if (!d.date) e.date = 'Elige la fecha de tu visita.'
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(d.date)) e.date = 'La fecha no es válida.'
  else if (d.date < today) e.date = 'La fecha no puede estar en el pasado.'
  else if (!periodsFor(dayOfIsoDate(d.date)).length) {
    const day = DAY_NAMES[dayOfIsoDate(d.date)].toLowerCase()
    e.date = `Los ${day.endsWith('s') ? day : `${day}s`} el restaurante está cerrado. Elige otro día.`
  }

  if (!e.date) {
    if (!d.time) e.time = 'Elige una hora.'
    else if (!reservationSlots(d.date).includes(d.time)) e.time = 'Esa hora ya no está disponible para el día elegido.'
  }

  const guests = Number(d.guests)
  if (!Number.isInteger(guests) || guests < 1 || guests > site.reservations.maxGuests)
    e.guests = `Indica entre 1 y ${site.reservations.maxGuests} personas.`

  if (d.phone.trim() && !/^\+?[\d\s()-]{7,20}$/.test(d.phone.trim())) e.phone = 'Revisa el número (solo dígitos, espacios o +).'

  if (d.notes.length > 400) e.notes = 'Máximo 400 caracteres.'
  return e
}

export function formatDateLong(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Intl.DateTimeFormat('es-EC', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(Date.UTC(y, m - 1, d)),
  )
}

export function buildReservationMessage(d: ReservationData) {
  const lines = [
    `Hola, ${site.name}. Quisiera solicitar una reserva:`,
    '',
    `• Nombre: ${d.name.trim()}`,
    `• Fecha: ${formatDateLong(d.date)}`,
    `• Hora: ${d.time}`,
    `• Personas: ${d.guests}`,
  ]
  if (d.phone.trim()) lines.push(`• Teléfono: ${d.phone.trim()}`)
  if (d.notes.trim()) lines.push(`• Solicitudes especiales: ${d.notes.trim()}`)
  lines.push('', '¿Me confirman si hay disponibilidad? Gracias.')
  return lines.join('\n')
}

export const reservationLink = (d: ReservationData) => whatsappUrl(buildReservationMessage(d))
