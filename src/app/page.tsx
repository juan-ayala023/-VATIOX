import { FaqLd, ProductLd } from '@/components/JsonLd';
import { MobileBuyBar } from '@/components/layout/MobileBuyBar';
import { Athletes } from '@/components/sections/Athletes';
import { ComingSoon } from '@/components/sections/ComingSoon';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Hero } from '@/components/sections/Hero';
import { LotCheck } from '@/components/sections/LotCheck';
import { Offer } from '@/components/sections/Offer';
import { ProductSpec } from '@/components/sections/ProductSpec';
import { Story } from '@/components/sections/Story';
import { TrustMarquee } from '@/components/sections/TrustMarquee';
import { WhyVatiox } from '@/components/sections/WhyVatiox';

export default function Home() {
  return (
    <>
      <Hero />
      <TrustMarquee />
      <ProductSpec />
      <LotCheck />
      <WhyVatiox />
      <Story />
      <Athletes />
      <Offer />
      <ComingSoon />
      <FAQ />
      <FinalCTA />
      <MobileBuyBar />
      <ProductLd />
      <FaqLd />
    </>
  );
}
