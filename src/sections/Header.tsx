import { useCallback, useRef, useState, type MouseEvent } from 'react'
import { ArrowUpRight, Menu as MenuIcon, X } from 'lucide-react'
import { navLinks } from '../data/content'
import { site, whatsappUrl } from '../config/site'
import { useDialogKeys, useLockBody, useScrolledPast } from '../hooks/hooks'
import { InstagramIcon, WhatsAppIcon, Wordmark } from '../components/ui'

export function Header() {
  const scrolled = useScrolledPast(40)
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const close = useCallback(() => setOpen(false), [])
  // Cierra el menú y desplaza a la sección cuando el scroll del documento ya está desbloqueado
  const goTo = (e: MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href')
    if (!href?.startsWith('#')) return
    e.preventDefault()
    setOpen(false)
    window.setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ block: 'start' })
      history.replaceState(null, '', href)
    }, 40)
  }
  useLockBody(open)
  useDialogKeys(open, panelRef, close)

  return (
    <header
      className={`no-print fixed inset-x-0 top-0 z-40 transition-[background-color,padding,box-shadow] duration-500 ${
        open
          ? 'bg-ink py-3'
          : scrolled
          ? 'bg-ink/92 py-3 shadow-[0_1px_0_rgba(201,169,106,0.18)] backdrop-blur-md'
          :'bg-gradient-to-b from-ink/60 to-transparent py-5 lg:py-7'
      }`}
    >
      <div className="container-x flex items-center justify-between gap-6">
        <a href="#inicio" className="relative z-10 shrink-0" aria-label={`${site.name}, ir al inicio`}>
          <Wordmark />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8 text-[0.8125rem] font-medium tracking-wide text-cal/85">
            {navLinks.slice(1).map((l) => (
              <li key={l.href}>
                <a href={l.href} className="link-underline py-1 transition-colors hover:text-cal">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href="#reservar" className="btn btn-primary hidden min-h-11 px-5 py-2.5 sm:inline-flex">
            Reservar
          </a>
          <button
            type="button"
            className="relative z-10 inline-flex h-11 w-11 items-center justify-center text-cal lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" strokeWidth={1.5} /> : <MenuIcon className="h-6 w-6" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Menú móvil a pantalla completa */}
      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
        hidden={!open}
        className="fixed inset-0 top-0 flex flex-col bg-ink pt-24 text-cal lg:hidden"
      >
        <nav aria-label="Móvil" className="container-x flex-1 overflow-y-auto">
          <ul className="border-t border-cal/10">
            {navLinks.map((l, i) => (
              <li key={l.href} className="animate-rise-in border-b border-cal/10" style={{ ['--delay' as string]: `${i * 45}ms` }}>
                <a
                  href={l.href}
                  onClick={goTo}
                  className="flex items-baseline justify-between py-4 font-serif text-[2rem] leading-tight active:text-brass"
                >
                  {l.label}
                  <span className="font-sans text-xs tracking-[0.2em] text-cal/40">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-mist">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-2">
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp
            </a>
            <a href={site.social.instagram.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-2">
              <InstagramIcon className="h-4 w-4" /> Instagram
            </a>
            <a href={site.maps.directionsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-2">
              Cómo llegar <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
            </a>
          </div>
        </nav>
        <div className="container-x pb-8 pt-4">
          <a href="#reservar" onClick={goTo} className="btn btn-primary w-full">
            Reservar una mesa
          </a>
        </div>
      </div>
    </header>
  )
}
