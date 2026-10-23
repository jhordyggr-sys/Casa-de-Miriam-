import { ArrowUpRight, Play } from 'lucide-react'
import { Img } from '../components/Img'
import { InstagramIcon } from '../components/ui'
import { instagramPosts } from '../data/content'
import { site } from '../config/site'

export function Instagram() {
  const ig = site.social.instagram
  return (
    <section aria-labelledby="ig-title" className="overflow-hidden bg-cal-2 py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="reveal">
            <p className="eyebrow mb-5 flex items-center gap-3 text-teja">
              <InstagramIcon className="h-4 w-4" /> Instagram
            </p>
            <h2 id="ig-title" className="text-[1.9rem] min-[400px]:text-[2.4rem] sm:text-6xl">
              <a href={ig.url} target="_blank" rel="noopener noreferrer" className="link-underline">
                @{ig.handle}
              </a>
            </h2>
            <p className="mt-4 max-w-md text-stone">Recetas, promos y la vida de la casa contadas por nuestro equipo. Síguenos para no perderte nada.</p>
          </div>
          <a href={ig.url} target="_blank" rel="noopener noreferrer" className="btn btn-dark reveal self-start md:self-auto">
            Visitar el perfil <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
          {instagramPosts.map((p, i) => {
            const isReel = p.url.includes('/reel/')
            return (
              <li key={p.key} className="reveal" style={{ ['--delay' as string]: `${i * 70}ms` }}>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="img-zoom group relative block" aria-label={`Ver en Instagram: ${p.label}`}>
                  <Img name={p.key} sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw" className="aspect-[4/5]" />
                  {isReel && (
                    <span className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink/60 text-cal" aria-hidden="true">
                      <Play className="h-3.5 w-3.5 fill-cal" strokeWidth={1.5} />
                    </span>
                  )}
                  <span className="absolute inset-x-0 bottom-0 flex items-end bg-gradient-to-t from-ink/85 via-ink/30 to-transparent p-3 pt-10 text-sm text-cal opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                    {p.label}
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
        <p className="mt-4 text-xs text-stone">Publicaciones reales de nuestro perfil. Al pulsar se abren en Instagram.</p>
      </div>
    </section>
  )
}
