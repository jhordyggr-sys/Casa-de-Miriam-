/**
 * CARTA
 * ------------------------------------------------------------
 * Los NOMBRES de los platos salen de lo que Casa de Miriam publica en
 * Instagram y de lo que mencionan sus reseñas en Google (La Rausch,
 * Milos Show, papas en salsa de champiñones, tigrillo, canoa, carne al
 * vino, costillas, micheladas, sangría, tinto de verano, café…).
 * Las descripciones y los PRECIOS son de ejemplo: sustitúyelos por la
 * carta real antes de publicar.
 *
 * - price: en USD.
 * - image: clave de src/data/images.json (opcional).
 * - allergens: SOLO completar con información confirmada por cocina.
 *   Si se deja vacío se muestra "Alérgenos: consultar".
 */

export type Tag = 'vegetariano' | 'picante' | 'recomendado' | 'casa'
export type Allergen = 'gluten' | 'lácteos' | 'huevo' | 'frutos secos' | 'soya' | 'mostaza' | 'sésamo'

export interface Dish {
  id: string
  name: string
  description: string
  price: number
  /** Texto adicional del precio, p. ej. "para 2" */
  priceNote?: string
  image?: string
  tags?: Tag[]
  allergens?: Allergen[]
}

export interface MenuCategory {
  id: string
  name: string
  intro: string
  dishes: Dish[]
}

export const TAG_LABELS: Record<Tag, string> = {
  vegetariano: 'Vegetariano',
  picante: 'Picante',
  recomendado: 'Recomendado',
  casa: 'De la casa',
}

export const menu: MenuCategory[] = [
  {
    id: 'entradas',
    name: 'Para empezar',
    intro: 'Para abrir la mesa y la conversación.',
    dishes: [
      {
        id: 'papas-champinones',
        name: 'Papas en salsa de champiñones',
        description: 'Papas salteadas con mantequilla y pimienta, bañadas en nuestra salsa de champiñones.',
        price: 5.5,
        tags: ['casa', 'vegetariano', 'recomendado'],
      },
      {
        id: 'tigrillo',
        name: 'Tigrillo',
        description: 'Verde majado con huevo y queso, como se prepara en el sur del Ecuador.',
        price: 5,
        tags: ['vegetariano'],
      },
      {
        id: 'canoa',
        name: 'Canoa',
        description: 'Maduro horneado y relleno, gratinado con queso.',
        price: 4.5,
        tags: ['vegetariano'],
      },
    ],
  },
  {
    id: 'hamburguesas',
    name: 'Hamburguesas',
    intro: 'Nuestra especialidad. Los lunes incluyen papas y bebida.',
    dishes: [
      {
        id: 'la-rausch',
        name: 'La Rausch',
        description: 'Hamburguesa en pan pretzel, una de las favoritas de nuestras redes.',
        price: 10.5,
        image: 'ig-DDpxYaRprwm',
        tags: ['casa', 'recomendado'],
      },
      {
        id: 'milos-show',
        name: 'Milos Show',
        description: 'Hamburguesa de la casa recomendada por nuestros clientes en Google.',
        price: 11,
        tags: ['recomendado'],
      },
      {
        id: 'burger-queso',
        name: 'Hamburguesa bañada en queso',
        description: 'Carne, jamón y pan dorado, cubiertos con abundante queso fundido.',
        price: 10,
        image: 'real-burger',
        tags: ['casa'],
      },
      {
        id: 'clasica',
        name: 'Clásica',
        description: 'Carne de res, lechuga, tomate, cebolla y queso con mayonesa de la casa.',
        price: 8,
        image: 'burger-clasica',
      },
    ],
  },
  {
    id: 'fuertes',
    name: 'Platos fuertes',
    intro: 'Para compartir o para no compartir.',
    dishes: [
      {
        id: 'costillas',
        name: 'Costillas',
        description: 'Costillas de cerdo glaseadas. Los miércoles, 2 porciones por $15.',
        price: 9.5,
        image: 'costillas',
        tags: ['recomendado'],
      },
      {
        id: 'carne-vino',
        name: 'Carne al vino',
        description: 'Carne en salsa de vino con champiñones y crema, con menestra.',
        price: 11,
      },
      {
        id: 'omelette',
        name: 'Omelette',
        description: 'Omelette de la casa, preparado al momento.',
        price: 6,
        tags: ['vegetariano'],
      },
    ],
  },
  {
    id: 'postres',
    name: 'Postres',
    intro: 'Los martes, a mitad de precio en consumos mayores a $25.',
    dishes: [
      {
        id: 'postre-casa',
        name: 'Postre de la casa',
        description: 'Con helado de vainilla, frutos rojos y salsa de chocolate.',
        price: 5,
        image: 'real-postre',
        tags: ['casa'],
      },
    ],
  },
  {
    id: 'bebidas',
    name: 'Café y bebidas',
    intro: 'Loja es la capital del café del Ecuador.',
    dishes: [
      {
        id: 'cafe',
        name: 'Café lojano',
        description: 'Café de altura de la provincia, filtrado o espresso.',
        price: 2,
        image: 'cafe',
      },
      {
        id: 'cerveza',
        name: 'Cerveza artesanal',
        description: 'Los viernes, 3 × 2.',
        price: 4.5,
        image: 'cerveza',
      },
      {
        id: 'michelada',
        name: 'Michelada',
        description: 'Con borde escarchado y limón. También con tequila.',
        price: 5,
        image: 'real-michelada',
        tags: ['recomendado'],
      },
    ],
  },
  {
    id: 'cocteles',
    name: 'Cócteles',
    intro: 'Para mayores de 18 años. Los jueves, 3 × 2.',
    dishes: [
      {
        id: 'sangria',
        name: 'Sangría',
        description: 'Vino tinto con fruta picada. Los sábados, 3 × 2.',
        price: 5.5,
        image: 'real-sangria',
      },
      {
        id: 'tinto-verano',
        name: 'Tinto de verano',
        description: 'Vino tinto con refresco y hielo. Los sábados, 3 × 2.',
        price: 5,
      },
      {
        id: 'cocteles-casa',
        name: 'Cócteles de autor',
        description: 'Pregunta por los cócteles del día en la barra.',
        price: 7,
        image: 'coctel',
        tags: ['casa'],
      },
    ],
  },
]

export const formatPrice = (n: number) => `$${n.toFixed(2)}`
