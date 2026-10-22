import { BookOpen, CalendarCheck, Navigation } from 'lucide-react'
import { WhatsAppIcon } from './ui'
import { site, whatsappUrl } from '../config/site'
import { useScrolledPast } from '../hooks/hooks'

/**
 * Móvil: barra inferior con las tres acciones prioritarias (carta, cómo llegar, reservar).
 * Escritorio: botón flotante discreto de WhatsApp.
 */
export function FloatingActions() {
  const visible = useScrolledPast(520)
  return (
    <>
      <nav
        aria-label="Acciones rápidas"
        className={`no-print fixed inset-x-0 bottom-0 z-30 border-t border-cal/10 bg-ink/95 pb-[env(safe-area-inset-bottom)] text-cal backdrop-blur-md transition-transform duration-500 lg:hidden ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <ul className="grid grid-cols-3">
          <li>
            <a href="#carta" className="flex min-h-16 flex-col items-center justify-center gap-1 text-[0.7rem] uppercase tracking-[0.12em] text-cal/80 active:bg-cal/5">
              <BookOpen className="h-5 w-5" strokeWidth={1.5} /> Carta
            </a>
          </li>
          <li>
            <a
              href={site.maps.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-16 flex-col items-center justify-center gap-1 text-[0.7rem] uppercase tracking-[0.12em] text-cal/80 active:bg-cal/5"
            >
              <Navigation className="h-5 w-5" strokeWidth={1.5} /> Cómo llegar
            </a>
          </li>
          <li>
            <a href="#reservar" className="flex min-h-16 flex-col items-center justify-center gap-1 bg-teja text-[0.7rem] uppercase tracking-[0.12em] text-cal active:bg-teja-2">
              <CalendarCheck className="h-5 w-5" strokeWidth={1.5} /> Reservar
            </a>
          </li>
        </ul>
      </nav>

      <a
        href={whatsappUrl(`Hola, ${site.name}.`)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp"
        className={`no-print group fixed bottom-8 right-8 z-30 hidden h-14 items-center gap-3 rounded-full bg-ink pl-4 pr-4 text-cal shadow-[0_10px_30px_-10px_rgba(19,32,26,0.6)] ring-1 ring-brass/40 transition-all duration-500 hover:bg-teja hover:pr-6 lg:flex ${
          visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <WhatsAppIcon className="h-6 w-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-500 group-hover:max-w-40 group-focus-visible:max-w-40">
          Escríbenos
        </span>
      </a>
    </>
  )
}
