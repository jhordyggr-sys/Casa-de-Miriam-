import { ArrowUpRight } from 'lucide-react'
import { Img } from '../components/Img'
import { InstagramIcon } from '../components/ui'
import { instagramTiles } from '../data/content'
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
            <p className="mt-4 max-w-md text-stone">Novedades, platos del día y la vida de la casa. Síguenos para no perderte nada.</p>
          </div>
          <a href={ig.url} target="_blank" rel="noopener noreferrer" className="btn btn-dark reveal self-start md:self-auto">
            Visitar el perfil <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </div>

        <ul className="mt-12 grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
          {instagramTiles.map((k, i) => (
            <li key={k} className="reveal" style={{ ['--delay' as string]: `${i * 70}ms` }}>
              <a
                href={ig.url}
                target="_blank"
                rel="noopener noreferrer"
                className="img-zoom group relative block"
                aria-label={`Ver más fotos en Instagram de ${site.name}`}
              >
                <Img name={k} sizes="(min-width: 1024px) 16vw, 33vw" className="aspect-square" />
                <span className="absolute inset-0 flex items-center justify-center bg-ink/0 text-cal opacity-0 transition-all duration-500 group-hover:bg-ink/45 group-hover:opacity-100 group-focus-visible:bg-ink/45 group-focus-visible:opacity-100">
                  <InstagramIcon className="h-6 w-6" />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-stone">Imágenes ilustrativas del sitio; no es una conexión en vivo con Instagram.</p>
      </div>
    </section>
  )
}
