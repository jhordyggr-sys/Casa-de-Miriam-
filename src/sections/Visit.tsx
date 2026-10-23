import { useState } from 'react'
import { Accessibility, ArrowUpRight, Mail, MapPin, Navigation, Phone } from 'lucide-react'
import { OpenStatus } from '../components/OpenStatus'
import { SectionHeading, WhatsAppIcon } from '../components/ui'
import { site, whatsappUrl } from '../config/site'
import { DAY_NAMES, WEEK_ORDER, formatPeriods, nowInRestaurant, periodsFor } from '../lib/hours'
import { useTick } from '../hooks/hooks'

export function Visit() {
  useTick(60_000)
  const today = nowInRestaurant().day
  const [mapFailed, setMapFailed] = useState(false)

  return (
    <section id="visitanos" aria-labelledby="visit-title" className="section-pad bg-cal">
      <div className="container-x">
        <SectionHeading
          id="visit-title"
          eyebrow="Ubicación y horarios"
          title={
            <>
              Te esperamos en el <em className="text-teja">centro de Loja</em>
            </>
          }
        />

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Mapa */}
          <div className="reveal relative min-h-[22rem] overflow-hidden bg-cal-3 lg:col-span-7 lg:min-h-[34rem]">
            {mapFailed ? (
              <MapFallback />
            ) : (
              <iframe
                title={`Mapa de ubicación de ${site.name}`}
                src={site.maps.embedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 grayscale-[35%] sepia-[15%]"
                onError={() => setMapFailed(true)}
                allowFullScreen
              />
            )}
          </div>

          {/* Datos */}
          <div className="lg:col-span-5">
            <div className="reveal">
              <h3 className="eyebrow text-teja">Dirección</h3>
              <address className="mt-4 font-serif text-[1.75rem] not-italic leading-snug">
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.city}, {site.address.country}
              </address>
              <p className="mt-2 text-sm text-stone">Plus Code: {site.address.plusCode}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <a href={site.maps.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <Navigation className="h-4 w-4" strokeWidth={1.5} /> Cómo llegar
                </a>
                <a href={site.maps.placeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
                  Ver en Google Maps <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                </a>
              </div>
            </div>

            <div className="reveal mt-12 border-t border-ink/15 pt-10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="eyebrow text-teja">Horario de atención</h3>
                <OpenStatus className="text-sm text-stone" />
              </div>
              <table className="mt-5 w-full text-[0.98rem]">
                <caption className="sr-only">Horario de atención semanal</caption>
                <tbody>
                  {WEEK_ORDER.map((d) => {
                    const isToday = d === today
                    const periods = periodsFor(d)
                    return (
                      <tr key={d} className={`border-b border-ink/10 ${isToday ? 'font-semibold text-ink' : 'text-stone'}`}>
                        <th scope="row" className="py-3 text-left font-[inherit]">
                          {DAY_NAMES[d]}
                          {isToday && <span className="ml-3 bg-ink px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.15em] text-cal">Hoy</span>}
                        </th>
                        <td className={`py-3 text-right tabular-nums ${!periods.length ? 'text-teja' : ''}`}>{formatPeriods(periods)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <p className="mt-4 text-xs leading-relaxed text-stone">
                Horario publicado en Google Maps. El horario de atención no implica disponibilidad de mesa: te recomendamos reservar. Hora de
                Ecuador (GMT-5).
              </p>
            </div>

            <div className="reveal mt-12 grid gap-4 border-t border-ink/15 pt-10 sm:grid-cols-2">
              <a href={`tel:${site.phone.e164}`} className="group flex items-center gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center border border-ink/20 transition-colors group-hover:bg-ink group-hover:text-cal">
                  <Phone className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-[0.18em] text-stone">Llamar</span>
                  <span className="font-medium">{site.phone.display}</span>
                </span>
              </a>
              <a href={whatsappUrl(`Hola, ${site.name}. Tengo una consulta:`)} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center border border-ink/20 transition-colors group-hover:bg-ink group-hover:text-cal">
                  <WhatsAppIcon className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-[0.18em] text-stone">Escribir</span>
                  <span className="font-medium">WhatsApp</span>
                </span>
              </a>
              <a href={`mailto:${site.email}`} className="group flex items-center gap-4 sm:col-span-2">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-ink/20 transition-colors group-hover:bg-ink group-hover:text-cal">
                  <Mail className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-[0.18em] text-stone">Correo</span>
                  <span className="font-medium [overflow-wrap:anywhere]">{site.email}</span>
                </span>
              </a>
            </div>

            {site.accessibility.wheelchairEntrance && (
              <p className="reveal mt-8 flex items-start gap-3 text-sm text-stone">
                <Accessibility className="mt-0.5 h-4 w-4 shrink-0 text-moss" strokeWidth={1.5} />
                Entrada accesible para personas en silla de ruedas (según la ficha de Google Maps).
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function MapFallback() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
      <MapPin className="h-10 w-10 text-teja" strokeWidth={1.25} />
      <p className="font-serif text-2xl">No se pudo cargar el mapa</p>
      <a href={site.maps.placeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
        Abrir en Google Maps
      </a>
    </div>
  )
}
