import { useEffect, useMemo, useRef, useState } from 'react'
import { Download, Flame, Leaf, Printer, Sparkles, Star } from 'lucide-react'
import { Img } from '../components/Img'
import { DemoTag, SectionHeading } from '../components/ui'
import { TAG_LABELS, formatPrice, menu, type Dish, type Tag } from '../data/menu'
import { fullAddress, site } from '../config/site'
import { hoursSummary } from '../lib/hours'

const TAG_ICONS: Record<Tag, typeof Leaf> = { vegetariano: Leaf, picante: Flame, recomendado: Star, casa: Sparkles }
const FILTER_TAGS: Tag[] = ['vegetariano', 'recomendado', 'picante']

export function Menu() {
  const [category, setCategory] = useState<string>('todo')
  const [tags, setTags] = useState<Tag[]>([])
  const listRef = useRef<HTMLDivElement>(null)
  const firstRender = useRef(true)

  const visible = useMemo(
    () =>
      menu
        .filter((c) => category === 'todo' || c.id === category)
        .map((c) => ({ ...c, dishes: c.dishes.filter((d) => tags.every((t) => d.tags?.includes(t))) }))
        .filter((c) => c.dishes.length > 0),
    [category, tags],
  )
  const count = visible.reduce((n, c) => n + c.dishes.length, 0)

  // Al cambiar de categoría, lleva la vista al inicio de la lista si quedó por encima
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    const top = listRef.current?.getBoundingClientRect().top ?? 0
    if (top < 0) listRef.current?.scrollIntoView({ block: 'start' })
  }, [category])

  const toggleTag = (t: Tag) => setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))

  const printMenu = () => {
    setCategory('todo')
    setTags([])
    const cleanup = () => {
      document.body.classList.remove('print-menu')
      window.removeEventListener('afterprint', cleanup)
    }
    window.addEventListener('afterprint', cleanup)
    // Espera a que React pinte la carta completa antes de imprimir
    window.setTimeout(() => {
      document.body.classList.add('print-menu')
      window.print()
    }, 60)
  }

  return (
    <section id="carta" aria-labelledby="menu-title" className="section-pad relative bg-cal-2">
      <div className="container-x">
        {/* Encabezado solo para la versión impresa */}
        <div className="print-only mb-8 border-b border-black pb-4">
          <p style={{ fontFamily: 'Fraunces, serif', fontSize: '28pt', fontStyle: 'italic' }}>{site.name}</p>
          <p>{fullAddress} · Tel. {site.phone.display}</p>
          <p>Horario: {hoursSummary()}</p>
        </div>

        <div className="no-print flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="menu-title"
            eyebrow="La carta"
            title={
              <>
                Cocina de casa, <em className="text-teja">sin atajos</em>
              </>
            }
            intro="Hamburguesas, carnes al fuego, recetas lojanas y opciones sin carne. Precios en dólares, IVA incluido."
          />
          <div className="reveal flex flex-wrap items-center gap-3">
            <DemoTag className="text-teja">Carta de ejemplo</DemoTag>
            {site.menuPdfUrl ? (
              <a href={site.menuPdfUrl} download className="btn btn-dark min-h-11 px-4 py-2">
                <Download className="h-4 w-4" strokeWidth={1.5} /> Descargar PDF
              </a>
            ) : (
              <button type="button" onClick={printMenu} className="btn btn-dark min-h-11 px-4 py-2">
                <Printer className="h-4 w-4" strokeWidth={1.5} /> Imprimir carta
              </button>
            )}
          </div>
        </div>

        {/* Navegación y filtros */}
        <div className="no-print sticky top-[4.25rem] z-20 -mx-5 mt-14 border-y border-ink/10 bg-cal-2/95 px-5 backdrop-blur sm:mx-0 sm:px-0">
          <div role="group" aria-label="Categorías de la carta" className="flex gap-1 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {[{ id: 'todo', name: 'Toda la carta' }, ...menu].map((c) => {
              const active = category === c.id
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(c.id)}
                  className={`shrink-0 px-4 py-2.5 text-sm font-medium transition-colors duration-300 ${
                    active ? 'bg-ink text-cal' : 'text-ink/70 hover:bg-ink/5 hover:text-ink'
                  }`}
                >
                  {c.name}
                </button>
              )
            })}
          </div>
        </div>
        <div className="no-print mt-5 flex flex-wrap items-center gap-2">
          <span className="mr-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone">Filtrar</span>
          {FILTER_TAGS.map((t) => {
            const Icon = TAG_ICONS[t]
            const active = tags.includes(t)
            return (
              <button
                key={t}
                type="button"
                aria-pressed={active}
                onClick={() => toggleTag(t)}
                className={`inline-flex min-h-10 items-center gap-2 border px-3.5 py-1.5 text-sm transition-colors duration-300 ${
                  active ? 'border-teja bg-teja text-cal' : 'border-ink/20 text-ink/80 hover:border-ink/50'
                }`}
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={1.75} /> {TAG_LABELS[t]}
              </button>
            )
          })}
          <p className="ml-auto text-sm text-stone" aria-live="polite">
            {count} {count === 1 ? 'plato' : 'platos'}
          </p>
        </div>

        <div ref={listRef} className="scroll-mt-40">
          <div key={`${category}-${tags.join()}`} className="animate-fade-in">
            {visible.length === 0 ? (
              <div className="mt-16 border border-dashed border-ink/25 px-6 py-14 text-center">
                <p className="font-serif text-2xl">No hay platos con esos filtros</p>
                <p className="mt-2 text-stone">Prueba con otra combinación o consulta opciones por WhatsApp.</p>
                <button type="button" onClick={() => setTags([])} className="btn btn-dark mt-6">
                  Quitar filtros
                </button>
              </div>
            ) : (
              visible.map((c) => (
                <section key={c.id} aria-labelledby={`cat-${c.id}`} className="menu-category mt-16 first:mt-14">
                  <header className="mb-8 flex flex-col gap-2 border-b border-ink/20 pb-5 sm:flex-row sm:items-end sm:justify-between">
                    <h3 id={`cat-${c.id}`} className="text-4xl sm:text-5xl">
                      {c.name}
                    </h3>
                    <p className="max-w-sm text-[0.95rem] italic text-stone sm:text-right">{c.intro}</p>
                  </header>
                  <ul className="grid gap-x-16 gap-y-9 md:grid-cols-2">
                    {c.dishes.map((d) => (
                      <DishRow key={d.id} dish={d} />
                    ))}
                  </ul>
                </section>
              ))
            )}
          </div>
        </div>

        <p className="mt-16 max-w-3xl border-t border-ink/15 pt-6 text-sm leading-relaxed text-stone">
          <strong className="font-semibold text-ink">Alérgenos:</strong> los alérgenos indicados son los ingredientes conocidos de cada
          receta. En nuestra cocina se manipulan gluten, lácteos, huevo, frutos secos y otros alérgenos, por lo que no podemos garantizar la
          ausencia de trazas. Informa al personal de cualquier alergia o intolerancia antes de pedir.
        </p>
      </div>
    </section>
  )
}

function DishRow({ dish }: { dish: Dish }) {
  return (
    <li className="menu-dish group flex gap-5">
      {dish.image && (
        <div className="menu-thumb no-print hidden shrink-0 sm:block">
          <Img name={dish.image} sizes="5.5rem" className="h-[5.5rem] w-[5.5rem]" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-3">
          <h4 className="min-w-0 font-serif text-[1.35rem] leading-tight">{dish.name}</h4>
          <span className="leader" aria-hidden="true" />
          <p className="shrink-0 font-serif text-[1.3rem] text-teja">
            <span className="sr-only">Precio: </span>
            {formatPrice(dish.price)}
            {dish.priceNote && <span className="block text-right font-sans text-xs text-stone">{dish.priceNote}</span>}
          </p>
        </div>
        <p className="mt-1.5 text-[0.95rem] leading-relaxed text-stone">{dish.description}</p>
        <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
          {dish.tags?.map((t) => {
            const Icon = TAG_ICONS[t]
            return (
              <span key={t} className={`inline-flex items-center gap-1.5 font-medium ${t === 'picante' ? 'text-teja' : 'text-moss'}`}>
                <Icon className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" /> {TAG_LABELS[t]}
              </span>
            )
          })}
          <span className="text-stone/90">
            {dish.allergens?.length ? `Contiene: ${dish.allergens.join(', ')}` : 'Alérgenos: consultar'}
          </span>
        </div>
      </div>
    </li>
  )
}
