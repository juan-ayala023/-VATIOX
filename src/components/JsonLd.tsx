import { copy } from '@/content/copy';
import { getMainProduct } from '@/lib/catalog';
import { INSTAGRAM_URL, SITE_URL } from '@/lib/config';

function Ld({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export function OrganizationLd() {
  return (
    <Ld
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'VATIOX',
        url: SITE_URL,
        logo: `${SITE_URL}/brand/logo.png`,
        sameAs: [INSTAGRAM_URL],
        address: { '@type': 'PostalAddress', addressCountry: 'CO' },
      }}
    />
  );
}

/** Product con offers en COP y availability según stock. Sin aggregateRating. */
export function ProductLd() {
  const p = getMainProduct();
  return (
    <Ld
      data={{
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: p.name,
        description: copy.meta.description,
        sku: 'VX-01',
        brand: { '@type': 'Brand', name: 'VATIOX' },
        image: [`${SITE_URL}/opengraph-image`],
        countryOfOrigin: 'CO',
        weight: { '@type': 'QuantitativeValue', value: p.netWeightGrams, unitCode: 'GRM' },
        offers: p.offers.map((o) => ({
          '@type': 'Offer',
          sku: o.id,
          name: o.label,
          price: o.priceCOP,
          priceCurrency: 'COP',
          availability: p.stock >= o.units ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
          url: `${SITE_URL}/#comprar`,
          shippingDetails: {
            '@type': 'OfferShippingDetails',
            shippingRate: { '@type': 'MonetaryAmount', value: 0, currency: 'COP' },
            shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'CO' },
          },
        })),
      }}
    />
  );
}

export function FaqLd() {
  return (
    <Ld
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: copy.faq.items.map((i) => ({
          '@type': 'Question',
          name: i.q,
          acceptedAnswer: { '@type': 'Answer', text: i.a },
        })),
      }}
    />
  );
}
