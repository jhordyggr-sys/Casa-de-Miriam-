/**
 * RESEÑAS DE GOOGLE
 * ------------------------------------------------------------
 * Reseñas públicas de Casa de Miriam en Google Maps, consultadas el
 * 22 de octubre de 2026. Se muestran el autor, las estrellas y la fecha
 * tal como aparecen en Google, con un resumen de lo que destaca cada una
 * y un enlace para leerla completa en Google.
 *
 * `text`: si el autor autoriza publicar su reseña literal, pégala aquí
 * y se mostrará entre comillas en lugar del resumen.
 */

export interface GoogleReview {
  author: string
  /** "Local Guide", número de reseñas, etc. tal como figura en Google */
  badge?: string
  stars: 1 | 2 | 3 | 4 | 5
  /** Fecha aproximada a partir de "hace N meses" (consultado oct. 2026) */
  when: string
  summary: string
  /** Platos o aspectos mencionados en la reseña */
  mentions: string[]
  text?: string
}

export const googleReviewsUrl = 'https://www.google.com/maps?cid=7195345984430532005'

export const googleReviews: GoogleReview[] = [
  {
    author: 'Byron Sarango',
    stars: 5,
    when: 'mayo de 2026',
    summary:
      'Destaca la sazón y los sabores equilibrados, la poca espera, la atención amable y el buen ambiente. Probó la hamburguesa Milos Show y una michelada con tequila.',
    mentions: ['Hamburguesa Milos Show', 'Michelada con tequila', 'Atención', 'Ambiente'],
  },
  {
    author: 'Camila Valarezo',
    badge: 'Local Guide',
    stars: 5,
    when: 'diciembre de 2025',
    summary:
      'Resalta la ubicación céntrica y la decoración con plantas y antigüedades. En su segunda visita la comida le gustó todavía más y notó mejor servicio; pidió hamburguesa, tigrillo y canoa.',
    mentions: ['Hamburguesa', 'Tigrillo', 'Canoa', 'Decoración'],
  },
]

/** Temas más mencionados según el resumen de reseñas de Google (n.º de reseñas) */
export const googleTopics: [string, number][] = [
  ['ambiente', 8],
  ['hamburguesa', 8],
  ['sabor', 5],
  ['mayonesa', 3],
  ['cerveza', 3],
  ['micheladas', 2],
  ['plantitas', 2],
  ['decoración', 2],
]
