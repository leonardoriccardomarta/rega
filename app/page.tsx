import { About } from "@/components/sections/About";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Inventory } from "@/components/sections/Inventory";
import { WhyMe } from "@/components/sections/WhyMe";

export default function Home() {
  return (
    <>
      <Hero />
      <Inventory />
      <WhyMe />
      <About />
      <FinalCta />
    </>
  );
}
