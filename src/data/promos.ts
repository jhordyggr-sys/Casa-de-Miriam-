/**
 * PROMOCIONES
 * ------------------------------------------------------------
 * Promociones semanales publicadas por Casa de Miriam en Instagram
 * (carrusel del 15 de abril de 2026). Confirma su vigencia con el local.
 * Los días en que el restaurante está cerrado según `site.hours`
 * se ocultan automáticamente.
 */
import type { DayKey } from '../config/site'

export interface DailyPromo {
  day: DayKey
  title: string
  detail: string
  /** Afiche original (clave de images.json) */
  poster: string
}

export const promosSource = {
  label: 'Publicado en Instagram el 15 de abril de 2026',
  url: 'https://www.instagram.com/casade_miriam/p/DXK4MTiAV_4/',
}

export const dailyPromos: DailyPromo[] = [
  { day: 1, title: 'Hamburguesas con todo', detail: 'Todas las hamburguesas incluyen papas y bebida gratis.', poster: 'promo-lunes' },
  { day: 2, title: 'Postre a mitad de precio', detail: 'En consumos mayores a $25, tu postre va a mitad de precio.', poster: 'promo-martes' },
  { day: 3, title: 'Costillas 2 × $15', detail: 'Dos porciones de costillas por $15.', poster: 'promo-miercoles' },
  { day: 4, title: 'Cócteles 3 × 2', detail: 'Pide tres cócteles y paga dos.', poster: 'promo-jueves' },
  { day: 5, title: 'Cerveza artesanal 3 × 2', detail: 'Tres cervezas artesanales por el precio de dos.', poster: 'promo-viernes' },
  { day: 6, title: 'Sangría y tinto de verano 3 × 2', detail: 'Tres por el precio de dos en sangría y tinto de verano.', poster: 'promo-sabado' },
  { day: 0, title: 'Micheladas 3 × 2', detail: 'Tres micheladas por el precio de dos.', poster: 'promo-domingo' },
]

/**
 * Promoción de temporada. Se muestra solo entre `from` y `until` (inclusive,
 * hora de Ecuador). Publicada en Instagram el 13 de octubre de 2026.
 */
export const seasonalPromo = {
  from: '2026-10-01',
  until: '2026-10-31',
  eyebrow: 'Todo octubre',
  title: 'Loja, capital del café del Ecuador',
  detail: 'Taza de café gratis y 50 % de descuento en bebidas con café por tus consumos.',
  url: 'https://www.instagram.com/casade_miriam/p/DecxZD6BpmR/',
}
