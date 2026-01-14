"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const para1Ref = useRef<HTMLParagraphElement>(null);
  const para2Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const imageInner = imageInnerRef.current;
    const title = titleRef.current;
    const details = detailsRef.current;
    const para1 = para1Ref.current;
    const para2 = para2Ref.current;

    if (!section || !image || !imageInner || !title || !details || !para1 || !para2) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(image, { clipPath: "inset(0 0 100% 100%)" });
      gsap.set(imageInner, { scale: 1.3 });
      gsap.set(title, { opacity: 0, y: 40 });
      gsap.set(details, { opacity: 0, y: 40 });
      gsap.set(para1, { opacity: 0, y: 40 });
      gsap.set(para2, { opacity: 0, y: 40 });

      // Image reveal from top right corner
      gsap.to(image, {
        clipPath: "inset(0 0 0% 0%)",
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 40%",
          toggleActions: "play none none none",
        },
      });

      // Image zoom out smoothly
      gsap.to(imageInner, {
        scale: 1,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 40%",
          toggleActions: "play none none none",
        },
      });

      // Title animation - first text
      gsap.to(title, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 40%",
          toggleActions: "play none none none",
        },
      });

      // Details grid animation - second
      gsap.to(details, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 40%",
          toggleActions: "play none none none",
        },
      });

      // Paragraph 1 - after details
      gsap.to(para1, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        delay: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 40%",
          toggleActions: "play none none none",
        },
      });

      // Paragraph 2 - last to fade in smoothly
      gsap.to(para2, {
        opacity: 1,
        y: 0,
        duration: 1.8,
        delay: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 40%",
          toggleActions: "play none none none",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const propertyDetails = [
    { label: "ARCHITECT", value: "Luca Moretti" },
    { label: "YEAR", value: "2025" },
    { label: "TOTAL AREA", value: "268 m²" },
    { label: "DEVELOPER", value: "Emirates Group" },
    { label: "FLOOR", value: "18th" },
    { label: "LOCATION", value: "Dubai, UAE" },
    { label: "ROOMS", value: "5" },
    { label: "PRICE", value: "$2,480,000" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F5F5F3] w-full"
      style={{
        height: '100vh',
        paddingLeft: '48px',
        paddingRight: '48px',
        paddingTop: '10vh',
        paddingBottom: '10vh',
        zIndex: 2,
      }}
    >
      {/* Main Grid */}
      <div
        className="h-full grid"
        style={{
          gridTemplateColumns: '1.3fr 1fr',
          columnGap: '5.5vw',
        }}
      >
        {/* Left Column - Property Image */}
        <div className="relative h-full">
          <div
            ref={imageRef}
            className="relative w-full h-full bg-[#E5E2DD] overflow-hidden"
          >
            <div ref={imageInnerRef} className="relative w-full h-full">
              <Image
                src="/arc.jpg"
                alt="Luxury property interior"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Floating CTA Button */}
          <button
            className="absolute bottom-8 left-8 flex items-center justify-center w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 bg-white rounded-full text-center text-[11px] font-bold text-[#493425] uppercase tracking-wider hover:bg-[#F5F5F3] transition-colors shadow-lg"
          >
            <span className="leading-tight">
              VIEW THE
              <br />
              PROPERTY
            </span>
          </button>
        </div>

        {/* Right Column - Property Details */}
        <div className="flex flex-col h-full">
          {/* Top - Gallery Title & Navigation */}
          <div className="flex items-start justify-between">
            <h2
              ref={titleRef}
              className="text-sm font-medium text-[#493425] leading-[140%]"
              style={{ opacity: 0 }}
            >
              Gallery of
              <br />
              objects
            </h2>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-1">
              {/* Left Arrow - Inactive */}
              <button className="w-24 h-24 flex items-center justify-center text-[#493425]/30 hover:text-[#493425]/50 transition-colors">
                <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 28L35 45L50 62" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M28 18C18 28 12 36 12 45C12 54 18 62 28 72" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  <path d="M62 18C72 28 78 36 78 45C78 54 72 62 62 72" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                </svg>
              </button>

              {/* Right Arrow - Active */}
              <button className="w-24 h-24 flex items-center justify-center text-[#493425] hover:text-[#493425]/70 transition-colors">
                <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M40 28L55 45L40 62" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M28 18C18 28 12 36 12 45C12 54 18 62 28 72" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  <path d="M62 18C72 28 78 36 78 45C78 54 72 62 62 72" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Property Details Grid */}
          <div
            ref={detailsRef}
            className="grid mt-40"
            style={{
              gridTemplateColumns: 'repeat(4, 1fr)',
              rowGap: '32px',
              columnGap: '24px',
              opacity: 0,
            }}
          >
            {propertyDetails.map((detail, index) => (
              <div key={index}>
                <p
                  className="text-xs font-semibold text-[#493425] uppercase mb-2"
                  style={{ letterSpacing: '0.05em' }}
                >
                  {detail.label}
                </p>
                <p className="text-sm font-medium text-[#8D7660]">
                  {detail.value}
                </p>
              </div>
            ))}
          </div>

          {/* Description Text */}
          <div className="mt-auto space-y-6">
            <p
              ref={para1Ref}
              className="text-sm font-medium text-[#8D7660] leading-[170%]"
              style={{ opacity: 0 }}
            >
              This exclusive 4-bedroom residence embodies the philosophy of quiet luxury: timeless materials, natural tones, and impeccable details. The interior combines marble wall panels, warm wood textures, and soft lighting to create a space of absolute comfort. Floor-to-ceiling windows fill each room with natural light, offering breathtaking views of the Dubai skyline.
            </p>
            <p
              ref={para2Ref}
              className="text-sm font-medium text-[#8D7660] leading-[170%]"
              style={{ opacity: 0 }}
            >
              Premium finishes in natural marble and oak. Smart home system for climate control, lighting, and security. Master bedroom with en-suite bathroom and walk-in closet. Italian kitchen with built-in Miele appliances. Private amenities for residents: infinity pool, fitness club, and sky lounge. 24-hour concierge service and car parking. Underground parking and comprehensive security system
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
