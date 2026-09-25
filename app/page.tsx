import { About } from "@/components/sections/About";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Inventory } from "@/components/sections/Inventory";
import { WhyMe } from "@/components/sections/WhyMe";
import { coverPhoto } from "@/lib/cars";
import { listCars } from "@/lib/storage";

export const dynamic = "force-dynamic";

function formatPrice(value: number) {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function Home() {
  let cars: Awaited<ReturnType<typeof listCars>> = [];
  try {
    cars = await listCars({ publishedOnly: true });
  } catch {
    cars = [];
  }

  const featured = cars[0];

  return (
    <>
      <Hero
        featuredImage={featured ? coverPhoto(featured) : undefined}
        featuredTitle={featured?.title}
        featuredPrice={featured ? formatPrice(featured.price) : undefined}
      />
      <Inventory initialCars={cars} />
      <WhyMe />
      <About />
      <FinalCta />
    </>
  );
}
