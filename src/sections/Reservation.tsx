import { useId, useMemo, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { AlertCircle, ArrowRight, CheckCircle2, Clock, MessageCircle, RotateCcw } from 'lucide-react'
import { Img } from '../components/Img'
import { WhatsAppIcon } from '../components/ui'
import { site } from '../config/site'
import { nowInRestaurant, reservationSlots } from '../lib/hours'
import {
  buildReservationMessage,
  emptyReservation,
  reservationLink,
  validateReservation,
  type ReservationData,
  type ReservationErrors,
} from '../lib/reservation'

const FIELD_ORDER: (keyof ReservationData)[] = ['name', 'date', 'time', 'guests', 'phone', 'notes']

export function Reservation() {
  const [data, setData] = useState<ReservationData>(emptyReservation)
  const [errors, setErrors] = useState<ReservationErrors>({})
  const [touched, setTouched] = useState(false)
  const [sent, setSent] = useState<{ link: string; message: string; blocked: boolean } | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)
  const uid = useId()

  const today = nowInRestaurant().isoDate
  const slots = useMemo(() => (data.date ? reservationSlots(data.date) : []), [data.date])

  const update = (field: keyof ReservationData) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...data, [field]: e.target.value }
    // Si la hora elegida deja de existir para la nueva fecha, se limpia
    if (field === 'date' && next.time && !reservationSlots(next.date).includes(next.time)) next.time = ''
    setData(next)
    if (touched) setErrors(validateReservation(next))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setTouched(true)
    const found = validateReservation(data)
    setErrors(found)
    const first = FIELD_ORDER.find((f) => found[f])
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    const link = reservationLink(data)
    const win = window.open(link, '_blank')
    if (win) win.opener = null
    setSent({ link, message: buildReservationMessage(data), blocked: !win })
    requestAnimationFrame(() => resultRef.current?.focus())
  }

  const reset = () => {
    setData(emptyReservation)
    setErrors({})
    setTouched(false)
    setSent(null)
  }

  const err = (f: keyof ReservationData) => (touched ? errors[f] : undefined)
  const errorCount = touched ? Object.keys(errors).length : 0

  return (
    <section id="reservar" aria-labelledby="reserve-title" className="relative isolate overflow-hidden bg-ink text-cal">
      <div className="absolute inset-0 -z-10 opacity-30" aria-hidden="true">
        <Img name="mesa-compartida" sizes="100vw" alt="" className="h-full w-full" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/95 to-ink/80" aria-hidden="true" />

      <div className="container-x section-pad grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow reveal mb-6 flex items-center gap-4 text-brass">
            <span className="h-px w-10 bg-current" aria-hidden="true" />
            Reservas
          </p>
          <h2 id="reserve-title" className="reveal text-[2.6rem] sm:text-6xl">
            Guárdanos <em className="text-brass">una mesa</em>
          </h2>
          <p className="reveal mt-6 max-w-md text-lg text-mist">
            Completa tus datos y te llevamos a WhatsApp con la solicitud lista para enviar. El equipo te responderá para confirmar la
            disponibilidad.
          </p>

          <ol className="reveal mt-10 space-y-5 border-t border-cal/12 pt-8">
            {[
              'Completa el formulario.',
              'Se abre WhatsApp con tu mensaje: pulsa «Enviar».',
              'El restaurante te confirma por WhatsApp si hay mesa.',
            ].map((s, i) => (
              <li key={s} className="flex gap-5">
                <span className="font-serif text-xl italic text-brass">{i + 1}.</span>
                <span className="text-cal/85">{s}</span>
              </li>
            ))}
          </ol>

          <p className="reveal mt-10 flex items-start gap-3 text-sm text-mist">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brass" strokeWidth={1.5} />
            Las horas disponibles en el formulario siguen el horario de atención. No reflejan la ocupación del salón.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="reveal border border-cal/12 bg-ink-2/80 p-6 backdrop-blur-sm sm:p-10">
            {sent ? (
              <div ref={resultRef} tabIndex={-1} className="animate-fade-in outline-none" role="status">
                <CheckCircle2 className="h-10 w-10 text-brass" strokeWidth={1.25} />
                <h3 className="mt-6 text-4xl">Tu solicitud está lista</h3>
                {sent.blocked ? (
                  <p className="mt-4 flex gap-3 text-teja-soft">
                    <AlertCircle className="mt-1 h-5 w-5 shrink-0" strokeWidth={1.5} />
                    Tu navegador no abrió WhatsApp automáticamente. Usa el botón de abajo para continuar.
                  </p>
                ) : (
                  <p className="mt-4 text-mist">Se ha abierto WhatsApp en una nueva pestaña o en la aplicación.</p>
                )}
                <ol className="mt-8 space-y-3 text-cal/90">
                  <li>
                    <strong className="font-semibold text-cal">1.</strong> Revisa el mensaje y pulsa <strong>Enviar</strong> en WhatsApp.
                  </li>
                  <li>
                    <strong className="font-semibold text-cal">2.</strong> Espera la respuesta del restaurante con la confirmación.
                  </li>
                </ol>
                <p className="mt-6 border-l-2 border-brass pl-4 text-sm text-brass">
                  Importante: la reserva no está confirmada hasta que {site.name} te responda por WhatsApp.
                </p>
                <details className="mt-8 text-sm text-mist">
                  <summary className="cursor-pointer select-none py-2 text-cal/80 hover:text-cal">Ver el mensaje preparado</summary>
                  <pre className="mt-3 whitespace-pre-wrap border border-cal/10 bg-ink/60 p-4 font-sans text-[0.9rem] leading-relaxed">
                    {sent.message}
                  </pre>
                </details>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href={sent.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <WhatsAppIcon className="h-4 w-4" /> Abrir WhatsApp
                  </a>
                  <button type="button" onClick={reset} className="btn btn-light">
                    <RotateCcw className="h-4 w-4" strokeWidth={1.5} /> Nueva solicitud
                  </button>
                </div>
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={`${uid}-req`}>
                {errorCount > 0 && (
                  <div role="alert" className="mb-8 flex gap-3 border border-teja-soft/50 px-4 py-3 text-sm text-teja-soft">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} />
                    Revisa {errorCount === 1 ? 'el campo marcado' : `los ${errorCount} campos marcados`} para continuar.
                  </div>
                )}
                <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                  <Field id={`${uid}-name`} label="Nombre" required error={err('name')} className="sm:col-span-2">
                    <input
                      id={`${uid}-name`}
                      name="name"
                      className="field"
                      autoComplete="name"
                      placeholder="¿A nombre de quién?"
                      value={data.name}
                      onChange={update('name')}
                      aria-invalid={!!err('name')}
                      aria-describedby={err('name') ? `${uid}-name-err` : undefined}
                      required
                    />
                  </Field>

                  <Field id={`${uid}-date`} label="Fecha" required error={err('date')}>
                    <input
                      id={`${uid}-date`}
                      name="date"
                      type="date"
                      className="field"
                      min={today}
                      value={data.date}
                      onChange={update('date')}
                      aria-invalid={!!err('date')}
                      aria-describedby={err('date') ? `${uid}-date-err` : undefined}
                      required
                    />
                  </Field>

                  <Field id={`${uid}-time`} label="Hora" required error={err('time')}>
                    <select
                      id={`${uid}-time`}
                      name="time"
                      className="field"
                      value={data.time}
                      onChange={update('time')}
                      disabled={!data.date || slots.length === 0}
                      aria-invalid={!!err('time')}
                      aria-describedby={err('time') ? `${uid}-time-err` : undefined}
                      required
                    >
                      <option value="">
                        {!data.date ? 'Elige primero la fecha' : slots.length ? 'Selecciona una hora' : 'Sin horario ese día'}
                      </option>
                      {slots.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field id={`${uid}-guests`} label="Personas" required error={err('guests')}>
                    <select
                      id={`${uid}-guests`}
                      name="guests"
                      className="field"
                      value={data.guests}
                      onChange={update('guests')}
                      aria-invalid={!!err('guests')}
                      required
                    >
                      {Array.from({ length: site.reservations.maxGuests }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'persona' : 'personas'}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field id={`${uid}-phone`} label="Teléfono" hint="Opcional" error={err('phone')}>
                    <input
                      id={`${uid}-phone`}
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      className="field"
                      placeholder="09X XXX XXXX"
                      value={data.phone}
                      onChange={update('phone')}
                      aria-invalid={!!err('phone')}
                      aria-describedby={err('phone') ? `${uid}-phone-err` : undefined}
                    />
                  </Field>

                  <Field id={`${uid}-notes`} label="Solicitudes especiales" hint="Opcional" error={err('notes')} className="sm:col-span-2">
                    <textarea
                      id={`${uid}-notes`}
                      name="notes"
                      className="field"
                      rows={3}
                      maxLength={400}
                      placeholder="Cumpleaños, alergias, silla para bebé, preferencia de mesa…"
                      value={data.notes}
                      onChange={update('notes')}
                      aria-invalid={!!err('notes')}
                      aria-describedby={err('notes') ? `${uid}-notes-err` : undefined}
                    />
                  </Field>
                </div>

                {Number(data.guests) >= site.reservations.largeGroupFrom && (
                  <p className="animate-fade-in mt-6 flex gap-3 text-sm text-brass">
                    <MessageCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} />
                    Para grupos grandes coordinaremos contigo la distribución de mesas por WhatsApp.
                  </p>
                )}

                <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <p id={`${uid}-req`} className="text-xs text-mist">
                    <span className="text-brass">*</span> Campos obligatorios. No guardamos tus datos: se envían solo a través de tu WhatsApp.
                  </p>
                  <button type="submit" className="btn btn-primary shrink-0 whitespace-normal">
                    <WhatsAppIcon className="h-4 w-4" /> Enviar por WhatsApp <ArrowRight className="arrow hidden h-4 w-4 sm:block" strokeWidth={1.5} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({
  id,
  label,
  required,
  hint,
  error,
  className = '',
  children,
}: {
  id: string
  label: string
  required?: boolean
  hint?: string
  error?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
        {required && (
          <span className="text-brass" aria-hidden="true">
            {' '}
            *
          </span>
        )}
        {hint && <span className="ml-2 font-normal normal-case tracking-normal text-mist/70">({hint})</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-2 flex items-start gap-2 text-sm text-teja-soft">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}
