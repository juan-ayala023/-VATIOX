/**
 * TODO EL TEXTO DE LA PÁGINA VIVE AQUÍ.
 * El cliente puede revisar y corregir en un solo archivo.
 *
 * Reglas (registro INVIMA de alimento):
 *  - Prohibido prometer efectos en el cuerpo o en el desempeño deportivo.
 *  - Prohibido el símbolo de marca registrada (la marca no está aprobada por la SIC).
 *  - Prohibidos testimonios inventados presentados como reales.
 *  - Solo datos objetivos: 600 mg de nitratos por porción, porción 20 g, frasco 600 g,
 *    30 porciones, fabricado en Colombia, precio por porción.
 *
 * Las claves marcadas con  // [VALIDAR VATIOX]  requieren aprobación de la marca.
 * Los precios se insertan desde src/lib/catalog.ts (no se escriben aquí).
 */

export const copy = {
  meta: {
    title: 'VATIOX · Polvo de remolacha · 600 mg de nitratos por porción',
    description:
      'VATIOX Polvo de remolacha: 600 mg de nitratos por porción, análisis externo en cada lote. Frasco de 600 g, 30 porciones. Fabricado en Colombia. Envío gratis.',
    ogAlt: 'Frasco de VATIOX Polvo de remolacha',
  },

  announcement: [
    'ENVÍO GRATIS A TODO COLOMBIA',
    'PRIMER LOTE: {total} UNIDADES',
    '600 MG DE NITRATOS POR PORCIÓN',
    'CADA VATIO CUENTA',
  ],

  nav: {
    links: [
      { label: 'Producto', href: '/#producto' },
      { label: 'Análisis por lote', href: '/#lote' },
      { label: 'Historia', href: '/#historia' },
      { label: 'Comprar', href: '/#comprar' },
      { label: 'FAQ', href: '/#faq' },
      { label: 'Rastrear pedido', href: '/rastreo' },
    ],
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    cart: 'Abrir carrito',
  },

  hero: {
    eyebrow: 'REF. VX-01 · LOTE 001',
    title: 'CADA VATIO CUENTA.',
    subtitle: '600 mg de nitratos por porción. Comprobado en cada lote.',
    ctaBuy: 'COMPRAR',
    ctaBuyNote: 'IVA incluido · Envío gratis',
    ctaSecondary: 'VER EL PRODUCTO',
    chips: ['600 MG / PORCIÓN', '20 G', '30 PORCIONES', 'HECHO EN COLOMBIA'],
  },

  stock: {
    label: 'PRIMER LOTE',
    template: 'QUEDAN {left} DE {total}',
    limited: 'Primer lote limitado.',
    soldOut: 'AGOTADO',
  },

  trust: [
    'Análisis externo en cada lote',
    'Envío gratis a todo Colombia',
    'Pago con PSE, tarjetas, Nequi y Daviplata',
    'Fabricado en Colombia',
  ],

  product: {
    eyebrow: 'FICHA TÉCNICA · VX-01',
    title: 'VATIOX POLVO DE REMOLACHA',
    counterCaption: 'de nitratos por porción',
    specTitle: 'SPEC SHEET',
    specs: {
      serving: 'Porción',
      content: 'Contenido',
      servings: 'Porciones',
      flavor: 'Sabor',
      invima: 'Registro INVIMA',
      origin: 'Origen',
    },
    flavorPending: 'Por definir',
    invimaPending: 'En trámite',
    howTitle: 'CÓMO SE TOMA',
    // [VALIDAR VATIOX] cantidades de agua y momento de consumo los define la marca según la etiqueta
    howSteps: [
      { title: 'Una porción de 20 g', text: 'Usa la medida incluida en el frasco.' },
      { title: 'Mezcla con agua', text: 'Cantidad de agua según la etiqueta.' },
      { title: 'Agita y toma', text: 'Consume según las indicaciones de la etiqueta.' },
    ],
    howNote: 'Indicaciones definitivas según la etiqueta aprobada.',
  },

  lot: {
    eyebrow: 'ANÁLISIS POR LOTE',
    title: 'NO TE PEDIMOS QUE NOS CREAS. TE MOSTRAMOS EL ANÁLISIS.',
    intro: 'Cada lote se analiza en un laboratorio externo. El resultado queda publicado aquí.',
    searchLabel: 'Ingresa el número de lote de tu frasco',
    searchPlaceholder: 'Ej: 001',
    searchButton: 'CONSULTAR',
    found: 'Lote encontrado',
    viewPdf: 'Ver análisis (PDF)',
    notFound: 'Lote no encontrado. Escríbenos por WhatsApp.',
    certTitle: 'CERTIFICADO DE ANÁLISIS',
    certRows: {
      product: 'Producto',
      lot: 'Lote',
      date: 'Fecha',
      lab: 'Laboratorio',
      nitrates: 'Nitratos por porción (20 g)',
    },
    certStamp: 'LOTE 001',
    certDisclaimer: 'Documento de muestra. El certificado real se publicará con cada lote.',
  },

  why: {
    eyebrow: 'POR QUÉ VATIOX',
    title: 'TRES DATOS. NADA MÁS.',
    cards: [
      {
        n: '01',
        title: 'DOSIS DECLARADA.',
        text: '600 mg de nitratos por porción, escrito en la etiqueta.',
      },
      {
        n: '02',
        title: 'DOSIS COMPROBADA.',
        text: 'Análisis externo en cada lote, disponible para ti.',
      },
      {
        n: '03',
        title: 'PRECIO POR PORCIÓN.',
        text: '≈ {perServing} por porción. Menos con el combo.',
      },
    ],
  },

  story: {
    eyebrow: 'NUESTRA HISTORIA',
    title: 'NACIDO EN EL CICLISMO, PARA TODOS LOS DEPORTISTAS.',
    // [VALIDAR VATIOX]
    body:
      'VATIOX nace en las carreteras de Colombia, entre puertos de montaña y madrugadas de entrenamiento. Dos ciclistas que querían saber exactamente qué estaban tomando. Por eso cada frasco declara su dosis y cada lote publica su análisis. Empezamos en el ciclismo. Es para cualquier deportista que mida lo que hace.',
    founders: [
      { name: 'Alejandro Ospina', role: 'Exciclista · Cofundador', bib: '07' },
      { name: 'Jaider Muñoz', role: 'Ciclista profesional · Cofundador', bib: '21' },
    ],
    photoPending: 'Foto pendiente',
  },

  athletes: {
    eyebrow: 'ATLETAS',
    title: 'QUIENES YA LLEVAN VATIOX.',
    exampleTag: 'EJEMPLO',
    prev: 'Atleta anterior',
    next: 'Atleta siguiente',
    // Contenido placeholder: no inventar testimonios con nombres reales.
    items: [
      { name: 'Nombre del atleta', discipline: 'Ciclismo de ruta', quote: 'Testimonio pendiente de autorización.' },
      { name: 'Nombre del atleta', discipline: 'Running', quote: 'Testimonio pendiente de autorización.' },
      { name: 'Nombre del atleta', discipline: 'Triatlón', quote: 'Testimonio pendiente de autorización.' },
      { name: 'Nombre del atleta', discipline: 'MTB', quote: 'Testimonio pendiente de autorización.' },
      { name: 'Nombre del atleta', discipline: 'Trail running', quote: 'Testimonio pendiente de autorización.' },
    ],
  },

  offer: {
    eyebrow: 'COMPRAR',
    title: 'ELIGE TU OFERTA.',
    perServing: '{price} por porción',
    freeShipping: 'Envío gratis',
    ivaIncluded: 'IVA incluido',
    mostChosen: 'MÁS ELEGIDO',
    quantity: 'Cantidad',
    decrease: 'Disminuir cantidad',
    increase: 'Aumentar cantidad',
    addToCart: 'AGREGAR AL CARRITO',
    added: 'AGREGADO',
    payments: ['PSE', 'Visa', 'Mastercard', 'Nequi', 'Daviplata'],
    perks: ['Envío gratis a todo Colombia', 'Factura electrónica con cada compra'],
    subscription: 'SUSCRIPCIÓN MENSUAL −10% · PRÓXIMAMENTE',
    wholesale: '¿Tienes una tienda o un equipo? Compras al por mayor',
    stockError: 'Solo quedan {left} unidades disponibles en este lote.',
  },

  comingSoon: {
    eyebrow: 'CATÁLOGO',
    title: 'LO QUE VIENE.',
    tag: 'PRÓXIMAMENTE',
  },

  faq: {
    eyebrow: 'PREGUNTAS FRECUENTES',
    title: 'PREGUNTAS FRECUENTES.',
    // [VALIDAR VATIOX] respuestas solo con datos, sin promesas
    items: [
      {
        q: '¿Qué contiene cada porción?',
        a: 'Cada porción de 20 g de VATIOX Polvo de remolacha contiene 600 mg de nitratos. La lista completa de ingredientes y la tabla nutricional estarán en la etiqueta aprobada.',
      },
      {
        q: '¿Cómo comprueban los 600 mg?',
        a: 'Cada lote se envía a un laboratorio externo. El resultado de nitratos por porción se publica en esta página y puedes consultarlo con el número de lote impreso en tu frasco.',
      },
      {
        q: '¿Cuántas porciones trae el frasco?',
        a: 'El frasco contiene 600 g: 30 porciones de 20 g.',
      },
      {
        q: '¿Cuánto tarda el envío y cuánto cuesta?',
        a: 'El envío es gratis a todo Colombia. El tiempo de entrega depende de la ciudad y te lo confirmamos con la guía de envío.',
      },
      {
        q: '¿Qué medios de pago aceptan?',
        a: 'PSE, tarjetas débito y crédito (Visa, Mastercard), Nequi y Daviplata.',
      },
      {
        q: '¿Puedo devolver mi compra?',
        a: 'Sí. En compras a distancia tienes derecho de retracto de 5 días hábiles desde la entrega, según la Ley 1480 de 2011. Revisa nuestra política de envíos, cambios, devoluciones y retracto.',
        link: { label: 'Ver política', href: '/envios-y-devoluciones' },
      },
      {
        q: '¿Venden al por mayor?',
        a: 'Sí, para tiendas y equipos. Escríbenos por WhatsApp y te enviamos las condiciones.',
      },
      {
        q: '¿Tiene registro INVIMA?',
        a: 'En trámite. Publicaremos el número de registro aquí y en la etiqueta en cuanto sea asignado.',
      },
    ],
  },

  finalCta: {
    title: 'CADA VATIO CUENTA.',
    button: 'COMPRAR AHORA',
  },

  footer: {
    tagline: 'Nacido en el ciclismo, para todos los deportistas.',
    links: [
      { label: 'Producto', href: '/#producto' },
      { label: 'Historia', href: '/#historia' },
      { label: 'FAQ', href: '/#faq' },
      { label: 'Contacto', href: 'whatsapp' },
      { label: 'Rastrear pedido', href: '/rastreo' },
    ],
    legal: [
      { label: 'Términos y condiciones', href: '/terminos' },
      { label: 'Tratamiento de datos personales', href: '/privacidad' },
      { label: 'Envíos, cambios, devoluciones y retracto', href: '/envios-y-devoluciones' },
    ],
    copyright: '© 2026 VATIOX. Fabricado en Colombia.',
  },

  whatsapp: {
    label: 'Escríbenos por WhatsApp',
  },

  buyBar: {
    note: 'Envío gratis',
    cta: 'COMPRAR',
  },

  cart: {
    title: 'TU CARRITO',
    close: 'Cerrar carrito',
    empty: 'Tu carrito está vacío.',
    emptyCta: 'VER OFERTAS',
    remove: 'Quitar',
    discountLabel: 'Código de descuento',
    discountPlaceholder: 'Ej: JAIDER10',
    discountApply: 'APLICAR',
    discountApplied: 'Código {code} aplicado (−{percent}%)',
    discountInvalid: 'Código no válido.',
    discountRemove: 'Quitar código',
    subtotal: 'Subtotal',
    discount: 'Descuento',
    shipping: 'Envío',
    shippingFree: 'Gratis',
    total: 'Total',
    checkout: 'IR A PAGAR',
    upsell: 'Cambia al combo de 2 frascos y ahorra {savings}.',
    upsellCta: 'CAMBIAR',
    stockError: 'No hay más unidades disponibles en este lote.',
  },

  checkout: {
    title: 'FINALIZAR COMPRA',
    contact: 'Datos de contacto',
    shipping: 'Datos de envío',
    payment: 'Método de pago',
    summary: 'Resumen del pedido',
    fields: {
      name: 'Nombre completo',
      idNumber: 'Cédula',
      email: 'Correo electrónico',
      phone: 'WhatsApp',
      department: 'Departamento',
      city: 'Ciudad',
      address: 'Dirección',
      neighborhood: 'Barrio',
      notes: 'Indicaciones de entrega (opcional)',
    },
    methods: [
      { id: 'pse', label: 'PSE', note: 'Débito desde tu banco' },
      { id: 'card', label: 'Tarjeta', note: 'Visa · Mastercard' },
      { id: 'nequi', label: 'Nequi', note: 'Pago desde la app' },
      { id: 'daviplata', label: 'Daviplata', note: 'Pago desde la app' },
    ],
    terms: 'Acepto los {terms} y la {privacy}.',
    termsLink: 'términos y condiciones',
    privacyLink: 'política de tratamiento de datos personales',
    submit: 'PAGAR',
    processing: 'PROCESANDO…',
    required: 'Campo obligatorio',
    invalidEmail: 'Correo no válido',
    invalidPhone: 'Número de 10 dígitos',
    invalidId: 'Solo números (6 a 10 dígitos)',
    mustAccept: 'Debes aceptar para continuar',
    emptyCart: 'Tu carrito está vacío.',
    back: 'Volver a la tienda',
    mockNotice: 'Boceto: no se realizará ningún cobro.',
  },

  thanks: {
    eyebrow: 'PEDIDO CONFIRMADO',
    title: 'GRACIAS.',
    orderLabel: 'Número de pedido',
    body: 'Te enviaremos la confirmación y la guía de envío por WhatsApp y correo.',
    track: 'RASTREAR PEDIDO',
    back: 'VOLVER AL INICIO',
  },

  tracking: {
    eyebrow: 'RASTREO',
    title: 'RASTREA TU PEDIDO.',
    label: 'Número de pedido',
    placeholder: 'Ej: VX-0001',
    button: 'RASTREAR',
    notFound: 'No encontramos ese pedido. Revisa el número o escríbenos por WhatsApp.',
    steps: ['Pedido confirmado', 'Empacado', 'En camino', 'Entregado'],
    carrier: 'Transportadora',
    guide: 'Guía',
  },

  waitlist: {
    cta: 'ÚNETE A LA LISTA DE ESPERA',
    title: 'LISTA DE ESPERA.',
    intro: 'Los primeros compradores reciben un regalo. Te avisamos por WhatsApp el día del lanzamiento.',
    countdownLabel: 'LANZAMIENTO EN',
    units: { d: 'DÍAS', h: 'HRS', m: 'MIN', s: 'SEG' },
    fields: {
      name: 'Nombre',
      phone: 'WhatsApp',
      city: 'Ciudad',
      discipline: 'Disciplina',
    },
    disciplines: ['Ciclismo', 'Running', 'Triatlón', 'Otro'],
    consent: 'Autorizo el tratamiento de mis datos personales según la {policy}.',
    consentLink: 'política de tratamiento de datos',
    submit: 'UNIRME',
    submitting: 'ENVIANDO…',
    success: 'Listo. Estás en la lista. Te escribiremos por WhatsApp.',
    close: 'Cerrar',
  },

  legal: {
    draftBanner: 'BORRADOR — PENDIENTE DE REVISIÓN LEGAL',
    index: 'Contenido',
    updated: 'Última actualización',
  },

  dev: {
    toggleLabel: 'Modo',
    live: 'LIVE',
    waitlist: 'WAITLIST',
  },
} as const;

/** Reemplaza {clave} en una plantilla de texto. */
export function t(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(vars[k] ?? `{${k}}`));
}
