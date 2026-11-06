# VATIOX · Tienda en línea (boceto v1)

Mockup navegable de alta fidelidad de la tienda de **VATIOX Polvo de remolacha**.

Stack: Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lenis · Zustand.

## Correr en local

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de producción
```

Copia `.env.example` a `.env.local` para activar Meta Pixel / GA4.

## Dónde está cada cosa

- `src/content/copy.ts`: todo el texto de la página (revisión del cliente).
- `src/content/legal.ts`: textos legales (BORRADOR, pendiente de revisión legal).
- `src/lib/catalog.ts`: productos, ofertas, stock, lotes y códigos de embajador.
- `src/lib/config.ts`: `LAUNCH_MODE` (`live` / `waitlist`), WhatsApp y fecha de lanzamiento.
- `src/lib/adapters/`: interfaces mock de pagos, envíos, facturación, notificaciones y lista de espera.
- `DECISIONES.md`: decisiones de diseño no especificadas en el brief.

En desarrollo aparece un toggle (abajo a la izquierda) para alternar entre los modos live y lista de espera.

> Textos de producto sujetos a las reglas del registro INVIMA de alimento: sin promesas de efectos en salud o rendimiento y sin el símbolo de marca registrada.
