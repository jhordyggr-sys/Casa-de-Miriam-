import { site, type DayKey, type OpeningPeriod } from '../config/site'

export const DAY_NAMES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'] as const
/** Orden de presentación: lunes → domingo */
export const WEEK_ORDER: DayKey[] = [1, 2, 3, 4, 5, 6, 0]

export const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export const fromMinutes = (min: number) =>
  `${String(Math.floor(min / 60) % 24).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`

export const periodsFor = (day: DayKey): readonly OpeningPeriod[] => site.hours[day]

/** Fecha y hora actuales en la zona horaria del restaurante */
export function nowInRestaurant(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: site.timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return {
    isoDate: `${get('year')}-${get('month')}-${get('day')}`,
    day: weekdays.indexOf(get('weekday')) as DayKey,
    minutes: Number(get('hour')) * 60 + Number(get('minute')),
  }
}

export type OpenStatus =
  | { open: true; closesAt: string }
  | { open: false; nextLabel: string | null }

/** Calcula si el restaurante está abierto según el horario configurado */
export function getOpenStatus(date = new Date()): OpenStatus {
  const now = nowInRestaurant(date)
  for (const p of periodsFor(now.day)) {
    if (now.minutes >= toMinutes(p.open) && now.minutes < toMinutes(p.close)) {
      return { open: true, closesAt: p.close }
    }
  }
  // Próxima apertura (hoy más tarde o en los próximos 7 días)
  for (let offset = 0; offset < 7; offset++) {
    const day = ((now.day + offset) % 7) as DayKey
    const next = periodsFor(day).find((p) => offset > 0 || toMinutes(p.open) > now.minutes)
    if (next) {
      const when = offset === 0 ? 'hoy' : offset === 1 ? 'mañana' : DAY_NAMES[day].toLowerCase()
      return { open: false, nextLabel: `Abre ${when} a las ${next.open}` }
    }
  }
  return { open: false, nextLabel: null }
}

export const formatPeriods = (periods: readonly OpeningPeriod[]) =>
  periods.length ? periods.map((p) => `${p.open} – ${p.close}`).join(' · ') : 'Cerrado'

/** Resumen en texto agrupando días consecutivos con el mismo horario */
export function hoursSummary(): string {
  const groups: { days: DayKey[]; label: string }[] = []
  for (const day of WEEK_ORDER) {
    const label = formatPeriods(periodsFor(day))
    const last = groups[groups.length - 1]
    if (last && last.label === label) last.days.push(day)
    else groups.push({ days: [day], label })
  }
  return groups
    .map(({ days, label }) => {
      const first = DAY_NAMES[days[0]].toLowerCase()
      const last = DAY_NAMES[days[days.length - 1]].toLowerCase()
      const range = days.length === 1 ? first : days.length === 2 ? `${first} y ${last}` : `de ${first} a ${last}`
      return `${range}: ${label === 'Cerrado' ? 'cerrado' : label.replace(' – ', ' a ')}`
    })
    .join('; ')
}

/** Día de la semana de una fecha ISO "YYYY-MM-DD" (sin desfases de zona horaria) */
export const dayOfIsoDate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay() as DayKey
}

/** Horas que se pueden solicitar para reservar un día concreto */
export function reservationSlots(isoDate: string): string[] {
  const { lastSeatingBeforeCloseMin, slotStepMin } = site.reservations
  const now = nowInRestaurant()
  const day = dayOfIsoDate(isoDate)
  const slots: string[] = []
  for (const p of periodsFor(day)) {
    const start = toMinutes(p.open)
    const end = toMinutes(p.close) - lastSeatingBeforeCloseMin
    for (let t = start; t <= end; t += slotStepMin) {
      // Para hoy, solo horas con al menos 30 min de margen
      if (isoDate === now.isoDate && t < now.minutes + 30) continue
      slots.push(fromMinutes(t))
    }
  }
  return slots
}
