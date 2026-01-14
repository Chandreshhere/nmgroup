"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRowRef = useRef<HTMLDivElement>(null);
  const forYouRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const topRevealRef = useRef<HTMLDivElement>(null);
  const bottomRevealRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const textRow = textRowRef.current;
    const forYou = forYouRef.current;
    const imageWrapper = imageWrapperRef.current;
    const topReveal = topRevealRef.current;
    const bottomReveal = bottomRevealRef.current;
    const image = imageRef.current;
    const button = buttonRef.current;

    if (!textRow || !forYou || !imageWrapper || !topReveal || !bottomReveal || !image || !button) return;

    // Set initial states
    gsap.set(textRow, { opacity: 0, x: -80 });
    gsap.set(forYou, { opacity: 0, x: -80 });
    gsap.set(topReveal, { yPercent: 0 }); // Covers top half
    gsap.set(bottomReveal, { yPercent: 0 }); // Covers bottom half
    gsap.set(image, { scale: 1 });
    gsap.set(button, { opacity: 0, scale: 0.8 });

    // Create timeline - starts after header animation
    const tl = gsap.timeline({
      delay: 4.5,
    });

    // All text elements slide in together from left to right
    tl.to(textRow, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    // (FOR YOU) slides in from left - same animation as text row
    tl.to(forYou, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: "power3.out",
    }, "<"); // Same time as text row

    // Image reveals - top cover moves up, bottom cover moves down
    tl.to(topReveal, {
      yPercent: -100,
      duration: 0.9,
      ease: "power2.inOut",
    }, "-=0.3");

    tl.to(bottomReveal, {
      yPercent: 100,
      duration: 0.9,
      ease: "power2.inOut",
    }, "<"); // Same time as top reveal

    // Image zooms in slightly
    tl.to(image, {
      scale: 1.05,
      duration: 1.2,
      ease: "power2.out",
    }, "-=0.9");

    // Button appears with bounce
    tl.to(button, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.7)",
    }, "-=0.4");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#F5F5F3] pt-24 md:pt-28 pb-12 sticky top-0"
      style={{ paddingLeft: "48px", paddingRight: "48px", zIndex: 1 }}
    >
      {/* Hero Container */}
      <div className="relative">
        {/* Text Row - All elements move together */}
        <div
          ref={textRowRef}
          className="flex items-start mb-0 relative z-10"
          style={{ opacity: 0 }}
        >
          {/* Left - Main Headline */}
          <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-normal text-[#493425] tracking-tight leading-tight pb-2 mt-1 -mb-1">
            TURNING NORMAL SPACES
            <br />
            INTO STUNNING
            <br />
            MASTERPIECES
          </h1>

          {/* Spacer to push Real Estate Tags to align with FOR YOU */}
          <div className="flex-1" />

          {/* Real Estate Tags - aligned with (FOR YOU) left edge */}
          <div className="hidden md:flex flex-col text-[#8D7660] pt-2 text-right">
            <div className="flex items-start gap-2 lg:gap-4">
              <span className="text-xs font-medium tracking-widest">REAL</span>
              <span className="text-xs font-medium tracking-widest">ESTATE</span>
              <span className="text-xs font-medium tracking-widest">AGENCY</span>
            </div>
            <div className="text-left leading-snug mt-1">
              <span className="text-xs font-medium tracking-widest block">WHERE LUXURY</span>
              <span className="text-xs font-medium tracking-widest block">MEETS LIFESTYLE</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full">
          {/* (FOR YOU) - aligned with MASTERPIECES line */}
          <div
            ref={forYouRef}
            className="hidden md:flex justify-end -mt-6 md:-mt-7 lg:-mt-8 xl:-mt-9"
            style={{ opacity: 0 }}
          >
            <span className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-normal text-[#493425] tracking-tight leading-none">
              FOR YOU
            </span>
          </div>

          <div
            ref={imageWrapperRef}
            className="relative aspect-[16/11] md:aspect-[2/1] lg:aspect-[2.2/1] overflow-hidden"
          >
            {/* Actual Image */}
            <div ref={imageRef} className="absolute inset-0">
              <Image
                src="/hotel.jpg"
                alt="Luxury architecture"
                fill
                priority
                className="object-cover object-[center_15%]"
              />
            </div>

            {/* Top reveal cover - moves up */}
            <div
              ref={topRevealRef}
              className="absolute top-0 left-0 right-0 h-1/2 bg-[#F5F5F3] z-10"
            />

            {/* Bottom reveal cover - moves down */}
            <div
              ref={bottomRevealRef}
              className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#F5F5F3] z-10"
            />
          </div>

          {/* Contact Button */}
          <button
            ref={buttonRef}
            onClick={() => {
              const contactSection = document.getElementById('contact-section');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="absolute bottom-4 right-4 md:bottom-8 md:right-8 lg:bottom-10 lg:right-12 flex items-center justify-center w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 bg-white rounded-full text-center text-[11px] font-bold text-[#493425] uppercase tracking-wider hover:bg-[#F5F5F3] transition-colors shadow-lg z-20 cursor-pointer"
            style={{ opacity: 0 }}
          >
            <span className="leading-tight">
              GET IN
              <br />
              TOUCH
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
