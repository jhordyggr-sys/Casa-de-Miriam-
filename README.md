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
- JSON-LD `Restaurant` con dirección, coordenadas, teléfono, correo, horario, tipo de cocina e Instagram. Por política de Google **no** incluye la calificación de terceros.
- `sitemap.xml` y `robots.txt` se generan al compilar. Además: favicon SVG, `site.webmanifest`, jerarquía H1/H2/H3 y textos alternativos en todas las imágenes.
- Rendimiento: imágenes locales optimizadas (WebP y JPEG) con `srcset`, dimensiones explícitas, carga diferida (lazy loading), precarga del hero y un único paquete JS de unos 72 kB comprimido.

## 6. Datos reales y pendientes

**Datos reales ya integrados (octubre de 2026):**
- Contacto: teléfono y WhatsApp 099 892 1901, correo casjuandi@hotmail.com (facilitados por el negocio; el WhatsApp coincide con la biografía de Instagram).
- Instagram: @casade_miriam, con su lema «Cocina libre • Hamburguesas • Cócteles».
- Fotos reales de Instagram: hamburguesa con queso (hero), postre, michelada y sangría (recortes sin texto de los afiches), los 8 afiches de promociones y 5 portadas de publicaciones (`local: true` en `src/data/images.json`).
- Promociones por día (Instagram, 15 de abril de 2026) y la promo de café de octubre, que se oculta sola el 1 de noviembre (`src/data/promos.ts`).
- Google Maps: dirección, horario, 4,2 con 78 reseñas, distribución por estrellas, temas más mencionados y dos reseñas de 5 estrellas (autor, fecha y resumen, con enlace a Google) en `src/data/reviews.ts`.
- Nombres de platos citados en Instagram y en las reseñas: La Rausch, Milos Show, papas en salsa de champiñones, tigrillo, canoa, carne al vino, costillas, micheladas, sangría, tinto de verano y café.

**Por confirmar o completar:**
- [ ] **Domingos:** Google Maps indica que el local cierra, pero hay una promo de micheladas para el domingo. La web oculta esa promo mientras el domingo figure cerrado en `site.hours`.
- [ ] **Precios y descripciones de la carta.** Son referenciales; solo el 2 × $15 de costillas es real.
- [ ] Vigencia de las promociones semanales (publicadas en abril de 2026).
- [ ] Reseñas literales: si los autores lo autorizan, pega el texto en el campo `text` de cada reseña.
- [ ] Más fotos propias en alta resolución (salón, fachada, equipo, platos). Las imágenes marcadas como «ilustrativas» son de Unsplash.
- [ ] Historia real del restaurante (ahora hay un relato propuesto).
- [ ] Estacionamiento cercano (`accessibility.parking`).
- [ ] Dominio definitivo (`url`) y logotipo oficial en vector.
- [ ] Política de privacidad revisada por asesoría legal.

## 7. Créditos de imagen

- Fotos marcadas con `local: true` en `src/data/images.json`: publicaciones de @casade_miriam, usadas con autorización del negocio. Cada entrada incluye el enlace a su publicación (`source`).
- Resto: [Unsplash](https://unsplash.com/license), uso comercial permitido. El archivo original está en `https://images.unsplash.com/photo-<id>`.
