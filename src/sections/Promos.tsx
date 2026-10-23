import { useId, useState, type KeyboardEvent } from 'react'
import { ArrowUpRight, Coffee } from 'lucide-react'
import { Img } from '../components/Img'
import { SectionHeading } from '../components/ui'
import { dailyPromos, promosSource, seasonalPromo } from '../data/promos'
import { DAY_NAMES, WEEK_ORDER, nowInRestaurant, periodsFor } from '../lib/hours'

// Solo los días en que el restaurante abre, en orden lunes → domingo
const promos = WEEK_ORDER.map((d) => dailyPromos.find((p) => p.day === d)).filter(
  (p): p is (typeof dailyPromos)[number] => Boolean(p && periodsFor(p.day).length),
)

export function Promos() {
  const now = nowInRestaurant()
  const todayIndex = promos.findIndex((p) => p.day === now.day)
  const [active, setActive] = useState(Math.max(0, todayIndex))
  const uid = useId()
  const current = promos[active]
  const seasonalOn = now.isoDate >= seasonalPromo.from && now.isoDate <= seasonalPromo.until

  if (!current) return null

  // Navegación por teclado entre pestañas (flechas, Inicio, Fin)
  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }
    let next = active
    if (e.key in keys) next = (active + keys[e.key] + promos.length) % promos.length
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = promos.length - 1
    else return
    e.preventDefault()
    setActive(next)
    document.getElementById(`${uid}-tab-${next}`)?.focus()
  }

  return (
    <section id="promos" aria-labelledby="promos-title" className="section-pad relative overflow-hidden bg-cal">
      <div className="container-x">
        <SectionHeading
          id="promos-title"
          eyebrow="Promos de la semana"
          title={
            <>
              Cada día, <em className="text-teja">una excusa</em> para venir
            </>
          }
          intro="Las promociones que publicamos en Instagram. Elige un día para ver su afiche."
        />

        {seasonalOn && (
          <a
            href={seasonalPromo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="reveal group mt-12 flex flex-col gap-4 bg-ink p-6 text-cal transition-colors hover:bg-ink-3 sm:flex-row sm:items-center sm:gap-8 sm:p-8"
          >
            <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-brass/50 text-brass">
              <Coffee className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <span className="flex-1">
              <span className="eyebrow block text-[0.65rem] text-brass">{seasonalPromo.eyebrow}</span>
              <span className="mt-2 block font-serif text-2xl sm:text-3xl">{seasonalPromo.title}</span>
              <span className="mt-1 block text-mist">{seasonalPromo.detail}</span>
            </span>
            <span className="inline-flex items-center gap-2 text-sm text-brass">
              Ver condiciones <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
            </span>
          </a>
        )}

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Lista de días */}
          <div role="tablist" aria-label="Promociones por día" aria-orientation="vertical" className="reveal border-t border-ink/15 lg:col-span-7 lg:order-1">
            {promos.map((p, i) => {
              const selected = i === active
              const isToday = p.day === now.day
              return (
                <button
                  key={p.day}
                  id={`${uid}-tab-${i}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`${uid}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={onKey}
                  className={`group grid w-full grid-cols-[6.5rem_1fr] items-baseline gap-4 border-b border-ink/15 py-5 text-left transition-colors sm:grid-cols-[9rem_1fr_auto] sm:gap-6 ${
                    selected ? 'text-ink' : 'text-ink/55 hover:text-ink'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`eyebrow text-[0.7rem] ${selected ? 'text-teja' : ''}`}>{DAY_NAMES[p.day]}</span>
                    {isToday && <span className="bg-teja px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-cal">Hoy</span>}
                  </span>
                  <span>
                    <span className="block font-serif text-[1.45rem] leading-tight sm:text-[1.8rem]">{p.title}</span>
                    <span className={`mt-1 text-[0.95rem] text-stone transition-opacity ${selected ? 'block' : 'hidden opacity-60 sm:block'}`}>
                      {p.detail}
                    </span>
                  </span>
                  <span
                    className={`hidden h-px w-10 self-center bg-teja transition-transform duration-500 sm:block ${selected ? 'scale-x-100' : 'scale-x-0'}`}
                    style={{ transformOrigin: 'left' }}
                    aria-hidden="true"
                  />
                </button>
              )
            })}
            <p className="mt-6 text-xs text-stone">
              {promosSource.label}. Consulta su vigencia por WhatsApp.{' '}
              <a href={promosSource.url} target="_blank" rel="noopener noreferrer" className="link-underline text-ink">
                Ver publicación
              </a>
            </p>
          </div>

          {/* Afiche del día seleccionado */}
          <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${active}`} className="reveal order-first lg:col-span-5 lg:order-2">
            <div className="mx-auto max-w-sm lg:sticky lg:top-28 lg:max-w-none">
              <div key={current.poster} className="animate-fade-in shadow-[0_30px_60px_-30px_rgba(19,32,26,0.55)]">
                <Img
                  name={current.poster}
                  alt={`Afiche de la promoción del ${DAY_NAMES[current.day].toLowerCase()}: ${current.title}. ${current.detail}`}
                  sizes="(min-width: 1024px) 34vw, 24rem"
                  className="aspect-[4/5]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
