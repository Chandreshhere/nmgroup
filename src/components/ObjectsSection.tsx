"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function ObjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const desc1Ref = useRef<HTMLParagraphElement>(null);
  const desc2Ref = useRef<HTMLParagraphElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);
  const mountainRef = useRef<HTMLDivElement>(null);
  const ruralRef = useRef<HTMLDivElement>(null);
  const heritageRef = useRef<HTMLDivElement>(null);
  const seasideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const desc1 = desc1Ref.current;
    const desc2 = desc2Ref.current;
    const city = cityRef.current;
    const mountain = mountainRef.current;
    const rural = ruralRef.current;
    const heritage = heritageRef.current;
    const seaside = seasideRef.current;

    if (!section || !title || !desc1 || !desc2 || !city || !mountain || !rural || !heritage || !seaside) return;

    const ctx = gsap.context(() => {
      // Set initial states for text
      gsap.set([title, desc1, desc2], { opacity: 0, y: 40 });

      // Set initial states for row 1 images - bottom to top reveal
      gsap.set(city, { clipPath: "inset(100% 0 0 0)" });
      gsap.set(mountain, { clipPath: "inset(100% 0 0 0)" });

      // Set initial states for row 2 images - top to bottom reveal
      gsap.set(rural, { clipPath: "inset(0 0 100% 0)" });
      gsap.set(heritage, { clipPath: "inset(0 0 100% 0)" });
      gsap.set(seaside, { clipPath: "inset(0 0 100% 0)" });

      // All three texts animate together
      gsap.to([title, desc1, desc2], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "top 40%",
          toggleActions: "play none none none",
        },
      });

      // City Residences - first to reveal (bottom to top)
      gsap.to(city, {
        clipPath: "inset(0% 0 0 0)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: city,
          start: "top 85%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });

      // Mountain Retreats - second to reveal with delay (bottom to top)
      gsap.to(mountain, {
        clipPath: "inset(0% 0 0 0)",
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: city,
          start: "top 85%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });

      // Rural Estates - first in row 2 (top to bottom)
      gsap.to(rural, {
        clipPath: "inset(0 0 0% 0)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rural,
          start: "top 85%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });

      // Heritage Homes - after rural with delay (top to bottom)
      gsap.to(heritage, {
        clipPath: "inset(0 0 0% 0)",
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rural,
          start: "top 85%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });

      // Seaside Villas - same time as heritage (top to bottom)
      gsap.to(seaside, {
        clipPath: "inset(0 0 0% 0)",
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rural,
          start: "top 85%",
          end: "top 50%",
          toggleActions: "play none none none",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F5F5F3] w-full"
      style={{
        paddingLeft: '48px',
        paddingRight: '48px',
        paddingTop: '14vh',
        paddingBottom: '14vh',
        zIndex: 2,
      }}
    >
      {/* Top Text Layout - 3 Column Grid */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: 'auto 1fr 41vw',
          columnGap: '24px',
        }}
      >
        {/* Left - Title */}
        <div>
          <h2
            ref={titleRef}
            className="text-sm font-semibold text-[#493425] leading-[140%]"
            style={{ opacity: 0 }}
          >
            Objects that change the
            <br />
            way of life
          </h2>
        </div>

        {/* Middle - Description 1 */}
        <div style={{ maxWidth: '180px' }}>
          <p
            ref={desc1Ref}
            className="text-sm font-medium text-[#8D7660] leading-[160%]"
            style={{ opacity: 0 }}
          >
            Discover exclusive properties that elevate the meaning of comfort and sophistication. Each residence is a masterpiece of architecture and design, created for those who seek more than just a home
          </p>
        </div>

        {/* Right - Description 2 */}
        <div style={{ maxWidth: '180px' }}>
          <p
            ref={desc2Ref}
            className="text-sm font-medium text-[#8D7660] leading-[160%]"
            style={{ opacity: 0 }}
          >
            Our collection redefines modern luxury — blending space, light, and emotion to create environments that inspire, impress, and transform everyday living
          </p>
        </div>
      </div>

      {/* Image Layout - Editorial Collage */}
      <div className="relative mt-20">
        {/* Row 1: City Residences + Mountain Retreats */}
        <div className="flex items-start justify-end gap-6">
          {/* City Residences - Small Square */}
          <div className="flex flex-col shrink-0">
            <div
              ref={cityRef}
              className="relative bg-[#E5E2DD] overflow-hidden"
              style={{ width: '280px', height: '280px' }}
            >
              <Image
                src="/city.jpg"
                alt="City Residences"
                fill
                className="object-cover"
              />
            </div>
            <h3
              className="text-xs font-semibold text-[#493425] mt-4 uppercase"
              style={{ letterSpacing: '0.12em' }}
            >
              CITY RESIDENCES
            </h3>
          </div>

          {/* Mountain Retreats - Large Landscape */}
          <div className="flex flex-col">
            <div
              ref={mountainRef}
              className="relative bg-[#E5E2DD] overflow-hidden"
              style={{ width: '41vw', aspectRatio: '16/10' }}
            >
              <Image
                src="/mountain.jpg"
                alt="Mountain Retreats"
                fill
                className="object-cover"
              />
            </div>
            <h3
              className="text-xs font-semibold text-[#493425] mt-4 uppercase"
              style={{ letterSpacing: '0.12em' }}
            >
              MOUNTAIN RETREATS
            </h3>
          </div>
        </div>

        {/* Row 2: Rural Estates + Heritage Homes + Seaside Villas */}
        <div className="flex items-end mt-8 gap-6">
          {/* Rural Estates - Very Wide */}
          <div className="flex flex-col">
            <div
              ref={ruralRef}
              className="relative bg-[#E5E2DD] overflow-hidden"
              style={{ width: '52vw', aspectRatio: '16/11' }}
            >
              <Image
                src="/rural.jpg"
                alt="Rural Estates"
                fill
                className="object-cover"
              />
            </div>
            <h3
              className="text-xs font-semibold text-[#493425] mt-4 uppercase"
              style={{ letterSpacing: '0.12em' }}
            >
              RURAL ESTATES
            </h3>
          </div>

          {/* Heritage Homes & Seaside Villas - Two Small Side by Side */}
          <div className="flex gap-6 ml-auto">
            {/* Heritage Homes */}
            <div className="flex flex-col">
              <div
                ref={heritageRef}
                className="relative bg-[#E5E2DD] overflow-hidden"
                style={{ width: '280px', aspectRatio: '4/5' }}
              >
                <Image
                  src="/heritage.jpg"
                  alt="Heritage Homes"
                  fill
                  className="object-cover"
                />
              </div>
              <h3
                className="text-xs font-semibold text-[#493425] mt-4 uppercase"
                style={{ letterSpacing: '0.12em' }}
              >
                HERITAGE HOMES
              </h3>
            </div>

            {/* Seaside Villas */}
            <div className="flex flex-col">
              <div
                ref={seasideRef}
                className="relative bg-[#E5E2DD] overflow-hidden"
                style={{ width: '280px', aspectRatio: '4/5' }}
              >
                <Image
                  src="/seaside.jpg"
                  alt="Seaside Villas"
                  fill
                  className="object-cover"
                />
              </div>
              <h3
                className="text-xs font-semibold text-[#493425] mt-4 uppercase"
                style={{ letterSpacing: '0.12em' }}
              >
                SEASIDE VILLAS
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
