import { ArrowRight, MapPin } from 'lucide-react'
import { Img } from '../components/Img'
import { OpenStatus } from '../components/OpenStatus'
import { hero } from '../data/content'
import { site } from '../config/site'

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-cal">
      <div className="absolute inset-0 -z-10">
        <Img name="hero" priority sizes="100vw" className="h-full w-full" imgClassName="animate-hero-scale object-[62%_50%]" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/10" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/30" aria-hidden="true" />
      </div>

      <div className="container-x flex flex-1 flex-col justify-end pb-14 pt-32 sm:pb-20 lg:justify-center lg:pb-24">
        <div className="max-w-3xl">
          <p className="eyebrow animate-hero-in mb-7 flex items-center gap-4 text-brass" style={{ ['--delay' as string]: '150ms' }}>
            <span className="h-px w-10 bg-current" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1 id="hero-title" className="animate-hero-in" style={{ ['--delay' as string]: '250ms' }}>
            <span className="block text-[3.6rem] leading-[0.92] sm:text-[6rem] lg:text-[8.5rem]">
              Casa <span className="italic text-brass">de</span> Miriam
            </span>
            <span className="mt-6 block max-w-xl font-serif text-[1.55rem] leading-snug text-cal/90 sm:text-[2rem]">
              {site.tagline}.
            </span>
          </h1>
          <p className="animate-hero-in mt-6 max-w-lg text-base leading-relaxed text-cal/75 sm:text-lg" style={{ ['--delay' as string]: '400ms' }}>
            {hero.lead}
          </p>
          <div className="animate-hero-in mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4" style={{ ['--delay' as string]: '550ms' }}>
            <a href="#reservar" className="btn btn-primary">
              Reservar una mesa <ArrowRight className="arrow h-4 w-4" strokeWidth={1.5} />
            </a>
            <a href="#carta" className="btn btn-light">
              Explorar nuestra carta
            </a>
          </div>
        </div>
      </div>

      {/* Barra inferior con estado y dirección */}
      <div className="animate-hero-in relative border-t border-cal/12" style={{ ['--delay' as string]: '800ms' }}>
        <div className="container-x flex flex-col gap-3 py-5 text-sm text-cal/75 sm:flex-row sm:items-center sm:justify-between">
          <OpenStatus />
          <a href={site.maps.placeUrl} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-2 self-start hover:text-cal sm:self-auto">
            <MapPin className="h-4 w-4 text-brass" strokeWidth={1.5} />
            {site.address.street}, {site.address.city}
          </a>
          <a href="#presentacion" className="absolute bottom-full right-5 mb-6 hidden flex-col items-center gap-3 text-[0.65rem] uppercase tracking-[0.3em] text-cal/60 hover:text-cal sm:right-8 lg:right-12 md:flex" aria-label="Descubrir más">
            <span className="[writing-mode:vertical-rl]">Descubrir</span>
            <span className="relative block h-14 w-px overflow-hidden bg-cal/15">
              <span className="animate-scroll-cue absolute inset-0 bg-brass" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
