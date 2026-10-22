/**
 * CARTA — CONTENIDO DE DEMOSTRACIÓN
 * ------------------------------------------------------------
 * Platos, descripciones y precios son EJEMPLOS editables inspirados
 * en el estilo del local (hamburguesas, carnes y sabores lojanos).
 * Sustitúyelos por la carta real antes de publicar.
 *
 * - price: en USD.
 * - image: clave de src/data/images.json (opcional).
 * - allergens: SOLO completar con información confirmada por cocina.
 *   Si se deja vacío se muestra "Consultar alérgenos".
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
    intro: 'Bocados para abrir la mesa y la conversación.',
    dishes: [
      {
        id: 'empanadas',
        name: 'Empanadas de viento',
        description: 'Masa frita al momento, rellena de queso fresco y espolvoreada con azúcar. Como en casa.',
        price: 4.5,
        image: 'empanadas',
        tags: ['vegetariano'],
        allergens: ['gluten', 'lácteos'],
      },
      {
        id: 'papas',
        name: 'Papas rústicas',
        description: 'Con piel, doble cocción y mayonesa de la casa con ajo asado y hierbas.',
        price: 4,
        image: 'papas',
        tags: ['vegetariano', 'recomendado'],
        allergens: ['huevo'],
      },
      {
        id: 'cecina',
        name: 'Tabla de cecina lojana',
        description: 'Cecina de cerdo a la plancha, yuca dorada, encurtido de cebolla y ají de pepa de zambo.',
        price: 8.5,
        tags: ['casa', 'picante'],
      },
      {
        id: 'tamal',
        name: 'Tamal lojano',
        description: 'Maíz pelado, guiso de cerdo y hoja de achira. Con café o solo, como prefieras.',
        price: 3.5,
      },
    ],
  },
  {
    id: 'hamburguesas',
    name: 'Hamburguesas',
    intro: 'Carne molida cada día, pan brioche tostado y salsas hechas en nuestra cocina.',
    dishes: [
      {
        id: 'la-miriam',
        name: 'La Miriam',
        description: 'Doble carne, cheddar fundido, panceta crujiente, cebolla caramelizada y mayonesa de la casa.',
        price: 11.5,
        image: 'burger-casa',
        tags: ['casa', 'recomendado'],
        allergens: ['gluten', 'lácteos', 'huevo'],
      },
      {
        id: 'clasica',
        name: 'Clásica',
        description: 'Carne de res, lechuga, tomate, cebolla morada, pepinillos y queso.',
        price: 8.5,
        image: 'burger-clasica',
        allergens: ['gluten', 'lácteos', 'huevo'],
      },
      {
        id: 'lojana',
        name: 'La Lojana',
        description: 'Carne de res, queso fresco a la plancha, maduro asado y ají de tomate de árbol.',
        price: 10,
        tags: ['picante'],
        allergens: ['gluten', 'lácteos'],
      },
      {
        id: 'doble-cheddar',
        name: 'Doble cheddar',
        description: 'Dos carnes smash con borde crujiente, doble cheddar, pepinillos y salsa ahumada.',
        price: 10.5,
        image: 'burger-doble',
        allergens: ['gluten', 'lácteos', 'huevo', 'mostaza'],
      },
    ],
  },
  {
    id: 'fuego',
    name: 'Del fuego',
    intro: 'Cortes y piezas que pasan por la parrilla sin prisa.',
    dishes: [
      {
        id: 'panceta',
        name: 'Panceta crujiente',
        description: 'Cocción lenta y final a la brasa. Con mote pillo, encurtido y ají de la casa.',
        price: 11,
        image: 'panceta',
        tags: ['recomendado', 'picante'],
      },
      {
        id: 'lomo',
        name: 'Lomo a la parrilla',
        description: 'Corte de res al punto que pidas, chimichurri de hierbas y papas rústicas.',
        price: 15.5,
        image: 'lomo',
      },
      {
        id: 'costillas',
        name: 'Costillas glaseadas',
        description: 'Costillas de cerdo glaseadas con panela y naranjilla, ensalada fresca y papas.',
        price: 14,
        image: 'costillas',
        tags: ['casa'],
      },
      {
        id: 'parrillada',
        name: 'Parrillada para compartir',
        description: 'Lomo, panceta, chorizo y costillas con papas, mote, ensalada y tres salsas.',
        price: 28,
        priceNote: 'para 2',
        image: 'brasas',
      },
    ],
  },
  {
    id: 'sin-carne',
    name: 'Sin carne',
    intro: 'Platos vegetarianos con la misma dedicación que el resto de la carta.',
    dishes: [
      {
        id: 'burger-garbanzo',
        name: 'Hamburguesa de garbanzo y quinua',
        description: 'Medallón de garbanzo, quinua y especias, queso, aguacate y mayonesa de cilantro.',
        price: 9.5,
        tags: ['vegetariano'],
        allergens: ['gluten', 'lácteos', 'huevo'],
      },
      {
        id: 'ensalada',
        name: 'Ensalada de la huerta',
        description: 'Hojas tiernas, tomates cherry, aguacate, queso fresco y vinagreta de maracuyá.',
        price: 7.5,
        image: 'ensalada',
        tags: ['vegetariano'],
        allergens: ['lácteos'],
      },
      {
        id: 'humitas',
        name: 'Humitas con queso',
        description: 'Choclo tierno molido, queso y mantequilla, cocidas en su propia hoja.',
        price: 3.5,
        tags: ['vegetariano'],
        allergens: ['lácteos', 'huevo'],
      },
    ],
  },
  {
    id: 'postres',
    name: 'Postres',
    intro: 'Para alargar la sobremesa.',
    dishes: [
      {
        id: 'brownie',
        name: 'Brownie tibio',
        description: 'Chocolate ecuatoriano, helado de vainilla y salsa de chocolate.',
        price: 5.5,
        image: 'brownie',
        tags: ['vegetariano'],
        allergens: ['gluten', 'lácteos', 'huevo'],
      },
      {
        id: 'higos',
        name: 'Dulce de higos con quesillo',
        description: 'Higos cocidos lentamente con panela y canela, servidos con quesillo fresco.',
        price: 4.5,
        image: 'higos',
        tags: ['vegetariano', 'casa'],
        allergens: ['lácteos'],
      },
    ],
  },
  {
    id: 'bebidas',
    name: 'Bebidas',
    intro: 'Del valle, del huerto y de la cafetera.',
    dishes: [
      {
        id: 'horchata',
        name: 'Horchata lojana',
        description: 'Infusión tradicional de hierbas y flores aromáticas, fría o caliente.',
        price: 2.5,
        image: 'infusion',
        tags: ['casa'],
      },
      {
        id: 'cafe',
        name: 'Café de altura',
        description: 'Café de origen lojano, filtrado o espresso.',
        price: 2,
        image: 'cafe',
      },
      {
        id: 'jugos',
        name: 'Jugos naturales',
        description: 'Fruta de temporada: mora, naranjilla, tomate de árbol o maracuyá.',
        price: 3,
      },
      {
        id: 'cerveza',
        name: 'Cerveza artesanal',
        description: 'Selección rotativa de cervecerías ecuatorianas.',
        price: 4.5,
        image: 'cerveza',
      },
    ],
  },
  {
    id: 'cocteles',
    name: 'Cócteles',
    intro: 'Para mayores de 18 años. Disfruta con responsabilidad.',
    dishes: [
      {
        id: 'canelazo',
        name: 'Canelazo',
        description: 'Aguardiente, naranjilla, canela y panela, servido caliente.',
        price: 5,
        image: 'coctel',
        tags: ['casa'],
      },
      {
        id: 'coctel-casa',
        name: 'Flor de Miriam',
        description: 'Gin, jamaica, maracuyá y tónica. Fresco y floral.',
        price: 7,
        image: 'coctel-rojo',
        tags: ['recomendado'],
      },
    ],
  },
]

export const formatPrice = (n: number) => `$${n.toFixed(2)}`
