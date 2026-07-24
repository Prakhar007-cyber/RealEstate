"use client";

import { useEffect, useState } from "react";
import Preloader from "@/components/layout/Preloader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import ClickSpark from "@/components/reactbits/ClickSpark";
import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import Stats from "@/components/sections/Stats";
import Residences from "@/components/sections/Residences";
import Architecture from "@/components/sections/Architecture";
import Amenities from "@/components/sections/Amenities";
import Lifestyle from "@/components/sections/Lifestyle";
import Gallery from "@/components/sections/Gallery";
import Location from "@/components/sections/Location";
import Testimonial from "@/components/sections/Testimonial";
import SiteVisit from "@/components/sections/SiteVisit";

export default function Home() {
  // Preloader plays once per browser session; `start` gates the hero entrance.
  const [loading, setLoading] = useState(true);
  const [start, setStart] = useState(false);

  useEffect(() => {
    // sessionStorage is client-only, so this mount sync can't happen during SSR.
    if (sessionStorage.getItem("aurelis_loaded")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      setStart(true);
    }
  }, []);

  function handleLoaded() {
    sessionStorage.setItem("aurelis_loaded", "1");
    setLoading(false);
  }

  return (
    <>
      {loading && <Preloader onComplete={handleLoaded} />}
      <ClickSpark />
      <Navbar />
      <main>
        <Hero start={start || !loading} />
        <Intro />
        <Stats />
        <Residences />
        <Architecture />
        <Amenities />
        <Lifestyle />
        <Gallery />
        <Location />
        <Testimonial />
        <SiteVisit />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
