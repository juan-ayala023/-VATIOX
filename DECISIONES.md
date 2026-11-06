# VATIOX · Decisiones de diseño y técnicas (boceto v1)

Decisiones tomadas donde el brief no especificaba. Criterio: lo más sobrio, rápido y orientado a conversión.

## Conversión
- **"COMPRAR" del hero, barra sticky y CTA final agregan 1 frasco al carrito y abren el drawer** (no hacen scroll a la oferta). Es un paso menos hacia el pago para el tráfico de Instagram.
- **El drawer muestra un upsell** ("Cambia al combo y ahorra $29.900") cuando hay frascos sueltos. Respeta el stock.
- **La oferta preseleccionada en la sección Comprar es el combo** (tarjeta destacada).
- **Selector de cantidad**: limitado por el stock (combo = 2 unidades por cantidad).

## Inventario
- `stock` se valida en el carrito y en el checkout. El total de frascos (sueltos + combos × 2) nunca supera `stock`.
- `lotSize` (116) se agregó al modelo `Product` para calcular "QUEDAN X DE Y". En el mock el stock no se descuenta tras una compra (no hay backend).

## Visual
- **Botón primario**: corte diagonal (`clip-path`) y, al hover, un brillo hueso que barre de izquierda a derecha (una franja roja no se vería sobre un fondo rojo). **Botón outline**: rectángulo recto y relleno rojo que barre de izquierda a derecha. No lleva corte diagonal porque el `clip-path` borraba el borde en las esquinas.
- **La "X" del hero** es un isotipo gigante en rojo detrás del frasco, con entrada tipo golpe (spring, scale 1.4 → 1).
- **Cifras técnicas en JetBrains Mono** y titulares en Barlow Condensed 900 cursiva (utilidad CSS `headline`).
- **Grano**: un SVG de ruido fijo en `body::after`, sin costo de animación.
- **Fotos de fundadores y atletas**: siluetas genéricas con grano y la etiqueta visible "FOTO PENDIENTE". La etiqueta "EJEMPLO" en atletas solo aparece en desarrollo.
- **Sello "LOTE 001 VERIFICADO"** en el certificado de muestra. El documento dice explícitamente que es una muestra.

## Movimiento
- `MotionConfig reducedMotion="user"`: con `prefers-reduced-motion` se anulan los transforms y quedan solo los fades. Lenis, marquees, parallax, flotación y el pin horizontal también se desactivan (Historia cae al layout apilado).
- **El CTA del hero termina de aparecer en ~550 ms** (requisito: < 600 ms).
- **La cortina roja entre páginas no corre en la primera carga** para no retrasar el primer CTA.
- **El acordeón del FAQ anima la altura** (pedido explícito). Todo lo demás anima solo `transform` y `opacity`, salvo el desenfoque del titular del hero y el `clip-path` del CTA final (ambos pedidos).
- **El carrusel de atletas usa scroll nativo con `scroll-snap`**: el arrastre táctil en móvil es nativo y más fluido que un drag por JS. Las flechas aparecen en desktop.

## Arquitectura
- **Todo el texto vive en `src/content/copy.ts`** y el legal en `src/content/legal.ts`. Precios, stock, lotes y códigos están en `src/lib/catalog.ts`.
- **`useBuy()`** es la acción única de compra: en modo `live` agrega al carrito y en `waitlist` abre el formulario.
- **Los adapters** (`src/lib/adapters/`) usan como "base" mock `localStorage` (`mockDb.ts`). Para la demo, el pedido `VX-0001` siempre se puede rastrear.
- **El toggle live/waitlist** solo existe con `NODE_ENV=development`. Guarda la elección en `localStorage`. En producción manda `LAUNCH_MODE`.
- **El carrito y el modo se persisten con `skipHydration`** y se rehidratan después del primer render (sin mismatches de SSR).
- **La imagen Open Graph se genera dinámicamente** (`app/opengraph-image.tsx`). Hay que reemplazarla por una foto real.
- `/checkout` y `/gracias` llevan `noindex` y están excluidas en `robots.txt`.

## Texto (INVIMA)
- Revisión hecha sobre `src/`: no aparecen "rendimiento", "resistencia", "oxígeno", "energía", "recupera", "cura", "previene", "salud" ni "®".
- La única coincidencia es **"tratamiento de datos personales"**, que es el término legal exigido por la Ley 1581 y no una promesa de salud.
