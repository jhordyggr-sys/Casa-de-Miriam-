import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { site, fullAddress } from './src/config/site'

const DAY_SCHEMA = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

/**
 * SEO generado desde src/config/site.ts: metadatos, Open Graph, datos
 * estructurados Schema.org (Restaurant), sitemap.xml y robots.txt.
 * Así la dirección, el teléfono y el horario son idénticos en todo el sitio.
 */
function seo(): Plugin {
  const title = `${site.name} · Cocina libre, hamburguesas y cócteles en ${site.address.city}, Ecuador`
  const description = `${site.shortDescription} ${site.address.street}. Reserva por WhatsApp.`
  const base = site.url.replace(/\/$/, '')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: site.name,
    description: site.shortDescription,
    url: `${base}/`,
    image: `${base}/og-image.jpg`,
    telephone: site.phone.e164,
    email: site.email,
    servesCuisine: site.cuisine,
    acceptsReservations: true,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.countryCode,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.maps.placeUrl,
    sameAs: [site.social.instagram.url],
    openingHoursSpecification: Object.entries(site.hours).flatMap(([day, periods]) =>
      periods.map((p) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: `https://schema.org/${DAY_SCHEMA[Number(day)]}`,
        opens: p.open,
        closes: p.close,
      })),
    ),
  }

  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

  return {
    name: 'casa-de-miriam-seo',
    transformIndexHtml(html) {
      return html
        .replaceAll('%SEO_TITLE%', esc(title))
        .replaceAll('%SEO_DESCRIPTION%', esc(description))
        .replaceAll('%SEO_URL%', `${base}/`)
        .replaceAll('%SEO_IMAGE%', `${base}/og-image.jpg`)
        .replaceAll('%SEO_ADDRESS%', esc(fullAddress))
        .replaceAll('%SEO_PHONE%', esc(site.phone.display))
        .replace('<!--SEO_JSONLD-->', `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`)
    },
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${base}/</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url>\n</urlset>\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`,
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seo()],
  build: { target: 'es2020', cssMinify: true },
})
