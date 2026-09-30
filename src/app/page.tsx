import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";
import Reveals from "@/components/Reveals";
import Dock from "@/components/Dock";
import Hero from "@/sections/Hero";
import Climb from "@/sections/Climb";
import Problem from "@/sections/Problem";
import Vida from "@/sections/Vida";
import AlwaysOn from "@/sections/AlwaysOn";
import Services from "@/sections/Services";
import Niches from "@/sections/Niches";
import Steps from "@/sections/Steps";
import Founder from "@/sections/Founder";
import Proof from "@/sections/Proof";
import Booking from "@/sections/Booking";
import Faq from "@/sections/Faq";
import FinalCta from "@/sections/FinalCta";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <Hero />
      <main>
        <Climb />
        <Problem />
        <Vida />
        <AlwaysOn />
        <Services />
        <Niches />
        <Steps />
        <Founder />
        <Proof />
        <Booking />
        <Faq />
      </main>
      <FinalCta />
      <Dock />
      <Reveals />
    </>
  );
}
