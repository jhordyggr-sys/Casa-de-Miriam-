import { ArrowUp } from 'lucide-react'
import { InstagramIcon, WhatsAppIcon, Wordmark } from '../components/ui'
import { navLinks } from '../data/content'
import { site, whatsappUrl } from '../config/site'
import { DAY_NAMES, WEEK_ORDER, formatPeriods, periodsFor } from '../lib/hours'

export function Footer({ onPrivacy }: { onPrivacy: () => void }) {
  const year = new Date().getFullYear()
  return (
    <footer className="no-print grain relative overflow-hidden bg-ink pb-28 pt-20 text-cal">
      <div className="container-x">
        <div className="flex flex-col gap-10 border-b border-cal/12 pb-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Wordmark />
            <p className="mt-6 max-w-sm text-mist">{site.shortDescription}</p>
          </div>
          <a href="#reservar" className="btn btn-primary self-start lg:self-auto">
            Reservar una mesa
          </a>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="eyebrow text-brass">Visítanos</h2>
            <address className="mt-5 not-italic leading-relaxed text-cal/85">
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}, {site.address.country}
            </address>
            <a href={site.maps.directionsUrl} target="_blank" rel="noopener noreferrer" className="link-underline mt-3 inline-block text-sm text-brass">
              Cómo llegar
            </a>
          </div>

          <div>
            <h2 className="eyebrow text-brass">Contacto</h2>
            <ul className="mt-5 space-y-2 text-cal/85">
              <li>
                <a href={`tel:${site.phone.e164}`} className="link-underline">
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-2">
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                </a>
              </li>
              <li>
                <a href={site.social.instagram.url} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-2">
                  <InstagramIcon className="h-4 w-4" /> @{site.social.instagram.handle}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-brass">Horario</h2>
            <ul className="mt-5 space-y-1.5 text-sm text-cal/85">
              {WEEK_ORDER.map((d) => (
                <li key={d} className="flex justify-between gap-4 tabular-nums">
                  <span>{DAY_NAMES[d]}</span>
                  <span className={periodsFor(d).length ? '' : 'text-teja-soft'}>{formatPeriods(periodsFor(d))}</span>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Pie de página">
            <h2 className="eyebrow text-brass">Explorar</h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 text-cal/85 sm:grid-cols-1">
              {[...navLinks, { href: '#preguntas', label: 'Preguntas frecuentes' }, { href: '#reservar', label: 'Reservas' }].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link-underline">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-cal/12 pt-8 text-xs text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <button type="button" onClick={onPrivacy} className="link-underline py-2">
              Política de privacidad
            </button>
            <a href="#inicio" className="inline-flex items-center gap-2 py-2 hover:text-cal">
              Volver arriba <ArrowUp className="h-3.5 w-3.5" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
