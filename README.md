# Casa de Miriam: sitio web

Sitio web de **Casa de Miriam**, restaurante en el centro de Loja (Ecuador). Es una página única con carta interactiva, reservas por WhatsApp, galería con lightbox, mapa, horario con indicador «Abierto ahora», preguntas frecuentes y SEO local.

**Tecnología:** React 18, TypeScript, Vite 6, Tailwind CSS 4 e iconos Lucide. No hay backend, base de datos ni claves secretas.

---

## 1. Ejecutar en local

Necesitas Node.js 20 o superior ([nodejs.org](https://nodejs.org)).

```bash
npm install
npm run dev          # http://localhost:5173
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Comprobación de TypeScript y compilación de producción en `dist/` |
| `npm run preview` | Sirve `dist/` para revisar la versión final |
| `npm run lint` | ESLint |
| `npm run typecheck` | Solo TypeScript |
| `npm run images` | Vuelve a descargar las fotos de demostración (`--force` para sobrescribirlas) |

## 2. Publicar

Antes de publicar, cambia `url` en `src/config/site.ts` por el dominio real. Con ese valor se generan la URL canónica, Open Graph, `sitemap.xml` y `robots.txt`.

**Vercel:** importa el repositorio en vercel.com. Detecta Vite automáticamente (build `npm run build`, salida `dist`). `vercel.json` ya incluye las cabeceras de caché.

**Netlify:** importa el repositorio o arrastra la carpeta `dist/` a app.netlify.com. `netlify.toml` ya está configurado.

**Cualquier hosting estático** (Cloudflare Pages, GitHub Pages, cPanel): ejecuta `npm run build` y sube el contenido de `dist/`.

## 3. Dónde se edita cada cosa

| Qué | Archivo |
|---|---|
| Nombre, dirección, teléfono, **WhatsApp**, Instagram, mapa, **horarios**, zona horaria, calificación de Google, precio medio, modo demo | `src/config/site.ts` |
| **Carta y precios**, etiquetas y alérgenos | `src/data/menu.ts` |
| Textos de presentación, historia, testimonios, galería, preguntas frecuentes, platos destacados | `src/data/content.ts` |
| Fotografías (lista, textos alternativos y recortes) | `src/data/images.json` y `public/images/` |
| Colores y tipografías | `src/index.css` (bloque `@theme`) |
| Metadatos SEO y datos estructurados | `vite.config.ts` (se generan a partir de `site.ts`) |

**Fotos propias:** cada imagen tiene dos tamaños, `public/images/<clave>-<ancho>.webp` y la mitad de ese ancho (por ejemplo `hero-2400.webp` y `hero-1200.webp`). Puedes sustituir los archivos manteniendo el nombre o añadir una entrada nueva en `images.json`. Si una imagen falla, se muestra un marcador elegante con su texto alternativo.

**Modo demostración:** con `demo: true` en `site.ts` aparecen etiquetas discretas («Contenido de ejemplo») en la carta, la historia y los testimonios. Cuando todo el contenido sea real, cámbialo a `false`.

## 4. Cómo funcionan las reservas

1. El formulario valida el nombre, que la fecha no sea pasada ni un día cerrado, la hora (solo dentro del horario de atención, con la última mesa 60 min antes del cierre y, si es para hoy, con al menos 30 min de margen), el número de personas y el teléfono opcional.
2. Arma un mensaje legible y abre `https://wa.me/<número>?text=…` con el texto codificado.
3. Muestra los siguientes pasos y avisa de que **la reserva no está confirmada hasta que el restaurante responda**.

No se guarda ningún dato. Las horas del selector salen del horario de atención y **no reflejan la ocupación real**. Para tener disponibilidad en tiempo real haría falta un sistema de reservas (por ejemplo CoverManager, OpenTable o un backend propio).

## 5. SEO incluido

- Título y metadescripción, URL canónica, Open Graph y tarjeta de Twitter (`public/og-image.jpg`, 1200×630).
- JSON-LD `Restaurant` con dirección, coordenadas, teléfono, horario, tipo de cocina e Instagram. Por política de Google **no** incluye la calificación de terceros.
- `sitemap.xml` y `robots.txt` se generan al compilar. Además: favicon SVG, `site.webmanifest`, jerarquía H1/H2/H3 y textos alternativos en todas las imágenes.
- Rendimiento: imágenes WebP locales con `srcset`, dimensiones explícitas, carga diferida (lazy loading), precarga del hero y un único paquete JS de unos 72 kB comprimido.

## 6. Datos reales que hay que proporcionar

**Ya tomados de la ficha pública de Google Maps (octubre de 2026). Confírmalos:**
- [ ] Dirección: Miguel Riofrío y 24 de Mayo 166-22, 110150 Loja
- [ ] Teléfono: 098 226 2262. **¿Este número recibe WhatsApp?** Se usa como número de reservas.
- [ ] Horario: lunes a miércoles de 16:00 a 22:50, jueves a sábado de 16:00 a 23:50, domingo cerrado
- [ ] Instagram: @casademiriam46 (sin sesión iniciada, Instagram mostró «perfil no disponible»; verifica que el enlace sea correcto)
- [ ] Calificación: 4,2 con 78 reseñas en Google. Actualízala o desactívala con `googleRating.show`.
- [ ] Entrada accesible para silla de ruedas (según Google)

**Pendientes (ahora hay contenido de ejemplo):**
- [ ] **Carta real**: platos, descripciones, precios y alérgenos confirmados por cocina
- [ ] PDF de la carta, si existe (`menuPdfUrl`). Mientras tanto se ofrece «Imprimir carta».
- [ ] Precio medio por persona
- [ ] **Fotografías propias**: platos, salón, fachada, cocina, equipo. Las actuales son de Unsplash (licencia libre, uso comercial).
- [ ] Historia real del restaurante, quién es Miriam y frase de la fundadora
- [ ] Testimonios **autorizados** por clientes (nombre o iniciales)
- [ ] Platos destacados (los ids en `featuredIds`)
- [ ] Estacionamiento cercano (`accessibility.parking`)
- [ ] Dominio definitivo (`url`)
- [ ] Política de privacidad revisada por asesoría legal
- [ ] Logotipo oficial, si existe (ahora hay un monograma «M» provisional)

## 7. Créditos de imagen

Fotos de demostración de [Unsplash](https://unsplash.com/license). Los identificadores de cada foto están en `src/data/images.json`; el archivo original de cada una está en `https://images.unsplash.com/photo-<id>`. Sustitúyelas por fotos del local antes del lanzamiento.
