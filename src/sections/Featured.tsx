import { ArrowRight } from 'lucide-react'
import { Img } from '../components/Img'
import { DemoTag, SectionHeading } from '../components/ui'
import { featuredIds } from '../data/content'
import { formatPrice, menu, type Dish } from '../data/menu'

const allDishes = menu.flatMap((c) => c.dishes.map((d) => ({ ...d, category: c.name })))
const featured = featuredIds
  .map((id) => allDishes.find((d) => d.id === id))
  .filter((d): d is Dish & { category: string } => Boolean(d?.image))

export function Featured() {
  const [main, ...rest] = featured
  if (!main) return null

  return (
    <section id="destacados" aria-labelledby="featured-title" className="section-pad grain relative overflow-hidden bg-ink text-cal">
      <div className="container-x">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            light
            id="featured-title"
            eyebrow="Para decidirse"
            title={
              <>
                Lo que más se <em className="text-brass">pide</em> en casa
              </>
            }
          />
          <DemoTag className="reveal self-start text-brass lg:self-end">Platos y precios de ejemplo</DemoTag>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <article className="reveal group min-w-0 lg:col-span-7">
            <div className="img-zoom relative">
              <Img name={main.image!} sizes="(min-width: 1024px) 55vw, 100vw" className="aspect-[4/3]" />
              <span className="eyebrow absolute left-0 top-0 bg-teja px-4 py-2 text-[0.65rem] text-cal">Especialidad de la casa</span>
            </div>
            <div className="mt-8 flex items-start justify-between gap-6">
              <div>
                <p className="eyebrow text-[0.65rem] text-mist">{main.category}</p>
                <h3 className="mt-3 text-4xl sm:text-5xl">{main.name}</h3>
                <p className="mt-4 max-w-lg text-mist">{main.description}</p>
              </div>
              <p className="shrink-0 font-serif text-3xl text-brass">{formatPrice(main.price)}</p>
            </div>
          </article>

          <ul className="flex flex-col justify-between gap-10 lg:col-span-5">
            {rest.map((d, i) => (
              <li key={d.id} className="reveal group grid grid-cols-[5.5rem_minmax(0,1fr)] gap-4 border-t border-cal/12 pt-8 min-[400px]:grid-cols-[7.5rem_minmax(0,1fr)] min-[400px]:gap-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-7 lg:grid-cols-[7rem_minmax(0,1fr)] lg:gap-5 xl:grid-cols-[10rem_minmax(0,1fr)] xl:gap-7" style={{ ['--delay' as string]: `${i * 120}ms` }}>
                <div className="img-zoom">
                  <Img name={d.image!} sizes="10rem" className="aspect-square" />
                </div>
                <div>
                  <p className="eyebrow text-[0.65rem] text-mist">{d.category}</p>
                  <div className="mt-2 flex items-baseline justify-between gap-4">
                    <h3 className="min-w-0 text-[1.4rem] leading-tight min-[400px]:text-2xl sm:text-[1.7rem]">{d.name}</h3>
                    <span className="shrink-0 font-serif text-xl text-brass">{formatPrice(d.price)}</span>
                  </div>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-mist">{d.description}</p>
                </div>
              </li>
            ))}
            <li className="reveal border-t border-cal/12 pt-8">
              <a href="#carta" className="btn btn-light w-full sm:w-auto">
                Ver la carta completa <ArrowRight className="arrow h-4 w-4" strokeWidth={1.5} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
